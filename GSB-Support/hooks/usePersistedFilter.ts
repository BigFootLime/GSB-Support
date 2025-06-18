// src/hooks/usePersistedFilter.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './useAuth';

export function usePersistedFilter(key: string, defaultValue: string) {
  const { user } = useAuth();
  const [value, setValue] = useState<string>(defaultValue);
  const [loading, setLoading] = useState(true);

  const storageKey = user?.uid ? `${key}:${user.uid}` : null;

  useEffect(() => {
    const load = async () => {
      if (!storageKey) return;
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored !== null) setValue(stored);
      setLoading(false);
    };
    load();
  }, [storageKey]);

  const update = async (newValue: string) => {
    if (!storageKey) return;
    await AsyncStorage.setItem(storageKey, newValue);
    setValue(newValue);
  };

  return { value, setValue: update, loading };
}
