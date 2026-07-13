# AI Chatbot

A full-stack AI chatbot built with Next.js, the Vercel AI SDK, and support for multiple LLM providers (Google Gemini, Groq/Llama).

## Features
- Real-time streaming responses
- Multi-turn conversation memory
- Switchable AI providers (Gemini / Groq) via dropdown
- Built with Next.js App Router, Tailwind CSS, and the Vercel AI SDK

## Tech Stack
- Next.js 16 (App Router)
- Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`, `@ai-sdk/groq`)
- Tailwind CSS v4

## Running locally
1. Clone the repo
2. `npm install`
3. Add `.env.local` with `GOOGLE_GENERATIVE_AI_API_KEY` and `GROQ_API_KEY`
4. `npm run dev`

## What I learned building this
Built the raw streaming/API logic manually first (fetch calls, SSE parsing, conversation history management, function calling from scratch) before adopting the Vercel AI SDK — so I understand what the abstraction is doing internally, not just how to call it.