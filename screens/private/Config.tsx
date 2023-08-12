import { StyleSheet, View, useColorScheme } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useAuthentication } from "../../utils/hooks/useAuthentication";
import { getAuth } from "@firebase/auth";
import Theme, { DARK_THEME, LIGHT_THEME } from "../../shared/themes/theme";
import { getDatabase, ref, set } from "@firebase/database";

export default function Config() {
    const { user } = useAuthentication();
    const auth = getAuth();
    const db = getDatabase();
    const colorScheme = useColorScheme();
    const changeTheme = (theme: any) => {
        const dbTheme = ref(db, 'users/' + user?.uid + '/theme');
        set(dbTheme, theme);
    }
    return (
        <View style={styles.container}>
            <Text style={Theme.styles.titlePage}>Configuración</Text>
            <Text style={[styles.text, {color:Theme.theme.colorPrimary}]}>Welcome {user?.email}!</Text>
            <Text style={[styles.text, {color:Theme.theme.colorPrimary}]}>Verified: {user?.emailVerified ? 'Yes' : 'No'}
            </Text>
            <Button title="Claro" style={styles.button} onPress={() => changeTheme(LIGHT_THEME)} />
            <Button title="Oscuro" style={styles.button} onPress={() => changeTheme(DARK_THEME)} />
            <Button title="Sistema" style={styles.button} onPress={() => changeTheme(colorScheme)} />
            <Button title="Cerrar sesión" style={styles.button} onPress={() => auth.signOut()} />
        </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
    },
    text: {
        fontSize: 20,
        marginBottom: 20
    },
    button: {
        marginTop: 10
    },
});