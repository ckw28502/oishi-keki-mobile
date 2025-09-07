import { getCakes } from "@/common/cakes";
import CakeFilter from "@/components/bottom-sheets/cakeFilter/CakeFilter";
import useDeleteCake from "@/hooks/cake/useDeleteCake";
import { cakeList$, resetList } from "@/stores/cakesStore";
import theme from "@/theme";
import colors from "@/theme/colors";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { observer } from "@legendapp/state/react";
import { Link } from "expo-router";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button, FAB, Icon, List, Text } from "react-native-paper";

type ListItemRightProps = {
    cakeId: string;
    cakeName: string;
};

/**
 * ListItemRight Component
 *
 * Renders action buttons (edit and delete) for a cake item in the list.
 *
 * @param {ListItemRightProps} props - Component props
 * @returns {JSX.Element} A view with edit and delete buttons
 */
const ListItemRight = ({ cakeId, cakeName }: ListItemRightProps): JSX.Element => {
    const { showDeleteConfirmationDialog } = useDeleteCake(cakeId, cakeName);

    return (
        <View style={ListItemRightStyles.container}>
            <Link href={{ pathname: "/[cakeId]/editModal", params: { cakeId } }}>
                <Button mode="contained" style={ListItemRightStyles.editButton}>
                    <Icon source="pencil" size={20} />
                </Button>
            </Link>
            <Button mode="contained" style={ListItemRightStyles.deleteButton} onPress={showDeleteConfirmationDialog}>
                <Icon source="delete" size={20} />
            </Button>
        </View>
    );
};

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

/**
 * CakeScreen Component
 *
 * Displays a paginated, filterable list of cakes with infinite scrolling.
 * Integrates:
 * - FAB to add new cake
 * - Bottom sheet modal for filtering cakes
 * - FlatList for displaying cakes
 *
 * Uses `@legendapp/state` for observable store state management.
 *
 * @component
 * @returns {JSX.Element} The main cake list screen
 */
const CakeScreen = observer(() => {
    const cakeFilterRef = useRef<BottomSheetModal>(null);
    const [fABVisibility, setFABVisibility] = useState(true);

    // Open the filter bottom sheet and hide FAB
    const openSheet = useCallback(() => {
        cakeFilterRef.current?.present();
        setFABVisibility(false);
    }, []);

    // Handle bottom sheet changes
    const onSheetChange = (index: number) => {
        if (index < 0) {
            cakeFilterRef.current?.dismiss();
            setFABVisibility(true);
        }
    };

    // Initial load of cakes and reset store
    useEffect(() => {
        resetList();
        getCakes();
    }, []);
    
    return(
        <>
            <GestureHandlerRootView style={styles.container}>
                <BottomSheetModalProvider>
                    {/* Filter button */}
                    <View style={styles.filterContainer}>
                        <Button mode="contained" onPress={openSheet} icon="filter">
                            <Text style={styles.buttonText}>Cari / Filter Kue</Text>
                        </Button>                   
                    </View>

                    {/* Cake list with infinite scroll */}
                    <View style={styles.listContainer}>
                        <FlatList 
                            data={cakeList$.cakes.get()}
                            keyExtractor={(cake) => cake.id}
                            onEndReached={() => getCakes()}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item }) => (
                                <List.Item 
                                    title={item.name} 
                                    description={item.priceInRupiah}
                                    right={() => <ListItemRight cakeId={item.id} cakeName={item.name} />}
                                />
                            )}
                        />
                    </View>

                    {/* Filter bottom sheet */}
                    <CakeFilter ref={cakeFilterRef} onSheetChange={onSheetChange} /> 
                </BottomSheetModalProvider>
            </GestureHandlerRootView>

            {/* FAB to add a new cake */}
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
});

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
