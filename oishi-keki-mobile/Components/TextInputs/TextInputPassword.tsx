import { JSX, useEffect, useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

type TextInputPasswordProps = {
  /** Label text displayed above the input field */
  label: string;
  /** Style object to customize the input field */
  style: StyleProp<TextStyle>;
  /** Callback invoked when the text input changes */
  onChangeText: (value: string) => void;
  /** Callback invoked when the input loses focus */
  onBlur: () => void;
  /** Current value of the input field */
  value: string;
};

/**
 * TextInputPassword renders a password input field with a toggleable
 * visibility icon using react-native-paper's TextInput.
 * 
 * Features:
 * - Toggle icon to switch between showing and hiding the password.
 * - Supports external control via props: value, onChangeText, onBlur.
 * 
 * @param {TextInputPasswordProps} props The props for the component.
 * @returns {JSX.Element} A styled password input with visibility toggle.
 */
const TextInputPassword = ({
  label,
  style,
  onChangeText,
  onBlur,
  value,
}: TextInputPasswordProps): JSX.Element => {
  const [isVisible, setVisibility] = useState(false);
  const [icon, setIcon] = useState("eye");

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  };

  useEffect(() => {
    setIcon(isVisible ? "eye-off" : "eye");
  }, [isVisible]);

  return (
    <TextInput
      label={label}
      secureTextEntry={!isVisible}
      mode="outlined"
      right={<TextInput.Icon icon={icon} onPress={toggleVisibility} />}
      style={style}
      onChangeText={onChangeText}
      onBlur={onBlur}
      autoCapitalize="none"
      value={value}
    />
  );
};

export default TextInputPassword;
