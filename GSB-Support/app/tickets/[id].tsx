import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { useTickets } from '@/hooks/useTickets';
import { updateTicketStatus, updateTicketPriority } from '@/hooks/useTicketDetails';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { CustomPickerWithBadge } from '@/components/ui/CustomPicker';
import Header from '@/components/layout/Header';
import { Ticket } from '@/types/ticket';
import { TicketComments } from '@/components/tickets/TicketComments';
import { TicketCommentForm } from '@/components/tickets/TicketCommentForm';

export default function TicketDetail() {
  const { id } = useLocalSearchParams();
  const { tickets, refetchTickets } = useTickets();

  const validId = typeof id === 'string' ? id : id?.[0] ?? '';
  const ticket: Ticket | undefined = tickets.find((t) => t.id === validId);

  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<Ticket['status']>('new');
  const [priority, setPriority] = useState<Ticket['priority']>('low');

  const {
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: 'new',
      priority: 'low',
    },
  });

  // 🧠 Synchronise les données quand le ticket arrive
  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);

      reset({
        status: ticket.status,
        priority: ticket.priority,
      });
    }
  }, [ticket, reset]);

  const handleStatusChange = async (newStatus: Ticket['status']) => {
    if (!ticket) return;
    try {
      setUpdating(true);
      await updateTicketStatus(ticket.id, newStatus);
      setStatus(newStatus);
      await refetchTickets?.();
    } catch {
      Alert.alert('Erreur', 'Impossible de mettre à jour le statut');
    } finally {
      setUpdating(false);
    }
  };

  const handlePriorityChange = async (newPriority: Ticket['priority']) => {
    if (!ticket) return;
    try {
      setUpdating(true);
      await updateTicketPriority(ticket.id, newPriority);
      setPriority(newPriority);
      await refetchTickets?.();
    } catch {
      Alert.alert('Erreur', 'Impossible de mettre à jour la priorité');
    } finally {
      setUpdating(false);
    }
  };

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Header title="Détail du ticket" showBack />
        <View style={styles.center}>
          <Text style={styles.title}>Ticket introuvable</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Détail du ticket" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={styles.title}>{ticket.title}</Text>

        <View style={styles.card}>
          {/* Description */}
          <View style={styles.row}>
            <Ionicons name="document-text-outline" size={18} color="#64748b" />
            <Text style={styles.label}> Description :</Text>
          </View>
          <Text style={styles.description}>{ticket.description}</Text>

          {/* Statut */}
          <View style={styles.row}>
            <Ionicons name="list-outline" size={18} color="#64748b" />
            <Text style={styles.label}> Statut actuel :</Text>
          </View>
          <StatusBadge status={status} />

          <Controller
            control={control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <CustomPickerWithBadge
                label="Changer le statut"
                value={value}
                onChange={(val) => {
                  onChange(val as Ticket['status']);
                  handleStatusChange(val as Ticket['status']);
                }}
                options={[
                  { label: 'Nouveau', value: 'new' },
                  { label: 'Assigné', value: 'assigned' },
                  { label: 'En cours', value: 'in-progress' },
                  { label: 'Résolu', value: 'resolved' },
                  { label: 'Clôturé', value: 'closed' },
                ]}
                showBadge
                badgeColors={{
                  new: '#3b82f6',
                  assigned: '#eab308',
                  'in-progress': '#8b5cf6',
                  resolved: '#10b981',
                  closed: '#64748b',
                }}
                error={errors.status?.message}
              />
            )}
          />

          {/* Priorité */}
          <View style={styles.row}>
            <Ionicons name="alert-circle-outline" size={18} color="#64748b" />
            <Text style={styles.label}> Priorité :</Text>
          </View>
          <Text style={styles.value}>{priority}</Text>

          <Controller
            control={control}
            name="priority"
            render={({ field: { value, onChange } }) => (
              <CustomPickerWithBadge
                label="Changer la priorité"
                value={value}
                onChange={(val) => {
                  onChange(val as Ticket['priority']);
                  handlePriorityChange(val as Ticket['priority']);
                }}
                options={[
                  { label: 'Faible', value: 'low' },
                  { label: 'Moyenne', value: 'medium' },
                  { label: 'Haute', value: 'high' },
                  { label: 'Critique', value: 'critical' },
                ]}
                showBadge
                badgeColors={{
                  low: '#10b981',
                  medium: '#facc15',
                  high: '#f97316',
                  critical: '#ef4444',
                }}
                error={errors.priority?.message}
              />
            )}
          />

          {/* Catégorie */}
          <View style={styles.row}>
            <Ionicons name="pricetags-outline" size={18} color="#64748b" />
            <Text style={styles.label}> Catégorie :</Text>
          </View>
          <Text style={styles.value}>{ticket.category}</Text>

          {/* Date limite */}
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={18} color="#64748b" />
            <Text style={styles.label}> Date limite :</Text>
          </View>
          <Text style={styles.value}>
            {ticket.dueDate
              ? new Date(ticket.dueDate.seconds * 1000).toLocaleDateString()
              : 'Aucune'}
          </Text>

          {/* Lieu */}
          {ticket.location && (
            <>
              <View style={styles.row}>
                <Ionicons name="location-outline" size={18} color="#64748b" />
                <Text style={styles.label}> Lieu :</Text>
              </View>
              <Text style={styles.value}>{ticket.location}</Text>
            </>
          )}

          {/* Appareil */}
          {ticket.deviceInfo?.model && (
            <>
              <View style={styles.row}>
                <Ionicons name="hardware-chip-outline" size={18} color="#64748b" />
                <Text style={styles.label}> Appareil :</Text>
              </View>
              <Text style={styles.value}>
                {ticket.deviceInfo.model} ({ticket.deviceInfo.os})
              </Text>
            </>
          )}

          <TicketComments ticketId={ticket.id} />
          <TicketCommentForm ticketId={ticket.id} />
        </View>

        {updating && <ActivityIndicator style={{ marginTop: 24 }} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 16 },
  description: { fontSize: 16, color: '#334155', marginBottom: 20 },
  label: { fontSize: 14, color: '#64748b', marginLeft: 6 },
  value: { fontSize: 15, color: '#1e293b', marginBottom: 16, marginLeft: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
});
