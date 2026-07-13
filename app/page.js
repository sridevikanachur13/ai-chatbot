"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { DefaultChatTransport } from "ai";

export default function Home() {
  const [provider, setProvider] = useState("gemini");
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  function onSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input }, { body: { provider } });
    setInput("");
  }

  return (
    <main className="max-w-2xl mx-auto p-6 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-4">My AI Chatbot</h1>

      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        className="mb-2 border rounded px-2 py-1 w-fit"
      >
        <option value="gemini">Gemini</option>
        <option value="groq">Groq (Llama)</option>
      </select>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center mt-10">
            Ask me anything to get started!
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.parts?.map((part, i) =>
              part.type === "text" ? <span key={i}>{part.text}</span> : null,
            )}
          </div>
        ))}
        {status === "streaming" && (
          <div className="text-gray-400">Thinking...</div>
        )}
        {error && <div className="text-red-500">Error: {error.message}</div>}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </main>
  );
}
