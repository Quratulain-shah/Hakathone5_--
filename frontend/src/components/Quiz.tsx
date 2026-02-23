import React, { useState } from "react";
import {
  Check,
  X,
  ArrowRight,
  Award,
  Sparkles,
  BookOpen,
  Clock,
  Star,
  Zap,
  ChevronRight,
  Circle,
  HelpCircle,
  PenTool,
  CheckCircle2,
  XCircle,
  Target,
  Brain,
  TrendingUp,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  type?: string;
  options?: string[];
  correct_answer?: number;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [essayAnswer, setEssayAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Questions Available
        </h3>
        <p className="text-gray-500">
          This quiz doesn't have any questions yet.
        </p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isEssay =
    currentQ.type === "essay" ||
    !currentQ.options ||
    currentQ.options.length === 0;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (isEssay) {
      if (!essayAnswer.trim()) return;
      setIsAnswered(true);
      setScore(score + 1);
    } else {
      if (selected === null) return;
      setIsAnswered(true);
      if (selected === currentQ.correct_answer) {
        setScore(score + 1);
      }
    }
    setTimerActive(false);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setEssayAnswer("");
      setIsAnswered(false);
      setShowHint(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      onComplete(score);
    }
  };

  const getOptionStatus = (idx: number) => {
    if (!isAnswered) return "neutral";
    if (idx === currentQ.correct_answer) return "correct";
    if (selected === idx && idx !== currentQ.correct_answer) return "incorrect";
    return "neutral";
  };

  const getOptionStyles = (status: string) => {
    switch (status) {
      case "correct":
        return "border-green-500 bg-green-50 text-green-700 hover:bg-green-100";
      case "incorrect":
        return "border-red-500 bg-red-50 text-red-700 hover:bg-red-100";
      default:
        return "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-500 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Question
                </span>
                <p className="text-lg font-bold text-gray-800 leading-tight">
                  {currentIndex + 1}/{questions.length}
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <div>
                <span className="text-sm font-medium text-gray-600">Score</span>
                <p className="text-lg font-bold text-gray-800 leading-tight">
                  {score}/{questions.length}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {timerActive && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">
                  {timeLeft}s
                </span>
              </div>
            )}
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-600 transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-4 h-4" />
              Hint
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
        {/* Question Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm font-bold text-orange-600">
                {currentIndex + 1}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
              {currentQ.text}
            </h2>
          </div>
          {isEssay && (
            <div className="mt-3 ml-11">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                <PenTool className="w-3 h-3" />
                Essay Question
              </span>
            </div>
          )}
        </div>

        {/* Question Content */}
        <div className="p-6">
          {isEssay ? (
            <div className="space-y-4">
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-xl min-h-[180px] focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none text-gray-700 placeholder-gray-400"
                placeholder="Write your answer here... Be detailed and specific."
                value={essayAnswer}
                onChange={(e) => setEssayAnswer(e.target.value)}
                disabled={isAnswered}
              />
              {isAnswered && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-green-700 font-medium">
                    Answer submitted successfully!
                  </p>
                </div>
              )}
              {showHint && !isAnswered && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-orange-700">
                    <span className="font-medium">Hint:</span> Structure your
                    answer with an introduction, main points, and conclusion.
                    Use specific examples from the lesson.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {(currentQ.options || []).map((option, idx) => {
                const status = getOptionStatus(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                      selected === idx && !isAnswered
                        ? "border-blue-500 bg-blue-50"
                        : getOptionStyles(status)
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          selected === idx && !isAnswered
                            ? "border-orange-500 bg-orange-500"
                            : status === "correct"
                            ? "border-green-500 bg-green-500"
                            : status === "incorrect"
                            ? "border-red-500 bg-red-500"
                            : "border-gray-300 group-hover:border-gray-400"
                        }`}
                      >
                        {selected === idx && !isAnswered && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                        {status === "correct" && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                        {status === "incorrect" && (
                          <X className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span
                        className={`font-medium ${
                          status === "correct"
                            ? "text-green-700"
                            : status === "incorrect"
                            ? "text-red-700"
                            : "text-gray-700"
                        }`}
                      >
                        {option}
                      </span>
                    </div>

                    {status === "correct" && (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Correct Answer
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={isEssay ? !essayAnswer.trim() : selected === null}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-600 text-white font-semibold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2 group"
          >
            <span>{isEssay ? "Submit Answer" : "Check Answer"}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2 group"
          >
            <span>
              {currentIndex === questions.length - 1
                ? "Complete Quiz"
                : "Next Question"}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Results Preview (when answered) */}
      {isAnswered && !isEssay && (
        <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${
                selected === currentQ.correct_answer
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              {selected === currentQ.correct_answer ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div>
              <p
                className={`font-medium ${
                  selected === currentQ.correct_answer
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {selected === currentQ.correct_answer
                  ? "Correct! Great job!"
                  : `Incorrect. The correct answer is: ${
                      currentQ.options?.[currentQ.correct_answer || 0]
                    }`}
              </p>
              {selected !== currentQ.correct_answer && (
                <p className="text-sm text-gray-500 mt-1">
                  Review this concept and try to understand why this is the
                  correct answer.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Essay Answer Feedback */}
      {isEssay && isAnswered && (
        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <p className="font-medium text-orange-700 mb-1">Great attempt!</p>
              <p className="text-sm text-orange-600">
                Your essay answer has been recorded. You'll receive personalized
                feedback from your AI tutor after submission.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Question Navigation Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex
                ? "w-6 bg-orange-500"
                : idx < currentIndex
                ? "bg-green-400"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Quiz;
