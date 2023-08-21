import React, { useRef, useEffect, useState } from 'react'
import { Text } from "@rneui/themed";
import useControls from "r3f-native-orbitcontrols"
import { Suspense, } from 'react';
import { View } from 'react-native';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import { TextureLoader  } from 'expo-three'; // por alguna razon se debe importar asi no se este usando
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Theme from '../themes/theme';
import * as THREE from 'three';

function Avatar(props:any) {
    new TextureLoader();
    const idleAnimationR:any = useLoader(GLTFLoader, require('~assets/clips/idle.glb'));
    const avatar:any = useLoader(GLTFLoader, require('~assets/models/ybot.glb'));
    const mesh:any = useRef();
    let mixer:any
    let idleAnimation
    let signAnimation
    mixer = new THREE.AnimationMixer(avatar.scene); 
    const root = mixer.getRoot()
    if (avatar.animations.length) {
        idleAnimation = mixer.clipAction(idleAnimationR.animations[0], root);
        idleAnimation.setEffectiveWeight(1);
        idleAnimation.play();
    }
    useFrame((state, delta) => {
        mixer?.update(delta)
    })
    return (
        <mesh ref={mesh} rotation={[0, 0, 0]} position={[0, -4.5, 0]}>
            <primitive object={avatar.scene} scale={3.3} />
        </mesh>
    );
}

export default function ContentAvatar() {
    const [OrbitControls, events] = useControls()
    const created = (state:any) => {
      const _gl = state.gl.getContext();
      const pixelStorei = _gl.pixelStorei.bind(_gl);
      _gl.pixelStorei = function (...args:any) {
        const [parameter] = args;
        switch (parameter) {
          case _gl.UNPACK_FLIP_Y_WEBGL:
            return pixelStorei(...args);
        }
      };
    };
  
    return (
      <View {...events} style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={<Loading />}>
        <Canvas onCreated={created} style={{ flex: 1, backgroundColor: Theme.theme.backgroundPrimary }}>
          <OrbitControls enablePan={false} enableZoom={false}/>
          <ambientLight intensity={.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Avatar position={[0, 0, 0]} />
        </Canvas>
        </Suspense>
      </View>
    );
  }
  
  const Loading = ()  => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color: Theme.theme.colortTextPrimary}}>Cargando...</Text>
        </View>
    );
  }
  