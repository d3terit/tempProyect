import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "@rneui/themed";
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { getAuth } from "@firebase/auth";
import Theme, { DARK_THEME, LIGHT_THEME, SYSTEM_THEME } from "../../shared/themes/theme";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import React, { useEffect } from "react";

export default function Config() {
    const { user } = useAuthentication();
    const auth = getAuth();
    const db = getDatabase();
    const [currentAvatar, setCurrentAvatar] = React.useState('ybot');
    useEffect(() => {
        if (user?.uid) {
          const dbAvatar = ref(db, 'users/' + user.uid + '/avatar');
          onValue(dbAvatar, (snapshot) => {
            const data = snapshot.val();
            if (data) setCurrentAvatar(data);
          });
        }
      }, [user]);
    const changeValue = (key: string, value: any) => {
        const dbUser = ref(db, 'users/' + user?.uid + '/' + key);
        set(dbUser, value);
    }
    const buttons = [
        { title: 'Claro', theme: LIGHT_THEME },
        { title: 'Oscuro', theme: DARK_THEME },
        { title: 'Sistema', theme: SYSTEM_THEME },
    ];
    const avatars = [
        { value: 'ybot', img: require('~assets/y-bot.png') },
        { value: 'xbot', img: require('~assets/x-bot.png') },
    ]
    return (
        <View style={styles.container}>
            <Text style={Theme.styles.titlePage}>Configuración</Text>
            <View style={styles.mainConfig}>
                <Text style={[styles.titleSection, { color: Theme.theme.colortTextPrimary }]}>Tema</Text>
                <View style={styles.groupButtons}>
                    {buttons.map((button, index) => (
                        <TouchableOpacity key={index} onPress={() => changeValue('theme',button.theme)}
                            style={[styles.button, {
                                borderColor: button.theme === Theme.currentTheme ? Theme.theme.colorPrimary : Theme.theme.borderColor,
                                backgroundColor: Theme.theme.secondaryColor
                            }]} activeOpacity={.5}>
                            <Text style={[styles.text, { color: Theme.theme.colortTextPrimary }]}>{button.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={[styles.titleSection, { color: Theme.theme.colortTextPrimary }]}>Avatar seleccionado</Text>
                <View style={styles.groupButtons}>
                    {avatars.map((button, index) => (
                        <TouchableOpacity key={index} onPress={() => changeValue('avatar',button.value)}
                            style={[styles.buttonAvatar, {
                                width: '45%',
                                borderColor: button.value === currentAvatar ? Theme.theme.colorPrimary : Theme.theme.borderColor,
                                backgroundColor: Theme.theme.secondaryColor
                            }]} activeOpacity={.5}>
                            <Image source={button.img} style={styles.img} />
                        </TouchableOpacity>
                    ))}
                </View>
                {/* <Text style={[styles.titleSection, { color: Theme.theme.colortTextPrimary }]}>Perfil</Text>
                <Text style={[styles.titleSection, { color: Theme.theme.colortTextPrimary }]}>Correo: {user?.email}!</Text>
                <Text style={[styles.titleSection, { color: Theme.theme.colortTextPrimary }]}>Verificado: {user?.emailVerified ? 'Si' : 'No'}</Text> */}
                <View style={styles.contentLogout}>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => auth.signOut()} activeOpacity={.5}>
                        <Text style={styles.lightText}>Cerrar sesión</Text>
                        <Icon name="log-out-outline" size={30} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
    },
    mainConfig: {
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    titleSection: {
        fontSize: 18,
        marginTop: 20,
    },
    groupButtons: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 18,
    },
    lightText: {
        fontSize: 18,
        color: '#ebebeb',
    },
    button: {
        borderRadius: 15,
        borderWidth: 2,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    buttonAvatar: {
        borderRadius: 15,
        borderWidth: 2,
    },
    contentLogout: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    logoutButton: {
        borderRadius: 15,
        paddingHorizontal: 25,
        paddingVertical: 12,
        backgroundColor: Theme.theme.colorPrimary,
        color: '#ebebeb',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
        color: '#ebebeb',
    },
    img: {
        //darle el ancho del padre
        width: '100%',
    }
});