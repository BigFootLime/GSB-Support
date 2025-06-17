import { Slot, useSegments, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isInApp = segments[0] === '(app)';

  useEffect(() => {
    if (!loading && !user && isInApp) {
      router.replace('/(auth)/login');
    }
  }, [user, loading, isInApp]);

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
      <Slot />
      <Toast/>
      <StatusBar style="light" />
    </>
  );
}
