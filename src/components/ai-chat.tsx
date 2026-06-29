"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { X, Send, Bot, User, ChevronDown, MessageCircleCode } from "lucide-react";
import { sendChatMessage } from "@/lib/chat";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const SUGGESTED_QUESTIONS = [
  "What projects has Milan built?",
  "Tell me about his AI/GenAI skills",
  "Did he win any hackathons?",
  "Is Milan open to work?",
];

export function AiChat({ articleContext }: { articleContext?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm Milan's AI assistant. Ask me anything about his skills, projects, experience, or background. I'm here to help! 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chat = useServerFn(sendChatMessage);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setShowSuggestions(false);

      // Build history for context (exclude welcome message)
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, text: m.text }));

      try {
        const reply = await chat({ data: { message: text.trim(), history, articleContext } } as any);
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString() + "-ai", role: "assistant", text: reply || "..." },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + "-err",
            role: "assistant",
            text: "Sorry, something went wrong. Try reaching Milan at milansoni96946@gmail.com!",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [chat, isLoading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-998 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 md:right-6 z-999 w-[calc(100vw-2rem)] max-w-sm"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
          >
            <div className="glass rounded-3xl border border-hairline shadow-elevated overflow-hidden flex flex-col"
              style={{ height: "480px", background: "oklch(0.12 0.014 264 / 0.97)", backdropFilter: "blur(40px) saturate(200%)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-hairline/50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-aurora-1 to-aurora-3 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-background" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Ask Milan's AI</div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Powered by Gemini</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar */}
                    <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${
                      msg.role === "assistant"
                        ? "bg-linear-to-br from-aurora-1 to-aurora-2"
                        : "bg-secondary border border-hairline"
                    }`}>
                      {msg.role === "assistant"
                        ? <Bot className="w-3.5 h-3.5 text-white" />
                        : <User className="w-3.5 h-3.5 text-muted-foreground" />
                      }
                    </div>
                    {/* Bubble */}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-aurora-1/20 border border-aurora-1/30 text-foreground rounded-tr-sm"
                          : "bg-secondary/60 border border-hairline/50 text-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 flex-row">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-linear-to-br from-aurora-1 to-aurora-2">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-secondary/60 border border-hairline/50 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-aurora-2 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-aurora-2 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-aurora-2 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested Questions */}
                {showSuggestions && messages.length === 1 && (
                  <div className="flex flex-col gap-2 pt-1">
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest pl-9">Try asking:</p>
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="ml-9 text-left text-xs text-muted-foreground border border-hairline/60 rounded-xl px-3 py-2 hover:bg-secondary/60 hover:text-foreground hover:border-aurora-1/30 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 pb-4 pt-3 border-t border-hairline/50 shrink-0">
                <div className="flex items-center gap-2 glass rounded-2xl px-4 py-2.5 border border-hairline/60 focus-within:border-aurora-1/40 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about skills, projects, experience..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className="w-8 h-8 rounded-full bg-aurora-1 flex items-center justify-center text-white transition-all hover:scale-110 disabled:opacity-40 disabled:scale-100 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-5 right-4 md:right-6 z-999 group"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI Chat"
      >
        <div className="relative w-14 h-14 rounded-full glass border border-aurora-1/40 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-aurora-1/80 transition-colors"
          style={{ boxShadow: "0 0 24px -4px oklch(0.70 0.28 295 / 0.5), 0 8px 32px rgba(0,0,0,0.4)" }}
        >
          {/* Outer glow ring */}
          <span className="absolute inset-0 rounded-full border border-aurora-1/20 scale-110 animate-ping" />
          <AnimatePresence mode="wait">
            {isOpen
              ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <ChevronDown className="w-6 h-6 text-aurora-1" />
                </motion.div>
              : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Bot className="w-6 h-6 text-aurora-1" />
                </motion.div>
            }
          </AnimatePresence>
        </div>
        {/* Tooltip */}
        <span className="absolute right-16 bottom-3 bg-background border border-hairline rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-elevated">
          Ask Milan's AI ✨
        </span>
      </motion.button>
    </>
  );
}
