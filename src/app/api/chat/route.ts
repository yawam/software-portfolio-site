// app/api/chat/route.ts
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Papa Yaw’s portfolio assistant.  
- Navigate intents → return JSON {"navigate":"/path"}.  
- Personal Q&A → answer from about/experience snippets.
          `.trim(),
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
