import { forwardRef, useEffect, useState } from "react";
import { ReturnKeyTypeOptions, StyleProp, TextInput, TextStyle } from "react-native";
import { TextInput as CustomTextInput } from "react-native-paper";

type TextInputPasswordProps = {
  /** Label text displayed above the input field */
  label: string;
  /** Style object to customize the input field */
  style?: StyleProp<TextStyle>;
  /** Callback invoked when the text input changes */
  onChangeText: (value: string) => void;
  /** Callback invoked when the input loses focus */
  onBlur: () => void;
  /** Current value of the input field */
  value: string;
  /** Return key type for the input */
  returnKeyType?: ReturnKeyTypeOptions;
};

/**
 * TextInputPassword renders a password input field with a toggleable
 * visibility icon using react-native-paper's TextInput.
 *
 * Features:
 * - Toggle icon to switch between showing and hiding the password.
 * - Supports external control via props: value, onChangeText, onBlur.
 *
 * @param {TextInputPasswordProps} props - The props for the password input component.
 * @param {React.Ref<TextInput>} ref - A ref that forwards to the underlying `TextInput`.
 * @returns {JSX.Element} A styled password input with visibility toggle.
 */
const TextInputPassword = forwardRef<TextInput, TextInputPasswordProps>(
  ({ label, style, onChangeText, onBlur, value, returnKeyType }, ref) => {
    const [isVisible, setVisibility] = useState(false);
    const [icon, setIcon] = useState("eye");

    const toggleVisibility = () => setVisibility((prev) => !prev);

    useEffect(() => {
      setIcon(isVisible ? "eye-off" : "eye");
    }, [isVisible]);

    return (
      <CustomTextInput
        label={label}
        secureTextEntry={!isVisible}
        mode="outlined"
        right={
          <CustomTextInput.Icon
            icon={icon}
            onPress={toggleVisibility}
            testID="toggle-password-icon"
          />
        }
        style={style}
        onChangeText={onChangeText}
        onBlur={onBlur}
        autoCapitalize="none"
        value={value}
        ref={ref}
        returnKeyType={returnKeyType}
        testID="text-input-password"
      />
    );
  }
);

TextInputPassword.displayName = "TextInputPassword";

export default TextInputPassword;
