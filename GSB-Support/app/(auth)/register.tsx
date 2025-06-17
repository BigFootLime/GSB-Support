import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { userSchema } from '@/types/user';
import { z } from 'zod';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

type RegisterForm = z.infer<typeof userSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      department: '',
      role: 'employee',
      avatarUrl: '',
    },
  });

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

  const onSubmit = async (data: RegisterForm) => {
    setAuthError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: data.email,
        fullName: data.fullName,
        department: data.department,
        role: data.role,
        avatarUrl: data.avatarUrl || '',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      router.replace('/(app)/dashboard');
    } catch (err: any) {
      console.error(err);
      setAuthError("Erreur lors de l’inscription. Vérifiez les données.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require('@/assets/images/GSB_Logo_light.png')} style={styles.logo} resizeMode="contain" />

        <TouchableOpacity onPress={pickAvatar} style={styles.avatarContainer}>
          <Image
            source={avatarUrl ? { uri: avatarUrl } : require('@/assets/images/icon.png')}
            style={styles.avatar}
          />
          <Text style={styles.avatarText}>Choisir une photo de profil</Text>
        </TouchableOpacity>

        {authError !== '' && <Text style={styles.authError}>{authError}</Text>}

        {/* Nom complet */}
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Nom complet"
              placeholderTextColor="#171639"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}

        {/* Département */}
        <Controller
          control={control}
          name="department"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Département"
              placeholderTextColor="#171639"
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.department && <Text style={styles.error}>{errors.department.message}</Text>}

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor="#171639"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        {/* Mot de passe */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Mot de passe"
              placeholderTextColor="#171639"
              style={styles.input}
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        {/* Role */}
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
                dropdownIconColor="#171639"
              >
                <Picker.Item label="Employé" value="employee" color="#171639" />
                <Picker.Item label="Support" value="support" color="#171639" />
                <Picker.Item label="Administrateur" value="admin" color="#171639" />
              </Picker>
            </View>
          )}
        />
        {errors.role && <Text style={styles.error}>{errors.role.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.link}>Déjà inscrit ? Se connecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scroll: {
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    color: '#171639',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    marginBottom: 8,
  },
  picker: {
    color: '#171639',
  },
  button: {
    backgroundColor: '#171639',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginBottom: 8,
  },
  authError: {
    color: '#b91c1c',
    textAlign: 'center',
    marginBottom: 16,
  },
  link: {
    color: '#AB82FD',
    textAlign: 'center',
    marginTop: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e2e8f0',
    borderWidth: 2,
    borderColor: '#94a3b8',
  },
  avatarText: {
    marginTop: 8,
    color: '#171639',
    fontSize: 14,
  },
});
