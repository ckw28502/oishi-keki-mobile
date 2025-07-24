import LoginScreen from "@/app/login";
import { hideSnackbar, snackbar$ } from "@/stores/snackbarStore";
import theme from "@/theme";
import colors from "@/theme/colors";
import { observer } from "@legendapp/state/react";
import { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Portal, Snackbar } from "react-native-paper";

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
  return (
    <PaperProvider theme={theme}>
      <View style={styles.background}>
        <LoginScreen />
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
  );
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});

export default Index;
