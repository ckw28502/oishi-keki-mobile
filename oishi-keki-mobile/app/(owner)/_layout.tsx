import LogoutButton from "@/components/buttons/Logout";
import { Stack } from "expo-router";

const OwnerLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="(tabs)" 
                options={{ 
                    title: "",
                    headerRight: () => <LogoutButton />,
                    
                }} 
            />
        </Stack>
    )
}

export default OwnerLayout;