import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { RefObject, useRef, useState } from 'react';
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
    const [role, setRole] = useState<string>(''); // State for role picker
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(userSchema),
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
      setValue('avatarUrl', uri as any); // Type-cast if not in schema
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
        avatarUrl: avatarUrl || '',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      router.replace('/(app)/dashboard');
    } catch (err: any) {
      console.error(err);
      setAuthError("Erreur lors de l’inscription. Vérifiez les données.");
    }
  };

  const onValueChangeHandler = (itemValue: string) => {
    setRole(itemValue);
    close();
    
  };
  

  const ref = useRef<Picker<null>>(null);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/GSB_Logo_light.png')} style={styles.logo} resizeMode="contain" />

      {/* Avatar */}
      <TouchableOpacity onPress={pickAvatar} style={styles.avatarContainer}>
        <Image
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : require('@/assets/images/icon.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.avatarText}>Choisir une photo de profil</Text>
      </TouchableOpacity>

      {authError !== '' && <Text style={styles.authError}>{authError}</Text>}

      {/* Inputs */}
      <TextInput
        placeholder="Nom complet"
        placeholderTextColor="#171639"
        style={styles.input}
        onChangeText={(text) => setValue('fullName', text)}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}

      <TextInput
        placeholder="Département"
        placeholderTextColor="#171639"
        style={styles.input}
        onChangeText={(text) => setValue('department', text)}
      />
      {errors.department && <Text style={styles.error}>{errors.department.message}</Text>}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#171639"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setValue('email', text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#171639"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setValue('password', text)}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Role Picker */}
      <View style={{ marginBottom: 8 }}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={role}
            onValueChange={onValueChangeHandler}
            style={styles.picker}       
            dropdownIconColor="#171639"
          >
            <Picker.Item label="Employé" value="employee" color="#171639" />
            <Picker.Item label="Support" value="support" color="#171639" />
            <Picker.Item label="Administrateur" value="admin" color="#171639" />
          </Picker>
        </View>
      </View>
      {errors.role && <Text style={styles.error}>{errors.role.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.link}>Déjà inscrit ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f1f5f9',
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
    overflow: 'hidden',
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
