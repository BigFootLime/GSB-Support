// components/tickets/TicketCommentForm.tsx
import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';

export const TicketCommentForm = ({ ticketId }: { ticketId: string }) => {
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await addDoc(collection(db, 'comments'), {
      ticketId,
      userId: user?.uid,
      content,
      createdAt: serverTimestamp(),
    });

    setContent('');
  };

  return (
    <View style={{ marginTop: 16 }}>
      <TextInput
      placeholderTextColor={'#9ca3af'}
        placeholder="Ajouter un commentaire"
        value={content}
        onChangeText={setContent}
        style={{
          borderColor: '#cbd5e1',
          borderWidth: 1,
          borderRadius: 6,
          padding: 10,
          marginBottom: 8,
        }}
      />
      <Button title="Envoyer" onPress={handleSubmit} />
    </View>
  );
};
