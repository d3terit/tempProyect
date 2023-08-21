import { View, Image, StyleSheet } from "react-native";
import { getAuth } from "@firebase/auth";
import { getDatabase, ref, onValue } from "@firebase/database";
import React, { useEffect } from "react";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import InputPhrase from "../../shared/components/InputPhrase";
import ContentAvatar from "../../shared/components/Avatar";

export default function Interpreter() {
    const { user } = useAuthentication();
    const auth = getAuth();
    const db = getDatabase();
    const [currentAvatar, setCurrentAvatar] = React.useState(require('~assets/y-bot.png'));
    useEffect(() => {
        if (user?.uid) {
          const dbAvatar = ref(db, 'users/' + user.uid + '/avatar');
          onValue(dbAvatar, (snapshot) => {
            const data = snapshot.val();
            if (data) setCurrentAvatar(avatars.find(avatar => avatar.value === data)?.img);
          });
        }
      }, [user]);
    const avatars = [
        { value: 'y-bot', img: require('~assets/y-bot.png') },
        { value: 'x-bot', img: require('~assets/x-bot.png') },
    ]
    return (
        <View style={styles.container}>
            {/* <Image source={currentAvatar} style={styles.img} /> */}
            <ContentAvatar />
            <InputPhrase />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});