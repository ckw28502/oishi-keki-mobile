import colors from "@/theme/colors";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

const CakeScreen = () => {
    return(
        <>
            <View style={styles.container}>
            </View>
            <FAB
                icon="plus"
                size="medium"
                style={styles.addFAB} 
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    addFAB: {
        position: "absolute",
        right: "8%",
        bottom: "5%"
    },
});

export default CakeScreen;