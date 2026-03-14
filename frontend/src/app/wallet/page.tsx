'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await api.getWallet();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.addMoney(parseFloat(amount));
      setBalance(data.balance);
      setAmount('');
    } catch (error) {
      console.error('Error adding money:', error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Wallet</h1>

      <div className="bg-white p-6 rounded-lg shadow-md border mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Balance</h2>
        <p className="text-3xl font-bold text-green-600">${balance?.toFixed(2)}</p>
      </div>

      <form onSubmit={handleAddMoney} className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add Money</h2>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
          min="0"
          step="0.01"
        />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
          Add Money
        </button>
      </form>
    </div>
  );
}