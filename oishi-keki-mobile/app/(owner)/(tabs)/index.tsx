import CakeFilter from "@/components/bottom-sheets/cakeFilter/CakeFilter";
import Cake from "@/models/cake";
import theme from "@/theme";
import colors from "@/theme/colors";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, FAB, List, Text } from "react-native-paper";

const CakeScreen = () => {
    const cakeFilterRef = useRef<BottomSheetModal>(null);

    const [fABVisibility, setFABVisibility] = useState(true);

    const [cakes, setCakes] = useState<Cake[]>([]);

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
                    <View style={styles.listContainer}>
                        <FlatList 
                            data={cakes}
                            keyExtractor={(cake) => cake.id}
                            renderItem={({ item }) => <List.Item title={item.name} description={item.priceInRupiah} />}
                        />
                    </View>
                    <CakeFilter
                        ref={cakeFilterRef}
                        onSheetChange={onSheetChange}
                        setCakes={setCakes}
                    /> 
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
            <Link href={"/createModal"} style={styles.addFABLink}>
                <FAB
                    icon="plus"
                    size="medium"
                    visible={fABVisibility}
                    color={theme.colors.onPrimary}
                    style={styles.addFAB}
                />
            </Link>
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
        alignItems: "center",
        width: "100%"
    },
    listContainer: {
        flex: 8
    },
    buttonText: {
        color: theme.colors.onPrimary
    },
    addFABLink: {
        position: "absolute",
        right: "8%",
        bottom: "5%"
    },
    addFAB: {
        backgroundColor: colors.primary
    }
});

export default CakeScreen;