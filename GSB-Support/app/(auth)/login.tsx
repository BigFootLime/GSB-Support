import { View, Text, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';
import { CustomTextInput } from '@/components/ui/Input';
import { CustomButton } from '@/components/ui/Button';

const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const {
    control,
    handleSubmit,
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
      console.error(err.code);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setAuthError('Email ou mot de passe incorrect.');
      } else if (err.code === 'auth/too-many-requests') {
        setAuthError("Trop de tentatives. Réessaie plus tard.");
      } else {
        setAuthError("Une erreur s'est produite. Réessaie.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/GSB_Logo_light.png')} style={styles.logo} resizeMode="contain" />

      {authError !== '' && <Text style={styles.authError}>{authError}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            placeholder="exemple@gsb.fr"
            keyboardType="email-address"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <CustomTextInput
            label="Mot de passe"
            value={value}
            onChangeText={onChange}
            placeholder="******"
            secureTextEntry
            error={errors.password?.message}
          />
        )}
      />

      <CustomButton title="Se connecter" onPress={handleSubmit(onSubmit)} />

      <Text style={styles.link} onPress={() => router.push('/(auth)/register')}>
        Pas encore de compte ? S'inscrire
      </Text>
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
  authError: {
    color: '#b91c1c',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#AB82FD',
    textAlign: 'center',
    marginTop: 16,
  },
});
