import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
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

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.0-flash-lite",
  temperature: 0,
  callbacks: [new ConsoleCallbackHandler()]  // logs LLM calls
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