import Expense from '../models/Expense.js';
import User from '../models/User.js';
import { tool } from "@langchain/core/tools";
import { z } from "zod";

// Tool to get all expenses
export const getExpensesTool = tool(
  async () => {
    try {
      const expenses = await Expense.find();
      return JSON.stringify(expenses);
    } catch (error) {
      return `Error fetching expenses: ${error.message}`;
    }
  },
  {
    name: "get_expenses",
    description: "Retrieves all expenses from the database",
    schema: z.object({})
  }
);

// Tool to add a new expense
export const addExpenseTool = tool(
  async ({ item, date, time, cost, description = "" }) => {
    try {
      const expense = new Expense({ item, date, time, cost, description });
      await expense.save();
      return `Expense added successfully: ${JSON.stringify(expense)}`;
    } catch (error) {
      return `Error adding expense: ${error.message}`;
    }
  },
  {
    name: "add_expense",
    description: "Adds a new expense to the database",
    schema: z.object({
      item: z.string().describe("Name of the expense item"),
      date: z.string().describe("Date of the expense (YYYY-MM-DD)"),
      time: z.string().describe("Time of the expense (HH:MM)"),
      cost: z.number().describe("Cost of the expense"),
      description: z.string().optional().describe("Optional description")
    })
  }
);

// Tool to get wallet balance
export const getWalletBalanceTool = tool(
  async () => {
    try {
      let user = await User.findOne();
      if (!user) {
        user = new User();
        await user.save();
      }
      return `Current wallet balance: ${user.balance}`;
    } catch (error) {
      return `Error fetching wallet balance: ${error.message}`;
    }
  },
  {
    name: "get_wallet_balance",
    description: "Retrieves the current wallet balance",
    schema: z.object({})
  }
);

// Tool to add money to wallet
export const addMoneyToWalletTool = tool(
  async ({ amount }) => {
    try {
      let user = await User.findOne();
      if (!user) {
        user = new User();
      }
      user.balance += amount;
      await user.save();
      return `Money added successfully. New balance: ${user.balance}`;
    } catch (error) {
      return `Error adding money: ${error.message}`;
    }
  },
  {
    name: "add_money_to_wallet",
    description: "Adds money to the wallet balance",
    schema: z.object({
      amount: z.number().describe("Amount of money to add to the wallet")
    })
  }
);

// Tool to calculate total expenses
export const calculateTotalExpensesTool = tool(
  async () => {
    try {
      const expenses = await Expense.find();
      const total = expenses.reduce((sum, expense) => sum + expense.cost, 0);
      return `Total expenses: ${total}`;
    } catch (error) {
      return `Error calculating total: ${error.message}`;
    }
  },
  {
    name: "calculate_total_expenses",
    description: "Calculates the total cost of all expenses",
    schema: z.object({})
  }
);

// Tool to get expenses by date range
export const getExpensesByDateRangeTool = tool(
  async ({ startDate, endDate }) => {
    try {
      const expenses = await Expense.find({
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      });
      return JSON.stringify(expenses);
    } catch (error) {
      return `Error fetching expenses by date: ${error.message}`;
    }
  },
  {
    name: "get_expenses_by_date_range",
    description: "Retrieves expenses within a specific date range",
    schema: z.object({
      startDate: z.string().describe("Start date (YYYY-MM-DD)"),
      endDate: z.string().describe("End date (YYYY-MM-DD)")
    })
  }
);