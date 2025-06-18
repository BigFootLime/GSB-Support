import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { useState } from 'react';
import { useTickets } from '@/hooks/useTickets';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import { Stack, useRouter } from 'expo-router';
import { CustomPickerWithBadge } from '@/components/ui/CustomPicker';

export default function NewTicketsScreen() {
  const { tickets } = useTickets();
  const newTickets = tickets.filter((t) => t.status === 'new');
  const router = useRouter();

  const [priority, setPriority] = useState('');
  const [sortDate, setSortDate] = useState('desc');
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

  const filteredTickets = newTickets
    .filter((t) =>
      search.trim() !== ''
        ? t.title.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((t) => (priority ? t.priority === priority : true))
    .sort((a, b) =>
      sortDate === 'desc'
        ? b.createdAt.seconds - a.createdAt.seconds
        : a.createdAt.seconds - b.createdAt.seconds
    );

  const handleTicketPress = (id: string) => {
    router.push({
      pathname: '/tickets/[id]',
      params: { id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Tickets' }} />
      <Header title="Tickets Nouveaux" showBack />

      {/* Barre de recherche + filtre */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher un ticket..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={'#9ca3af'}
        />
        <Pressable onPress={() => setFilterVisible(true)} style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#2563eb" />
        </Pressable>
      </View>

      {filteredTickets.length > 0 ? (
        <FlatList
          style={styles.container}
          data={filteredTickets}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleTicketPress(item.id)}>
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
      ) : (
        <Text style={styles.emptyText}>Aucun ticket nouveau pour le moment.</Text>
      )}

      <Modal visible={filterVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setFilterVisible(false)} />
        <View style={styles.modalFilterBox}>
          <Text style={styles.filterTitle}>Filtres</Text>

          <CustomPickerWithBadge
            label="Priorité"
            value={priority}
            onChange={setPriority}
            options={[
              { label: 'Toutes', value: '' },
              { label: 'Basse', value: 'low' },
              { label: 'Moyenne', value: 'medium' },
              { label: 'Haute', value: 'high' },
              { label: 'Critique', value: 'critical' },
            ]}
            badgeColors={{
              low: '#60a5fa',
              medium: '#facc15',
              high: '#f97316',
              critical: '#ef4444',
            }}
            showBadge
          />

          <CustomPickerWithBadge
            label="Trier par date"
            value={sortDate}
            onChange={setSortDate}
            options={[
              { label: 'Plus récents', value: 'desc' },
              { label: 'Plus anciens', value: 'asc' },
            ]}
          />

          <Pressable style={styles.closeButton} onPress={() => setFilterVisible(false)}>
            <Text style={styles.closeText}>Fermer</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    color: '#1e293b',
  },
  filterButton: {
    padding: 6,
  },
  container: {
    paddingTop: 16,
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
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 32,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalFilterBox: {
    position: 'absolute',
    top: '20%',
    left: '8%',
    right: '8%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 10,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  closeText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});