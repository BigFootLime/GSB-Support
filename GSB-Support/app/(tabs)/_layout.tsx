import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2563eb', // blue-600
          tabBarInactiveTintColor: '#94a3b8', // slate-400
          tabBarStyle: {
            backgroundColor: '#f8fafc', // slate-50
            borderTopColor: '#e2e8f0', // slate-200
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="tickets/index"
          options={{
            title: 'Tickets',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" size={size} color={color} />
            ),
          }}
        /> */}
        {/* <Tabs.Screen
          name="profile"
          options={{
            title: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        /> */}
      </Tabs>

      <StatusBar style="dark" />
    </>
  );
}
