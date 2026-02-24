import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import LessonViewer from "../components/LessonViewer";
import Quiz from "../components/Quiz";
import PremiumFeatures from "../components/PremiumFeatures";
import Sidebar from "../components/Sidebar";
import AITutor from "../components/AITutor";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BrainCircuit,
  BookOpen,
  Clock,
  Award,
  Sparkles,
  Sun,
  Smile,
  Coffee,
  Music,
  Palette,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Settings,
  Download,
  Share2,
  Bookmark,
  BookmarkPlus,
  ThumbsUp,
  MessageCircle,
  HelpCircle,
  Loader,
  FileText,
  CheckCheck,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

const Lesson: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState("peach");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [fontSize, setFontSize] = useState(100);
  const [bookmarked, setBookmarked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const colors = {
    peach: {
      primary: "#FF9A8B",
      secondary: "#FF6B6B",
      light: "#FFE5D9",
      bg: "#FFF1F0",
      text: "#4A3F3D",
      accent: "#FF8A7A",
    },
    mint: {
      primary: "#84DCC6",
      secondary: "#95E5D1",
      light: "#E0F5F0",
      bg: "#F0FAF7",
      text: "#2C4A42",
      accent: "#6BC4B0",
    },
    lavender: {
      primary: "#B8A9E6",
      secondary: "#C4B7F0",
      light: "#F0ECFF",
      bg: "#F8F6FF",
      text: "#3F3A5C",
      accent: "#A594E0",
    },
    coral: {
      primary: "#FFB3A6",
      secondary: "#FFC5BB",
      light: "#FFF0ED",
      bg: "#FFF9F7",
      text: "#5C403B",
      accent: "#FF9F8F",
    },
    sky: {
      primary: "#89CFF0",
      secondary: "#A0D8F5",
      light: "#E6F3FF",
      bg: "#F5FAFF",
      text: "#2C4A5C",
      accent: "#71BEE0",
    },
    rose: {
      primary: "#F7CAC9",
      secondary: "#FAD9D8",
      light: "#FFF0F0",
      bg: "#FFF9F9",
      text: "#5C3F42",
      accent: "#F5B7B6",
    },
  };

  const currentColor = colors[activeColor as keyof typeof colors];

  const colorOptions = [
    { id: "peach", icon: <Sun className="w-4 h-4" />, color: "#FF9A8B" },
    { id: "mint", icon: <Smile className="w-4 h-4" />, color: "#84DCC6" },
    { id: "lavender", icon: <Heart className="w-4 h-4" />, color: "#B8A9E6" },
    { id: "coral", icon: <Coffee className="w-4 h-4" />, color: "#FFB3A6" },
    { id: "sky", icon: <Music className="w-4 h-4" />, color: "#89CFF0" },
    { id: "rose", icon: <Palette className="w-4 h-4" />, color: "#F7CAC9" },
  ];

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/chapters/${slug}/content`);
        setLesson(res.data);

        const wordCount = res.data.markdown_content?.split(/\s+/).length || 0;
        setReadingTime(Math.ceil(wordCount / 200));

        // Fetch progress
        try {
          const progressRes = await api.get(`/progress/${slug}`);
          setCompleted(progressRes.data?.completed || false);
        } catch (err) {
          console.log("Progress not found");
        }

        // Fetch bookmarks
        try {
          const bookmarksRes = await api.get("/bookmarks");
          setBookmarked(bookmarksRes.data?.some((b: any) => b.slug === slug));
        } catch (err) {
          console.log("Bookmarks not found");
        }

        // Fetch saved notes - Fixed endpoint
        try {
          const notesRes = await api.get(`/notes/${slug}`);
          if (notesRes.data?.content) {
            setSavedNotes(notesRes.data.content);
            setNotes(notesRes.data.content);
          }
        } catch (err: any) {
          // 404 means no notes yet, that's fine
          if (err.response?.status !== 404) {
            console.log("Error fetching notes:", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch lesson", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchLesson();
    }

    const interval = setInterval(() => {
      setReadingTime((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, [slug]);

  const handleMarkComplete = async (score?: number) => {
    try {
      await api.post("/progress/", {
        chapter_slug: slug,
        is_completed: true,
        quiz_score: score ?? null,
        time_spent: Math.round((Date.now() - startTime) / 60000),
      });
      setCompleted(true);

      showToast("✨ Lesson completed! +10 points", "success");
    } catch (err) {
      console.error("Failed to update progress", err);
      showToast("Failed to mark complete", "error");
    }
  };

  const handleToggleBookmark = async () => {
    try {
      if (bookmarked) {
        await api.delete(`/bookmarks/${slug}`);
        showToast("📖 Bookmark removed", "info");
      } else {
        await api.post("/bookmarks", {
          slug,
          title: lesson.title,
          type: "lesson",
        });
        showToast("🔖 Lesson bookmarked", "success");
      }
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
      showToast("Failed to update bookmark", "error");
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    showToast("🔗 Link copied to clipboard!", "success");
  };

  const handleFontSizeChange = (increase: boolean) => {
    setFontSize((prev) =>
      Math.min(150, Math.max(80, prev + (increase ? 10 : -10)))
    );
  };

  // Fixed notes save function
  const saveNotes = async () => {
    if (!notes.trim() && !savedNotes) {
      setNoteError("Notes cannot be empty");
      return;
    }

    setIsSavingNote(true);
    setNoteError(null);

    try {
      // Try different endpoints based on whether notes exist
      if (savedNotes) {
        // Update existing notes
        await api.put(`/notes/${slug}`, {
          content: notes,
          chapter_slug: slug,
        });
      } else {
        // Create new notes
        await api.post("/notes/", {
          content: notes,
          chapter_slug: slug,
        });
      }

      setSavedNotes(notes);
      setShowNotes(false);
      setNoteError(null);
      showToast("📝 Notes saved successfully!", "success");
    } catch (err: any) {
      console.error("Failed to save notes:", err);

      // More detailed error message
      let errorMessage = "Failed to save notes";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setNoteError(errorMessage);
      showToast(errorMessage, "error");

      // Retry logic
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          saveNotes();
        }, 2000);
      }
    } finally {
      setIsSavingNote(false);
    }
  };

  // Toast helper function
  const showToast = (message: string, type: "success" | "error" | "info") => {
    const toast = document.createElement("div");
    const bgColor =
      type === "success"
        ? "from-green-400 to-green-500"
        : type === "error"
        ? "from-red-400 to-red-500"
        : "from-blue-400 to-blue-500";

    toast.className = `fixed top-4 right-4 bg-gradient-to-r ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-slide-in`;
    toast.innerHTML = `<span class='font-poppins'>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  if (loading) {
    return (
      <div
        style={{ backgroundColor: currentColor.bg }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <div className="relative">
            <div
              className="w-20 h-20 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
              style={{ borderColor: currentColor.primary }}
            ></div>
            <BookOpen
              className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{ color: currentColor.primary }}
            />
          </div>
          <p style={{ color: currentColor.text }} className="font-inter">
            Loading your lesson...
          </p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div
        style={{ backgroundColor: currentColor.bg }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 max-w-md text-center shadow-xl">
          <HelpCircle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: currentColor.primary }}
          />
          <h2
            className="text-2xl font-bold mb-2 font-poppins"
            style={{ color: currentColor.text }}
          >
            Lesson Not Found
          </h2>
          <p
            className="mb-6 font-inter"
            style={{ color: `${currentColor.text}80` }}
          >
            The lesson you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105 font-poppins"
            style={{
              background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: currentColor.bg }}
      className="min-h-screen transition-colors duration-500 font-inter"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
        }
        
        .font-poppins-bold {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        p, li, blockquote, .prose {
          font-family: 'Inter', sans-serif;
          line-height: 1.7;
          font-weight: 400;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(0px, 0px) scale(1); }
          75% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes scale-up {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .prose {
          max-width: none;
        }
        
        .prose h1 {
          font-size: 2.5em;
          margin-bottom: 0.5em;
        }
        
        .prose h2 {
          font-size: 2em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .prose h3 {
          font-size: 1.5em;
          margin-top: 1.2em;
          margin-bottom: 0.3em;
        }
        
        .prose p {
          margin-bottom: 1.2em;
        }
        
        .prose blockquote {
          font-style: italic;
          border-left-width: 4px;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          opacity: 0.9;
        }
        
        .prose code {
          font-family: 'Inter', monospace;
          background: rgba(0,0,0,0.05);
          padding: 0.2em 0.4em;
          border-radius: 0.3em;
          font-size: 0.9em;
        }
        
        .prose pre {
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 1rem;
          border-radius: 0.8rem;
          overflow-x: auto;
        }
      `}</style>

      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10 animate-float"
          style={{ backgroundColor: currentColor.primary }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-10 animate-float animation-delay-2000"
          style={{ backgroundColor: currentColor.secondary }}
        />
      </div>

      {/* Top Navigation Bar - Fixed heading duplication */}
      <nav className="relative bg-white/80 backdrop-blur-xl border-b border-white/60 sticky top-0 z-20 px-3 md:px-6 py-3 md:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left section - Back button and title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/60 transition-all group"
              style={{ color: currentColor.text }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium font-poppins">Back</span>
            </button>

            <div className="hidden sm:block h-8 w-px bg-white/40 mx-2"></div>

            <div className="hidden sm:flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: `${currentColor.primary}20` }}
              >
                <BookOpen
                  className="w-5 h-5"
                  style={{ color: currentColor.primary }}
                />
              </div>
              <div>
                {/* Only one h1 element now */}
                <h1
                  className="text-base font-poppins-bold tracking-tight"
                  style={{ color: currentColor.text }}
                >
                  {lesson.title}
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock
                    className="w-3.5 h-3.5"
                    style={{ color: `${currentColor.text}60` }}
                  />
                  <p
                    className="text-xs font-inter"
                    style={{ color: `${currentColor.text}60` }}
                  >
                    {readingTime} min read
                  </p>
                  {lesson.chapter_number && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <p
                        className="text-xs font-inter"
                        style={{ color: `${currentColor.text}60` }}
                      >
                        Chapter {lesson.chapter_number}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right section - Controls */}
          <div className="flex items-center gap-2">
            {/* Color selector */}
            <div className="flex items-center gap-1 bg-white/60 backdrop-blur-sm p-1.5 rounded-xl mr-2 border border-white/40 shadow-sm">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveColor(option.id)}
                  className={`relative w-8 h-8 rounded-lg transition-all flex items-center justify-center group ${
                    activeColor === option.id
                      ? "scale-110 shadow-md ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: option.color }}
                >
                  <span className="text-white">{option.icon}</span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-inter capitalize opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-800 text-white px-1.5 py-0.5 rounded">
                    {option.id}
                  </span>
                </button>
              ))}
            </div>

            {/* Font size controls */}
            <div className="flex items-center gap-1 bg-white/60 rounded-xl p-1 border border-white/40 shadow-sm">
              <button
                onClick={() => handleFontSizeChange(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/60 flex items-center justify-center font-bold"
                style={{ color: currentColor.text }}
              >
                <span className="text-sm font-poppins">A-</span>
              </button>
              <span
                className="text-xs px-1 font-inter font-medium min-w-[45px] text-center"
                style={{ color: currentColor.text }}
              >
                {fontSize}%
              </span>
              <button
                onClick={() => handleFontSizeChange(true)}
                className="w-8 h-8 rounded-lg hover:bg-white/60 flex items-center justify-center font-bold"
                style={{ color: currentColor.text }}
              >
                <span className="text-sm font-poppins">A+</span>
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={handleToggleBookmark}
              className="w-9 h-9 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/80 transition-colors border border-white/40 shadow-sm"
              style={{
                color: bookmarked ? currentColor.primary : currentColor.text,
              }}
            >
              {bookmarked ? (
                <BookmarkPlus className="w-4 h-4 fill-current" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white/80 transition-colors border border-white/40 shadow-sm"
              style={{ color: currentColor.text }}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Mark Complete Button */}
            {!completed ? (
              <button
                onClick={handleMarkComplete}
                className="group relative px-6 py-2.5 rounded-xl text-white font-medium transition-all hover:scale-105 ml-2 font-poppins text-sm overflow-hidden shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Mark Complete
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </button>
            ) : (
              <div className="relative group ml-2">
                <span className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white font-poppins text-sm shadow-md">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </span>
                <button
                  onClick={() => {
                    setCompleted(false);
                    // Optional: Add API call to unmark
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200 hover:bg-gray-50"
                >
                  <RotateCcw className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          currentChapterSlug={slug || ""}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentColor={currentColor}
        />

        {/* Main content */}
        <div
          className={`flex-1 transition-all duration-300 min-w-0 ${
            sidebarOpen ? "lg:ml-80" : "lg:ml-24"
          }`}
        >
          <main className="max-w-4xl mx-auto w-full p-4 md:p-8 lg:p-12">
            {quizScore !== null ? (
              // Quiz Results
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/50 animate-scale-up">
                <div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-r mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                >
                  <Award className="w-10 h-10 text-white" />
                </div>

                <h2
                  className="text-3xl font-poppins-bold mb-2"
                  style={{ color: currentColor.text }}
                >
                  Quiz Complete!
                </h2>
                <p
                  className="mb-6 font-inter"
                  style={{ color: `${currentColor.text}80` }}
                >
                  You scored{" "}
                  <span
                    className="text-2xl font-poppins-bold"
                    style={{ color: currentColor.primary }}
                  >
                    {quizScore}
                  </span>{" "}
                  out of{" "}
                  <span className="font-poppins-bold">
                    {lesson.quiz?.questions?.length || 1}
                  </span>
                </p>

                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  {lesson.next_chapter_slug && (
                    <button
                      onClick={() =>
                        navigate(`/lesson/${lesson.next_chapter_slug}`)
                      }
                      className="group px-8 py-4 rounded-xl text-white font-poppins-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
                      style={{
                        background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                      }}
                    >
                      Next Lesson
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setQuizScore(null);
                      setShowQuiz(false);
                    }}
                    className="px-8 py-3 rounded-xl font-medium border hover:bg-white/50 transition-colors font-inter"
                    style={{
                      borderColor: currentColor.primary,
                      color: currentColor.primary,
                    }}
                  >
                    Review Lesson
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-8 py-3 rounded-xl font-medium font-inter"
                    style={{ color: `${currentColor.text}60` }}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            ) : !showQuiz ? (
              <>
                {/* Lesson Content - Removed duplicate title since it's in header */}
                <div
                  className="prose max-w-none mb-8 font-inter leading-relaxed"
                  style={{ fontSize: `${fontSize}%` }}
                >
                  <LessonViewer
                    title="" // Empty title to prevent duplication
                    content={lesson.markdown_content}
                    currentColor={currentColor}
                  />
                </div>

                {/* Notes Section - Fixed with better error handling */}
                {showNotes ? (
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 mb-8 animate-scale-up">
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-poppins-bold text-lg"
                        style={{ color: currentColor.text }}
                      >
                        Your Notes
                      </h3>
                      {savedNotes && (
                        <span className="text-xs font-inter bg-green-500/20 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCheck className="w-3 h-3" />
                          Saved
                        </span>
                      )}
                    </div>

                    {/* Error message */}
                    {noteError && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-inter">{noteError}</span>
                      </div>
                    )}

                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Write your notes here... (Markdown supported)"
                      className="w-full h-40 p-4 bg-white/60 border-2 rounded-xl focus:outline-none focus:ring-2 mb-4 font-inter text-base"
                      style={{
                        borderColor:
                          notes !== savedNotes
                            ? currentColor.primary
                            : `${currentColor.primary}40`,
                      }}
                      disabled={isSavingNote}
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setNotes(savedNotes);
                          setShowNotes(false);
                          setNoteError(null);
                        }}
                        className="px-4 py-2 rounded-xl border font-inter hover:bg-white/50 transition-colors"
                        style={{
                          borderColor: currentColor.primary,
                          color: currentColor.primary,
                        }}
                        disabled={isSavingNote}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveNotes}
                        disabled={isSavingNote || notes === savedNotes}
                        className="px-6 py-2 rounded-xl text-white font-poppins flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                        }}
                      >
                        {isSavingNote ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4" />
                            Save Notes
                          </>
                        )}
                      </button>
                    </div>

                    {retryCount > 0 && (
                      <p className="text-xs text-center mt-2 text-gray-500">
                        Retry attempt {retryCount}/3
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-8">
                    <button
                      onClick={() => setShowNotes(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/50 hover:bg-white/70 transition-colors font-inter border border-white/40"
                      style={{ color: currentColor.text }}
                    >
                      <FileText className="w-4 h-4" />
                      {savedNotes ? "Edit Notes" : "Add Notes"}
                    </button>
                    {savedNotes && (
                      <span className="text-xs font-inter bg-green-500/20 text-green-600 px-3 py-1.5 rounded-full flex items-center gap-1">
                        <CheckCheck className="w-3 h-3" />
                        Notes saved
                      </span>
                    )}
                  </div>
                )}

                {/* Quiz Section */}
                {lesson.quiz && (
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/50 text-center">
                    <h3
                      className="text-2xl font-poppins-bold mb-2"
                      style={{ color: currentColor.text }}
                    >
                      Ready to test your knowledge?
                    </h3>
                    <p
                      className="mb-6 font-inter"
                      style={{ color: `${currentColor.text}80` }}
                    >
                      Take a quick quiz to reinforce what you've learned
                    </p>
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-8 py-3 rounded-xl text-white font-poppins-bold transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                      }}
                    >
                      Start Quiz
                    </button>
                  </div>
                )}

                {/* Premium Features */}
                {lesson.title?.includes("Assessment") && (
                  <div className="mt-8">
                    <PremiumFeatures
                      chapterId={slug || ""}
                      questionId="essay1"
                      questionText={
                        lesson.quiz?.questions?.find(
                          (q: any) => q.type === "essay"
                        )?.text ||
                        "Write a detailed essay response based on the module content."
                      }
                    />
                  </div>
                )}
              </>
            ) : (
              // Quiz Active
              <div className="animate-scale-up">
                <button
                  onClick={() => setShowQuiz(false)}
                  className="mb-6 flex items-center gap-2 text-sm hover:underline font-inter"
                  style={{ color: currentColor.primary }}
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Lesson
                </button>
                <Quiz
                  questions={lesson.quiz?.questions || []}
                  onComplete={(score) => {
                    const total = lesson.quiz?.questions?.length || 1;
                    const percentage = Math.round((score / total) * 100);
                    handleMarkComplete(percentage);
                    setQuizScore(score);
                  }}
                  currentColor={currentColor}
                />
              </div>
            )}
          </main>

          {/* Footer Navigation */}
          <footer className="border-t border-white/50 bg-white/30 backdrop-blur-sm px-8 py-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <button
                onClick={() =>
                  lesson.prev_chapter_slug &&
                  navigate(`/lesson/${lesson.prev_chapter_slug}`)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-inter ${
                  lesson.prev_chapter_slug
                    ? "hover:bg-white/50 cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                }`}
                style={{ color: currentColor.text }}
                disabled={!lesson.prev_chapter_slug}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Previous</span>
              </button>

              <span
                className="text-xs font-inter"
                style={{ color: `${currentColor.text}40` }}
              >
                {lesson.chapter_number} / {lesson.total_chapters}
              </span>

              <button
                onClick={() =>
                  lesson.next_chapter_slug &&
                  navigate(`/lesson/${lesson.next_chapter_slug}`)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-inter ${
                  lesson.next_chapter_slug
                    ? "hover:bg-white/50 cursor-pointer"
                    : "opacity-30 cursor-not-allowed"
                }`}
                style={{ color: currentColor.text }}
                disabled={!lesson.next_chapter_slug}
              >
                <span className="text-sm font-medium">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* AI Tutor Floating Widget */}
      <AITutor
        context={lesson.markdown_content || ""}
        currentColor={currentColor}
      />
    </div>
  );
};

export default Lesson;
