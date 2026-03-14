'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

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
    setIsAdding(true);
    try {
      const data = await api.addMoney(parseFloat(amount));
      setBalance(data.balance);
      setAmount('');
    } catch (error) {
      console.error('Error adding money:', error);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent animate-fade-in mb-2">
            My Wallet
          </h1>
          <p className="text-gray-600">Manage your funds with ease</p>
        </div>

        {/* Balance Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl mb-8 border border-white/20 transform hover:scale-105 transition-all duration-300 animate-fade-in">
          <div className="text-center">
            <div className="text-6xl mb-4">💰</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Balance</h2>
            <p className="text-5xl font-bold text-emerald-600 mb-2">${balance?.toFixed(2)}</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((balance / 1000) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">Progress to $1000 goal</p>
          </div>
        </div>

        {/* Add Money Form */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 animate-slide-down">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Funds</h2>
          <form onSubmit={handleAddMoney} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Add ($)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm text-lg text-gray-800"
                required
                min="0"
                step="0.01"
              />
            </div>
            <button
              type="submit"
              disabled={isAdding}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                '+ Add Money'
              )}
            </button>
          </form>

          {/* Quick Add Buttons */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3 text-center">Quick Add</p>
            <div className="grid grid-cols-3 gap-3">
              {[10, 50, 100].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                >
                  +${quickAmount}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction History Placeholder */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">+</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Funds Added</p>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>
              <p className="font-semibold text-green-600">+${amount || '0.00'}</p>
            </div>
            {/* Add more transaction items here */}
          </div>
        </div>
      </div>
    </div>
  );
}