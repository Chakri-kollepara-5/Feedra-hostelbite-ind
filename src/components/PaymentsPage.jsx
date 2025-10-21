import { useEffect, useState } from 'react';
import { subscribeToPayments, createPayment } from '../services/payments';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const unsub = subscribeToPayments(
      (data) => setPayments(data),
      (err) => console.error(err)
    );
    return () => unsub();
  }, []);

  const handleAddPayment = async () => {
    await createPayment({
      userId: 'MWPFdqzzhP6eBsWkQjQ7',
      amount: 500,
      status: 'pending',
    });
  };

  return (
    <div>
      <h2>Payments</h2>
      <button onClick={handleAddPayment}>Add Payment</button>
      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            ₹{p.amount} — {p.status} — {p.createdAt.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
