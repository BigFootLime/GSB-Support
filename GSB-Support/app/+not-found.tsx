import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Page introuvable' }} />
      <View style={styles.container}>
        <Image source={require('@/assets/images/404.png')} style={styles.image} />
        <Text style={styles.title}>Oups ! Cette page n'existe pas.</Text>
        <Text style={styles.subtitle}>
          L'écran que vous cherchez est introuvable ou a été déplacé.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/dashboard')}>
          <Text style={styles.buttonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 250,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
