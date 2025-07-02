"use client";
import { useState, useRef, useEffect, KeyboardEvent, FormEvent } from "react";

// Message type for chat
interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm P.Y's portfolio assistant—ask me anything about him or his work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message handler
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "🚦 Too many requests or quota exceeded. Please wait or check your OpenAI plan.",
          },
        ]);
      } else {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content || "No response." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "😕 Oops, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter to send, Shift+Enter for newline
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Optional: handle form submit for accessibility
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-auto max-h-[80%] w-[80%] flex-col overflow-hidden rounded-xl bg-zinc-900 shadow-lg shadow-sky-300/30"
    >
      {/* Message List */}
      <div className="flex flex-1 flex-col space-y-2 overflow-y-auto p-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`h-auto max-w-[80%] break-words rounded-xl px-3 py-2 text-black shadow-lg ${
              m.role === "user"
                ? "self-end bg-sky-100 text-right"
                : "self-start bg-gray-100 text-left"
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input Box */}
      <div className="flex items-center border-t p-2">
        <textarea
          className="flex-1 resize-none rounded-xl bg-zinc-100 px-2 py-1 text-black focus:outline-none"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={loading ? "Waiting for response..." : "Type a message…"}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="ml-2 rounded-xl bg-sky-600 px-4 py-1 text-white transition-all hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </form>
  );
}
