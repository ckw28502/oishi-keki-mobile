import CakeSort from '@/constants/enum/cakeSort';
import Cake from '@/models/cake';
import theme from '@/theme';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { Picker } from '@react-native-picker/picker';
import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button, Text, TextInput } from 'react-native-paper';
import useCakeFilter from './useCakeFilter';

const SORT_OPTIONS = [
  { label: "Nama (A-Z)", value: CakeSort.NameASC },
  { label: "Nama (Z-A)", value: CakeSort.NameDESC },
  { label: "Harga (Terendah)", value: CakeSort.PriceASC },
  { label: "Harga (Tertinggi)", value: CakeSort.PriceDESC },
];

type Props = {
  /** Callback triggered when the bottom sheet index changes */
  onSheetChange: (index: number) => void;
  /** React use state method to update cake list  */
  setCakes: React.Dispatch<React.SetStateAction<Cake[]>>
};

/**
 * CakeFilter renders a BottomSheetModal that allows users to:
 * - Filter cakes by name using a text input (like operator search).
 * - Sort cakes by name (A-Z, Z-A) or price (ascending/descending).
 * 
 * Features:
 * - Controlled inputs using react-hook-form.
 * - Automatically fetches cakes on mount with default filter & sort values.
 * - Dismisses the modal programmatically via forwarded ref when filters are applied.
 * - Custom backdrop that closes the sheet when tapped.
 *
 * @param {Props} props - Props for the component
 * @param {React.Ref<BottomSheetModal>} ref - Forwarded ref for controlling the BottomSheetModal
 * @returns {JSX.Element} A BottomSheetModal containing cake filter and sort controls
 */
const CakeFilter = forwardRef<BottomSheetModal, Props>(({ onSheetChange, setCakes }, ref) => {
  // Function to dismiss the bottom sheet programmatically
  const closeSheet = () => {
    (ref as React.RefObject<BottomSheetModal>).current?.dismiss();
  };

  // Custom hook to manage form state and cake fetching
  const { control, onSubmit, getCakes } = useCakeFilter(closeSheet, setCakes);

  // Bottom sheet snap points (percentage of screen height)
  const snapPoints = useMemo(() => ["40%"], []);

  // Prepare Picker items for sorting
  const sortPickerItems = SORT_OPTIONS.map(option => (
    <Picker.Item label={option.label} value={option.value} key={option.value} />
  ));

  /**
   * Render a custom backdrop for BottomSheetModal.
   * Clicking on the backdrop will close the modal.
   */
  const renderBackdrop = useCallback((props: BottomSheetDefaultBackdropProps) => (
    <BottomSheetBackdrop
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      {...props}
    />
  ), []);

  // Fetch cakes with default filter and sort when component mounts
  useEffect(() => {
    getCakes({
      nameFilter: "",
      sort: CakeSort.NameASC
    });
  }, [getCakes]);

  return (
    <BottomSheetModal
      ref={ref}
      style={styles.modal}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={renderBackdrop}
      onChange={onSheetChange}
    >
      <BottomSheetView>
        <KeyboardAwareScrollView>
          {/* Name filter input */}
          <Controller
            name="nameFilter"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nama kue"
                mode="outlined"
                style={styles.inputs}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Sort picker input */}
          <Controller
            name="sort"
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={{...styles.pickerContainer, ...styles.inputs}}>
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

          {/* Apply filter button */}
          <Button 
            mode="contained" 
            onPress={onSubmit} 
            style={styles.inputs}
            icon="magnify"
            >
                <Text style={styles.buttonText}>Terapkan filter</Text>
          </Button>
        </KeyboardAwareScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  container: {
    flex: 1,
  },
  inputs: {
    marginVertical: 10
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
  buttonText: {
    color: theme.colors.onPrimary
  }
});

CakeFilter.displayName = "CakeFilter";

export default CakeFilter;
