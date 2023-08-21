import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from "../themes/theme";
import { getDatabase, ref, set } from "@firebase/database";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

export default function CardPhrase({ phrase }: any) {
    const { user } = useAuthentication();
     const db = getDatabase();
     const toggleFavorite = () => {
        const dbUser = ref(db, 'users/' + user?.uid + '/phrases/' + phrase.key + '/favorite');
        set(dbUser, !phrase.favorite);
     }
    return (
        <TouchableOpacity activeOpacity={.5}>
            <View style={[styles.card, { backgroundColor: Theme.theme.secondaryColor }]}>
                <View style={styles.contentCard}>
                    <View style={styles.cardHeader}>
                        <Icon name="calendar-outline" size={15} color={Theme.theme.colortTextPrimary} />
                        <Text style={[styles.dateText, { color: Theme.theme.colortTextPrimary }]}>{phrase.date}</Text>
                    </View>
                    <Text style={[styles.cardText, { color: Theme.theme.colortTextPrimary }]}>{phrase.content}</Text>
                </View>
                <TouchableOpacity activeOpacity={.5} style={styles.likeButton} onPress={() => toggleFavorite()}>
                    <Icon name={phrase.favorite ? "heart" : "heart-outline"} size={30}
                        color={phrase.favorite ? '#C43434' : '#555555'} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentCard: {
        flexDirection: 'column',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 13,
        marginLeft: 10,
    },
    cardText: {
        fontSize: 16,
        maxWidth: '95%',
    },
    likeButton: {
        marginLeft: 'auto',
        marginTop: 10,
        paddingVertical: 10,
    }
});