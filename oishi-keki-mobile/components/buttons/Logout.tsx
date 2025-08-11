import { clearTokens } from "@/utils/secureStore";
import { useRouter } from "expo-router";
import { Button, Icon } from "react-native-paper";

/**
 * LogoutButton component.
 *
 * Renders a button that logs out the user by:
 * 1. Clearing authentication tokens from secure storage.
 * 2. Resetting the global `role` state to `null`.
 * 3. Navigating the user to the login screen.
 *
 * This is typically used in a header, menu, or other
 * easily accessible location in the app.
 *
 * @returns {JSX.Element} A button with a logout icon.
 */
const LogoutButton = () => {
    const router = useRouter();

    /**
     * Handles the logout process:
     * - Clears saved tokens.
     * - Redirects to the login screen.
     */
    const handlePress = async () => {
        await clearTokens();   // Remove stored authentication tokens
        router.replace("/(login)"); // Navigate to login screen
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
