import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth'; 
import { useTickets } from '@/hooks/useTickets'; 
import { Card } from '@/components/ui/Card';
import { Stack } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useAuth(); 
  const { tickets = [] } = useTickets(); 

  const newTickets = tickets.filter((t) => t.status === 'new');
  const inProgressTickets = tickets.filter((t) => t.status === 'in-progress');
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved');

  return (
    <>
    <Stack.Screen options={{ title: 'Dashboard' }} />
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenue {user?.displayName || '👋'} !</Text>
      <Text style={styles.subtitle}>Voici un aperçu de vos tickets.</Text>

      <View style={styles.cardRow}>
        <Card style={styles.card}>
          <Ionicons name="mail-unread-outline" size={32} color="#2563eb" />
          <Text style={styles.cardTitle}>Nouveaux</Text>
          <Text style={styles.cardNumber}>{newTickets.length}</Text>
        </Card>

        <Card style={styles.card}>
          <Ionicons name="time-outline" size={32} color="#f59e0b" />
          <Text style={styles.cardTitle}>En cours</Text>
          <Text style={styles.cardNumber}>{inProgressTickets.length}</Text>
        </Card>

        <Card style={styles.card}>
          <Ionicons name="checkmark-done-outline" size={32} color="#10b981" />
          <Text style={styles.cardTitle}>Résolus</Text>
          <Text style={styles.cardNumber}>{resolvedTickets.length}</Text>
        </Card>
      </View>

      <View style={styles.footer}>
        <Text style={styles.info}> D’autres stats seront bientôt disponibles.</Text>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '30%',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: '#334155',
    marginTop: 8,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
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
