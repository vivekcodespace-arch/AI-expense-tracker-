'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function AIPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; ai: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const response = await api.chatWithAI(message);
      setChatHistory([...chatHistory, { user: message, ai: response.response }]);
      setMessage('');
    } catch (error) {
      console.error('Error chatting with AI:', error);
      setChatHistory([...chatHistory, { user: message, ai: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">AI Assistant</h1>

      <div className="bg-white rounded-lg shadow-md border h-96 overflow-y-auto p-4 mb-4">
        {chatHistory.length === 0 ? (
          <p className="text-gray-500 text-center">Ask me anything about your expenses!</p>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-end mb-2">
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                  {chat.user}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
                  {chat.ai}
                </div>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your expenses..."
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}