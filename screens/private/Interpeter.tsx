import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { getAuth } from "@firebase/auth";
import { getDatabase, ref, onValue } from "@firebase/database";
import React, { useEffect } from "react";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import InputPhrase from "../../shared/components/InputPhrase";
import ContentAvatar from "../../shared/components/Avatar";
import { Text } from "@rneui/themed";
import Theme from "../../shared/themes/theme";
import Constants from "expo-constants";

export default function Interpreter({currentPhrase, currentPhraseIndex, setCurrentPhraseIndex, playPhrase}:any) {
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
            <ContentAvatar currentPhrase={currentPhrase} currentPhraseIndex={currentPhraseIndex} setCurrentPhraseIndex={setCurrentPhraseIndex}/>
            <CurrentText currentPhrase={currentPhrase} currentPhraseIndex={currentPhraseIndex} setCurrentPhraseIndex={setCurrentPhraseIndex}/>
            <InputPhrase playPhrase={playPhrase}/>
        </View>
    );
}


const CurrentText = ({ currentPhrase, currentPhraseIndex, setCurrentPhraseIndex }: any) => {
    const groupedWords = groupWords(currentPhrase);
    return (
      <TouchableOpacity style={styles.contentMessage} onPress={() => setCurrentPhraseIndex(0)} activeOpacity={.5}>
        {groupedWords.map((item: any, nWord: number) => {
            return (
                <View key={nWord} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {item.map((elem: any) => {
                        return (
                            <Text key={elem.index} style={[{ fontSize:20, color: Theme.theme.colortTextPrimary }, 
                            elem.index == currentPhraseIndex ? styles.activeIndex : {}]}>
                                    {elem.index == 0 ? elem.text.toUpperCase() : elem.text}
                            </Text>
                        );
                    })}
                </View>
            );
        })}
      </TouchableOpacity>
    );
  }

const groupWords = (phraseArray: any) => {
    const words = [];
    let currentWord: any = []
    let index = 0;
    for (const item of phraseArray) {
        currentWord.push({...item, index: index});
        if (item.sign === null) {
            words.push(currentWord);
            currentWord = [];
        }
        index++;
    }
    if (currentWord.length > 0) words.push(currentWord);
    return words;
};

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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 40,
        backgroundColor: 'transparent',
    },
    activeIndex: {
        fontSize: 28,
        color: Theme.invariableValues.colorAccent,
    },
});