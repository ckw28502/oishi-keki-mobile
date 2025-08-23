import { closeModal } from "@/common/closeModal";
import CreateCakeDTO from "@/dto/cake/createCakeDTO";
import theme from "@/theme";
import colors from "@/theme/colors";
import { JSX, useRef } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import CurrencyInput from 'react-native-currency-input';
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Button, TextInput as CustomTextInput, HelperText, Text } from "react-native-paper";
import useCakeForm from "./useCakeForm";

type Props = {
    /**
     * API function to handle request submission.
     * @param reqBody - Cake data transfer object containing `name` and `price`.
     * @returns Promise<void> - Resolves if creation succeeds, rejects on error.
     */
    apiCall: (reqBody: CreateCakeDTO) => Promise<void>;
}

/**
 * CakeForm component
 *
 * A controlled form for creating or editing a cake. Uses `react-hook-form` for form state management
 * and validation, integrates with `react-native-paper` inputs, and formats price as
 * Indonesian Rupiah using `react-native-currency-input`.
 *
 * Features:
 * - Input for cake name
 * - Input for cake price (formatted as currency)
 * - Validation and error messages via Yup + React Hook Form
 * - Submits to backend via provided `apiCall`
 *
 * @component
 * @param {Props} props - Props containing the API call function.
 * @returns {JSX.Element} The rendered cake form.
 */
const CakeForm = ({ apiCall }: Props): JSX.Element => {
    const { control, errors, onSubmit } = useCakeForm(apiCall);

    const priceRef = useRef<TextInput | null>(null);

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            {/* Cake Name Input */}
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

            {/* Cake Price Input */}
            <Controller
                name="price"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextInput
                        label="Harga kue"
                        mode="outlined"
                        style={styles.textInput}
                        render={props => (
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

            {/* Submit Button */}
            <Button mode="contained" style={{ ...styles.button, ...styles.cancelButton }} onPress={closeModal}>
                <Text style={styles.buttonText}>BATAL</Text>
            </Button>

            {/* Submit Button */}
            <Button mode="contained" style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>TAMBAH KUE</Text>
            </Button>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  inputContainer: {
    flex: 3,
    alignItems: "center"
  },
  textInput: {
    width: "80%"
  },
  cancelButton: {
    backgroundColor: theme.colors.error
  },
  button: {
    width: "80%",
    paddingVertical: 5,
    marginVertical: 5
  },
  buttonText: {
    fontSize: 24,
    color: theme.colors.onPrimary
  }
});

export default CakeForm;
