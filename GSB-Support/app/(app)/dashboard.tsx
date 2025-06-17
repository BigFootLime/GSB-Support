import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { CustomButton } from '@/components/ui/Button';
import { TicketForm } from '@/components/tickets/TicketForm';
import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTickets } from '@/hooks/useTickets';
import { CustomCard } from '@/components/ui/Card';
import Header from '@/components/layout/Header';

const screenHeight = Dimensions.get('window').height;
export default function DashboardScreen() {
  const { user } = useAuth();
  const { tickets = [] } = useTickets();
  const [modalVisible, setModalVisible] = useState(false);
  

  const newTickets = tickets.filter((t) => t.status === 'new');
  const inProgressTickets = tickets.filter((t) => t.status === 'in-progress');
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved');

  return (
     <ScrollView contentContainerStyle={styles.container}>
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bienvenue, {user?.fullName || 'Utilisateur'} 👋</Text>

      <CustomButton
  title="Ajouter un ticket"
  icon="add-circle-outline" // Exemple avec Ionicons
  onPress={() => setModalVisible(true)}
/>
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

    <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  statusBarTranslucent
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalWrapper}>
    <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)} />

    <View style={styles.bottomSheet}>
      <View style={styles.modalHandle} />

      <ScrollView
        contentContainerStyle={styles.modalContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.modalTitle}>Créer un nouveau ticket</Text>

        <TicketForm onClose={() => setModalVisible(false)} />

        <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>Fermer</Text>
        </Pressable>
      </ScrollView>
    </View>
  </View>
</Modal>
  </ScrollView>
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
  modalWrapper: {
  flex: 1,
  justifyContent: 'flex-end',
},

backdrop: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.4)',
},

modalHandle: {
  width: 40,
  height: 5,
  backgroundColor: '#cbd5e1',
  borderRadius: 3,
  alignSelf: 'center',
  marginTop: 6,
  marginBottom: 10,
},

modalContent: {
  paddingBottom: 32,
},
  bottomSheet: {
    width: '100%',
    height: screenHeight * 0.65,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    elevation: 10,
  },
 
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  closeBtn: {
    marginTop: 8,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeBtnText: {
    color: '#AB82FD',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
