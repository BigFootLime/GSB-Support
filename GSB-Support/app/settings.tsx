import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Pressable,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'dark') setTheme('dark');
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <Header useLogo />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoContainer}>
            <Ionicons name="settings-outline" size={40} color="#1e293b" />
            <Text style={styles.appName}>Paramètres</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thème</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Thème sombre</Text>
              <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <Text style={styles.aboutText}>
              GSB Support est une application mobile moderne conçue pour améliorer la gestion des incidents techniques au sein de Galaxy Swiss Bourdin. Elle permet de créer, suivre et résoudre des tickets facilement tout en facilitant la communication entre les employés et l’équipe support.
            </Text>
          </View>

          <Pressable style={styles.linkButton} onPress={() => router.push('/legal')}>
            <Text style={styles.linkText}>Mentions légales</Text>
          </Pressable>
        </ScrollView>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 180,
    height: 40,
    resizeMode: 'contain',
  },
  appName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  section: {
    marginBottom: 24,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#334155',
  },
  aboutText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  linkButton: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    marginTop: 24,
    width: '100%',
  },
  linkText: {
    fontSize: 16,
    color: '#2563eb',
    textAlign: 'center',
  },
});