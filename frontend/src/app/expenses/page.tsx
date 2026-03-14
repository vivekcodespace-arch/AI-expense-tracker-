'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Expense } from '@/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    date: '',
    time: '',
    cost: '',
    description: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await api.getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.addExpense({
        ...formData,
        cost: parseFloat(formData.cost)
      });
      setFormData({ item: '', date: '', time: '', cost: '', description: '' });
      setShowForm(false);
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add Expense'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Item"
              value={formData.item}
              onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Cost"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              className="p-2 border rounded"
              required
            />
          </div>
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded mt-4"
            rows={3}
          />
          <button type="submit" className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Add Expense
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {expenses.map((expense) => (
          <div key={expense._id} className="bg-white p-4 rounded-lg shadow-md border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{expense.item}</h3>
                <p className="text-gray-600">{expense.date} at {expense.time}</p>
                <p className="text-gray-500">{expense.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-600">${expense.cost}</p>
                <button
                  onClick={() => handleDelete(expense._id!)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}