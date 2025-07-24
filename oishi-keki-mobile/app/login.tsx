import TextInputPassword from "@/Components/TextInputs/TextInputPassword";
import useLoginForm from "@/hooks/auth/useLoginForm";
import { Image } from 'expo-image';
import { JSX, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Portal, Snackbar, TextInput } from "react-native-paper";


/**
 * LoginScreen component renders the login UI for the application.
 *
 * Features:
 * - Controlled inputs using `react-hook-form`.
 * - Schema-based validation (Yup) for `username` and `password`.
 * - Custom password input with show/hide functionality.
 * - Displays validation and API error messages using `HelperText` and `Snackbar`.
 *
 * @component
 * @returns {JSX.Element} Login screen component.
 */
const LoginScreen = (): JSX.Element => {
  const [apiError, setApiError] = useState("");

  /**
   * Callback to set an API error message, passed to the `useLoginForm` hook.
   *
   * @param {string} errorMessage - The error message to display in the Snackbar.
   */
  const onApiError = (errorMessage: string) => {
    setApiError(errorMessage);
  };

  const { control, errors, onSubmit } = useLoginForm(onApiError);

  /**
   * Clears the current API error.
   */
  const clearApiError = () => {
    setApiError("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: "logo" }}
          placeholder="hi"
          style={styles.logo}
        />
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
              autoCapitalize="none"
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

      <Portal>
        <Snackbar
          visible={!!apiError}
          onDismiss={clearApiError}
          duration={3000}
          action={{
            label: "tutup",
            onPress: clearApiError,
          }}
        >
          {apiError}
        </Snackbar>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  logo: {
    width: "70%",
    height: "80%",
  },
  inputContainer: {
    flex: 3,
    alignItems: "center"
  },
  textInput: {
    width: "80%"
  },
  button: {
    width: "60%",
    fontSize: 80
  },
});

export default LoginScreen;
