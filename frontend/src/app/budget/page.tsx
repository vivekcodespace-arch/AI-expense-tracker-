'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function BudgetPage() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    amount: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.setBudget({
        startDate: formData.startDate,
        endDate: formData.endDate,
        amount: parseFloat(formData.amount)
      });
      setMessage('Budget set successfully!');
      setFormData({ startDate: '', endDate: '', amount: '' });
    } catch (error) {
      console.error('Error setting budget:', error);
      setMessage('Error setting budget');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Set Budget</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Budget Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-2 border rounded"
            required
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded">
          Set Budget
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}