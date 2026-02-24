import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Circle,
  Lock,
  BookOpen,
  Sparkles,
  LogOut,
  Menu,
  X,
  User,
  PlayCircle,
  Award,
  Clock,
  Heart,
  Sun,
  Smile,
  Coffee,
  Music,
  Palette,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

interface SidebarProps {
  currentChapterSlug: string;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
  currentColor?: {
    primary: string;
    secondary: string;
    text: string;
    bg: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({
  currentChapterSlug,
  sidebarOpen = true,
  setSidebarOpen,
  currentColor = {
    primary: "#FF9A8B",
    secondary: "#FF6B6B",
    text: "#4A3F3D",
    bg: "#FFF1F0",
  },
}) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [userName, setUserName] = useState("Learner");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activeColor, setActiveColor] = useState("peach");

  const colors = {
    peach: {
      primary: "#FF9A8B",
      secondary: "#FF6B6B",
      light: "#FFE5D9",
      bg: "#FFF1F0",
      text: "#4A3F3D",
    },
    mint: {
      primary: "#84DCC6",
      secondary: "#95E5D1",
      light: "#E0F5F0",
      bg: "#F0FAF7",
      text: "#2C4A42",
    },
    lavender: {
      primary: "#B8A9E6",
      secondary: "#C4B7F0",
      light: "#F0ECFF",
      bg: "#F8F6FF",
      text: "#3F3A5C",
    },
    coral: {
      primary: "#FFB3A6",
      secondary: "#FFC5BB",
      light: "#FFF0ED",
      bg: "#FFF9F7",
      text: "#5C403B",
    },
    sky: {
      primary: "#89CFF0",
      secondary: "#A0D8F5",
      light: "#E6F3FF",
      bg: "#F5FAFF",
      text: "#2C4A5C",
    },
    rose: {
      primary: "#F7CAC9",
      secondary: "#FAD9D8",
      light: "#FFF0F0",
      bg: "#FFF9F9",
      text: "#5C3F42",
    },
  };

  const themeColor = colors[activeColor as keyof typeof colors] || currentColor;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const listRes = await api.get("/courses/");
        const courseList = listRes.data || [];

        try {
          const userRes = await api.get("/users/me");
          setUserName(userRes.data.full_name || "Learner");
        } catch (err) {
          console.log("User not authenticated");
        }

        const structurePromises = courseList.map((c: any) =>
          api.get(`/courses/${c.slug}/structure`).catch(() => null)
        );
        const structures = await Promise.all(structurePromises);
        const coursesWithModules = structures
          .filter((r: any) => r !== null)
          .map((r: any) => r.data);
        setCourses(coursesWithModules);

        try {
          const progressRes = await api.get("/users/me/progress/summary");
          setProgress(progressRes.data.percentage || 0);
        } catch (err) {
          console.log("Progress not found");
        }

        if (coursesWithModules.length > 0 && coursesWithModules[0].modules) {
          const allModIds = coursesWithModules[0].modules.map((m: any) => m.id);
          setExpandedModules(allModIds);
        }
      } catch (err) {
        console.error("Failed to fetch sidebar data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const toggleModule = (modId: string) => {
    if (expandedModules.includes(modId)) {
      setExpandedModules(expandedModules.filter((id) => id !== modId));
    } else {
      setExpandedModules([...expandedModules, modId]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getChapterIcon = (chapter: any) => {
    if (chapter.is_premium)
      return (
        <Lock className="w-3.5 h-3.5" style={{ color: themeColor.primary }} />
      );
    if (chapter.completed)
      return (
        <CheckCircle
          className="w-3.5 h-3.5"
          style={{ color: themeColor.primary }}
        />
      );
    if (chapter.slug === currentChapterSlug)
      return (
        <PlayCircle
          className="w-3.5 h-3.5"
          style={{ color: themeColor.primary }}
        />
      );
    return (
      <Circle
        className="w-3.5 h-3.5"
        style={{ color: `${themeColor.text}30` }}
      />
    );
  };

  if (loading) {
    return (
      <div
        style={{ backgroundColor: themeColor.bg }}
        className="fixed left-0 top-0 h-full w-80 border-r border-white/30 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="relative">
            <div
              className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
              style={{ borderColor: themeColor.primary }}
            ></div>
            <Sparkles
              className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{ color: themeColor.primary }}
            />
          </div>
          <p className="text-xs" style={{ color: themeColor.text }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  const course = courses[0];
  if (!course) return null;

  const colorOptions = [
    { id: "peach", icon: <Sun className="w-3 h-3" />, color: "#FF9A8B" },
    { id: "mint", icon: <Smile className="w-3 h-3" />, color: "#84DCC6" },
    { id: "lavender", icon: <Heart className="w-3 h-3" />, color: "#B8A9E6" },
    { id: "coral", icon: <Coffee className="w-3 h-3" />, color: "#FFB3A6" },
    { id: "sky", icon: <Music className="w-3 h-3" />, color: "#89CFF0" },
    { id: "rose", icon: <Palette className="w-3 h-3" />, color: "#F7CAC9" },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-xl">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-10"
          style={{ backgroundColor: themeColor.primary }}
        />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: themeColor.secondary }}
        />
      </div>

      {/* Logo */}
      <div className="relative p-6 border-b border-white/50">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${themeColor.primary}, ${themeColor.secondary})`,
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span
              className="text-lg font-bold"
              style={{ color: themeColor.text }}
            >
              Synapse Tutor
            </span>
            <p
              className="text-[10px]"
              style={{ color: `${themeColor.text}60` }}
            >
              learning platform
            </p>
          </div>
        </div>
      </div>

      {/* User profile */}
      <div className="relative p-4 border-b border-white/50">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-medium"
            style={{
              background: `linear-gradient(135deg, ${themeColor.primary}, ${themeColor.secondary})`,
            }}
          >
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-medium"
              style={{ color: themeColor.text }}
            >
              {userName}
            </p>
            <p className="text-xs" style={{ color: `${themeColor.text}60` }}>
              Student
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span style={{ color: `${themeColor.text}60` }}>
              Course Progress
            </span>
            <span style={{ color: themeColor.primary }}>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${themeColor.primary}, ${themeColor.secondary})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Course title */}
      <div className="relative p-4 border-b border-white/50">
        <h3
          className="font-bold text-sm mb-1"
          style={{ color: themeColor.text }}
        >
          {course.title}
        </h3>
        <p className="text-xs" style={{ color: `${themeColor.text}60` }}>
          Course Content
        </p>
      </div>

      {/* Modules */}
      <div className="relative flex-1 overflow-y-auto p-4 space-y-3">
        {course.modules?.map((module: any) => {
          const completedChapters =
            module.chapters?.filter((c: any) => c.completed).length || 0;
          const totalChapters = module.chapters?.length || 0;

          return (
            <div key={module.id} className="space-y-1">
              <button
                onClick={() => toggleModule(module.id)}
                className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-white/30 transition-all"
                style={{ color: themeColor.text }}
              >
                <div className="flex-1">
                  <span className="text-xs font-medium">{module.title}</span>
                  {totalChapters > 0 && (
                    <p
                      className="text-[10px] mt-0.5"
                      style={{ color: `${themeColor.text}50` }}
                    >
                      {completedChapters}/{totalChapters} lessons
                    </p>
                  )}
                </div>
                {expandedModules.includes(module.id) ? (
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                )}
              </button>

              {expandedModules.includes(module.id) && (
                <div className="ml-2 space-y-0.5">
                  {module.chapters?.map((chapter: any) => {
                    const isActive = chapter.slug === currentChapterSlug;

                    return (
                      <button
                        key={chapter.id}
                        onClick={() => {
                          navigate(`/lesson/${chapter.slug}`);
                          setShowMobileSidebar(false);
                        }}
                        className={`w-full flex items-center gap-2 p-2 rounded-xl text-xs transition-all ${
                          isActive ? "bg-white/50" : "hover:bg-white/30"
                        }`}
                        style={{
                          color: isActive
                            ? themeColor.primary
                            : themeColor.text,
                        }}
                      >
                        <span className="flex-shrink-0">
                          {getChapterIcon(chapter)}
                        </span>
                        <span className="truncate text-left flex-1">
                          {chapter.title}
                        </span>
                        {chapter.is_premium && (
                          <span
                            className="text-[8px] px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: `${themeColor.primary}20`,
                              color: themeColor.primary,
                            }}
                          >
                            PRO
                          </span>
                        )}
                        {chapter.completed && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-600">
                            DONE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div className="relative p-4 border-t border-white/50">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div
              className="text-sm font-bold"
              style={{ color: themeColor.text }}
            >
              {course.modules?.length || 0}
            </div>
            <div
              className="text-[9px]"
              style={{ color: `${themeColor.text}50` }}
            >
              Modules
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-sm font-bold"
              style={{ color: themeColor.text }}
            >
              {course.modules?.reduce(
                (acc: number, m: any) => acc + (m.chapters?.length || 0),
                0
              ) || 0}
            </div>
            <div
              className="text-[9px]"
              style={{ color: `${themeColor.text}50` }}
            >
              Lessons
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-sm font-bold"
              style={{ color: themeColor.primary }}
            >
              {Math.round(progress)}%
            </div>
            <div
              className="text-[9px]"
              style={{ color: `${themeColor.text}50` }}
            >
              Complete
            </div>
          </div>
        </div>

        {/* Color selector */}
        <div className="flex items-center justify-center gap-1 bg-white/30 p-1 rounded-lg">
          {colorOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveColor(option.id)}
              className={`w-5 h-5 rounded-md transition-all flex items-center justify-center ${
                activeColor === option.id
                  ? "scale-110 shadow-md"
                  : "opacity-50 hover:opacity-100"
              }`}
              style={{ backgroundColor: option.color }}
            >
              <span className="text-white">{option.icon}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="relative p-4 border-t border-white/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-xl hover:bg-white/30 transition-all"
          style={{ color: themeColor.text }}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        className="lg:hidden fixed top-3 left-3 z-50 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border border-white/50"
        style={{ color: themeColor.text }}
      >
        {showMobileSidebar ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Desktop sidebar - Enhanced width */}
      <div
        className={`hidden lg:block fixed left-0 top-0 h-full ${
          sidebarOpen ? "w-80" : "w-24"
        } bg-white/70 backdrop-blur-xl border-r border-white/50 transition-all duration-300 z-30 overflow-hidden`}
      >
        {sidebarOpen ? (
          <SidebarContent />
        ) : (
          <div className="h-full flex flex-col items-center pt-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg mb-8"
              style={{
                background: `linear-gradient(135deg, ${themeColor.primary}, ${themeColor.secondary})`,
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            {course.modules?.map((module: any) => (
              <div key={module.id} className="relative group mb-4">
                <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                  <BookOpen
                    className="w-4 h-4"
                    style={{ color: themeColor.text }}
                  />
                </div>
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                  {module.title}
                </div>
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="absolute bottom-4 w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center"
            >
              <LogOut className="w-4 h-4" style={{ color: themeColor.text }} />
            </button>

            {setSidebarOpen && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="absolute -right-3 top-20 w-6 h-6 bg-white rounded-full border border-white/50 flex items-center justify-center shadow-md"
                style={{ color: themeColor.text }}
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Mobile sidebar */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-xl border-r border-white/50 z-50 animate-slide-in">
            <SidebarContent />
          </div>
        </div>
      )}

      <style>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
    </>
  );
};

export default Sidebar;
