import colors from "@/theme/colors";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const CakeScreen = () => {
    return(
        <View style={styles.container}>
            <Text>hi</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    
});

export default CakeScreen;