export interface Expense {
  _id?: string;
  item: string;
  date: string;
  time: string;
  cost: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  balance: number;
  budgets: Budget[];
}

export interface Budget {
  _id?: string;
  startDate: string;
  endDate: string;
  amount: number;
}

export interface AIResponse {
  response: string;
  intermediateSteps?: any[];
}