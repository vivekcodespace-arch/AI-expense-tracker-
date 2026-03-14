import { agentExecutor } from "../agent.js";
import { ConsoleCallbackHandler } from "@langchain/core/tracers/console";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const result = await agentExecutor.invoke(
      {
        messages: [{ role: "user", content: message }]
      },
      {
        callbacks: [new ConsoleCallbackHandler()]  // logs agent steps + tool calls
      }
    );

    const reply = result.messages.at(-1).content;
    res.json({ reply });
  } catch (error) {
    if (error.status === 429) {
      const retryAfter = error.errorDetails
        ?.find(d => d["@type"]?.includes("RetryInfo"))
        ?.retryDelay?.replace("s", "") ?? 60;
      return res.status(429).json({
        error: "AI is busy, please try again shortly.",
        retryAfterSeconds: parseInt(retryAfter)
      });
    }
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: error.message });
  }
};