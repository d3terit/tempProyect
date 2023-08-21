import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@rneui/themed";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { getDatabase, onValue, ref } from "@firebase/database";
import { useEffect } from "react";
import CardPhrase from "../../shared/components/CardPhrase";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Theme from "../../shared/themes/theme";

export default function History() {
    const { user } = useAuthentication();
    const db = getDatabase();
    const [phrases, setPhrases] = React.useState<any[]>([]);
    useEffect(() => {
        if (user?.uid) {
            const dbUsers = ref(db, 'users/' + user.uid + '/phrases');
            onValue(dbUsers, (snapshot:any) => {
                const data = snapshot.val();
                if (data) {
                    const phrases = Object.keys(data).map(key => {
                        return {
                            ...data[key],
                            key: key,
                        }
                    });
                    setPhrases(phrases);
                }
            });
        }
    }, [user]);
    const [viewFavorites, setViewFavorites] = React.useState(false);
    return (
        <View style={styles.container}>
            <Text style={Theme.styles.titlePage}>Historial</Text>
            <View style={styles.toggleContainer}>
                <TouchableOpacity activeOpacity={.5} style={[styles.toggleView, !viewFavorites && styles.activeToggleView]}
                    onPress={() => setViewFavorites(false)}>
                    <Text style={[styles.textToogle, { color: Theme.theme.colortTextPrimary }, !viewFavorites && styles.activeToggle]}>
                        Todos
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} style={[styles.toggleView, viewFavorites && styles.activeToggleView]}
                    onPress={() => setViewFavorites(true)}>
                    <Text style={[styles.textToogle, { color: Theme.theme.colortTextPrimary }, viewFavorites && styles.activeToggle]}>
                        Favoritos
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.listPhrases}>
                {phrases.filter(phrase => {
                    if (viewFavorites) {
                        return phrase.favorite;
                    }
                    return true;
                }).reverse().map((phrase, index) => {
                    return (
                        <CardPhrase phrase={phrase} key={index} />
                    );
                })}
                <View style={{ height: 150 }}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
    },
    toggleContainer: {
        marginTop: 20,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    toggleView: {
        paddingVertical: 10,
        width: 110
    },
    activeToggleView: {
        borderBottomWidth: 2,
        borderBottomColor: '#0085FF',
    },
    textToogle: {
        fontSize: 18,
        textAlign: 'center',
    },
    activeToggle: {
        color: '#0085FF'
    },
    listPhrases: {
        paddingHorizontal: 25,
        paddingTop: 20,
    }
});