import { View } from "react-native";
import { Text } from "@rneui/themed";
import Theme from "../../shared/themes/theme";

export default function Interpreter() {
    return (
        <View>
            <Text style={{ fontSize: 30, textAlign: 'center', color: Theme.theme.colorPrimary }}>
                Interprete
            </Text>
        </View>
    );
}