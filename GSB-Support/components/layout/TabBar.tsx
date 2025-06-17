import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabBar() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';

          switch (route.name) {
            case 'index':
              iconName = 'home-outline';
              break;
            case 'tickets':
              iconName = 'clipboard-outline';
              break;
            case 'profile':
              iconName = 'person-outline';
              break;
          }

          return <Ionicons text={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
      })}
    />
  );
}