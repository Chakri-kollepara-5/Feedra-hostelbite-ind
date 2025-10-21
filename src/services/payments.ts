import { 
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc,
  query, where, orderBy, limit, onSnapshot, serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Replace this with your own type interface
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: string;
  createdAt: Date;
}

export const createPayment = async (paymentData: Omit<Payment, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const payment = {
      ...paymentData,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'payments'), payment);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating payment:', error);
    throw new Error('Failed to create payment');
  }
};

export const getPayments = async (userId?: string): Promise<Payment[]> => {
  try {
    let q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
    if (userId) {
      q = query(q, where('userId', '==', userId));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      } as Payment;
    });
  } catch (error) {
    console.error('❌ Error fetching payments:', error);
    return [];
  }
};

export const updatePaymentStatus = async (paymentId: string, status: string) => {
  try {
    const paymentRef = doc(db, 'payments', paymentId);
    await updateDoc(paymentRef, { status, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error('❌ Error updating payment status:', error);
  }
};

export const deletePayment = async (paymentId: string) => {
  try {
    await deleteDoc(doc(db, 'payments', paymentId));
  } catch (error) {
    console.error('❌ Error deleting payment:', error);
  }
};

export const getPayment = async (paymentId: string): Promise<Payment | null> => {
  try {
    const docRef = doc(db, 'payments', paymentId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        id: snap.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      } as Payment;
    }
    return null;
  } catch (error) {
    console.error('❌ Error fetching payment:', error);
    return null;
  }
};

export const subscribeToPayments = (
  callback: (payments: Payment[]) => void,
  errorCallback: (error: string) => void
) => {
  try {
    const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const payments = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        } as Payment;
      });
      callback(payments);
    }, (error) => {
      console.error('❌ Real-time error:', error);
      errorCallback('Failed to subscribe to payments');
    });
  } catch (error) {
    console.error('❌ Subscription setup failed:', error);
    errorCallback('Failed to subscribe to payments');
    return () => {};
  }
};
