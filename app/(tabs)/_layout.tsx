import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen 
                name="(home)"
                options={{ 
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='home' size={size} color={color} />
                    ),
                }}    
            />
        </Tabs>
    )
}