import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

export async function POST(request) {
  try {
    const { messages, provider } = await request.json();

    const modelMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join(""),
    }));

    const model =
      provider === "groq"
        ? groq("llama-3.3-70b-versatile")
        : google("gemini-2.5-flash");

    const result = streamText({
      model,
      system:
        "You are a friendly, concise AI assistant. Keep answers clear and not overly long unless the user asks for detail.",
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
