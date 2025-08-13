import useCakeScreen from "@/hooks/cake/useCakeScreen";
import colors from "@/theme/colors";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

const CakeScreen = () => {
    const { getCakes } = useCakeScreen();

    useEffect(() => {
        getCakes({
            page: 1,
            limit: 2,
            nameFilter: "",
            sortParam: "name",
            isAscending: true
        })
    }, [getCakes]);
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