import LoginScreen from "@/app/login";
import theme from "@/theme";
import { JSX } from "react";
import { PaperProvider } from "react-native-paper";

/**
 * The root component of the app.
 *
 * - Wraps the app in the PaperProvider to apply the custom theme.
 * - Renders the LoginScreen for unauthenticated users.
 * - Serves as the entry point when navigating to the "/" route.
 *
 * @returns {JSX.Element} The root component with themed login screen.
 */
export default function Index(): JSX.Element {
  return (
    // Provides the custom Paper theme to all React Native Paper components
    <PaperProvider theme={theme}>
      <LoginScreen />
    </PaperProvider>
  );
}
