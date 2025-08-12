import Roles from "@/constants/enum/role";
import { dialog$, hideDialog } from "@/stores/dialogStore";
import { role$, setRole } from "@/stores/roleStore";
import { hideSnackbar, snackbar$ } from "@/stores/snackbarStore";
import theme from "@/theme";
import { getAccessToken } from "@/utils/secureStore";
import { observer } from "@legendapp/state/react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { JSX, useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Button, Dialog, PaperProvider, Portal, Snackbar, Text } from "react-native-paper";

// Configure splash screen behavior
SplashScreen.setOptions({
  duration: 1000,
  fade: true
});
SplashScreen.preventAutoHideAsync();

/**
 * Stacks
 *
 * Defines navigation structure with protected routes based on `role$`.
 * - `(owner)` routes require `Roles.Owner`.
 * - `(login)` routes require no active role (logged out).
 */
const Stacks = observer(() => {
  return (
    <Stack>
      <Stack.Protected guard={role$.get() === Roles.Owner}>
        <Stack.Screen name="(owner)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!role$.get()}>
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
});

/**
 * Global snackbar bound to `snackbar$`.
 * Shows when a message exists, hides automatically after 3s or when dismissed.
 */
const CustomSnackbar = observer(() => {
  return (
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
  );
});

/**
 * Global dialog bound to `dialog$`.
 * Visible when `title` exists. Executes `onAction` when confirmed.
 */
const CustomDialog = observer(() => {
  return (
    <Dialog visible={!!dialog$.title.get()} onDismiss={hideDialog}>
      <Dialog.Title>{dialog$.title.get()}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{dialog$.message.get()}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={hideDialog}>Batal</Button>
        <Button onPress={dialog$.onAction}>{dialog$.actionTitle.get()}</Button>
      </Dialog.Actions>
    </Dialog>
  );
});

/** Wraps global snackbar and dialog in a portal */
const CustomPortal = () => (
  <Portal>
    <CustomSnackbar />
    <CustomDialog />
  </Portal>
);

/**
 * RootLayout
 *
 * Entry point of the app.
 *
 * Responsibilities:
 * 1. Load stored access token and update `role$`.
 * 2. Keep splash screen until role check is complete.
 * 3. Provide app-wide providers:
 *    - Keyboard handling
 *    - Theming (React Native Paper)
 * 4. Render navigation (`Stacks`) and global UI (`CustomPortal`).
 *
 * @returns {JSX.Element} App layout wrapper.
 */
const RootLayout = (): JSX.Element => {
  const [roleChecked, setRoleChecked] = useState(false);

  useEffect(() => {
    const initRole = async () => {
      const token = await getAccessToken();
      await setRole(token);
      setRoleChecked(true);
      await SplashScreen.hideAsync();
    };

    initRole();
  }, []);

  if (!roleChecked) return <></>;

  return (
    <KeyboardProvider>
      <PaperProvider theme={theme}>
        <Stacks />
        <CustomPortal />
      </PaperProvider>
    </KeyboardProvider>
  );
};

export default RootLayout;
