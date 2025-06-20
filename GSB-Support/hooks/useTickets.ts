import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Ticket } from '@/types/ticket';
import { useAuth } from './useAuth';

export function useTickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) return; 

    const q = query(
      collection(db, 'tickets'),
      where('createdBy', '==', user.uid), 
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: Ticket[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Ticket[];
        setTickets(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError('Erreur lors du chargement des tickets');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]); 

  return { tickets, loading, error };
}
