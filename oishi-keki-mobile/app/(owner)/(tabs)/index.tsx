import { getCakes } from "@/common/cakes";
import CakeFilter from "@/components/bottom-sheets/cakeFilter/CakeFilter";
import { cakeList$, resetList } from "@/stores/cakesStore";
import theme from "@/theme";
import colors from "@/theme/colors";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { observer } from "@legendapp/state/react";
import { Link } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, FAB, Icon, List, Text } from "react-native-paper";

type ListItemRightProps = {
    cakeId: string;
}

const ListItemRight = ({ cakeId }: ListItemRightProps) => {
    return (
        <View style={ListItemRightStyles.container}>
            <Button
                mode="contained"
                style={ListItemRightStyles.editButton}
            >
                <Icon source="pencil" size={20} />
            </Button>
            <Button
                mode="contained"
                style={ListItemRightStyles.deleteButton}

            >
                <Icon source="delete" size={20} />
            </Button>
        </View>
    );
}

const ListItemRightStyles = StyleSheet.create({
    container: {
        gap: 5,
    },
    editButton: { 
        backgroundColor: theme.colors.secondaryContainer
    },
    deleteButton: { 
        backgroundColor: theme.colors.errorContainer
    }
});

const CakeScreen = observer(() => {
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

    useEffect(() => {
        resetList();
        getCakes();
    }, []);
    
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
                            data={cakeList$.cakes.get()}
                            keyExtractor={(cake) => cake.id}
                            renderItem={({ item }) => (
                                <List.Item 
                                    title={item.name} 
                                    description={item.priceInRupiah}
                                    right={() => <ListItemRight cakeId={item.id} />}
                                />
                            )}
                        />
                    </View>
                    <CakeFilter
                        ref={cakeFilterRef}
                        onSheetChange={onSheetChange}
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
})

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
        flex: 8,
        gap: 10
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