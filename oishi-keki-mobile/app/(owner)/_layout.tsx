import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";

const OwnerTabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
            name="index"
            options={{
                title: "cakes",
                headerShown: false,
                tabBarIcon: ({ color }) => {
                    return <Icon source="cake-variant" color={color} size={30} />;
                }
            }}
        />
        </Tabs>
    );
}

export default OwnerTabsLayout;