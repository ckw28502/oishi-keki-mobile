import CakeFilter from "@/components/bottom-sheets/cakeFilter/cakeFilter";
import theme from "@/theme";
import colors from "@/theme/colors";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, FAB, Text } from "react-native-paper";

const CakeScreen = () => {
    const cakeFilterRef = useRef<BottomSheetModal>(null);

    const [fABVisibility, setFABVisibility] = useState(true);

    const openSheet = useCallback(() => {
        cakeFilterRef.current?.present();
        setFABVisibility(false);
    }, []);

    const onSheetChange = (index: number) => {
        if (index < 0) {
            cakeFilterRef.current?.dismiss();
            setFABVisibility(true);
        }
    }
    
    return(
        <>
            <GestureHandlerRootView style={styles.container}>
                <BottomSheetModalProvider>
                    <View style={styles.filterContainer}>
                        <Button mode="contained" onPress={openSheet} icon="filter">
                            <Text style={styles.buttonText}>Cari / Filter Kue</Text>
                        </Button>                   
                    </View>
                    <CakeFilter
                        ref={cakeFilterRef}
                        onSheetChange={onSheetChange}
                    /> 
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
            <FAB
                icon="plus"
                size="medium"
                style={styles.addFAB} 
                visible={fABVisibility}
                color={theme.colors.onPrimary}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 10
    },
    filterContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignSelf: "center",
        width: "60%"
    },
    buttonText: {
        color: theme.colors.onPrimary
    },
    addFAB: {
        position: "absolute",
        right: "8%",
        bottom: "5%",
        backgroundColor: colors.primary
    }
});

export default CakeScreen;