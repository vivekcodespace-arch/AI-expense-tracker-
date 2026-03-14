import { createAgent } from "langchain";
import { ChatGroq } from "@langchain/groq";
import { ConsoleCallbackHandler } from "@langchain/core/tracers/console";
import {
  getExpensesTool,
  addExpenseTool,
  getWalletBalanceTool,
  addMoneyToWalletTool,
  calculateTotalExpensesTool,
  getExpensesByDateRangeTool
} from "./tools/expenseTools.js";

import dotenv from "dotenv";
dotenv.config();


const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",  // correct Groq model
  temperature: 0
});

export const agentExecutor = createAgent({
  model: llm,
  tools: [
    getExpensesTool,
    addExpenseTool,
    getWalletBalanceTool,
    addMoneyToWalletTool,
    calculateTotalExpensesTool,
    getExpensesByDateRangeTool
  ],
  systemPrompt: "You are an AI financial assistant that helps track expenses."
});