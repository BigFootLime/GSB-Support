// app/(modals)/_layout.tsx
import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right', // transition iOS
        headerShown: true,
      }}
    />
  );
}
