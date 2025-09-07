import CloseButton from "@/components/buttons/Close";
import LogoutButton from "@/components/buttons/Logout";
import { Stack } from "expo-router";
import { JSX } from "react";

/**
 * OwnerLayout Component
 *
 * Defines the navigation stack for owner screens including:
 * - Main tab layout
 * - Cake creation modal
 * - Cake edit modal
 *
 * Features:
 * - Main screen `(tabs)` has a logout button on the right side of the header.
 * - Modals (`createModal` and `[cakeId]/editModal`) are presented as modals
 *   with centered titles and a close button on the left.
 * - Uses Expo Router `Stack` for navigation.
 *
 * @component
 * @returns {JSX.Element} Stack navigator for owner screens.
 */
const OwnerLayout = (): JSX.Element => {
    return (
        <Stack>
            {/* Main tab layout screen with logout button */}
            <Stack.Screen 
                name="(tabs)" 
                options={{ 
                    title: "",
                    headerRight: () => <LogoutButton />
                }} 
            />

            {/* Modal screen for creating a new cake */}
            <Stack.Screen
                name="createModal"
                options={{
                    presentation: "modal",
                    title: "Tambah Kue Baru",
                    headerTitleAlign: "center",
                    headerLeft: () => <CloseButton />
                }}
            />

            {/* Modal screen for editing an existing cake */}
            <Stack.Screen
                name="[cakeId]/editModal"
                options={{
                    presentation: "modal",
                    title: "Edit Kue",
                    headerTitleAlign: "center",
                    headerLeft: () => <CloseButton />
                }}
            />
        </Stack>
    );
}

export default OwnerLayout;
