import React, { useRef, useEffect, useState } from 'react'
import useControls from "r3f-native-orbitcontrols"
import { Suspense, } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import { TextureLoader } from 'expo-three'; // por alguna razon se debe importar asi no se este usando
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Theme from '../themes/theme';
import * as THREE from 'three';

function Avatar({ currentPhrase, setCurrentPhrase }: any) {
  new TextureLoader();
  const idleAnimation: any = useLoader(GLTFLoader, require('~assets/clips/idle.glb'));
  const avatarModel: any = useLoader(GLTFLoader, require('~assets/models/ybot.glb'));
  const mesh:any = useRef();
  let mixer = new THREE.AnimationMixer(avatarModel.scene);
  const animationsMap: any = new Map([
    ['a', useLoader(GLTFLoader, require('~assets/clips/abecedario/a.glb'))],
    ['b', useLoader(GLTFLoader, require('~assets/clips/abecedario/b.glb'))],
    ['c', useLoader(GLTFLoader, require('~assets/clips/abecedario/c.glb'))],
    ['d', useLoader(GLTFLoader, require('~assets/clips/abecedario/d.glb'))],
    ['e', useLoader(GLTFLoader, require('~assets/clips/abecedario/e.glb'))],
    ['f', useLoader(GLTFLoader, require('~assets/clips/abecedario/f.glb'))],
    ['g', useLoader(GLTFLoader, require('~assets/clips/abecedario/g.glb'))],
    ['h', useLoader(GLTFLoader, require('~assets/clips/abecedario/h.glb'))],
    ['i', useLoader(GLTFLoader, require('~assets/clips/abecedario/i.glb'))],
    ['j', useLoader(GLTFLoader, require('~assets/clips/abecedario/j.glb'))],
    ['k', useLoader(GLTFLoader, require('~assets/clips/abecedario/k.glb'))],
    ['l', useLoader(GLTFLoader, require('~assets/clips/abecedario/l.glb'))],
    ['ll', useLoader(GLTFLoader, require('~assets/clips/abecedario/ll.glb'))],
    ['m', useLoader(GLTFLoader, require('~assets/clips/abecedario/m.glb'))],
    ['n', useLoader(GLTFLoader, require('~assets/clips/abecedario/n.glb'))],
    ['ñ', useLoader(GLTFLoader, require('~assets/clips/abecedario/ni.glb'))],
    ['o', useLoader(GLTFLoader, require('~assets/clips/abecedario/o.glb'))],
    ['p', useLoader(GLTFLoader, require('~assets/clips/abecedario/p.glb'))],
    ['q', useLoader(GLTFLoader, require('~assets/clips/abecedario/q.glb'))],
    ['r', useLoader(GLTFLoader, require('~assets/clips/abecedario/r.glb'))],
    ['rr', useLoader(GLTFLoader, require('~assets/clips/abecedario/rr.glb'))],
    ['s', useLoader(GLTFLoader, require('~assets/clips/abecedario/s.glb'))],
    ['t', useLoader(GLTFLoader, require('~assets/clips/abecedario/t.glb'))],
    ['u', useLoader(GLTFLoader, require('~assets/clips/abecedario/u.glb'))],
    ['v', useLoader(GLTFLoader, require('~assets/clips/abecedario/v.glb'))],
    ['w', useLoader(GLTFLoader, require('~assets/clips/abecedario/w.glb'))],
    ['x', useLoader(GLTFLoader, require('~assets/clips/abecedario/x.glb'))],
    ['y', useLoader(GLTFLoader, require('~assets/clips/abecedario/y.glb'))],
    ['z', useLoader(GLTFLoader, require('~assets/clips/abecedario/z.glb'))]
  ])
  let currentAnimation:any = null;
  let idTimeout:any = null;

  function getAnimation(char:any) {
    return animationsMap.get(char)?.animations?.[0] || null;
  }

  function playIdleAnimation() {
    const newAnimation = createAnimation(idleAnimation.animations[0], THREE.LoopRepeat);
    switchAnimation(newAnimation);
  }

  function createAnimation(clip:any, loopType:any) {
    const animationAction:any = mixer.clipAction(clip, avatarModel.scene);
    animationAction.setLoop(loopType);
    animationAction.clampWhenFinished = true;
    animationAction.setEffectiveWeight(1);
    animationAction.setEffectiveTimeScale(1);
    return animationAction;
  }

  function switchAnimation(newAnimation:any) {
    if (currentAnimation) {
      currentAnimation.stop();
      mixer.removeEventListener('finished', onAnimationFinished);
    }

    newAnimation.play();
    currentAnimation = newAnimation;
    newAnimation.reset();

    mixer.addEventListener('finished', onAnimationFinished);
  }

  function onAnimationFinished() {
    mixer.removeEventListener('finished', onAnimationFinished);

    const remainingPhrase = currentPhrase.slice(1);
    if (remainingPhrase.length) {
      setCurrentPhrase(remainingPhrase);
    } else {
      playIdleAnimation();
      setCurrentPhrase([]);
    }
  }

  function animateNextChar() {
    const char = currentPhrase[0];
    const nextAnimation = getAnimation(char);
    if (!nextAnimation) {
      setCurrentPhrase(currentPhrase.slice(1));
      return;
    }
    const newAnimation = createAnimation(nextAnimation, THREE.LoopOnce);
    newAnimation.clampWhenFinished = true;
    switchAnimation(newAnimation);
    
    newAnimation.play();

    mixer.addEventListener('finished', onAnimationFinished);
  }

  useEffect(() => {
    mixer = new THREE.AnimationMixer(avatarModel.scene);
    if (currentPhrase.length) {
      clearTimeout(idTimeout);
      animateNextChar();
    }else{
      playIdleAnimation();
    }
  }, [currentPhrase]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return (
    <mesh ref={mesh} rotation={[0, 0, 0]} position={[0, -4.5, 0]}>
      {avatarModel.scene && <primitive object={avatarModel.scene} scale={3.3} />}
    </mesh>
  );
}

export default function ContentAvatar({ currentPhrase, setCurrentPhrase }: any) {
  const [OrbitControls, events] = useControls()
  const created = (state: any) => {
    const _gl = state.gl.getContext();
    const pixelStorei = _gl.pixelStorei.bind(_gl);
    _gl.pixelStorei = function (...args: any) {
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
          <OrbitControls enablePan={false} enableZoom={false} />
          <ambientLight intensity={.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Avatar position={[0, 0, 0]} currentPhrase={currentPhrase} setCurrentPhrase={setCurrentPhrase} />
        </Canvas>
      </Suspense>
    </View>
  );
}

const Loading = () => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.theme.backgroundPrimary }]}>
      <ActivityIndicator size={80} color={Theme.theme.colortTextPrimary} />
    </View>
  );
}