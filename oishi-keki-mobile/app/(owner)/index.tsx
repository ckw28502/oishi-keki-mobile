import CakeSort from "@/constants/enum/cakeSort";
import useCakeScreen from "@/hooks/cake/useCakeScreen";
import colors from "@/theme/colors";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, TextInput as CustomTextInput, FAB, Icon } from "react-native-paper";

const CakeScreen = () => {
    const { control, onSubmit, getCakes } = useCakeScreen();

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
                    {/* <Controller
                        name="sort"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            
                        )}
                    /> */}
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
    addFAB: {
        position: "absolute",
        right: "8%",
        bottom: "5%"
    }
});

export default CakeScreen;