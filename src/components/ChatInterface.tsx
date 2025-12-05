"use client";
import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  FormEvent,
  Fragment,
} from "react";
import ReactMarkdown from "react-markdown";

// Lightweight chat widget that streams prompts to the /api/chat endpoint
// Message type for chat
interface Message {
  role: "user" | "assistant";
  content: string;
}
interface ChatInterfaceProps {
  username: string;
}

export default function ChatInterface({ username }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm PY's portfolio assistant (he hasn't given me a real name yet, maybe you can help!). You can ask me about his work, skills, or how he could be a fit for your team or next project.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
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
    if (!hasStarted) setHasStarted(true);
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
    <Fragment>
      <h1
        className={`ease-[cubic-bezier(0.77,0,0.175,1)] mb-4 text-center text-2xl text-white transition-all duration-700 ${hasStarted ? "pointer-events-none -translate-y-8 opacity-0" : "translate-y-0 opacity-100"}`}
        style={{
          height: hasStarted ? 0 : undefined,
          marginBottom: hasStarted ? 0 : undefined,
        }}
      >
        Welcome {username}, Ask me anything about PY and his work
      </h1>
      <form
        onSubmit={handleSubmit}
        className={`flex h-auto max-h-[80%] w-[80%] flex-col overflow-hidden rounded-xl bg-neutral-500/30 shadow-xl transition-all duration-700 ${hasStarted ? "h-full max-h-full w-full" : ""}`}
      >
        {/* Message List */}
        <div className="flex flex-1 flex-col space-y-2 overflow-y-auto p-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`h-auto max-w-[80%] break-words rounded-xl p-3 text-base text-black shadow-lg ${
                m.role === "user"
                  ? "self-end bg-sky-100 text-right"
                  : "prose prose-sm prose-zinc self-start bg-gray-100 text-left dark:prose-invert"
              }`}
            >
              {m.role === "assistant" ? (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              ) : (
                m.content
              )}
            </div>
          ))}
          {loading && (
            <div className="prose prose-sm prose-zinc h-auto max-w-[80%] animate-pulse self-start break-words rounded-xl bg-gray-100 p-3 text-left text-base text-black shadow-lg dark:prose-invert">
              Thinking...
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input Box */}
        <div className="flex items-center border-t p-4">
          <textarea
            className="flex-1 resize-none rounded-xl bg-zinc-100 px-4 py-2 text-black focus:outline-none"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              loading ? "Waiting for response..." : "Type a message…"
            }
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="ml-10 rounded-xl bg-gray-100 px-4 py-2 text-black transition-all hover:bg-gray-200"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </form>
    </Fragment>
  );
}
