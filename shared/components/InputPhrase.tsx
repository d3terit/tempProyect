import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import Theme from '../themes/theme';
import { TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getDatabase, ref, set } from '@firebase/database';

export default function InputPhrase() {
    const [isShow, setIsShow] = React.useState(false);
    const [value, setValue] = React.useState({ message: '' });
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

     const { user } = useAuthentication();
     const db = getDatabase();
     const sendMessage = () => {
        const key = new Date().getTime();
        const dbUser = ref(db, 'users/' + user?.uid + '/phrases/' + key);
        const newMessage = {
            content: value.message,
            date: new Date().toLocaleString('es-CO', {dateStyle: 'short', timeStyle: 'short'}),
            favorite: false,
        }
        set(dbUser, newMessage);
        setValue({ message: '' });
        setIsShow(false);
     }
    return (
        <>
            <TouchableOpacity activeOpacity={.5} style={[styles.actionButtton, {height: isShow ? '100%' : '25%'}]}
            onPress={() => setIsShow(!isShow)}></TouchableOpacity>
            {isShow && 
                <>
                    <LinearGradient
                        colors={[Theme.theme.backgroundPrimary, Theme.theme.backgroundPrimary+'e0','transparent']}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 1, y: 0 }}  
                        style={styles.degree} 
                        pointerEvents='none'
                    ></LinearGradient>
                    <View style={[styles.contentMessage, {backgroundColor:Theme.theme.secondaryColor, bottom: isKeyboardVisible ? 20 : 110}]}>
                        <TextInput
                            style={[styles.input, { color: Theme.theme.colortTextPrimary }]}
                            autoComplete="off"
                            placeholder='Escribe un mensaje...'
                            placeholderTextColor={Theme.theme.colortTextPrimary+'70'}
                            multiline={true}
                            autoFocus={true}
                            value={value.message}
                            onChangeText={(text) => setValue({ ...value, message: text })}
                        />
                        <TouchableOpacity activeOpacity={.5} style={styles.sendButton} onPress={() => { sendMessage() } }>
                            <Icon name='send-outline' size={30} style={styles.sendIcon} />
                        </TouchableOpacity>
                    </View>
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    degree: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: .6,
        bottom: 0,
    },
    contentMessage: {
        position: 'absolute',
        bottom: 110,
        width: '90%',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        zIndex: 10000,
    },
    input: {
        backgroundColor: 'transparent',
        fontSize: 18,
        maxHeight: 300,
        minHeight: 40,
        width: '85%',
    },
    sendButton: {
        marginLeft: 10,
        height: 40,
    },
    sendIcon: {
        color: "#0BA66E",
    },
    actionButtton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
});