import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';

const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.replace('/(app)/dashboard');
    } catch (err: any) {
      console.error(err);
      setAuthError('Email ou mot de passe incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/GSB_Logo_light.png')} style={styles.logo} resizeMode="contain" />

      {authError !== '' && <Text style={styles.authError}>{authError}</Text>}

      <TextInput
      placeholderTextColor='#171639'
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) => setValue('email', text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <TextInput
        placeholderTextColor='#171639'
        placeholder="Mot de passe"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setValue('password', text)}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Pas encore de compte ? S'inscrire</Text>
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: 'bold',
    color: '#1e293b',
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
});
