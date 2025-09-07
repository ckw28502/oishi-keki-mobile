import { closeModal } from "@/common/closeModal";
import CakeFormDTO from "@/dto/cake/cakeFormDTO";
import theme from "@/theme";
import colors from "@/theme/colors";
import { JSX, useRef } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
    Button,
    TextInput as CustomTextInput,
    HelperText,
    Text,
} from "react-native-paper";
import useCakeForm from "./useCakeForm";

type Props = {
  /**
   * Function that sends the form data to the backend API.
   * @param reqBody - Cake data transfer object containing `name` and `price`.
   * @returns Promise<void> - Resolves if the API request succeeds, rejects on error.
   */
  apiCall: (reqBody: CakeFormDTO) => Promise<void>;

  /**
   * ID of the cake being edited (optional).
   * If provided, the form will load with existing cake data.
   */
  cakeId?: string | null;

  /**
   * Label for the submit button, e.g. `"SIMPAN"` or `"TAMBAH"`.
   * Defaults should be set by the parent.
   */
  submitLabel: string;
};

/**
 * CakeForm Component
 *
 * A reusable form for creating or editing a cake.
 * Uses `react-hook-form` with Yup validation, `react-native-paper` UI components,
 * and currency formatting for the price field.
 *
 * Features:
 * - Text input for cake name
 * - Currency-formatted input for cake price (Indonesian Rupiah)
 * - Inline validation error messages
 * - Cancel button to close the modal
 * - Submit button to trigger the provided API call
 *
 * @component
 * @param {Props} props - Component props
 * @returns {JSX.Element} A controlled form UI for cake creation/editing.
 */
const CakeForm = ({ apiCall, cakeId, submitLabel }: Props): JSX.Element => {
  const { control, errors, onSubmit } = useCakeForm(apiCall, cakeId);

  // Reference to move focus from "name" field to "price" field
  const priceRef = useRef<TextInput | null>(null);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Cake Name Input Field */}
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label="Nama kue"
            mode="outlined"
            style={styles.textInput}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            onSubmitEditing={() => priceRef.current?.focus()}
            submitBehavior="submit"
            returnKeyType="next"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.name}>
        {errors.name?.message}
      </HelperText>

      {/* Cake Price Input Field (Currency formatted) */}
      <Controller
        name="price"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            label="Harga kue"
            mode="outlined"
            style={styles.textInput}
            render={(props) => (
              <CurrencyInput
                {...props}
                value={value}
                onChangeValue={onChange}
                delimiter="."
                prefix="Rp "
                precision={0}
              />
            )}
            onBlur={onBlur}
            keyboardType="numeric"
            ref={priceRef}
            returnKeyType="done"
          />
        )}
      />
      <HelperText type="error" visible={!!errors.price}>
        {errors.price?.message}
      </HelperText>

      {/* Cancel Button (closes modal) */}
      <Button
        mode="contained"
        style={{ ...styles.button, ...styles.cancelButton }}
        onPress={closeModal}
      >
        <Text style={styles.buttonText}>BATAL</Text>
      </Button>

      {/* Submit Button (submits form) */}
      <Button mode="contained" style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  inputContainer: {
    flex: 3,
    alignItems: "center",
  },
  textInput: {
    width: "80%",
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
  },
  button: {
    width: "80%",
    paddingVertical: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 24,
    color: theme.colors.onPrimary,
  },
});

export default CakeForm;
