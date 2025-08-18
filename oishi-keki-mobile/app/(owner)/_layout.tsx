import { Stack } from "expo-router";

const OwnerLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="createModal"
                options={{
                    presentation: "modal",
                    headerShown: false
                }}
            />
        </Stack>
    );
}

export default OwnerLayout;