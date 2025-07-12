import { useEffect, useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

type TextInputPasswordProps = {
    label: string;
    style: StyleProp<TextStyle>;
}

const TextInputPassword = ({ label, style }: TextInputPasswordProps) => {
    const [isVisible, setVisibility] = useState(false);
    const [icon, setIcon] = useState("eye");

    const toggleVisibility = () => {
        setVisibility(!isVisible);
    }

    useEffect(() => {
        setIcon(isVisible ? "eye-off" : "eye");
    }, [isVisible])

    return (
        <TextInput 
            label={label}
            secureTextEntry={!isVisible}
            mode="outlined"
            right={<TextInput.Icon icon={icon} onPress={toggleVisibility} />}
            style={style}
        />
    );
};

export default TextInputPassword;