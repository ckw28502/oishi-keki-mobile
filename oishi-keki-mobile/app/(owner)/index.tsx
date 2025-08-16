import CakeSort from "@/constants/enum/cakeSort";
import useCakeScreen from "@/hooks/cake/useCakeScreen";
import theme from "@/theme";
import colors from "@/theme/colors";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, TextInput as CustomTextInput, FAB, Icon } from "react-native-paper";

const SORT_OPTIONS = [
    { label: "Nama (A-Z)", value: CakeSort.NameASC },
    { label: "Nama (Z-A)", value: CakeSort.NameDESC },
    { label: "Harga (Terendah)", value: CakeSort.PriceASC },
    { label: "Harga (Tertinggi)", value: CakeSort.PriceDESC },
];

const CakeScreen = () => {
    const { control, onSubmit, getCakes } = useCakeScreen();

    const sortPickerItems = SORT_OPTIONS.map(option => {
        return <Picker.Item label={option.label} value={option.value} key={option.value} />;
    });

    useEffect(() => {
        getCakes({
            nameFilter: "",
            sort: CakeSort.NameASC
        })
    }, [getCakes]);
    return(
        <>
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <Controller
                        name="nameFilter"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomTextInput
                                label="Nama kue"
                                mode="outlined"
                                style={styles.nameFilter}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        name="sort"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    prompt="Urutkan"
                                    style={styles.picker}
                                    dropdownIconColor={theme.colors.onSurface}
                                >
                                    {sortPickerItems}
                                </Picker>
                            </View>
                        )}
                    />
                    <Button mode="contained" onPress={onSubmit}>
                        <Icon source="filter" color="white" size={20} />
                    </Button>
                </View>
                <View style={styles.itemsContainer}>
                </View>
            </View>
            <FAB
                icon="plus"
                size="medium"
                style={styles.addFAB} 
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
        justifyContent: "flex-start",
        gap: 2
    },
    itemsContainer: {
        flex: 4
    },
    nameFilter: {
        marginVertical: 4
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme.colors.outline,
        overflow: "hidden"
    },
    picker: {
        backgroundColor: theme.colors.surface,
        color: theme.colors.onSurface
    },
    addFAB: {
        position: "absolute",
        right: "8%",
        bottom: "5%",
        backgroundColor: colors.primary
    }
});

export default CakeScreen;