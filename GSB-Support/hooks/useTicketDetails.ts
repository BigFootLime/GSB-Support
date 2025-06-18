import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function updateTicketStatus(ticketId: string, newStatus: string) {
  const ticketRef = doc(db, 'tickets', ticketId);

  try {
    await updateDoc(ticketRef, {
      status: newStatus,
      updatedAt: new Date(),
    });
    console.log(`Statut mis à jour pour le ticket ${ticketId} : ${newStatus}`);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut :`, error);
    throw error;
  }
}


export async function updateTicketPriority(ticketId: string, newPriority: string) {
  const ticketRef = doc(db, 'tickets', ticketId);

  try {
    await updateDoc(ticketRef, {
      priority: newPriority,
      updatedAt: new Date(),
    });
    console.log(`Priorité mise à jour pour le ticket ${ticketId} : ${newPriority}`);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la priorité :`, error);
    throw error;
  }
}
