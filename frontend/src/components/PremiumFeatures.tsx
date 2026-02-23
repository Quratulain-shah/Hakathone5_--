import React, { useState } from "react";
import {
  Sparkles,
  BrainCircuit,
  AlertCircle,
  RefreshCcw,
  CheckCircle,
  XCircle,
  Lightbulb,
  Target,
  Award,
  Zap,
  ChevronRight,
  Send,
  Loader2,
  TrendingUp,
  BookOpen,
  PenTool,
  MessageSquare,
} from "lucide-react";
import api from "../lib/api";

interface Feedback {
  score: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
  };
  reasoning: string;
}

interface PremiumFeaturesProps {
  chapterId: string;
  questionId: string;
  questionText?: string;
}

const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({
  chapterId,
  questionId,
  questionText,
}) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const getAIFeedback = async (answer: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/premium/grade", {
        chapter_id: chapterId,
        question_id: questionId,
        user_answer: answer,
      });
      setFeedback(res.data);
    } catch (err: any) {
      if (err.response?.status === 429) {
        setError("Rate limit exceeded. Please try again later.");
      } else if (err.response?.status === 403) {
        setError("Premium subscription required for AI feedback.");
      } else {
        setError("Failed to get AI feedback. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setAnswer(text);
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 3) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 2) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 4) return <Award className="w-5 h-5" />;
    if (score >= 3) return <CheckCircle className="w-5 h-5" />;
    if (score >= 2) return <Target className="w-5 h-5" />;
    return <TrendingUp className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
      {/* AI Grading Section */}
      <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
        {/* Decorative gradient line at top */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-amber-500"></div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <BrainCircuit className="w-40 h-40" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-[0.03] pointer-events-none">
          <Sparkles className="w-32 h-32" />
        </div>

        <div className="p-8">
          {/* Header with gradient */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl blur-lg opacity-20"></div>
              <div className="relative p-3 bg-gradient-to-r from-orange-500 to-orange-500 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                AI Tutor Insights
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Get personalized feedback from your AI mentor
              </p>
            </div>
          </div>

          {/* Essay Prompt Card */}
          {questionText && (
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform"></div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-lg shadow-sm">
                  <PenTool className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-orange-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
                    Essay Prompt
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {questionText}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Answer Input Area */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                Your Answer
              </label>
              {answer && (
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                  {wordCount} words
                </span>
              )}
            </div>
            <textarea
              className="w-full p-5 border-2 border-gray-100 rounded-xl bg-white focus:border-orange-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all resize-none"
              placeholder="Write your detailed answer here... Take your time to structure your thoughts clearly."
              rows={6}
              value={answer}
              onChange={handleAnswerChange}
            />
            <div className="flex items-center justify-end mt-3 gap-3">
              {answer && (
                <span className="text-xs text-gray-400">
                  {answer.length < 50
                    ? "Keep going, your answer is a bit short"
                    : "Looking good!"}
                </span>
              )}
              <button
                onClick={() => getAIFeedback(answer)}
                disabled={loading || !answer.trim()}
                className="group relative px-8 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all overflow-hidden"
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Get AI Feedback
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="py-16 text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <RefreshCcw className="w-12 h-12 animate-spin mx-auto mb-6 text-orange-500 relative" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                AI is analyzing your response
              </h4>
              <p className="text-sm text-gray-500">
                This usually takes 15-30 seconds
              </p>
              <div className="flex justify-center gap-1 mt-4">
                <span
                  className="w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          )}

          {/* Feedback Display */}
          {feedback && !loading && (
            <div className="animate-fadeIn">
              {/* Score Card */}
              <div
                className={`mb-8 p-6 rounded-xl border-2 ${getScoreColor(
                  feedback.score
                )}`}
              >
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-white shadow-md`}>
                      {getScoreIcon(feedback.score)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black">
                          {feedback.score}
                        </span>
                        <span className="text-xl opacity-70">/5</span>
                      </div>
                      <p className="text-sm font-medium mt-1">
                        {feedback.score >= 4
                          ? "Excellent!"
                          : feedback.score >= 3
                          ? "Good work!"
                          : feedback.score >= 2
                          ? "Needs improvement"
                          : "Keep practicing"}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-current rounded-full transition-all duration-1000"
                        style={{ width: `${(feedback.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="mb-8 bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BrainCircuit className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      AI Analysis
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feedback.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="group hover:shadow-lg transition-all rounded-xl">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-emerald-100 rounded-lg group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h4 className="font-semibold text-emerald-700">
                        Strengths
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {feedback.feedback.strengths.map((s, i) => (
                        <li
                          key={i}
                          className="text-sm text-emerald-800 flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div className="group hover:shadow-lg transition-all rounded-xl">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-100 rounded-lg group-hover:scale-110 transition-transform">
                        <Target className="w-5 h-5 text-amber-600" />
                      </div>
                      <h4 className="font-semibold text-amber-700">
                        Refinements
                      </h4>
                    </div>
                    <ul className="space-y-3">
                      {feedback.feedback.weaknesses.map((w, i) => (
                        <li
                          key={i}
                          className="text-sm text-amber-800 flex items-start gap-3"
                        >
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="leading-relaxed">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Improvement Tips */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-orange-500" />
                  <p className="text-sm text-orange-700">
                    <span className="font-semibold">Pro tip:</span> Try to
                    incorporate more specific examples and structure your
                    arguments clearly.
                  </p>
                </div>
              </div>

              {/* Try Again Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setFeedback(null);
                    setAnswer("");
                    setWordCount(0);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Submit Another Response
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-rose-100 rounded-full">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-orange-700 mb-1">
                    Unable to get feedback
                  </h4>
                  <p className="text-sm text-orange-600 mb-4">{error}</p>
                  <button
                    onClick={() => getAIFeedback(answer)}
                    className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!feedback && !loading && !error && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Ready for AI feedback?
              </h4>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Write your answer above and click "Get AI Feedback" to receive
                personalized insights from your AI tutor.
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PremiumFeatures;
