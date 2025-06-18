import { View, Text, StyleSheet } from 'react-native';

type TicketStatus = 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed';

interface Props {
  status: TicketStatus;
}

export const StatusBadge = ({ status }: Props) => {
  const { label, color } = getStatusStyle(status);

  return (
    <View style={[styles.badge, { backgroundColor: color.background }]}>
      <Text style={[styles.text, { color: color.text }]}>{label}</Text>
    </View>
  );
};

const getStatusStyle = (status: TicketStatus) => {
  switch (status) {
    case 'new':
      return { label: 'Nouveau', color: { background: '#e0f2fe', text: '#0284c7' } };
    case 'assigned':
      return { label: 'Assigné', color: { background: '#fef9c3', text: '#b45309' } };
    case 'in-progress':
      return { label: 'En cours', color: { background: '#ede9fe', text: '#7c3aed' } };
    case 'resolved':
      return { label: 'Résolu', color: { background: '#dcfce7', text: '#16a34a' } };
    case 'closed':
      return { label: 'Clôturé', color: { background: '#f1f5f9', text: '#64748b' } };
    default:
      return { label: 'Inconnu', color: { background: '#e2e8f0', text: '#334155' } };
  }
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
