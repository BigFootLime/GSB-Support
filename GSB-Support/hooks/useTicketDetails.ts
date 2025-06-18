import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function updateTicketStatus(ticketId: string, newStatus: string) {
  const ticketRef = doc(db, 'tickets', ticketId);
  await updateDoc(ticketRef, {
    status: newStatus,
    updatedAt: new Date(),
  });
}
