import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  BookOpen,
  CheckCircle,
  TrendingUp,
  Clock,
  Award,
  LogOut,
  Sparkles,
  Sun,
  Smile,
  Coffee,
  Music,
  Palette,
  Heart,
  ChevronRight,
  PlayCircle,
  Calendar,
  Star,
  Users,
  Zap,
  Target,
  Trophy,
  Medal,
  Crown,
  Gem,
  Rocket,
  Flame,
  Gift,
  Bell,
  Settings,
  User,
  BarChart3,
  MessageCircle,
  Share2,
  Download,
  BookmarkPlus,
  RefreshCw,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Bookmark,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Moon,
  Sun as SunIcon,
  Youtube,
  Video,
  Play,
  ThumbsUp as ThumbsUpIcon,
  Eye,
  Clock as ClockIcon,
  Grid,
  List,
  Filter,
  Search,
  Home,
  Compass,
  Layers,
  Code,
  Brain,
  Cpu,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle as MessageCircleIcon,
} from "lucide-react";

interface CourseDashboard {
  course: {
    title: string;
    slug: string;
    description: string;
    thumbnail?: string;
    instructor?: string;
    level?: string;
    duration?: string;
    category?: string;
    rating?: number;
    students?: number;
  };
  total_chapters: number;
  completed_chapters: number;
  percentage: number;
  next_chapter_slug?: string;
  last_accessed?: string;
  estimated_time?: string;
}

interface Activity {
  id: string;
  type: "course" | "lesson" | "achievement" | "certificate" | "challenge";
  title: string;
  description?: string;
  timestamp: string;
  course_slug?: string;
  lesson_slug?: string;
  points?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  total?: number;
  points?: number;
  rarity?: "common" | "rare" | "epic" | "legendary";
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  level: string;
  duration: string;
  category?: string;
  rating?: number;
  students?: number;
  instructor?: string;
}

// Panaversity YouTube Video Interface
interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  channel: string;
  videoUrl: string;
  category: string;
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: "lesson" | "quiz" | "discussion" | "streak";
  target: number;
  progress: number;
  completed: boolean;
  expiresAt: string;
  reward?: {
    type: "points" | "badge" | "achievement";
    value: string;
  };
}

interface Bookmark {
  id: string;
  title: string;
  type: "lesson" | "course" | "resource";
  slug: string;
  savedAt: string;
}

const Dashboard: React.FC = () => {
  const [dashboards, setDashboards] = useState<CourseDashboard[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [panaversityVideos, setPanaversityVideos] = useState<YouTubeVideo[]>(
    []
  );
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(
    null
  );
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState("peach");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Recommendation | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [userName, setUserName] = useState("Learner");
  const [greeting, setGreeting] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  // 🔴 YAHAN PE AAPKE DIYE HUYE PANAVERSITY LINKS ADD HAIN 🔴
  // Panaversity YouTube Videos with your provided links
  const panaversityVideoList: YouTubeVideo[] = [
    {
      id: "1",
      title: "What is Agentic AI? - Complete Introduction",
      description:
        "Complete introduction to Agentic AI and how it's transforming the future of artificial intelligence. Live session with Q&A.",
      thumbnail: "https://img.youtube.com/vi/PCi_yGfSCeg/maxresdefault.jpg",
      duration: "45:30",
      views: "2.5K",
      likes: 450,
      channel: "Panaversity",
      videoUrl: "https://www.youtube.com/live/PCi_yGfSCeg?si=dxVqWEQ6WxNS2SBt",
      category: "AI Basics",
    },
    {
      id: "2",
      title: "Agentic AI Development Tutorial",
      description:
        "Step-by-step tutorial on building AI agents with modern frameworks. Hands-on coding session.",
      thumbnail: "https://img.youtube.com/vi/BQJ_gwH_ZPo/maxresdefault.jpg",
      duration: "35:20",
      views: "1.8K",
      likes: 320,
      channel: "Panaversity",
      videoUrl: "https://youtu.be/BQJ_gwH_ZPo?si=JcSY79HLbB89JG6I",
      category: "Tutorial",
    },
    {
      id: "3",
      title: "Agentic AI Live Q&A Session",
      description:
        "Live Q&A session about Agentic AI concepts, implementation, and best practices with experts.",
      thumbnail: "https://img.youtube.com/vi/PCi_yGfSCeg/maxresdefault.jpg",
      duration: "50:15",
      views: "1.2K",
      likes: 280,
      channel: "Panaversity",
      videoUrl: "https://www.youtube.com/live/PCi_yGfSCeg?si=dxVqWEQ6WxNS2SBt",
      category: "Live Session",
    },
    {
      id: "4",
      title: "Building AI Agents - Practical Guide",
      description:
        "Practical guide to building your first AI agent with step-by-step instructions and code examples.",
      thumbnail: "https://img.youtube.com/vi/BQJ_gwH_ZPo/maxresdefault.jpg",
      duration: "40:10",
      views: "1.5K",
      likes: 310,
      channel: "Panaversity",
      videoUrl: "https://youtu.be/BQJ_gwH_ZPo?si=JcSY79HLbB89JG6I",
      category: "Tutorial",
    },
    {
      id: "5",
      title: "Agentic AI Fundamentals",
      description:
        "Learn the fundamentals of Agentic AI including core concepts, architecture, and use cases.",
      thumbnail: "https://img.youtube.com/vi/PCi_yGfSCeg/maxresdefault.jpg",
      duration: "38:45",
      views: "1.1K",
      likes: 195,
      channel: "Panaversity",
      videoUrl: "https://www.youtube.com/live/PCi_yGfSCeg?si=dxVqWEQ6WxNS2SBt",
      category: "AI Basics",
    },
    {
      id: "6",
      title: "Advanced Agentic AI Techniques",
      description:
        "Deep dive into advanced techniques for building sophisticated AI agents with real-world applications.",
      thumbnail: "https://img.youtube.com/vi/BQJ_gwH_ZPo/maxresdefault.jpg",
      duration: "42:30",
      views: "980",
      likes: 175,
      channel: "Panaversity",
      videoUrl: "https://youtu.be/BQJ_gwH_ZPo?si=JcSY79HLbB89JG6I",
      category: "Advanced",
    },
  ];

  // Upcoming Events
  const upcomingEvents = [
    {
      id: 1,
      title: "Live Workshop: Building AI Agents",
      date: "Tomorrow, 3:00 PM",
      type: "workshop",
      icon: <Video className="w-4 h-4" />,
    },
    {
      id: 2,
      title: "Q&A Session with AI Experts",
      date: "Friday, 5:00 PM",
      type: "qa",
      icon: <MessageCircleIcon className="w-4 h-4" />,
    },
    {
      id: 3,
      title: "AI Ethics Discussion Panel",
      date: "Next Monday, 2:00 PM",
      type: "panel",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  // Community Leaders
  const communityLeaders = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      avatar: "👩‍🔬",
      contributions: "245 lessons",
    },
    {
      id: 2,
      name: "Prof. James Wilson",
      role: "Ethics Advisor",
      avatar: "👨‍🏫",
      contributions: "189 lessons",
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "ML Engineer",
      avatar: "👩‍💻",
      contributions: "312 lessons",
    },
  ];

  // Learning Resources
  const learningResources = [
    {
      id: 1,
      title: "AI Cheat Sheets",
      description: "Quick reference guides",
      icon: <Layers className="w-5 h-5" />,
      count: 12,
    },
    {
      id: 2,
      title: "Practice Projects",
      description: "Hands-on exercises",
      icon: <Code className="w-5 h-5" />,
      count: 24,
    },
    {
      id: 3,
      title: "Research Papers",
      description: "Latest AI research",
      icon: <Brain className="w-5 h-5" />,
      count: 36,
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch user info
        try {
          const userRes = await api.get("/users/me");
          setUserName(userRes.data.full_name || "Learner");
        } catch (err) {
          console.log("User not authenticated");
        }

        // Fetch courses
        const coursesRes = await api.get("/courses/");
        const dashPromises = coursesRes.data.map((c: any) =>
          api
            .get(`/courses/${c.slug}/dashboard?t=${Date.now()}`)
            .catch(() => null)
        );
        const dashResults = await Promise.all(dashPromises);
        const data = dashResults.filter((r) => r && r.data).map((r) => r.data);
        setDashboards(data);

        // Generate mock activities
        const mockActivities: Activity[] = [];
        data.forEach((dash: CourseDashboard) => {
          if (dash.last_accessed) {
            mockActivities.push({
              id: `act-${dash.course.slug}-${Date.now()}`,
              type: "course",
              title: `Continued ${dash.course.title}`,
              description: `You're making progress in ${dash.course.title}`,
              timestamp: new Date().toISOString(),
              course_slug: dash.course.slug,
              points: 10,
            });
          }
        });

        // Add challenge activity if exists
        if (dailyChallenge && dailyChallenge.completed) {
          mockActivities.push({
            id: `challenge-${Date.now()}`,
            type: "challenge",
            title: "Completed Daily Challenge",
            description: "Earned bonus points!",
            timestamp: new Date().toISOString(),
            points: dailyChallenge.points,
          });
        }

        setActivities(mockActivities.slice(0, 10));

        // Generate mock achievements
        const mockAchievements: Achievement[] = [
          {
            id: "1",
            title: "Quick Starter",
            description: "Complete your first lesson",
            icon: "🚀",
            earned:
              data.length > 0 && data.some((d) => d.completed_chapters > 0),
            progress: data.filter((d) => d.completed_chapters > 0).length,
            total: 1,
            points: 50,
            rarity: "common",
          },
          {
            id: "2",
            title: "Course Explorer",
            description: "Enroll in 3 courses",
            icon: "🔍",
            earned: data.length >= 3,
            progress: Math.min(data.length, 3),
            total: 3,
            points: 100,
            rarity: "rare",
          },
          {
            id: "3",
            title: "Progress Maker",
            description: "Reach 50% completion in any course",
            icon: "📈",
            earned: data.some((d) => d.percentage >= 50),
            progress: data.filter((d) => d.percentage >= 50).length,
            total: 1,
            points: 150,
            rarity: "epic",
          },
          {
            id: "4",
            title: "Streak Master",
            description: "Maintain a 7-day streak",
            icon: "🔥",
            earned: false,
            progress: 3,
            total: 7,
            points: 200,
            rarity: "legendary",
          },
        ];
        setAchievements(mockAchievements);

        // Generate mock recommendations
        const mockRecommendations: Recommendation[] = [
          {
            id: "rec1",
            title: "Advanced AI Agents",
            description:
              "Take your AI agent skills to the next level with advanced techniques and real-world applications",
            slug: "advanced-ai",
            level: "Advanced",
            duration: "8 hours",
            category: "AI",
            rating: 4.8,
            students: 1234,
            instructor: "Dr. Sarah Chen",
          },
          {
            id: "rec2",
            title: "AI Ethics & Safety",
            description:
              "Learn responsible AI development and ethical considerations for AI systems",
            slug: "ai-ethics",
            level: "Intermediate",
            duration: "5 hours",
            category: "Ethics",
            rating: 4.9,
            students: 892,
            instructor: "Prof. James Wilson",
          },
          {
            id: "rec3",
            title: "LLM Fine-tuning",
            description:
              "Master large language models and learn to fine-tune them for specific tasks",
            slug: "llm-finetuning",
            level: "Advanced",
            duration: "10 hours",
            category: "AI",
            rating: 4.7,
            students: 2156,
            instructor: "Dr. Maria Garcia",
          },
        ];
        setRecommendations(mockRecommendations);

        // 🔴 YAHAN PE AAPKE PANAVERSITY VIDEOS SET HO RAHE HAIN 🔴
        // Set Panaversity videos
        setPanaversityVideos(panaversityVideoList);

        // Generate daily challenge
        const challenge: DailyChallenge = {
          id: "challenge-1",
          title: "Complete One Lesson",
          description: "Finish any lesson today to earn bonus points",
          points: 50,
          type: "lesson",
          target: 1,
          progress: Math.floor(Math.random() * 2),
          completed: Math.random() > 0.5,
          expiresAt: new Date(
            new Date().setHours(23, 59, 59, 999)
          ).toISOString(),
          reward: {
            type: "points",
            value: "50",
          },
        };
        setDailyChallenge(challenge);

        // Generate bookmarks
        const mockBookmarks: Bookmark[] = [
          {
            id: "bm1",
            title: "Introduction to AI",
            type: "lesson",
            slug: "intro-to-ai",
            savedAt: new Date().toISOString(),
          },
          {
            id: "bm2",
            title: "Advanced AI Agents",
            type: "course",
            slug: "advanced-ai",
            savedAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setBookmarks(mockBookmarks);

        // Calculate streak and points
        const completedLessons = data.reduce(
          (acc, d) => acc + d.completed_chapters,
          0
        );
        const earnedPoints =
          completedLessons * 10 +
          mockAchievements
            .filter((a) => a.earned)
            .reduce((acc, a) => acc + (a.points || 0), 0) +
          (challenge.completed ? challenge.points : 0);

        setStreak(Math.floor(completedLessons / 3) + 1);
        setPoints(earnedPoints);

        // Set greeting based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleContinueCourse = (slug: string, nextLesson?: string) => {
    if (nextLesson) {
      navigate(`/lesson/${nextLesson}`);
    } else {
      navigate(`/course/${slug}`);
    }
  };

  const handleStartRecommendation = (rec: Recommendation) => {
    setSelectedRecommendation(rec);
    // In a real app, you would enroll the user and navigate
    setTimeout(() => {
      setSelectedRecommendation(null);
      navigate(`/course/${rec.slug}`);
    }, 1500);
  };

  const handleWatchVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    // In a real app, you would open the video in a modal or new tab
    setTimeout(() => {
      setSelectedVideo(null);
      window.open(video.videoUrl, "_blank");
    }, 500);
  };

  const handleStartChallenge = () => {
    if (!dailyChallenge) return;

    setShowChallengeModal(true);

    if (dailyChallenge.type === "lesson" && dashboards.length > 0) {
      // Find first incomplete course
      const incompleteCourse = dashboards.find((d) => d.percentage < 100);
      if (incompleteCourse && incompleteCourse.next_chapter_slug) {
        setTimeout(() => {
          setShowChallengeModal(false);
          navigate(`/lesson/${incompleteCourse.next_chapter_slug}`);
        }, 2000);
      }
    }
  };

  const handleCompleteChallenge = () => {
    if (!dailyChallenge) return;

    const updatedChallenge = {
      ...dailyChallenge,
      completed: true,
      progress: dailyChallenge.target,
    };
    setDailyChallenge(updatedChallenge);
    setPoints((prev) => prev + dailyChallenge.points);

    // Add activity
    const newActivity: Activity = {
      id: `challenge-${Date.now()}`,
      type: "challenge",
      title: "Completed Daily Challenge",
      description: `Earned ${dailyChallenge.points} points`,
      timestamp: new Date().toISOString(),
      points: dailyChallenge.points,
    };
    setActivities((prev) => [newActivity, ...prev]);

    setShowChallengeModal(false);
  };

  const handleToggleBookmark = (item: {
    title: string;
    type: "lesson" | "course" | "resource";
    slug: string;
  }) => {
    const exists = bookmarks.some((b) => b.slug === item.slug);
    if (exists) {
      setBookmarks((prev) => prev.filter((b) => b.slug !== item.slug));
    } else {
      const newBookmark: Bookmark = {
        id: `bm-${Date.now()}`,
        title: item.title,
        type: item.type,
        slug: item.slug,
        savedAt: new Date().toISOString(),
      };
      setBookmarks((prev) => [newBookmark, ...prev]);
    }
  };

  const handleShareCourse = (slug: string, title: string) => {
    const url = `${window.location.origin}/course/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewAchievement = (achievementId: string) => {
    setShowAchievements(true);
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "legendary":
        return "#FFD700";
      case "epic":
        return "#9B30FF";
      case "rare":
        return "#1E90FF";
      default:
        return currentColor.primary;
    }
  };

  const totalProgress =
    dashboards.length > 0
      ? Math.round(
          dashboards.reduce((acc, d) => acc + d.percentage, 0) /
            dashboards.length
        )
      : 0;

  const completedLessons = dashboards.reduce(
    (acc, d) => acc + d.completed_chapters,
    0
  );
  const totalLessons = dashboards.reduce((acc, d) => acc + d.total_chapters, 0);
  const completedCourses = dashboards.filter((d) => d.percentage >= 100).length;

  // Filter videos based on search
  const filteredVideos = panaversityVideos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Sparkles
              className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{ color: currentColor.primary }}
            />
          </div>
          <p style={{ color: currentColor.text }}>
            Loading your creative space...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ backgroundColor: currentColor.bg }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 max-w-md text-center shadow-xl">
          <AlertCircle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: currentColor.primary }}
          />
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: currentColor.text }}
          >
            Oops!
          </h2>
          <p className="mb-6" style={{ color: `${currentColor.text}80` }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: currentColor.bg }}
      className="min-h-screen transition-colors duration-500"
    >
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
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-5 animate-float animation-delay-4000"
          style={{ backgroundColor: currentColor.accent }}
        />
      </div>

      {/* Recommendation Modal */}
      {selectedRecommendation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50 animate-scale-up">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-2xl bg-gradient-to-r mx-auto mb-4 flex items-center justify-center text-4xl"
                style={{
                  background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                }}
              >
                {selectedRecommendation.thumbnail || "📚"}
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: currentColor.text }}
              >
                Enrolling in
              </h3>
              <p
                className="text-lg mb-4"
                style={{ color: currentColor.primary }}
              >
                {selectedRecommendation.title}
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <RefreshCw
                  className="w-5 h-5 animate-spin"
                  style={{ color: currentColor.primary }}
                />
                <span style={{ color: currentColor.text }}>
                  Preparing your course...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 max-w-md w-full shadow-2xl border border-white/50 animate-scale-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: currentColor.text }}>
                Opening Video
              </h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded-lg hover:bg-white/50"
              >
                <X className="w-5 h-5" style={{ color: currentColor.text }} />
              </button>
            </div>
            <div className="text-center">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
              <p
                className="font-medium mb-2"
                style={{ color: currentColor.text }}
              >
                {selectedVideo.title}
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Youtube className="w-5 h-5 text-red-500" />
                <span
                  className="text-sm"
                  style={{ color: `${currentColor.text}60` }}
                >
                  Opening in YouTube...
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <RefreshCw
                  className="w-4 h-4 animate-spin"
                  style={{ color: currentColor.primary }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Modal */}
      {showChallengeModal && dailyChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50 animate-scale-up">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-2xl bg-gradient-to-r mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                }}
              >
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: currentColor.text }}
              >
                Daily Challenge
              </h3>
              <p
                className="text-lg mb-2"
                style={{ color: currentColor.primary }}
              >
                {dailyChallenge.title}
              </p>
              <p className="mb-4" style={{ color: `${currentColor.text}80` }}>
                {dailyChallenge.description}
              </p>

              {!dailyChallenge.completed ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: currentColor.text }}>Progress</span>
                    <span style={{ color: currentColor.primary }}>
                      {dailyChallenge.progress}/{dailyChallenge.target}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${
                          (dailyChallenge.progress / dailyChallenge.target) *
                          100
                        }%`,
                        background: `linear-gradient(90deg, ${currentColor.primary}, ${currentColor.secondary})`,
                      }}
                    />
                  </div>
                  <button
                    onClick={handleCompleteChallenge}
                    className="w-full py-3 rounded-xl text-white font-medium mt-4"
                    style={{
                      background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                    }}
                  >
                    Complete Challenge
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <CheckCircle
                    className="w-12 h-12 mx-auto mb-3"
                    style={{ color: currentColor.primary }}
                  />
                  <p
                    className="text-lg font-bold mb-2"
                    style={{ color: currentColor.text }}
                  >
                    Challenge Completed!
                  </p>
                  <p
                    className="mb-4"
                    style={{ color: `${currentColor.text}80` }}
                  >
                    You earned {dailyChallenge.points} points
                  </p>
                  <button
                    onClick={() => setShowChallengeModal(false)}
                    className="px-6 py-2 rounded-xl border"
                    style={{
                      borderColor: currentColor.primary,
                      color: currentColor.primary,
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold"
                style={{ color: currentColor.text }}
              >
                Your Achievements
              </h2>
              <button
                onClick={() => setShowAchievements(false)}
                className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center hover:bg-white/70"
              >
                <X className="w-4 h-4" style={{ color: currentColor.text }} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl border ${
                    ach.earned ? "bg-white/50" : "bg-white/30 opacity-50"
                  }`}
                  style={{
                    borderColor: ach.earned
                      ? currentColor.primary
                      : `${currentColor.text}20`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-2xl">
                      {ach.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className="font-bold text-sm"
                          style={{ color: currentColor.text }}
                        >
                          {ach.title}
                        </p>
                        {ach.rarity && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor:
                                getRarityColor(ach.rarity) + "20",
                              color: getRarityColor(ach.rarity),
                            }}
                          >
                            {ach.rarity}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-xs mb-2"
                        style={{ color: `${currentColor.text}60` }}
                      >
                        {ach.description}
                      </p>
                      {ach.total && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span style={{ color: `${currentColor.text}40` }}>
                              Progress
                            </span>
                            <span style={{ color: currentColor.primary }}>
                              {ach.progress}/{ach.total}
                            </span>
                          </div>
                          <div className="w-full h-1 bg-white/50 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${
                                  ((ach.progress || 0) / ach.total) * 100
                                }%`,
                                backgroundColor: ach.earned
                                  ? currentColor.primary
                                  : `${currentColor.text}30`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {ach.points && ach.earned && (
                        <p className="text-xs mt-2 flex items-center gap-1">
                          <Gem
                            className="w-3 h-3"
                            style={{ color: currentColor.primary }}
                          />
                          <span style={{ color: currentColor.primary }}>
                            {ach.points} points
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks Modal */}
      {showBookmarks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold"
                style={{ color: currentColor.text }}
              >
                Your Bookmarks
              </h2>
              <button
                onClick={() => setShowBookmarks(false)}
                className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center hover:bg-white/70"
              >
                <X className="w-4 h-4" style={{ color: currentColor.text }} />
              </button>
            </div>

            {bookmarks.length === 0 ? (
              <div className="text-center py-8">
                <Bookmark
                  className="w-16 h-16 mx-auto mb-3"
                  style={{ color: `${currentColor.text}30` }}
                />
                <p style={{ color: currentColor.text }}>No bookmarks yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="flex items-center justify-between p-3 bg-white/50 rounded-xl cursor-pointer hover:bg-white/70 transition-colors"
                    onClick={() => {
                      setShowBookmarks(false);
                      navigate(
                        bm.type === "lesson"
                          ? `/lesson/${bm.slug}`
                          : `/course/${bm.slug}`
                      );
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Bookmark
                        className="w-4 h-4"
                        style={{ color: currentColor.primary }}
                      />
                      <div>
                        <p
                          className="font-medium text-sm"
                          style={{ color: currentColor.text }}
                        >
                          {bm.title}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: `${currentColor.text}60` }}
                        >
                          {bm.type} •{" "}
                          {new Date(bm.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <ExternalLink
                      className="w-4 h-4"
                      style={{ color: `${currentColor.text}40` }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 md:mb-8 gap-2">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{
                background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
              }}
              onClick={() => navigate("/dashboard")}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span
                className="text-2xl font-bold"
                style={{ color: currentColor.text }}
              >
                Synapse Tutor
              </span>
              <p
                className="text-xs"
                style={{ color: `${currentColor.text}60` }}
              >
                learning platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm border border-white/50 focus:outline-none focus:ring-2 text-sm w-64"
                style={{ focusRingColor: currentColor.primary }}
              />
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: `${currentColor.text}60` }}
              />
            </div>

            {/* Color selector */}
            <div className="hidden sm:flex items-center gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-xl">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveColor(option.id)}
                  className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center ${
                    activeColor === option.id
                      ? "scale-110 shadow-lg"
                      : "opacity-50 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: option.color }}
                  title={`Switch to ${option.id} theme`}
                >
                  <span className="text-white">{option.icon}</span>
                </button>
              ))}
            </div>

            {/* Bookmarks */}
            <button
              onClick={() => setShowBookmarks(true)}
              className="relative w-10 h-10 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/70 transition-colors"
              title="Bookmarks"
            >
              <Bookmark
                className="w-5 h-5"
                style={{ color: currentColor.text }}
              />
              {bookmarks.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center text-white"
                  style={{ background: currentColor.primary }}
                >
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/70 transition-colors"
                title="Notifications"
              >
                <Bell
                  className="w-5 h-5"
                  style={{ color: currentColor.text }}
                />
                {activities.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {activities.length}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 z-50">
                  <div className="p-4 border-b border-white/50 flex items-center justify-between">
                    <h3
                      className="font-bold"
                      style={{ color: currentColor.text }}
                    >
                      Recent Activity
                    </h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs hover:underline"
                      style={{ color: currentColor.primary }}
                    >
                      Close
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {activities.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell
                          className="w-12 h-12 mx-auto mb-3"
                          style={{ color: `${currentColor.text}30` }}
                        />
                        <p style={{ color: `${currentColor.text}60` }}>
                          No recent activity
                        </p>
                      </div>
                    ) : (
                      activities.map((act) => (
                        <div
                          key={act.id}
                          className="p-4 border-b border-white/30 hover:bg-white/50 transition-colors cursor-pointer"
                          onClick={() => {
                            setShowNotifications(false);
                            if (act.course_slug)
                              navigate(`/course/${act.course_slug}`);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center">
                              {act.type === "course" && (
                                <BookOpen
                                  className="w-4 h-4"
                                  style={{ color: currentColor.primary }}
                                />
                              )}
                              {act.type === "achievement" && (
                                <Trophy
                                  className="w-4 h-4"
                                  style={{ color: currentColor.primary }}
                                />
                              )}
                              {act.type === "challenge" && (
                                <Flame
                                  className="w-4 h-4"
                                  style={{ color: currentColor.primary }}
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className="text-sm font-medium"
                                style={{ color: currentColor.text }}
                              >
                                {act.title}
                              </p>
                              {act.description && (
                                <p
                                  className="text-xs"
                                  style={{ color: `${currentColor.text}60` }}
                                >
                                  {act.description}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-1">
                                <span
                                  className="text-xs"
                                  style={{ color: `${currentColor.text}40` }}
                                >
                                  {new Date(act.timestamp).toLocaleDateString()}
                                </span>
                                {act.points && (
                                  <span
                                    className="text-xs flex items-center gap-1"
                                    style={{ color: currentColor.primary }}
                                  >
                                    <Gem className="w-3 h-3" />+{act.points}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button
              onClick={() => navigate("/settings")}
              className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/70 transition-colors"
              title="Settings"
            >
              <Settings
                className="w-5 h-5"
                style={{ color: currentColor.text }}
              />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/70 transition-colors"
              title="Logout"
            >
              <LogOut
                className="w-5 h-5"
                style={{ color: currentColor.text }}
              />
            </button>
          </div>
        </div>

        {/* Copy notification */}
        {copied && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-slide-in">
            <Check className="w-4 h-4" />
            <span>Link copied to clipboard!</span>
          </div>
        )}

        {/* Welcome section with streak */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              className="text-5xl font-bold mb-2"
              style={{ color: currentColor.text }}
            >
              {greeting}, {userName.split(" ")[0]}! 👋
            </h1>
            <p className="text-lg" style={{ color: `${currentColor.text}80` }}>
              {dashboards.length > 0
                ? `You've completed ${completedLessons} lessons so far. Keep going!`
                : "Ready to start your learning journey?"}
            </p>
          </div>

          {/* Streak and points */}
          <div className="flex items-center gap-3">
            <div
              className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowAchievements(true)}
              title="View achievements"
            >
              <Flame className="w-5 h-5" style={{ color: "#FF6B6B" }} />
              <span className="font-bold" style={{ color: currentColor.text }}>
                {streak} day streak
              </span>
            </div>
            <div
              className="bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowAchievements(true)}
              title="View points"
            >
              <Gem
                className="w-5 h-5"
                style={{ color: currentColor.primary }}
              />
              <span className="font-bold" style={{ color: currentColor.text }}>
                {points} points
              </span>
            </div>
          </div>
        </div>

        {/* AI Tutor Banner */}
        <div
          className="mb-8 bg-gradient-to-r from-[#B8A9E6]/90 to-[#84DCC6]/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 cursor-pointer hover:scale-[1.01] transition-all shadow-lg"
          onClick={() => navigate("/tutor")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  AI Tutor Chat
                </h3>
                <p className="text-white/80 text-sm">
                  Get instant explanations, quizzes, and study help from your
                  personal AI tutor
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Try Now
              </span>
              <ChevronRight className="w-5 h-5 text-white/60" />
            </div>
          </div>
        </div>

        {/* Stats grid - 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-transform cursor-pointer"
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center">
                <Target
                  className="w-5 h-5"
                  style={{ color: currentColor.primary }}
                />
              </div>
              <span
                className="text-sm"
                style={{ color: `${currentColor.text}80` }}
              >
                Overall Progress
              </span>
            </div>
            <div
              className="text-3xl font-bold"
              style={{ color: currentColor.text }}
            >
              {totalProgress}%
            </div>
          </div>

          <div
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center">
                <BookOpen
                  className="w-5 h-5"
                  style={{ color: currentColor.primary }}
                />
              </div>
              <span
                className="text-sm"
                style={{ color: `${currentColor.text}80` }}
              >
                Lessons Done
              </span>
            </div>
            <div
              className="text-3xl font-bold"
              style={{ color: currentColor.text }}
            >
              {completedLessons}/{totalLessons}
            </div>
          </div>

          <div
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setShowAchievements(true)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center">
                <Trophy
                  className="w-5 h-5"
                  style={{ color: currentColor.primary }}
                />
              </div>
              <span
                className="text-sm"
                style={{ color: `${currentColor.text}80` }}
              >
                Achievements
              </span>
            </div>
            <div
              className="text-3xl font-bold"
              style={{ color: currentColor.text }}
            >
              {achievements.filter((a) => a.earned).length}/
              {achievements.length}
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-transform cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center">
                <Award
                  className="w-5 h-5"
                  style={{ color: currentColor.primary }}
                />
              </div>
              <span
                className="text-sm"
                style={{ color: `${currentColor.text}80` }}
              >
                Certificates
              </span>
            </div>
            <div
              className="text-3xl font-bold"
              style={{ color: currentColor.text }}
            >
              {completedCourses}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/30 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "courses"
                ? "bg-white/50 shadow-md"
                : "hover:bg-white/30"
            }`}
            style={{ color: currentColor.text }}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            My Courses
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "videos"
                ? "bg-white/50 shadow-md"
                : "hover:bg-white/30"
            }`}
            style={{ color: currentColor.text }}
          >
            <Youtube className="w-4 h-4 inline mr-2 text-red-500" />
            Panaversity Videos
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "community"
                ? "bg-white/50 shadow-md"
                : "hover:bg-white/30"
            }`}
            style={{ color: currentColor.text }}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Community
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "resources"
                ? "bg-white/50 shadow-md"
                : "hover:bg-white/30"
            }`}
            style={{ color: currentColor.text }}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Resources
          </button>
        </div>

        {/* Main Content Based on Tab */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Left column - Courses (2/3 width) */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Continue Learning */}
              <div>
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: currentColor.text }}
                >
                  Continue Learning
                </h2>

                {dashboards.length === 0 ? (
                  <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-12 text-center border border-white/50">
                    <Rocket
                      className="w-20 h-20 mx-auto mb-4"
                      style={{ color: `${currentColor.text}30` }}
                    />
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: currentColor.text }}
                    >
                      No courses yet
                    </h3>
                    <p
                      className="mb-6"
                      style={{ color: `${currentColor.text}80` }}
                    >
                      Start your learning journey by exploring our courses
                    </p>
                    <button
                      onClick={() => navigate("/discover")}
                      className="px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                      }}
                    >
                      Explore Courses
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dashboards.map((dash) => {
                      if (!dash || !dash.course) return null;
                      return (
                        <div
                          key={dash.course.slug}
                          className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-[1.02] transition-all cursor-pointer shadow-lg hover:shadow-xl"
                          onClick={() =>
                            handleContinueCourse(
                              dash.course.slug,
                              dash.next_chapter_slug
                            )
                          }
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                              style={{
                                background: `${currentColor.primary}20`,
                              }}
                            >
                              {dash.course.thumbnail || "📚"}
                            </div>
                            <span
                              className="text-sm font-medium px-3 py-1 rounded-full"
                              style={{
                                background: `${currentColor.primary}20`,
                                color: currentColor.primary,
                              }}
                            >
                              {Math.round(dash.percentage)}%
                            </span>
                          </div>

                          <h3
                            className="text-xl font-bold mb-2"
                            style={{ color: currentColor.text }}
                          >
                            {dash.course.title}
                          </h3>

                          {dash.course.instructor && (
                            <p className="text-xs mb-2 flex items-center gap-1">
                              <User
                                className="w-3 h-3"
                                style={{ color: currentColor.primary }}
                              />
                              <span style={{ color: `${currentColor.text}60` }}>
                                {dash.course.instructor}
                              </span>
                            </p>
                          )}

                          <p
                            className="text-sm mb-4 line-clamp-2"
                            style={{ color: `${currentColor.text}80` }}
                          >
                            {dash.course.description}
                          </p>

                          {/* Progress bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span style={{ color: `${currentColor.text}60` }}>
                                Progress
                              </span>
                              <span style={{ color: currentColor.primary }}>
                                {dash.percentage}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${dash.percentage}%`,
                                  background: `linear-gradient(90deg, ${currentColor.primary}, ${currentColor.secondary})`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Course meta */}
                          <div
                            className="flex items-center gap-3 mb-4 text-xs flex-wrap"
                            style={{ color: `${currentColor.text}60` }}
                          >
                            <div className="flex items-center gap-1">
                              <CheckCircle
                                className="w-3 h-3"
                                style={{ color: currentColor.primary }}
                              />
                              <span>
                                {dash.completed_chapters}/{dash.total_chapters}
                              </span>
                            </div>
                            {dash.course.level && (
                              <div className="flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                <span>{dash.course.level}</span>
                              </div>
                            )}
                            {dash.course.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{dash.course.duration}</span>
                              </div>
                            )}
                            {dash.course.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span>{dash.course.rating}</span>
                              </div>
                            )}
                          </div>

                          {/* Continue button */}
                          <div className="flex items-center justify-between">
                            {dash.last_accessed && (
                              <span
                                className="text-xs"
                                style={{ color: `${currentColor.text}40` }}
                              >
                                Last:{" "}
                                {new Date(
                                  dash.last_accessed
                                ).toLocaleDateString()}
                              </span>
                            )}
                            <div className="flex items-center gap-2 ml-auto">
                              <div
                                className="flex items-center gap-1 text-sm font-medium"
                                style={{ color: currentColor.primary }}
                              >
                                {dash.next_chapter_slug ? (
                                  <>
                                    Continue
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </>
                                ) : (
                                  <>
                                    Completed
                                    <Award className="w-4 h-4 ml-1" />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recommended Courses */}
              {recommendations.length > 0 && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ color: currentColor.text }}
                  >
                    Recommended for You
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.slice(0, 3).map((rec) => (
                      <div
                        key={rec.id}
                        className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:scale-105 transition-all cursor-pointer group"
                        onClick={() => handleStartRecommendation(rec)}
                      >
                        <div className="text-3xl mb-2">
                          {rec.thumbnail || "📖"}
                        </div>
                        <h4
                          className="font-semibold text-sm mb-1"
                          style={{ color: currentColor.text }}
                        >
                          {rec.title}
                        </h4>
                        <p
                          className="text-xs mb-2 line-clamp-2"
                          style={{ color: `${currentColor.text}60` }}
                        >
                          {rec.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          <span
                            className="px-2 py-0.5 rounded-full"
                            style={{
                              background: `${currentColor.primary}20`,
                              color: currentColor.primary,
                            }}
                          >
                            {rec.level}
                          </span>
                          <span style={{ color: `${currentColor.text}40` }}>
                            {rec.duration}
                          </span>
                          {rec.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span style={{ color: currentColor.text }}>
                                {rec.rating}
                              </span>
                            </span>
                          )}
                        </div>
                        {rec.instructor && (
                          <p className="text-xs mt-2 flex items-center gap-1">
                            <User
                              className="w-3 h-3"
                              style={{ color: currentColor.primary }}
                            />
                            <span style={{ color: `${currentColor.text}60` }}>
                              {rec.instructor}
                            </span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Daily Challenge & Achievements */}
            <div className="space-y-6">
              {/* Daily challenge */}
              {dailyChallenge && (
                <div
                  className="rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                  onClick={handleStartChallenge}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg">Daily Challenge</h3>
                    <Flame className="w-6 h-6 text-yellow-300" />
                  </div>
                  <p className="text-sm mb-2 opacity-90">
                    {dailyChallenge.title}
                  </p>
                  <p className="text-xs mb-4 opacity-80">
                    {dailyChallenge.description}
                  </p>

                  {!dailyChallenge.completed ? (
                    <>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>
                          {dailyChallenge.progress}/{dailyChallenge.target}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-white rounded-full transition-all"
                          style={{
                            width: `${
                              (dailyChallenge.progress /
                                dailyChallenge.target) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">
                          {dailyChallenge.points} points
                        </span>
                        <button className="px-4 py-2 bg-white/20 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                          Start Now
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-2">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        Completed! +{dailyChallenge.points} points
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Achievements preview */}
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="font-bold"
                    style={{ color: currentColor.text }}
                  >
                    Achievements
                  </h3>
                  <button
                    onClick={() => setShowAchievements(true)}
                    className="text-sm hover:underline"
                    style={{ color: currentColor.primary }}
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {achievements.slice(0, 3).map((ach) => (
                    <div key={ach.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-2xl">
                        {ach.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className="font-medium text-sm"
                          style={{ color: currentColor.text }}
                        >
                          {ach.title}
                        </p>
                        <p
                          className="text-xs mb-1"
                          style={{ color: `${currentColor.text}60` }}
                        >
                          {ach.description}
                        </p>
                        {ach.total && (
                          <div className="w-full h-1 bg-white/50 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${
                                  ((ach.progress || 0) / ach.total) * 100
                                }%`,
                                backgroundColor: ach.earned
                                  ? currentColor.primary
                                  : `${currentColor.text}30`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                      {ach.earned && (
                        <Trophy
                          className="w-4 h-4"
                          style={{ color: currentColor.primary }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h3
                  className="font-bold mb-4"
                  style={{ color: currentColor.text }}
                >
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-3 p-3 bg-white/30 rounded-xl hover:bg-white/50 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: currentColor.text }}
                        >
                          {event.title}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: `${currentColor.text}60` }}
                        >
                          {event.date}
                        </p>
                      </div>
                      <ChevronRight
                        className="w-4 h-4"
                        style={{ color: `${currentColor.text}40` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Videos Tab - YAHAN AAPKE 6 PANAVERSITY VIDEOS HAIN */}
        {activeTab === "videos" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold"
                style={{ color: currentColor.text }}
              >
                <Youtube className="w-6 h-6 inline mr-2 text-red-500" />
                Panaversity AI Videos
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm px-3 py-1 rounded-full bg-red-500/10 text-red-500">
                  {filteredVideos.length} videos
                </span>
                <a
                  href="https://youtube.com/@panaversity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white hover:scale-105 transition-all"
                >
                  Subscribe
                </a>
              </div>
            </div>

            {/* Video Grid - 6 boxes with your Panaversity links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50 hover:scale-[1.02] transition-all cursor-pointer shadow-lg hover:shadow-xl"
                  onClick={() => handleWatchVideo(video)}
                >
                  <div className="relative aspect-video bg-gray-900">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                      {video.duration}
                    </span>
                    <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-blue-500/90 text-white">
                      {video.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3
                      className="font-bold text-sm mb-2 line-clamp-2"
                      style={{ color: currentColor.text }}
                    >
                      {video.title}
                    </h3>
                    <p
                      className="text-xs mb-3 line-clamp-2"
                      style={{ color: `${currentColor.text}60` }}
                    >
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex items-center gap-1"
                          style={{ color: `${currentColor.text}40` }}
                        >
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                        <span
                          className="flex items-center gap-1"
                          style={{ color: `${currentColor.text}40` }}
                        >
                          <ThumbsUpIcon className="w-3 h-3" />
                          {video.likes}
                        </span>
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: `${currentColor.text}40` }}
                      >
                        {video.channel}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-12 text-center border border-white/50">
                <Youtube
                  className="w-20 h-20 mx-auto mb-4"
                  style={{ color: `${currentColor.text}30` }}
                />
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: currentColor.text }}
                >
                  No videos found
                </h3>
                <p className="mb-6" style={{ color: `${currentColor.text}80` }}>
                  Try searching with different keywords
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Community Tab */}
        {activeTab === "community" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Left column - Community Leaders */}
            <div className="lg:col-span-2">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: currentColor.text }}
              >
                <Users className="w-6 h-6 inline mr-2" />
                Community Leaders
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {communityLeaders.map((leader) => (
                  <div
                    key={leader.id}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:scale-105 transition-all text-center"
                  >
                    <div className="text-4xl mb-3">{leader.avatar}</div>
                    <h3
                      className="font-bold text-sm"
                      style={{ color: currentColor.text }}
                    >
                      {leader.name}
                    </h3>
                    <p
                      className="text-xs mb-2"
                      style={{ color: `${currentColor.text}60` }}
                    >
                      {leader.role}
                    </p>
                    <p
                      className="text-xs px-2 py-1 rounded-full inline-block"
                      style={{
                        backgroundColor: `${currentColor.primary}20`,
                        color: currentColor.primary,
                      }}
                    >
                      {leader.contributions}
                    </p>
                  </div>
                ))}
              </div>

              {/* Discussion Topics */}
              <div className="mt-8">
                <h3
                  className="font-bold mb-4"
                  style={{ color: currentColor.text }}
                >
                  Popular Discussions
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/50 hover:bg-white/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <img
                            src={`https://i.pravatar.cc/40?img=${i}`}
                            className="w-10 h-10 rounded-full"
                            alt="avatar"
                          />
                          <div>
                            <h4
                              className="font-semibold text-sm"
                              style={{ color: currentColor.text }}
                            >
                              How to start with Agentic AI?
                            </h4>
                            <p
                              className="text-xs mt-1"
                              style={{ color: `${currentColor.text}60` }}
                            >
                              Posted by Sarah Chen • 2 hours ago
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" /> 24 replies
                              </span>
                              <span className="text-xs flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" /> 15 likes
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Community Stats */}
            <div className="space-y-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h3
                  className="font-bold mb-4"
                  style={{ color: currentColor.text }}
                >
                  Community Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/30 rounded-xl">
                    <span style={{ color: currentColor.text }}>
                      Total Members
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: currentColor.primary }}
                    >
                      12,345
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/30 rounded-xl">
                    <span style={{ color: currentColor.text }}>
                      Active Today
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: currentColor.primary }}
                    >
                      892
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/30 rounded-xl">
                    <span style={{ color: currentColor.text }}>
                      Discussions
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: currentColor.primary }}
                    >
                      3,456
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/30 rounded-xl">
                    <span style={{ color: currentColor.text }}>
                      Solutions Shared
                    </span>
                    <span
                      className="font-bold"
                      style={{ color: currentColor.primary }}
                    >
                      7,891
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h3
                  className="font-bold mb-4"
                  style={{ color: currentColor.text }}
                >
                  Join Discussion
                </h3>
                <textarea
                  placeholder="Share your thoughts..."
                  className="w-full p-3 rounded-xl bg-white/50 border border-white/50 text-sm mb-3"
                  rows={3}
                ></textarea>
                <button
                  className="w-full py-2 rounded-xl text-white font-medium transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                >
                  <Send className="w-4 h-4 inline mr-2" />
                  Post Message
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Left column - Resources Grid */}
            <div className="lg:col-span-2">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: currentColor.text }}
              >
                <Layers className="w-6 h-6 inline mr-2" />
                Learning Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:scale-105 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        {resource.icon}
                      </div>
                      <div>
                        <h3
                          className="font-bold text-sm"
                          style={{ color: currentColor.text }}
                        >
                          {resource.title}
                        </h3>
                        <p
                          className="text-xs mb-2"
                          style={{ color: `${currentColor.text}60` }}
                        >
                          {resource.description}
                        </p>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${currentColor.primary}20`,
                            color: currentColor.primary,
                          }}
                        >
                          {resource.count} items
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Additional Resources */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:scale-105 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-sm"
                        style={{ color: currentColor.text }}
                      >
                        GitHub Repositories
                      </h3>
                      <p
                        className="text-xs mb-2"
                        style={{ color: `${currentColor.text}60` }}
                      >
                        Open source AI projects
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600">
                        24 repos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:scale-105 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-sm"
                        style={{ color: currentColor.text }}
                      >
                        Documentation
                      </h3>
                      <p
                        className="text-xs mb-2"
                        style={{ color: `${currentColor.text}60` }}
                      >
                        API references & guides
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-600">
                        12 docs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Downloadable Resources */}
            <div className="space-y-6">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h3
                  className="font-bold mb-4"
                  style={{ color: currentColor.text }}
                >
                  Downloadable Content
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-white/30 rounded-xl hover:bg-white/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Download
                          className="w-4 h-4"
                          style={{ color: currentColor.primary }}
                        />
                        <div>
                          <p
                            className="text-sm font-medium"
                            style={{ color: currentColor.text }}
                          >
                            AI Cheat Sheet {i}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: `${currentColor.text}60` }}
                          >
                            PDF • 2.5 MB
                          </p>
                        </div>
                      </div>
                      <Download
                        className="w-4 h-4"
                        style={{ color: `${currentColor.text}40` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h3
                  className="font-bold mb-4"
                  style={{ color: currentColor.text }}
                >
                  Quick Links
                </h3>
                <div className="space-y-2">
                  {[
                    "AI Glossary",
                    "Best Practices",
                    "Tutorials",
                    "Case Studies",
                  ].map((item, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex items-center gap-2 p-2 hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <ChevronRight
                        className="w-4 h-4"
                        style={{ color: currentColor.primary }}
                      />
                      <span style={{ color: currentColor.text }}>{item}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Styles */}
      <style>{`
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;