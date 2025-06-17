// app/(modals)/ticket-detail/[id].tsx
import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTickets } from '@/hooks/useTickets';

export default function TicketDetail() {
  const { id } = useLocalSearchParams();
  const { tickets } = useTickets();

  const ticket = tickets.find(t => t.id === id);

  if (!ticket) {
    return (
      <View style={styles.center}>
        <Text>Ticket introuvable</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Détail du ticket', headerBackTitle: 'Retour' }} />
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.description}>{ticket.description}</Text>
      <Text style={styles.label}>Priorité : {ticket.priority}</Text>
      <Text style={styles.label}>
        Date limite :{' '}
        {ticket.dueDate
          ? new Date(ticket.dueDate.seconds * 1000).toLocaleDateString()
          : 'Aucune'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  description: { fontSize: 16, marginVertical: 12, color: '#334155' },
  label: { fontSize: 14, color: '#64748b', marginTop: 4 },
});
