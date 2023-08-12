import { View } from "react-native";
import { Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import Theme from "../../shared/themes/theme";

export default function Glossary() {
    return (
        <View style={styles.container}>
            <Text style={Theme.styles.titlePage}>Glosario</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
    },
});