const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
  // Expenses
  getExpenses: async (): Promise<any[]> => {
    const res = await fetch(`${API_BASE_URL}/expenses`);
    return res.json();
  },

  addExpense: async (expense: Omit<any, '_id'>): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    return res.json();
  },

  updateExpense: async (id: string, expense: Partial<any>): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    return res.json();
  },

  deleteExpense: async (id: string): Promise<any> => {
    const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Wallet
  getWallet: async (): Promise<{ balance: number }> => {
    const res = await fetch(`${API_BASE_URL}/wallet`);
    return res.json();
  },

  addMoney: async (amount: number): Promise<{ balance: number }> => {
    const res = await fetch(`${API_BASE_URL}/wallet/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    return res.json();
  },

  // Budget
  setBudget: async (budget: { startDate: string; endDate: string; amount: number }): Promise<any[]> => {
    const res = await fetch(`${API_BASE_URL}/budget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget),
    });
    return res.json();
  },

  // AI
  chatWithAI: async (message: string): Promise<{ response: string; intermediateSteps?: any[] }> => {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    return res.json();
  },
};