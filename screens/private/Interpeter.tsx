import { View, Image, StyleSheet } from "react-native";
import { getAuth } from "@firebase/auth";
import { getDatabase, ref, onValue } from "@firebase/database";
import React, { useEffect } from "react";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import InputPhrase from "../../shared/components/InputPhrase";
import ContentAvatar from "../../shared/components/Avatar";
import { Text } from "@rneui/themed";
import Theme from "../../shared/themes/theme";
import Constants from "expo-constants";

export default function Interpreter({currentPhrase, setCurrentPhrase, playPhrase}:any) {
    // const { user } = useAuthentication();
    // const auth = getAuth();
    // const db = getDatabase();
    // const [currentAvatar, setCurrentAvatar] = React.useState<any>(null);
    // useEffect(() => {
    //     if (user?.uid) {
    //       const dbAvatar = ref(db, 'users/' + user.uid + '/avatar');
    //       onValue(dbAvatar, (snapshot) => {
    //         const data = snapshot.val();
    //         // if (data) setCurrentAvatar(avatars.find(avatar => avatar.value === data)?.img);
    //         if (data) setCurrentAvatar(require(`~assets/models/${data}.glb`));
    //       });
    //     }
    //   }, [user]);
    // console.log(currentAvatar);
    return (
        <View style={styles.container}>
            <ContentAvatar currentPhrase={currentPhrase} setCurrentPhrase={setCurrentPhrase}/>
            <CurrentText currentPhrase={currentPhrase}/>
            <InputPhrase playPhrase={playPhrase}/>
        </View>
    );
}


const CurrentText = ({ currentPhrase }: any) => {
    const text = currentPhrase.join(' ');
    return (
      <View style={styles.contentMessage}>
        <Text style={{ fontSize: 20, color: Theme.theme.colortTextPrimary }}>{text}</Text>
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
    },
    contentMessage: {
        position: 'absolute',
        top: Constants.statusBarHeight + 20,
        left: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
    },
});