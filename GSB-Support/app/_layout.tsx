import { Stack, useSegments, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isProtectedRoute = !segments[0]?.startsWith('(auth)');

  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      router.replace('/(auth)/login');
    }
  }, [user, loading, isProtectedRoute]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', 
        }}
      />
      <Toast />
      <StatusBar style="light" />
    </>
  );
}
