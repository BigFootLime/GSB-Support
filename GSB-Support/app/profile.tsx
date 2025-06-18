// screens/ProfileScreen.tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/hooks/useAuth';
import { userSchema } from '@/types/user';
import Toast from 'react-native-toast-message';
import { CustomTextInput } from '@/components/ui/Input';
import Header from '@/components/layout/Header';

const schema = userSchema.pick({
  fullName: true,
  department: true,
  role: true,
  avatarUrl: true,
});

export default function ProfileScreen() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  const isAdmin = user?.role === 'admin';

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.fullName || '',
      department: user?.department || '',
      role: user?.role || 'employee',
      avatarUrl: user?.avatarUrl || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        department: user.department || '',
        role: user.role || 'employee',
        avatarUrl: user.avatarUrl || '',
      });
      setAvatarUrl(user.avatarUrl || '');
    }
  }, [user]);

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setAvatarUrl(uri);
      setValue('avatarUrl', uri);
    }
  };

  const onSubmit = async (data) => {
    if (!user?.uid) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        fullName: data.fullName,
        department: data.department,
        role: data.role,
        avatarUrl: data.avatarUrl,
      });
      Toast.show({ type: 'success', text1: 'Profil mis à jour.' });
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: "Erreur lors de la mise à jour." });
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <Header useLogo showBack />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={pickAvatar} style={styles.avatarContainer}>
              <Image
                source={avatarUrl ? { uri: avatarUrl } : require('@/assets/images/icon.png')}
                style={styles.avatar}
              />
              <Text style={styles.avatarText}>Modifier la photo</Text>
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    label="Nom complet"
                    value={value}
                    onChangeText={onChange}
                    error={errors.fullName?.message}
                  />
                )}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name="department"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    label="Département"
                    value={value}
                    onChangeText={onChange}
                    error={errors.department?.message}
                  />
                )}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name="role"
                render={({ field: { onChange, value } }) => (
                  <CustomTextInput
                    label="Rôle"
                    value={value}
                    onChangeText={onChange}
                    editable={isAdmin}
                    error={errors.role?.message}
                  />
                )}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Enregistrer</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 24,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%', // ✅ assure que le champ remplit toute la largeur disponible
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2e8f0',
    borderWidth: 2,
    borderColor: '#94a3b8',
  },
  avatarText: {
    marginTop: 8,
    color: '#171639',
  },
  button: {
    backgroundColor: '#171639',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
