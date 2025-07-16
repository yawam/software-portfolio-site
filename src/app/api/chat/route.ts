import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    // Read the system prompt from prompt.md
    const promptPath = path.join(
      process.cwd(),
      "src",
      "app",
      "api",
      "chat",
      "prompt.md",
    );
    const systemPrompt = await fs.readFile(promptPath, "utf-8");
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt.trim(),
        },
        ...messages,
      ],
    });
    return NextResponse.json({ content: chat.choices[0].message.content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { content: "😕 Oops, something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
