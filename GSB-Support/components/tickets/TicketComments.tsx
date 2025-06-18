// components/tickets/TicketComments.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';

interface Props {
  ticketId: string;
}

export const TicketComments = ({ ticketId }: Props) => {
  const { comments, loading } = useComments(ticketId);
  const { user } = useAuth();

  if (loading) return <Text>Chargement des commentaires...</Text>;

  return (
    <View style={styles.container}>
      {comments.map((comment) => (
        <View
          key={comment.id}
          style={[
            styles.comment,
            comment.userId === user?.uid ? styles.ownComment : styles.otherComment,
          ]}
        >
          <Text style={styles.text}>{comment.content}</Text>
         <Text style={styles.timestamp}>
  {comment.createdAt
    ? format(comment.createdAt.toDate(), 'dd/MM/yyyy HH:mm')
    : ''}
</Text>

        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 10,
  },
  comment: {
    padding: 10,
    borderRadius: 6,
  },
  ownComment: {
    backgroundColor: '#dbeafe', 
    alignSelf: 'flex-end',
  },
  otherComment: {
    backgroundColor: '#f3f4f6', 
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    

  },
});
