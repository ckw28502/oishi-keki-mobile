import CloseButton from "@/components/buttons/Close";
import LogoutButton from "@/components/buttons/Logout";
import { Stack } from "expo-router";

const OwnerLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="(tabs)" 
                options={{ 
                    title: "",
                    headerRight: () => <LogoutButton />
                }} 
            />
            <Stack.Screen
                name="createModal"
                options={{
                    presentation: "modal",
                    title: "Tambah Kue Baru",
                    headerTitleAlign: "center",
                    headerLeft: () => <CloseButton />
                }}
            />
        </Stack>
    );
}

export default OwnerLayout;