import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  SafeAreaView,
  Dimensions,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import { useRef, useState } from 'react';
import { TicketForm } from '@/components/tickets/TicketForm';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTickets } from '@/hooks/useTickets';
import { CustomCard } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Easing } from 'react-native';
import { DashboardStats } from '@/components/ui/DashboardStats';


const screenHeight = Dimensions.get('window').height;

export default function DashboardScreen() {
  const { user } = useAuth();
  const { tickets = [] } = useTickets();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
const [confirmationVisible, setConfirmationVisible] = useState(false);
const fadeAnim = useRef(new Animated.Value(1)).current;

  const newTickets = tickets.filter((t) => t.status === 'new');
  const inProgressTickets = tickets.filter((t) => t.status === 'in-progress');
  const resolvedTickets = tickets.filter((t) => t.status === 'resolved');
  const closedTickets = tickets.filter((t) => t.status === 'closed');


  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ title: 'Dashboard' }} />
        <Header useLogo />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>
            Bienvenue, {user?.fullName || 'Utilisateur'}
          </Text>

          <Text style={styles.subtitle}>
            Voici un aperçu de vos tickets.
          </Text>

         <View style={styles.cardGrid}>
            <View style={styles.cardRow}>
              <Pressable onPress={() => router.push({ pathname: '/tickets/tickets', params: { status: 'new' } })}>
                <CustomCard icon="mail-unread-outline" color="#2563eb" title="Nouveaux" value={newTickets.length} />
              </Pressable>

              <Pressable onPress={() => router.push({ pathname: '/tickets/tickets', params: { status: 'in-progress' } })}>
                <CustomCard icon="time-outline" color="#f59e0b" title="En cours" value={inProgressTickets.length} />
              </Pressable>
            </View>

            <View style={styles.cardRow}>
              <Pressable onPress={() => router.push({ pathname: '/tickets/tickets', params: { status: 'resolved' } })}>
                <CustomCard icon="checkmark-done-outline" color="#10b981" title="Résolus" value={resolvedTickets.length} />
              </Pressable>

              <Pressable onPress={() => router.push({ pathname: '/tickets/tickets', params: { status: 'closed' } })}>
                <CustomCard icon="lock-closed-outline" color="#64748b" title="Clôturés" value={closedTickets.length} />
              </Pressable>
            </View>
          </View>
        <DashboardStats total={tickets.length} resolved={resolvedTickets.length} />
          <View style={{ width: '100%', marginTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1e293b' }}>
              Activité récente
            </Text>

  {tickets.slice(0, 3).map((ticket) => (
    <Pressable
      key={ticket.id}
      onPress={() => router.push(`/tickets/${ticket.id}`)}
      style={{
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        marginBottom: 8,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#2563eb' }}>
        {ticket.title}
      </Text>
      <Text style={{ fontSize: 14, color: '#475569' }}>
        Priorité: {ticket.priority} · Statut: {ticket.status}
      </Text>
    </Pressable>
  ))}
</View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Action Button */}
      <Pressable
        style={styles.fab}
        onPress={() => {
          if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ['Annuler', 'Ajouter un ticket'],
                cancelButtonIndex: 0,
              },
              (buttonIndex) => {
                if (buttonIndex === 1) setModalVisible(true);
              }
            );
          } else {
            setModalVisible(true);
          }
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>

      {/* Modal for TicketForm */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
       
          <Pressable
            style={styles.backdrop}
            onPress={() => setModalVisible(false)}
          />
           <View style={styles.modalWrapper}>
          <View style={styles.bottomSheet}>
            <View style={styles.modalHandle} />
            <ScrollView
              contentContainerStyle={styles.modalContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.modalTitle}>Créer un nouveau ticket</Text>
                {formVisible && !confirmationVisible && (
                <TicketForm
                  onClose={() => setModalVisible(false)}
                  hideForm={() => setFormVisible(false)}
                  onSuccessConfirm={() => {
                    setConfirmationVisible(true);
                    setTimeout(() => {
                      setConfirmationVisible(false);
                      setFormVisible(true);
                      setModalVisible(false);
                    }, 1800);
                  }}
                />
              )}

              {confirmationVisible && (
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <Ionicons name="checkmark-circle-outline" size={60} color="#10b981" />
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#10b981', marginTop: 12 }}>
                    Ticket ajouté !
                  </Text>
                </View>
              )}
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>Fermer</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  scrollContainer: {
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
  cardGrid: {
  width: '100%',
  gap: 16,
  alignItems: 'center',
},
cardRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 16,
},


  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  info: {
    fontSize: 14,
    color: '#64748b',
  },
  fab: {
    position: 'absolute',
    bottom: 30, 
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#171639',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
  bottomSheet: {
    width: '100%',
    height: screenHeight * 0.65,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    elevation: 10,
  },
  modalContent: {
    paddingBottom: 32,
    paddingTop: 16,
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
