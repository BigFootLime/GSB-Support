import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTickets } from '@/hooks/useTickets';
import { CustomCard } from '@/components/ui/Card';
import Header from '@/components/layout/Header';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { tickets = [] } = useTickets();

  const newTickets = tickets.filter((t) => t.status === 'new');
  const inProgressTickets = tickets.filter((t) => t.status === 'in-progress');
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Bienvenue {user?.displayName || ''} !
        </Text>
        <Text style={styles.subtitle}>
          Voici un aperçu de vos tickets.
        </Text>

        <View style={styles.cardRow}>
          <CustomCard
            icon="mail-unread-outline"
            color="#2563eb"
            title="Nouveaux"
            value={newTickets.length}
          />
          <CustomCard
            icon="time-outline"
            color="#f59e0b"
            title="En cours"
            value={inProgressTickets.length}
          />
          <CustomCard
            icon="checkmark-done-outline"
            color="#10b981"
            title="Résolus"
            value={resolvedTickets.length}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.info}>
            D’autres stats seront bientôt disponibles.
          </Text>
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
