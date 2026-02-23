import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Bot,
  Send,
  Loader,
  Sparkles,
  BookOpen,
  Brain,
  Zap,
} from "lucide-react";
import api from "../lib/api";

interface AITutorProps {
  context: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AITutor: React.FC<AITutorProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI Tutor. Ask me anything about this lesson, your progress, or any concept you'd like explained.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post("/premium/chat", {
        message: userMsg,
        context: context || "",
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.response },
      ]);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "This feature requires a Premium account. Visit the Upgrade page to unlock AI Tutor chat.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I'm having trouble connecting right now. Please try again.",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Light orange theme
  const theme = {
    primary: "#FF9A8B", // Light orange/peach
    secondary: "#FFB6A0", // Lighter orange
    background: "#FFF5F0", // Very light orange background
    text: "#4A3F3D", // Dark brown text
    lightBg: "#FFE5D9", // Light orange for cards
    border: "#FFD1C4", // Soft orange border
  };

  return (
    <>
      {/* Floating Action Button - Light Orange */}
      <button
        onClick={toggleChat}
        style={{ backgroundColor: theme.primary }}
        className="fixed bottom-8 right-8 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all z-50 flex items-center justify-center cursor-pointer"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window - Light Orange Theme */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-8 w-96 h-[500px] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.border,
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: theme.primary }}
            />
            <div
              className="absolute bottom-20 left-10 w-40 h-40 rounded-full opacity-10"
              style={{ backgroundColor: theme.secondary }}
            />
          </div>

          {/* Header - Light Orange Gradient */}
          <div
            className="p-4 border-b flex items-center gap-3 relative"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)`,
              borderColor: theme.border,
            }}
          >
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${theme.primary}30` }}
            >
              <Bot className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: theme.text }}>
                Synapse Tutor
              </h3>
              <p className="text-xs" style={{ color: `${theme.text}80` }}>
                Ask about lessons, quizzes, or your progress
              </p>
            </div>

            {/* Quick action indicators */}
            <div className="flex gap-1 ml-auto">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "rounded-br-md text-white"
                      : "rounded-bl-md"
                  }`}
                  style={{
                    backgroundColor:
                      msg.role === "user" ? theme.primary : "#FFFFFF",
                    color: msg.role === "user" ? "white" : theme.text,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  {msg.role === "assistant" && (
                    <span className="flex items-center gap-1 mb-1">
                      <Sparkles
                        className="w-3 h-3"
                        style={{ color: theme.primary }}
                      />
                    </span>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 rounded-2xl rounded-bl-md"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: theme.primary,
                        animationDelay: "0s",
                      }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: theme.secondary,
                        animationDelay: "0.2s",
                      }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: theme.primary,
                        animationDelay: "0.4s",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {["Explain this", "Give example", "More details"].map(
                (suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: `${theme.primary}15`,
                      color: theme.primary,
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Input */}
          <div
            className="p-3 border-t flex items-center gap-2"
            style={{ borderColor: theme.border }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${theme.border}`,
                color: theme.text,
              }}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl disabled:opacity-50 hover:opacity-90 transition-all text-white"
              style={{ backgroundColor: theme.primary }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Note */}
          <div className="px-4 pb-2 text-center">
            <span className="text-[10px]" style={{ color: `${theme.text}40` }}>
              Powered by AI • Responses may be generated
            </span>
          </div>
        </div>
      )}

      <style>{`
                @keyframes slide-in-from-bottom-4 {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-in {
                    animation: slide-in-from-bottom-4 0.3s ease-out;
                }
            `}</style>
    </>
  );
};

export default AITutor;
