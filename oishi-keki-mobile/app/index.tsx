import LoginScreen from "@/app/login";
import { role$, setRole } from "@/stores/role";
import { hideSnackbar, snackbar$ } from "@/stores/snackbarStore";
import theme from "@/theme";
import colors from "@/theme/colors";
import { getAccessToken } from "@/utils/secureStore";
import { observer } from "@legendapp/state/react";
import { JSX, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { PaperProvider, Portal, Snackbar } from "react-native-paper";

const getScreenByRole = () => {
  switch (role$.get()) {
    // case "OWNER":
    //   return <LoginScreen />; // Replace with actual Owner screen component
    // case "EMPLOYEE":
    //   console.log("Showing Employee screen.");
    //   return <LoginScreen />; // Replace with actual Employee screen component
    default:
      return <LoginScreen />;
  }
}


/**
 * The root component of the app.
 *
 * Responsibilities:
 * - Provides the global Paper theme to all React Native Paper components.
 * - Displays the login screen for unauthenticated users.
 * - Listens to the global snackbar$ state and displays a Snackbar message accordingly.
 * - Uses `observer` from Legend-State to make the component reactive to snackbar$ changes.
 *
 * @returns {JSX.Element} The root screen of the application.
 */
const Index = observer((): JSX.Element => {
  useEffect(() => {
    // Initialize the role state by decoding the JWT token
    const initRole = async () => {
      const token = await getAccessToken();
      await setRole(token);
    };

    initRole();
  }, []);
  return (
    <KeyboardProvider>
      <PaperProvider theme={theme}>
        <View style={styles.background}>
          {getScreenByRole()}
        </View>

        {/* Global Snackbar component displayed when message is set */}
        <Portal>
          <Snackbar
            visible={!!snackbar$.message.get()}
            onDismiss={hideSnackbar}
            duration={3000}
            action={{
              label: "tutup",
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});

export default Index;
