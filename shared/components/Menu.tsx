import Icon from 'react-native-vector-icons/Ionicons';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Theme from '../themes/theme';
import { useEffect } from 'react';
import React from 'react';

export default function Menu({ view, setView, routes }: any) {
    const navigateToNext = () => {
        const index = routes.findIndex((route: any) => route.path === view);
        if (index < routes.length - 1) {
            setView(routes[index + 1].path);
        } else {
            setView(routes[0].path);
        }
    }
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    useEffect(() => {
       const keyboardDidShowListener = Keyboard.addListener(
         'keyboardDidShow',
         () => {
           setKeyboardVisible(true); // or some other action
         }
       );
       const keyboardDidHideListener = Keyboard.addListener(
         'keyboardDidHide',
         () => {
           setKeyboardVisible(false); // or some other action
         }
       );
   
       return () => {
         keyboardDidHideListener.remove();
         keyboardDidShowListener.remove();
       };
     }, []);
    return (
        <>
            <LinearGradient
                colors={[Theme.theme.backgroundPrimary, Theme.theme.backgroundPrimary+'c0','transparent']}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}  
                style={styles.degree} 
                pointerEvents='none'
            >
            </LinearGradient>
            {!isKeyboardVisible &&
                <TouchableOpacity activeOpacity={.5} onPress={() => { navigateToNext() }} style={styles.menuButton}>
                    <Icon name="cube-outline" size={50} color={Theme.theme.colortTextPrimary} />
                </TouchableOpacity>
            }
        </>
    )
}

const styles = StyleSheet.create({
    degree: {
        position: 'absolute',
        width: '100%',
        height: '25%',
        bottom: 0,
    },
    menuButton: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: 30,
    }
});