import { View, Text, StyleSheet, FlatList, ScrollView,Pressable, SafeAreaView } from 'react-native';
import { useTickets } from '@/hooks/useTickets';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import { Stack, useRouter } from 'expo-router';

export default function NewTicketsScreen() {
  const { tickets } = useTickets();
  const newTickets = tickets.filter(t => t.status === 'new');
const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Tickets' }} />
      <Header />

      <Text style={styles.title}>Tickets Nouveaux</Text>

      <FlatList
        data={newTickets}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/ticket-detail/${item.id}`)}>
          <View style={styles.ticketCard}>
            <View style={styles.header}>
              <Text style={styles.ticketTitle}>{item.title}</Text>
              <Badge priority={item.priority} />
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.meta}>
              <Ionicons name="calendar-outline" size={16} color="#64748b" />
              <Text style={styles.metaText}>
                {item.dueDate
                  ? new Date(item.dueDate.seconds * 1000).toLocaleDateString()
                  : 'Aucune date'}
              </Text>
            </View>
          </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
   container: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'#f1f5f9'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginVertical: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#64748b',
  },
});
