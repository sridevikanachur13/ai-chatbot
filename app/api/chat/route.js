import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

export async function POST(request) {
  const { messages, provider } = await request.json();

  // Convert your frontend's {role, text} shape into the AI SDK's expected {role, content} shape
  const formattedMessages = messages.map((msg) => ({
    role: msg.role === "ai" ? "assistant" : "user",
    content: msg.text,
  }));

  // THIS is the "swap providers" moment - same function, different model
  const model =
    provider === "groq"
      ? groq("llama-3.3-70b-versatile")
      : google("gemini-2.5-flash");

  const result = streamText({
    model,
    messages: formattedMessages,
  });

  return result.toTextStreamResponse();
}
