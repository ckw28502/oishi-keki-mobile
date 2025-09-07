import { Stack } from "expo-router";
import { JSX } from "react";

/**
 * Layout component for the login flow.
 *
 * This layout defines the navigation stack for the login-related screens.
 * It currently contains only the `index` screen, which is the main login page.
 *
 * The `headerShown` option is set to `false` to hide the default header bar,
 * providing a cleaner UI for the login screen.
 *
 * @component
 * @returns {JSX.Element} The configured stack navigator for login screens.
 */
const LoginLayout = (): JSX.Element => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
};

export default LoginLayout;
