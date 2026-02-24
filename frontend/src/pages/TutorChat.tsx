import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  ArrowLeft,
  Send,
  Bot,
  BookOpen,
  BrainCircuit,
  HelpCircle,
  BarChart3,
  Sparkles,
  Check,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
  History,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChapterOption {
  slug: string;
  title: string;
}

interface DashboardData {
  course: { title: string; slug: string };
  total_chapters: number;
  completed_chapters: number;
  percentage: number;
  avg_quiz_score?: number;
}

interface ChatHistory {
  id: string;
  title: string;
  date: Date;
}

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/ forever",
    description: "Get started with core course content",
    features: [
      "All free chapters",
      "Quizzes & progress tracking",
      "Community access",
    ],
    cta: "Current Plan",
    highlighted: false,
    disabled: true,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/ month",
    description: "Unlock AI-powered assessments",
    features: [
      "Everything in Free",
      "AI-Graded Assessments",
      "Premium chapters",
      "Certificate of Completion",
    ],
    cta: "Upgrade to Premium",
    highlighted: false,
    disabled: false,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/ month",
    description: "Full adaptive learning experience",
    features: [
      "Everything in Premium",
      "Adaptive Study Paths",
      "Priority Support",
      "Early access to new features",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
    disabled: false,
  },
  {
    name: "Team",
    price: "$49.99",
    period: "/ month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team dashboard & analytics",
      "Bulk seat management",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
    disabled: false,
  },
];

const skillActions = [
  {
    label: "Explain Concept",
    icon: <BookOpen className="w-4 h-4" />,
    prompt: "explain this concept",
  },
  {
    label: "Quiz Me",
    icon: <BrainCircuit className="w-4 h-4" />,
    prompt: "quiz me on this",
  },
  {
    label: "Help Me Think",
    icon: <HelpCircle className="w-4 h-4" />,
    prompt: "help me think about this",
  },
  {
    label: "My Progress",
    icon: <BarChart3 className="w-4 h-4" />,
    prompt: "how am I doing",
  },
];

const TutorChat: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [isPremium, setIsPremium] = useState(false);
  const [chatUnlocked, setChatUnlocked] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(true);
  const [upgradeLoading, setUpgradeLoading] = useState<string | null>(null);

  const [chapters, setChapters] = useState<ChapterOption[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [chapterContext, setChapterContext] = useState<string>("");

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI Tutor. Select a chapter from the sidebar and ask me anything — I can explain concepts, quiz you, or help you think through problems.",
    },
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock chat history for demonstration
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: "1", title: "Introduction to AI Agents", date: new Date() },
    {
      id: "2",
      title: "Understanding Neural Networks",
      date: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      title: "Machine Learning Basics",
      date: new Date(Date.now() - 172800000),
    },
  ]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load user status and progress on mount
  useEffect(() => {
    const init = async () => {
      setPremiumLoading(true);
      try {
        // Check premium status
        const userRes = await api.get("/users/me");
        setIsPremium(userRes.data.is_premium === true);
      } catch {
        setIsPremium(false);
      }

      // Load progress (FREE for all users)
      try {
        const dashRes = await api.get("/courses/ai-agent-dev/dashboard");
        setDashboard(dashRes.data);
      } catch {
        // fallback — no dashboard data
      }

      // Load course structure for chapter selector
      try {
        const structRes = await api.get("/courses/ai-agent-dev/structure");
        const allChapters: ChapterOption[] = [];
        structRes.data.modules?.forEach((mod: any) => {
          mod.chapters?.forEach((ch: any) => {
            allChapters.push({ slug: ch.slug, title: ch.title });
          });
        });
        setChapters(allChapters);
      } catch {
        // fallback
      }

      setPremiumLoading(false);
    };
    init();
  }, []);

  // Load chapter content when selection changes
  useEffect(() => {
    if (!selectedChapter) {
      setChapterContext("");
      return;
    }
    const loadContent = async () => {
      try {
        const res = await api.get(`/chapters/${selectedChapter}/content`);
        setChapterContext(res.data.markdown_content || "");
      } catch {
        setChapterContext("");
      }
    };
    loadContent();
  }, [selectedChapter]);

  const handleUpgrade = async (tierName: string) => {
    // If already premium, just unlock chat
    if (isPremium) {
      setChatUnlocked(true);
      return;
    }
    setUpgradeLoading(tierName);
    try {
      await api.post("/users/upgrade", { tier: tierName.toLowerCase() });
      setIsPremium(true);
      setChatUnlocked(true);
    } catch (err) {
      console.error("Upgrade failed", err);
    } finally {
      setUpgradeLoading(null);
    }
  };

  const sendMessage = async (overrideMsg?: string) => {
    const text = overrideMsg || input.trim();
    if (!text || chatLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setChatLoading(true);

    try {
      const res = await api.post("/premium/chat", {
        message: text,
        context: chapterContext || "",
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
              "This feature requires a Premium account. Please upgrade to unlock AI Tutor chat.",
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
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSkillAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const startNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm your AI Tutor. Select a chapter from the sidebar and ask me anything — I can explain concepts, quiz you, or help you think through problems.",
      },
    ]);
    setSelectedChapter("");
  };

  if (premiumLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
          </div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-1.5 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* ========== LEFT SIDEBAR - EXACT CHATGPT STYLE ========== */}
      <div
        className={`
        w-[260px] min-w-[260px] bg-[#f9f9f9] border-r border-gray-200 
        flex flex-col h-screen sticky top-0 transition-all duration-300
        ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        fixed lg:relative z-40
      `}
      >
        {/* Logo + Title - Exact ChatGPT Style */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            {/* Your Original Logo */}
            <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden bg-white">
              <img
                src="data:image/png;base64,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"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-gray-900">CHATGPT</span>
          </div>

          {/* New Chat Button */}
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <span>New chat</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History - Exact ChatGPT Style */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-3 py-1">
            <h3 className="text-xs font-medium text-gray-500 px-3 py-2">
              Today
            </h3>
            {chatHistory.slice(0, 2).map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-200 transition-colors group flex items-center gap-3"
              >
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700 truncate flex-1">
                  {chat.title}
                </span>
              </button>
            ))}
          </div>

          <div className="px-3 py-1">
            <h3 className="text-xs font-medium text-gray-500 px-3 py-2">
              Previous 7 Days
            </h3>
            {chatHistory.slice(2).map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-200 transition-colors group flex items-center gap-3"
              >
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700 truncate flex-1">
                  {chat.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Back to Dashboard Link */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors w-full px-3 py-2 hover:bg-gray-200 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* ========== RIGHT MAIN AREA ========== */}
      <div className="flex-1 flex flex-col h-screen bg-white overflow-hidden">
        {!chatUnlocked ? (
          /* ===== PRICING TIERS - 4 IN A ROW ===== */
          <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  Premium Feature
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {isPremium ? "Choose Your Plan" : "Unlock AI Tutor Chat"}
                </h2>
                <p className="text-base text-gray-600 max-w-xl mx-auto">
                  {isPremium
                    ? "You have premium access! Select a tier below to start chatting."
                    : "Upgrade your plan to chat with your personal AI tutor."}
                </p>
              </div>

              {/* 4 TIERS IN A PERFECT ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-xl p-5 flex flex-col bg-white border ${
                      tier.highlighted
                        ? "border-gray-900 shadow-lg ring-1 ring-gray-900"
                        : "border-gray-200 shadow-sm hover:shadow-md"
                    } transition-shadow`}
                  >
                    {tier.highlighted && (
                      <div className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded-full inline-block w-fit mb-3">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-2 mb-3">
                      <span className="text-2xl font-bold text-gray-900">
                        {tier.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        {tier.period}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4 flex-1">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        if (isPremium && tier.name !== "Free") {
                          setChatUnlocked(true);
                        } else if (!tier.disabled) {
                          handleUpgrade(tier.name);
                        }
                      }}
                      disabled={tier.disabled || upgradeLoading === tier.name}
                      className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                        tier.highlighted
                          ? "bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
                          : tier.disabled
                          ? "bg-gray-100 text-gray-400 cursor-default"
                          : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {upgradeLoading === tier.name
                        ? "Processing..."
                        : isPremium && tier.name !== "Free"
                        ? "Select"
                        : tier.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ===== CHAT INTERFACE - EXACT CHATGPT STYLE WITH PROPER ALIGNMENT ===== */
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden bg-white">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAAilBMVEX///8AAADp6enl5eXAwMDh4eH6+vr29vbz8/Pq6urv7++lpaWQkJD5+fna2tq/v79vb2+qqqqGhobU1NTMzMxdXV1OTk5paWmxsbGYmJhlZWV5eXm5ubl6enqfn58lJSUzMzNERESKiooeHh4RERE7OztYWFgZGRk2NjY/Pz9JSUkLCwssLCwjIyOVKViKAAAMI0lEQVR4nO1de1/qMAxlON5vQXkqooheH9//610BYUmbpO3WMu799fwpc+vZ2jQ5SdtKJSIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi4qrQazbrZbchEKqD7vD9Ldnj82296K76/xPT5myYENh1bspumR8MdhS9I55GvbKbVxS9+SfP74Blq+w2FkHj1kDvX+f4aMNvj9uyW5oP/Sdbgj+YlN3aHOg48Nt31bLb64w7N4JJ8tUuu8lOaK1dCf5gXHarHdCnKdwv553RqNNd3n2Rvw/Kbrc1xkTrpyvkwDQmty//LkX9C+5WlBPaf9AuTH9cvFo66zz+oLPqVy/edivcaJ+PbWhP8wiGigu0m4+vzkNvKG3805eubpI+OcaC7AHlYYOb1zFdP9maOSbDK7KzXdSytUV8VBdijwyv12KFsBldWP1P1eYr/kRa1+HZvcE2WTnUDd2iclg0QjffDNRHrQi6ua+r0ARMaMHWDC3+YeLq3U1LNqtT0JY/5surzu55kryUGi7XYFOapqvrzwKRLS9+lDlxLEE7UtPFM7r9993VuN2o75XV2qB7T11ivHUwNEErpoZrx6QAMNQbny71y0qbGqFZlPtoe6o3O0kemclgppmjsmZG0JBH8cI5xU9y7wZqpFWOlAzdGem6AeXC3BpmAcUqbS8uJDfSBxi2d/krax8Ev535m/Txe7n32HgLpOq8xs5ZDcJuJGu7YYUfIo8Dr2h2tSazL5h00Yzx1Qm4p9b8NN+IBjVtz+hrJ4Qykzw4eNPIQr36IWDCiPoodCetUmHghygAaEDdxfrbF0Cf9pu/iEvrVI7mzXnqRsM4vBOuD8AjiKCCdNHmOZ65Af8vWGwvaG6oVpPdh3TRhkbXnEIb3iLXHayhaYYZVOeSctFe3QZghtWlPuKEJ6jY8Tql4BeI1WG4UZCEhFQgmGABmDAxz/yNW52HrhwAws4TTtTQv+AOmB3MULv0jo/S60dV6lXkCOxpMN9NS0wMa/CrIoZt5dInofWZy7MQkolVcLdAOcem0uj7/cDjGLbwtSP+thM0YAUrAhxUxnsqinfc6ONgsGIo6Iu6y8MOMvCoO0+UMLDp+NPUHssx3AnJMsrl2XAzCrjGEycEbGXOBQZGhl9CjMSoUpxXAPJVIYJ9FIlmo8XEUHDRxq8MwYQJA8GsH2AgomgJNNvEkH3ZtCp1xguhHQJr6t+tQc4arIExMeQCVs59z0BIHFk/sstuuWABHo3m23wMV1h9GVVSSuvWZKrN+aeNX3rKXI+i8zwM+xt4u18ipNSoDLfMrdl6Jog+IbaNHMPTmNEZKqrUuTOSAxO7QqBreyYIR6ES5zozxIWLaC4ZKz7FAYsW+b+eA304LysKkiPDFKtSatBMTpCZ3QSanWeG4HHq/ObEsIZzSg+6gl0nbezJkQvGEEaF6p0dGPZw5v6eNrNk+vTXkQPWyC9DYBq0INaeoaJA8tnACaUOLPeOXDBLAyYvLYq1Zag1+13wV0k59hE6pmuvBMFkqAfXdgzJrnfHxxw9qhTlZbwRGlIE4I3qgawNQzZz/8yPphqZ6D7DpuDDHiBo0dUDC4ZcjLSHECOkUsmU3xRUpuF/Eu0wMKwqpfvzOnbPJP2GdOSO8Jvvzu5LFNabGGKR4qA0tRfob1Newm6zNZpepSjgshFpHxND8nspcr8QJff/kATfPPJDppSYwxwYwjGHx+ZWSEaRo9jvYhvAgZCIrBkqwZ6SdtsIqV3CEvsdhuAlEr3fkuG9HrDf4PlgySeFW9ps6rfIDUyHeRm+0S5aiqpSpeSuWsvoN9UNHHrC6tkw5CcvHCx+C51PmTlM1WVOKNpLxZSoUrMviMd9/MF9TvlApczBkBWwzy3foJYLGTg8tXqsOgFiN+F/GH0a4/0Vm/TJJweRp/DuzoQDmA+JactdiVKh5c35TDjq0nkKHmi0xJsGYCgMXdRR/RUsZPckLFgQhvwHgnG0v+Wn4K76j/4Y4vmAmUJRatlbAmop3dMfw3bdRqmCVSfePiK4qe52+GNY1dVGypGDQ9HXSATmXE+IgLmkOEOjYlzB/dSbOf3O7ql1U67MJSdDtRb1W585YKiRm5ICEOjogRkMZsGqytwM1cyN9k4b4Me8NWQqYG5NE+Jxkc15JsvPUBmO+sAQX3hOgAfqfmMNRza/Y6MIQzwcNb8PLEJ6yU1JAZyqCO8bD53jTFaMIbRu+sQItBtfq76h/aKKdZTVkvukZ0GGwIDpDEFU6a2GD7q85E2Vmey2fnopIRiCHx/yMtIIwObTWmX6Da85+2AhGAK78JSHDQn4Ebm7khvvBGEIMv7uVBggj5erm2sQEnUQhsDy+RO/UfaZ1YF0iToIw0H2q685v4Ijs2THXrZSSn/sVQwHhmC5nEdtGPsuH/wyOVxrIG+PUQFKlANDIDv4XFeqKJZ8VkzJLQ2loQKySw4MgVXwWqSoaOtCeeAYJ+35IAe+NQeGoB5bKK/OAaXYQJKoca0Bk1vCq0qvgaGmGQkStVJrQCxWU1eVXkEvpRbMCOGLnFvSN/5wYFgTfy0AcjdEqdaAlySIVaWlz4c/oHd0eBdqDbAj93IauJNv4j4ODMH78VrS3tJbdcSCT1gqjtwhUap039Pc4sAQ3NQnQWndmjBz9HHR6G1bSW/fnF5crtjCW5B/gFDeIoaiK/6/tmlmNuwZgs7ktzZKXj7AFFPuQReNJr+ugDtDsQytCLLh8zF2XICu1xokZ13OnSEYx35NaWYAl+6bCEzUGu7zYkNnhkCl8ls5BMb3vnc1qY0ghEVOyvLTbBp1ZghEb7/DsJ7d+Fgm0HfYzENRqqDq6sqwB+7jt3IIMDyNb9JKErUGSt4Ml866MoRmyyc/xDAbbzYrXZQxq/ZkR4ZQMfK8vkvrpQe0cLh7BHLklApvzRo5MoTP87zPKWCIQlp5pcsNroIhlli4MYQGy/sCtixeVZRmfqWLUoH4QXkFTgzRamvvW9VkSuGH8gtdqj5QIn1mSxMnhlCtDLkGUV8bZ7FRIKfWuDBEjqP/tcCy0pxSjlwGvn7PQS9FfT7ApvxguJGRhHBggKSannq4mSGaVYl1A4UBNGHaWyIduT0EpSPT24wM8UAIsv8euD9zBbkrm1BQWdtklxkYVrHyEebgiKn2WB2DRIGkOKJvLjNUYhmLXVLzAAxEYWMKFO5KOyoojZYYamdmBNpZGNa6CtXyIG9hvaVJothnwHBSqWmeYbBt6YAHJlbN/e4H8cAvTbvRd3FDvwPN91Yf2+G2o4XRkuz1TpaLrvCZCW0Zm46afgH8quEAHlNgixjKj11jl1zacSvohsLQ/8ybMSBjETVvzq9Z3IbdpRW59rnsWZPSJL+0z8JuDLILvUcrfHKetbhWmkBFXVuRIfz2pXX4OGe/YvVGNJrcaJfm936JfYSRe+1Wo6usjvntdaRNpo/k8Stws0C1lg6dhtxo94Ux/FRnnl9qa318koXgVWO4aeTappnbxwseHYBnazspgTwLgV9TqXbSuwvvxo4ru74t6rrIjXaF/4Md+ukhvfgBHuruggZdltxoV1rbjB5QzokIaid6kyp1yQEoG2HwSr79ttwamte4HtE9qUFqN1O5ZNJugW1gECmZ4UCzdimZNZb2iTggxLofd5BZp9fbWX9/Cke90R6vuhvqEosiJuh0l3n+oxDeSHuSCPu1/ALVtJR6cHCN8jENEPbcOQOKG35TvM6ou574Y3UWArpp6cfp0rvrc7DaDx9pTqE3X7dA2/4z2p2FgIyv50KLnJjYHf5rKT1g7+5aTgZMhZ1kM9jsY6EcuHIFffSEiU1fXRurl5SYMJBunxPNkbz32AGCPlzRJfDPKzgREKMxUY8S+9LWCPFO5liLr0qd63lU+6v9gbedWTret1A/Z+CZanhvpg9lvxV54UB4r19zbCKrM2oU/ysEiWziAR/T7ugHnecpM3wvdeKRDzAndYtYl+6sOaFp5xIAhDkVICS48gUGlzjOyTfG/MmbGl7/pSEIIJ08inAh3T4A2lbHG19Mtw+ClonjRXX7MKjPNjy/S+v2odBeUVuuboerq3Ozi+AmnQ+/jtb182Uz7KZX6mMXRq/5X323iIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIj/An8BV8OQPfA5100AAAAASUVORK5CYII="
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-bold text-gray-900">CHATGPT</span>
                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  {selectedChapter
                    ? chapters
                        .find((c) => c.slug === selectedChapter)
                        ?.title?.substring(0, 25) +
                      (chapters.find((c) => c.slug === selectedChapter)?.title
                        ?.length > 25
                        ? "..."
                        : "")
                    : "No chapter selected"}
                </span>
              </div>
            </div>

            {/* Messages - Proper ChatGPT Alignment */}
            <div className="flex-1 overflow-y-auto bg-white">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${
                    msg.role === "assistant" ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex gap-2 sm:gap-4">
                    {/* Avatar - Only show for assistant, user avatar is hidden (ChatGPT style) */}
                    {msg.role === "assistant" ? (
                      <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden bg-white shrink-0">
                        <img
                          src="data:image/png;base64,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"
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      /* Empty div with same width for alignment (user messages have no avatar in ChatGPT) */
                      <div className="w-8 h-8 shrink-0" />
                    )}

                    {/* Message Content */}
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        {msg.role === "assistant" ? "CHATGPT" : "You"}
                      </div>
                      <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="bg-gray-50">
                  <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-6 flex gap-2 sm:gap-4">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden bg-white shrink-0">
                      <img
                        src="data:image/png;base64,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"
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 mb-1">
                        CHATGPT
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area with ChatGPT-style icons */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message AI Tutor..."
                    className="w-full bg-white border border-gray-200 rounded-lg pl-3 pr-10 py-2 sm:pl-4 sm:pr-12 sm:py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
                    disabled={chatLoading}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || chatLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-40 disabled:hover:text-gray-400 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* ChatGPT-style icons below input */}
                <div className="flex items-center justify-center gap-4 mt-3">
                  <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Explain</span>
                  </button>
                  <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                    <BrainCircuit className="w-3 h-3" />
                    <span>Quiz</span>
                  </button>
                  <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>Help</span>
                  </button>
                  <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>Progress</span>
                  </button>
                </div>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Free Research Preview. AI Tutor may produce inaccurate
                  information.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TutorChat;
