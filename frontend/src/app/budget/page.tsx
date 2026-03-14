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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.setBudget({
        startDate: formData.startDate,
        endDate: formData.endDate,
        amount: parseFloat(formData.amount)
      });
      setMessage('Budget set successfully!');
      setFormData({ startDate: '', endDate: '', amount: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error setting budget:', error);
      setMessage('Error setting budget. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in mb-2">
            Budget Planner
          </h1>
          <p className="text-gray-600">Set your spending goals and stay on track</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 animate-fade-in">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-semibold text-gray-800">Create New Budget</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Budget Amount ($)</label>
              <input
                type="number"
                placeholder="Enter your budget amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-lg"
                required
                min="0"
                step="0.01"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Setting Budget...
                </div>
              ) : (
                'Set Budget Goal'
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-green-100 text-green-700 border border-green-200'
            } animate-slide-down`}>
              {message}
            </div>
          )}
        </div>

        {/* Budget Tips */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">💡 Budget Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">50/30/20 Rule</h4>
              <p className="text-sm text-purple-600">50% needs, 30% wants, 20% savings</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-2">Track Daily</h4>
              <p className="text-sm text-pink-600">Monitor expenses daily to stay on track</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">Emergency Fund</h4>
              <p className="text-sm text-indigo-600">Save 3-6 months of expenses</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Review Monthly</h4>
              <p className="text-sm text-green-600">Adjust budget based on actual spending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}