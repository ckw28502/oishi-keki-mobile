import { closeModal } from "@/common/closeModal";
import { JSX } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-paper";

/**
 * CloseButton component.
 *
 * Renders a button with a back arrow icon that allows the user
 * to exit a modal or form. When pressed, it triggers a confirmation
 * dialog via `closeModal` before actually closing the modal.
 *
 * This component is typically used in modal headers to give users
 * a clear way to cancel or exit without submitting the form.
 *
 * @returns {JSX.Element} A button that opens a confirmation dialog on press.
 */
const CloseButton = (): JSX.Element => {
    
    /**
     * Handles button press by showing a confirmation dialog.
     * If the user confirms, the modal is closed.
     */
    const handlePress = () => {
        closeModal();
    };

    return (
        <Button onPress={handlePress} style={styles.button}>
            <Icon 
                source="arrow-left"
                size={25}
            />
        </Button>
    );
};

const styles = StyleSheet.create({
    button: { 
        left: "-5%"
    }
});

export default CloseButton;
