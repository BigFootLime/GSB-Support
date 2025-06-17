import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useTickets } from '@/hooks/useTickets';
import { CustomCard } from '@/components/ui/Card';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const { tickets = [] } = useTickets();

  const [showMenu, setShowMenu] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (showMenu) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => setShowMenu(false));
    } else {
      setShowMenu(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };

  const newTickets = tickets.filter((t) => t.status === 'new');
  const inProgressTickets = tickets.filter((t) => t.status === 'in-progress');
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={toggleMenu}>
            {user?.photoURL ? (
              <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            ) : user?.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={40} color="#1e293b" />
            )}
          </TouchableOpacity>

          {showMenu && (
            <Animated.View style={[styles.dropdownMenu, { opacity: fadeAnim }]}>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Déconnecter</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        <Text style={styles.title}>Bienvenue {user?.displayName || '👋'} !</Text>
        <Text style={styles.subtitle}>Voici un aperçu de vos tickets.</Text>

        <View style={styles.cardRow}>
          <CustomCard icon="mail-unread-outline" color="#2563eb" title="Nouveaux" value={newTickets.length} />
          <CustomCard icon="time-outline" color="#f59e0b" title="En cours" value={inProgressTickets.length} />
          <CustomCard icon="checkmark-done-outline" color="#10b981" title="Résolus" value={resolvedTickets.length} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.info}>D’autres stats seront bientôt disponibles.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
    minWidth: 180,
  },
  userEmail: {
    color: '#1e293b',
    marginBottom: 8,
    fontSize: 14,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ef4444',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  info: {
    fontSize: 14,
    color: '#64748b',
  },
});