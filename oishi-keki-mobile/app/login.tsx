import TextInputPassword from "@/Components/TextInputs/TextInputPassword";
import useLoginForm from "@/hooks/auth/useLoginForm";
import { Image } from 'expo-image';
import { JSX, useRef } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Button, TextInput as CustomTextInput, HelperText } from "react-native-paper";


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
  const passwordRef = useRef<TextInput | null>(null);

  const { control, errors, onSubmit } = useLoginForm();

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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
            <CustomTextInput
              label="Nama pengguna"
              mode="outlined"
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              value={value}
              onSubmitEditing={() => passwordRef.current?.focus()}
              submitBehavior="submit"
              returnKeyType="next"
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
              ref={passwordRef}
              returnKeyType="done"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password?.message}
        </HelperText>

        <Button mode="contained" style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>MASUK</Text>
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flexGrow: 1
  },
  logoContainer: {
    flex: 10,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  logo: {
    width: "70%",
    height: "90%",
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
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 24
  }
});

export default LoginScreen;
