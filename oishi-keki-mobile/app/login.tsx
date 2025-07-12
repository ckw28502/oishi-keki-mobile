import TextInputPassword from "@/Components/TextInputs/TextInputPassword";
import useLoginForm from "@/hooks/auth/useLoginForm";
import { JSX } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

/**
 * LoginScreen component renders a login form with username and password fields.
 * 
 * - Uses React Hook Form for form state management and validation.
 * - Uses React Native Paper for UI components and styling.
 * - Displays error messages under inputs using HelperText.
 * - Password input supports visibility toggle through a custom TextInputPassword component.
 * 
 * @component
 * @returns {JSX.Element} The login screen UI.
 */
const LoginScreen = (): JSX.Element => {
  const { control, errors, onSubmit } = useLoginForm();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="displayLarge">MASUK</Text>
      </View>

      <View style={styles.inputContainer}>
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nama pengguna"
              mode="outlined"
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.username}>
          {errors.username?.message}
        </HelperText>

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputPassword
              label="Kata sandi"
              style={styles.textInput}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password?.message}
        </HelperText>

        <Button mode="contained" style={styles.button} onPress={onSubmit}>
          Masuk
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputContainer: {
    flex: 4,
    alignItems: "center",
  },
  textInput: {
    width: "80%",
  },
  button: {
    width: "60%",
  },
});

export default LoginScreen;
