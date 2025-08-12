import Roles from "@/constants/enum/role";
import { role$, setRole } from "@/stores/role";
import { hideSnackbar, snackbar$ } from "@/stores/snackbarStore";
import theme from "@/theme";
import { getAccessToken } from "@/utils/secureStore";
import { observer } from "@legendapp/state/react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { JSX, useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { PaperProvider, Portal, Snackbar } from "react-native-paper";

SplashScreen.setOptions({
  duration: 1000,
  fade: true
});

SplashScreen.preventAutoHideAsync();

/**
 * RootLayout
 * 
 * The main application layout component for the React Native app.
 * 
 * Responsibilities:
 * - Initializes the user's role based on the saved access token in secure storage.
 * - Wraps the entire app in providers for:
 *   - Keyboard handling (`KeyboardProvider`).
 *   - UI theming (`PaperProvider` with React Native Paper).
 * - Defines navigation using `expo-router`'s `Stack`:
 *   - Routes inside `(owner)` are accessible only if the role is owner.
 *   - Routes inside `(login)` are accessible only if no role exists (`role$` falsy).
 * - Displays a global Snackbar for app-wide notifications.
 * 
 * @component
 * @returns {JSX.Element} The root layout component with navigation, theming, and global UI features.
 */
const RootLayout = observer((): JSX.Element => {
  const [roleChecked, setRoleChecked] = useState(false);
  useEffect(() => {
    // On initial mount, retrieve the access token and set the role in state
    const initRole = async () => {
      const token = await getAccessToken();
      await setRole(token);
      setRoleChecked(true);
      await SplashScreen.hideAsync();
    };

    initRole();
  }, []);

  if (!roleChecked) {
    return <></>;
  }

  return (
    <KeyboardProvider>
      <PaperProvider theme={theme}>
        <Stack>
          {/* Protected route for authenticated users (owner role) */}
          <Stack.Protected guard={role$.get() ===  Roles.Owner}>
            <Stack.Screen
              name="(owner)"
              options={{ headerShown: false }}
            />
          </Stack.Protected>

          {/* Protected route for unauthenticated users (login screen) */}
          <Stack.Protected guard={!role$.get()}>
            <Stack.Screen
              name="(login)"
              options={{ headerShown: false }}
            />
          </Stack.Protected>
        </Stack>

        {/* Global Snackbar for showing messages across the app */}
        <Portal>
          <Snackbar
            visible={!!snackbar$.message.get()}
            onDismiss={hideSnackbar}
            duration={3000}
            action={{
              label: "tutup", // "close" in Indonesian
              onPress: hideSnackbar,
            }}
          >
            {snackbar$.message.get()}
          </Snackbar>
        </Portal>
      </PaperProvider>
    </KeyboardProvider>
  );
});

export default RootLayout;
