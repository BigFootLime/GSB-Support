import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    console.log('[AUTH] onAuthStateChanged', firebaseUser);

    if (firebaseUser) {
      try {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser({ ...firebaseUser, ...userData });
        } else {
          setUser(firebaseUser);
        }
      } catch (e) {
        console.error('Erreur lors du chargement du user :', e);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  return unsubscribe;
}, []);


  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return { user, loading, logout };
};
