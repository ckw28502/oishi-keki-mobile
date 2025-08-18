import { showDialog } from "@/stores/dialogStore";
import { clearTokens } from "@/utils/secureStore";
import { useRouter } from "expo-router";
import { JSX } from "react";
import { Button, Icon } from "react-native-paper";

/**
 * LogoutButton component.
 *
 * Renders a button that prompts the user to confirm logging out.
 * If confirmed, it:
 * 1. Clears authentication tokens from secure storage.
 * 2. Navigates the user to the login screen.
 *
 * This button is typically used in a header, menu, or other
 * easily accessible location in the app.
 *
 * @returns {JSX.Element} A button with a logout icon that triggers a logout confirmation dialog.
 */
const LogoutButton = (): JSX.Element => {
    const router = useRouter();

    /**
     * Performs the logout process by:
     * - Removing stored authentication tokens from secure storage.
     * - Redirecting the user to the login screen.
     */
    const logout = async () => {
        await clearTokens();            // Remove stored authentication tokens
        router.replace("/(login)");     // Navigate to login screen
    };

    /**
     * Handles button press by showing a confirmation dialog.
     * If the user confirms, the `logout` function is executed.
     */
    const handlePress = () => {
        showDialog(
            "Keluar dari aplikasi",
            "Apakah Anda yakin mau keluar dari aplikasi?",
            "Keluar",
            logout
        );
    };

    return (
        <Button onPress={handlePress}>
            <Icon 
                source="exit-to-app"
                size={30}
            />
        </Button>
    );
};

export default LogoutButton;
