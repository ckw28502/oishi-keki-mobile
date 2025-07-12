import { Stack } from "expo-router";
import { JSX } from "react";
import { PaperProvider } from "react-native-paper";

/**
 * RootLayout sets up the global layout for the application.
 * 
 * - Wraps the app with React Native Paper's theme provider.
 * - Defines the navigation stack using `expo-router`.
 * 
 * @returns {JSX.Element} The root layout with navigation and theming applied.
 */
export default function RootLayout(): JSX.Element {
  return (
    <PaperProvider>
      <Stack>
        {/* Hides the header for the index screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
