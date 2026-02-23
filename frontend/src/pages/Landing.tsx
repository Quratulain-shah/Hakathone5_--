import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Brain,
  TrendingUp,
  Check,
  Crown,
  Zap,
  Star,
  Users,
  Globe,
  Rocket,
  Shield,
  Award,
  Heart,
  Sun,
  Smile,
  Coffee,
  Music,
  Palette,
  Bot,
  Code,
  Cpu,
  Network,
  Database,
  Cloud,
  Lock,
  Unlock,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  BookmarkPlus,
  Clock,
  Calendar,
  Award as AwardIcon,
  Trophy,
  Medal,
  Gem,
  Diamond,
  Infinity,
  Target,
  Compass,
  Map,
  Flag,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Mic,
  Speaker,
  Printer,
  Monitor,
  Keyboard,
  Mouse,
  HardDrive,
  Cpu as CpuIcon,
  Gamepad,
  Rocket as RocketIcon,
  Satellite,
  Telescope,
  Microscope,
  Flask,
  Atom,
  Dna,
  Virus,
  Pill,
  Stethoscope,
  HeartPulse,
  Bone,
  Tooth,
  Eye,
  Ear,
  Nose,
  Brain as BrainIcon,
  CircuitBoard,
  Cpu as CpuChip,
  MemoryStick,
  SdCard,
  Usb,
  Ethernet,
  Wifi,
  Bluetooth,
  SimCard,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  Power,
  PowerOff,
  PowerOn,
  PowerStandby,
  MoveRight,
  MoveLeft,
  MoveUp,
  MoveDown,
  MoveHorizontal,
  MoveVertical,
  Move,
  RotateCw,
  RotateCcw,
  RefreshCw,
  RefreshCcw,
  Loader,
  Loader2,
  LoaderPinwheel,
  Fan,
  Wind,
  Waves,
  Flower,
  Leaf,
  TreePine,
  Trees,
  Mountain,
  Sunrise,
  Sunset,
  Moon,
  CloudMoon,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  CloudCog,
  Cloudy,
  CloudHail,
  CloudMoonRain,
  CloudSunRain,
  CloudSnowSun,
  CloudSnowMoon,
  CloudLightningSun,
  CloudLightningMoon,
  CloudAlert,
  CloudOff,
  CloudDownload,
  CloudUpload,
  CloudCheck,
  CloudX,
  CloudPlus,
  CloudMinus,
  Send,
  MoreVertical,
  Image,
  Paperclip,
  Smile as SmileIcon,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Bell,
  Search,
  Filter,
  Grid,
  List,
  Menu,
  X,
  Home,
  Compass as CompassIcon,
  Bookmark as BookmarkIcon,
  Clock as ClockIcon,
  ThumbsUp as ThumbsUpIcon,
} from "lucide-react";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [activeColor, setActiveColor] = useState("peach");
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [floatingIcons, setFloatingIcons] = useState<
    Array<{ x: number; y: number; icon: string; delay: number }>
  >([]);
  const [activeTutorMode, setActiveTutorMode] = useState<
    "chat" | "voice" | "code" | "quiz"
  >("chat");
  const [tutorMessage, setTutorMessage] = useState("");
  const [tutorResponse, setTutorResponse] = useState("");
  const [isTutorTyping, setIsTutorTyping] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<
    Array<{ type: "user" | "ai"; message: string; time: string }>
  >([]);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [chatFilter, setChatFilter] = useState("all");

  // Code Challenge States
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [codeOutput, setCodeOutput] = useState("");
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [userCode, setUserCode] = useState("");

  // Quiz States
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  // Game States
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameMessage, setGameMessage] = useState("");
  const [gameLevel, setGameLevel] = useState(1);

  // AI Learning Path Game
  const [learningPath, setLearningPath] = useState({
    currentNode: 0,
    completedNodes: [] as number[],
    score: 0,
  });

  // AI Ethics Dilemma Game
  const [ethicsGame, setEthicsGame] = useState({
    currentDilemma: 0,
    score: 0,
    choices: [] as number[],
  });

  // Neural Puzzle Game
  const [neuralPuzzle, setNeuralPuzzle] = useState({
    currentLevel: 1,
    solved: false,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

   

    // Add welcome message
    setChatMessages([
      {
        type: "ai",
        message:
          "👋 Hi! I'm your AI tutor. Ask me anything about Artificial Intelligence!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isTutorTyping]);

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

  // 4 Tutor Tiers
  const tutorTiers = [
    {
      name: "Basic AI Tutor",
      price: "$0",
      period: "forever",
      icon: <Bot className="w-8 h-8" />,
      features: [
        "Basic chat assistance",
        "3 AI learning games",
        "Daily AI quiz",
        "Community support",
      ],
      color: currentColor.primary,
      popular: false,
    },
    {
      name: "Pro AI Tutor",
      price: "$9.99",
      period: "month",
      icon: <Brain className="w-8 h-8" />,
      features: [
        "Advanced AI chat",
        "All AI games + levels",
        "Personalized AI quizzes",
        "AI code assistance",
        "Priority support",
      ],
      color: currentColor.secondary,
      popular: true,
    },
    {
      name: "Expert AI Tutor",
      price: "$19.99",
      period: "month",
      icon: <Cpu className="w-8 h-8" />,
      features: [
        "Expert AI mentor",
        "Neural network games",
        "Custom AI quiz creation",
        "AI project assistance",
        "1-on-1 AI sessions",
        "AI certificate prep",
      ],
      color: currentColor.accent,
      popular: false,
    },
    {
      name: "Team AI Tutor",
      price: "$49.99",
      period: "month",
      icon: <Network className="w-8 h-8" />,
      features: [
        "Team workspace",
        "Multiplayer AI games",
        "Team AI quizzes",
        "AI analytics dashboard",
        "AI API access",
        "Dedicated AI support",
        "SLA guarantee",
      ],
      color: currentColor.primary,
      popular: false,
    },
  ];

  // Tutor Modes with enhanced styling
  const tutorModes = [
    {
      id: "chat",
      icon: <MessageCircle className="w-4 h-4" />,
      label: "AI Chat",
      color: currentColor.primary,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "voice",
      icon: <Volume2 className="w-4 h-4" />,
      label: "AI Voice",
      color: currentColor.secondary,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "code",
      icon: <Code className="w-4 h-4" />,
      label: "AI Code",
      color: currentColor.accent,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      id: "quiz",
      icon: <Brain className="w-4 h-4" />,
      label: "AI Quiz",
      color: currentColor.primary,
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  // AI Coding Challenges
  const codingChallenges = [
    {
      id: 1,
      title: "🤖 Create an AI Assistant",
      description:
        "Build a function that creates an AI assistant with a name and purpose",
      difficulty: "Easy",
      timeLeft: "15 mins",
      participants: 1234,
      code: `function createAIAssistant(name, purpose) {
  // Return an object with name, purpose, and a greet function
  // The greet function should return: "Hi! I'm [name], your AI assistant for [purpose]"
  
  // Your code here
  
}

// Test your AI assistant
const myAI = createAIAssistant("CodeBuddy", "coding help");
console.log(myAI.greet());`,
      language: "javascript",
      solution: `function createAIAssistant(name, purpose) {
  return {
    name: name,
    purpose: purpose,
    greet: function() {
      return "Hi! I'm " + this.name + ", your AI assistant for " + this.purpose;
    }
  };
}

const myAI = createAIAssistant("CodeBuddy", "coding help");
console.log(myAI.greet());
// Output: Hi! I'm CodeBuddy, your AI assistant for coding help`,
      hint: "The greet function should use 'this.name' and 'this.purpose' to access the properties",
    },
    {
      id: 2,
      title: "🧠 AI Decision Maker",
      description: "Create an AI that makes decisions based on user input",
      difficulty: "Medium",
      participants: 892,
      code: `function aiDecisionMaker(userMood, taskUrgency) {
  // Rules:
  // - If userMood is "happy": return "Great! Let's learn something new!"
  // - If userMood is "sad" and taskUrgency > 5: return "I'll help you with urgent tasks first"
  // - If taskUrgency > 8: return "This is critical! Let's focus on this now"
  // - Else: return "How can I assist you today?"
  
  // Your code here
  
}

// Test the AI
console.log(aiDecisionMaker("happy", 3));
console.log(aiDecisionMaker("sad", 7));
console.log(aiDecisionMaker("neutral", 9));`,
      language: "javascript",
      solution: `function aiDecisionMaker(userMood, taskUrgency) {
  if (userMood === "happy") {
    return "Great! Let's learn something new!";
  }
  if (userMood === "sad" && taskUrgency > 5) {
    return "I'll help you with urgent tasks first";
  }
  if (taskUrgency > 8) {
    return "This is critical! Let's focus on this now";
  }
  return "How can I assist you today?";
}

console.log(aiDecisionMaker("happy", 3));
// Output: Great! Let's learn something new!
console.log(aiDecisionMaker("sad", 7));
// Output: I'll help you with urgent tasks first
console.log(aiDecisionMaker("neutral", 9));
// Output: This is critical! Let's focus on this now`,
      hint: "Check conditions in order - most specific first!",
    },
    {
      id: 3,
      title: "🎯 AI Response Generator",
      description:
        "Make an AI that responds differently based on the time of day",
      difficulty: "Medium",
      participants: 567,
      code: `function aiTimeBasedResponse(hour) {
  // Return different responses based on hour:
  // 5-11: "Good morning! Ready to learn AI?"
  // 12-17: "Good afternoon! Let's code some AI!"
  // 18-21: "Good evening! Time for AI games!"
  // 22-4: "Late night coding? You're dedicated!"
  
  // Your code here
  
}

// Test different times
console.log(aiTimeBasedResponse(9));  // Morning
console.log(aiTimeBasedResponse(14)); // Afternoon
console.log(aiTimeBasedResponse(20)); // Evening
console.log(aiTimeBasedResponse(2));  // Night`,
      language: "javascript",
      solution: `function aiTimeBasedResponse(hour) {
  if (hour >= 5 && hour <= 11) {
    return "Good morning! Ready to learn AI?";
  }
  if (hour >= 12 && hour <= 17) {
    return "Good afternoon! Let's code some AI!";
  }
  if (hour >= 18 && hour <= 21) {
    return "Good evening! Time for AI games!";
  }
  return "Late night coding? You're dedicated!";
}

console.log(aiTimeBasedResponse(9));
// Output: Good morning! Ready to learn AI?
console.log(aiTimeBasedResponse(14));
// Output: Good afternoon! Let's code some AI!
console.log(aiTimeBasedResponse(20));
// Output: Good evening! Time for AI games!
console.log(aiTimeBasedResponse(2));
// Output: Late night coding? You're dedicated!`,
      hint: "Use if/else with ranges (hour >= 5 && hour <= 11)",
    },
  ];

  // AI Quiz Questions
  const quizQuestions = [
    {
      question: "What does AI stand for?",
      options: [
        "Artificial Intelligence",
        "Automated Interface",
        "Algorithmic Input",
        "Advanced Integration",
      ],
      correct: 0,
      explanation:
        "AI stands for Artificial Intelligence - the simulation of human intelligence in machines!",
    },
    {
      question: "What is machine learning?",
      options: [
        "Machines learning from data",
        "Machines copying humans",
        "Pre-programmed responses",
        "Hardware upgrades",
      ],
      correct: 0,
      explanation:
        "Machine learning is when AI systems learn and improve from experience without being explicitly programmed!",
    },
    {
      question: "What is an AI agent?",
      options: [
        "An AI that acts autonomously",
        "A spy robot",
        "A computer virus",
        "A chatbot only",
      ],
      correct: 0,
      explanation:
        "An AI agent is an intelligent system that can perceive its environment and take actions to achieve goals!",
    },
  ];

  // AI Learning Path Game
  const learningNodes = [
    {
      id: 1,
      title: "What is AI?",
      description: "Learn the basics of Artificial Intelligence",
      question: "Which of these is an example of AI?",
      options: ["Calculator", "ChatGPT", "Text Editor", "Camera"],
      correct: 1,
      xp: 10,
    },
    {
      id: 2,
      title: "Machine Learning",
      description: "Understand how machines learn from data",
      question: "What does ML stand for?",
      options: [
        "Machine Language",
        "Machine Learning",
        "Meta Learning",
        "Memory Load",
      ],
      correct: 1,
      xp: 15,
    },
    {
      id: 3,
      title: "Neural Networks",
      description: "Discover how neural networks work",
      question: "What are neural networks inspired by?",
      options: [
        "Computer chips",
        "Human brain",
        "Tree branches",
        "Crystal structures",
      ],
      correct: 1,
      xp: 20,
    },
  ];

  // AI Ethics Dilemmas
  const ethicsDilemmas = [
    {
      title: "The Autonomous Car Dilemma",
      scenario:
        "An AI-driven car must choose between hitting a pedestrian or swerving and injuring the passenger. What should it do?",
      options: [
        {
          text: "Protect pedestrian at all costs",
          ethical: true,
          explanation: "Prioritizing human life is ethical",
        },
        {
          text: "Protect passenger always",
          ethical: false,
          explanation: "Should consider all lives equally",
        },
        {
          text: "Calculate least harm",
          ethical: true,
          explanation: "Minimize overall damage is logical",
        },
      ],
    },
    {
      title: "AI Job Replacement",
      scenario:
        "Your company's AI can replace 100 workers, saving millions. What do you recommend?",
      options: [
        {
          text: "Replace them immediately",
          ethical: false,
          explanation: "Consider human impact",
        },
        {
          text: "Retrain workers for new roles",
          ethical: true,
          explanation: "Ethical AI considers people",
        },
        {
          text: "Partial automation with humans",
          ethical: true,
          explanation: "Balance efficiency and humanity",
        },
      ],
    },
  ];

  // Enhanced chat responses
  const handleSendMessage = () => {
    if (!tutorMessage.trim()) return;

    // Add user message
    setChatMessages((prev) => [
      ...prev,
      {
        type: "user",
        message: tutorMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setIsTutorTyping(true);
    setTutorMessage("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "🤖 Great question about AI! Try our AI Learning Path game to understand this better!",
        "🧠 That's interesting! Why not test your knowledge in our AI Ethics Dilemma game?",
        "💻 You should check out our AI Code Challenges - they're fun and educational!",
        "🎯 Want to practice AI coding? Try the AI Code mode above!",
        "📚 AI is fascinating! Let me explain... Artificial Intelligence is the simulation of human intelligence in machines.",
        "⚡ Machine learning is a subset of AI where systems learn from data!",
        "🎮 Our AI games make learning fun - have you tried the Neural Puzzle yet?",
        "🔮 The future of AI is exciting! What specific aspect interests you most?",
      ];

      setChatMessages((prev) => [
        ...prev,
        {
          type: "ai",
          message: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setIsTutorTyping(false);
    }, 1500);
  };

  // Handle code execution
  const handleRunCode = () => {
    setIsCodeRunning(true);
    setCodeOutput("⏳ Running your AI code...");

    setTimeout(() => {
      if (activeChallenge === 0) {
        setCodeOutput(
          "✅ Code executed successfully!\n\nOutput:\nHi! I'm CodeBuddy, your AI assistant for coding help"
        );
      } else if (activeChallenge === 1) {
        setCodeOutput(
          "✅ Code executed successfully!\n\nOutput:\nGreat! Let's learn something new!\nI'll help you with urgent tasks first\nThis is critical! Let's focus on this now"
        );
      } else {
        setCodeOutput(
          "✅ Code executed successfully!\n\nOutput:\nGood morning! Ready to learn AI?\nGood afternoon! Let's code some AI!\nGood evening! Time for AI games!\nLate night coding? You're dedicated!"
        );
      }
      setIsCodeRunning(false);
    }, 2000);
  };

  // Handle quiz answer
  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);

    if (
      newAnswers.filter((a) => a !== undefined).length === quizQuestions.length
    ) {
      setShowQuizResult(true);
      const correct = newAnswers.filter(
        (a, i) => a === quizQuestions[i].correct
      ).length;
      setGameScore(correct * 10);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers([]);
    setShowQuizResult(false);
    setGameScore(0);
  };

  const handleWatchDemo = () => {
    setVideoUrl("https://www.youtube.com/embed/KyrvodSgdK4");
    setShowVideo(true);
  };

  // Emoji picker
  const emojis = [
    "😊",
    "😂",
    "🤔",
    "👍",
    "❤️",
    "🎉",
    "🚀",
    "🤖",
    "🧠",
    "💡",
    "🎮",
    "📚",
    "⚡",
    "🌟",
    "💻",
    "🔮",
  ];

  const handleEmojiSelect = (emoji: string) => {
    setTutorMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
    messageInputRef.current?.focus();
  };

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "AI Code Challenges",
      description: "Practice AI programming with interactive coding challenges",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "AI Tutor Chat",
      description: "24/7 assistance from your personal AI tutor",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Learning Games",
      description: "Learn through play with our AI-powered games",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Ethics Scenarios",
      description: "Explore real-world AI ethics dilemmas",
    },
  ];

  const faqs = [
    {
      question: "How do the AI games work?",
      answer:
        "Our AI games are designed to teach artificial intelligence concepts through play! AI Learning Path helps you understand AI basics, AI Ethics Dilemmas explore real-world scenarios, and AI Neural Puzzle teaches neural networks. Each game adapts to your skill level with AI-powered feedback!",
    },
    {
      question: "What's the difference between AI tutor tiers?",
      answer:
        "Basic AI Tutor gives you access to 3 AI games and basic chat. Pro AI Tutor unlocks all AI games with multiple levels and personalized AI quizzes. Expert AI Tutor adds neural network games, custom AI quiz creation, and 1-on-1 AI sessions. Team AI Tutor includes multiplayer AI games, team AI analytics, and AI API access for your whole organization!",
    },
    {
      question: "Can I track my AI learning progress?",
      answer:
        "Absolutely! Your profile shows XP points from AI games, quiz scores, completed AI challenges, and AI badges earned. The more you play and learn about AI, the more you level up!",
    },
    {
      question: "Are the AI games suitable for beginners?",
      answer:
        "Yes! Our AI games have multiple difficulty levels. Start with AI Learning Path for beginners, then progress to AI Ethics Dilemmas, and finally tackle AI Neural Puzzles. Each AI game includes hints and AI-powered explanations!",
    },
  ];

  return (
    <div
      style={{ backgroundColor: currentColor.bg }}
      className="min-h-screen transition-colors duration-500 overflow-x-hidden"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="absolute text-3xl animate-float-random"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.delay}s`,
              opacity: 0.15,
              transform: `translate(${mousePosition.x * 0.01}px, ${
                mousePosition.y * 0.01
              }px)`,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Parallax Circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-float-slow"
          style={{
            backgroundColor: currentColor.primary,
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 animate-float-slower"
          style={{
            backgroundColor: currentColor.secondary,
            transform: `translate(${mousePosition.x * -0.02}px, ${
              mousePosition.y * -0.02
            }px)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 animate-float-slowest"
          style={{
            backgroundColor: currentColor.accent,
            transform: `translate(${mousePosition.x * 0.015}px, ${
              mousePosition.y * 0.015
            }px)`,
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white/30 backdrop-blur-sm border-b border-white/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-180"
              style={{
                background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-bold"
              style={{ color: currentColor.text }}
            >
              Synapse Tutor
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {["Features", "Games", "AI Tutors", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-sm font-medium relative group"
                style={{ color: currentColor.text }}
              >
                {item}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: currentColor.primary }}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm p-1 rounded-xl">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveColor(option.id)}
                  className={`w-7 h-7 rounded-lg transition-all duration-300 flex items-center justify-center ${
                    activeColor === option.id
                      ? "scale-110 shadow-lg"
                      : "opacity-50 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: option.color }}
                >
                  <span className="text-white">{option.icon}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                color: currentColor.primary,
                border: `1.5px solid ${currentColor.primary}40`,
                backgroundColor: "white",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/60 backdrop-blur-sm border border-white/50">
              <Sparkles
                className="w-4 h-4 animate-spin-slow"
                style={{ color: currentColor.primary }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: currentColor.text }}
              >
                AI-Powered Learning Platform
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold leading-tight mb-6"
              style={{ color: currentColor.text }}
            >
              Your{" "}
              <span className="relative">
                <span
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  24/7 AI Tutor
                </span>
                <span className="absolute -top-2 -right-8 text-2xl animate-pulse">
                  
                </span>
              </span>
              <br />
              Never Stops Learning With You
            </h1>

            <p
              className="text-lg md:text-xl mb-8"
              style={{ color: `${currentColor.text}99` }}
            >
               Day or night, your personal AI mentor is always awake! Get
              instant answers,
              <span style={{ color: currentColor.primary, fontWeight: 500 }}>
                {" "}
                unlimited help,
              </span>{" "}
              and
              <span style={{ color: currentColor.primary, fontWeight: 500 }}>
                {" "}
                real-time feedback
              </span>
              whenever you need it. No waiting, no schedules — just pure
              learning, 24/7!
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="group px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-500 hover:scale-105 flex items-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                }}
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={handleWatchDemo}
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 hover:scale-105 bg-white/70 backdrop-blur-sm border border-white/50 flex items-center gap-2"
                style={{ color: currentColor.text }}
              >
                Watch Demo
                <Play className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Chatbot UI */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 border border-white/50 shadow-2xl min-h-[550px] relative overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl"></div>

            {!showVideo ? (
              <>
                {/* Chat Header with enhanced UI */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3
                        className="font-bold text-sm"
                        style={{ color: currentColor.text }}
                      >
                        AI Tutor
                      </h3>
                      <p
                        className="text-xs flex items-center gap-1"
                        style={{ color: `${currentColor.text}60` }}
                      >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Online
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-white/50 transition-all">
                      <Search
                        className="w-4 h-4"
                        style={{ color: currentColor.text }}
                      />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/50 transition-all">
                      <Bell
                        className="w-4 h-4"
                        style={{ color: currentColor.text }}
                      />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/50 transition-all">
                      <MoreVertical
                        className="w-4 h-4"
                        style={{ color: currentColor.text }}
                      />
                    </button>
                  </div>
                </div>

                {/* Enhanced Mode Selector with glass morphism */}
                <div className="flex items-center gap-2 mb-4 p-1 bg-white/50 backdrop-blur-sm rounded-xl">
                  {tutorModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveTutorMode(mode.id as any)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 relative overflow-hidden group ${
                        activeTutorMode === mode.id
                          ? "shadow-lg scale-105"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor:
                          activeTutorMode === mode.id
                            ? mode.color
                            : "transparent",
                        color:
                          activeTutorMode === mode.id
                            ? "white"
                            : currentColor.text,
                      }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${mode.color}, transparent)`,
                        }}
                      />
                      <div className="flex items-center justify-center gap-1.5 relative z-10">
                        {mode.icon}
                        <span className="hidden sm:inline">{mode.label}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Chat Mode with Enhanced UI */}
                {activeTutorMode === "chat" && (
                  <div className="h-[400px] flex flex-col">
                    {/* Chat Messages Area */}
                    <div
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto px-2 space-y-4 scroll-smooth"
                      style={{ scrollBehavior: "smooth" }}
                    >
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-2 ${
                            msg.type === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {/* Avatar */}
                          <div
                            className={`flex-shrink-0 ${
                              msg.type === "user" ? "ml-2" : "mr-2"
                            }`}
                          >
                            {msg.type === "ai" ? (
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-500 flex items-center justify-center shadow-md">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-cyan-500 flex items-center justify-center shadow-md">
                                <User className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`flex flex-col max-w-[70%] ${
                              msg.type === "user" ? "items-end" : "items-start"
                            }`}
                          >
                            <div
                              className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                                msg.type === "ai"
                                  ? "bg-white rounded-tl-none"
                                  : "bg-gradient-to-br from-orange-500 to-orange-500 rounded-tr-none"
                              }`}
                              style={{
                                backgroundColor:
                                  msg.type === "ai" ? "white" : undefined,
                              }}
                            >
                              <p
                                className="text-sm"
                                style={{
                                  color:
                                    msg.type === "ai"
                                      ? currentColor.text
                                      : "white",
                                }}
                              >
                                {msg.message}
                              </p>
                            </div>
                            <span
                              className="text-[10px] mt-1 px-2"
                              style={{ color: `${currentColor.text}40` }}
                            >
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      {isTutorTyping && (
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-500 flex items-center justify-center shadow-md">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                            <div className="flex gap-1">
                              <span
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0s" }}
                              />
                              <span
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                              <span
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Message Input */}
                    <div className="mt-4 relative">
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1 border border-gray-100 shadow-sm">
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-2 rounded-xl hover:bg-gray-50 transition-all"
                        >
                          <SmileIcon
                            className="w-5 h-5"
                            style={{ color: currentColor.primary }}
                          />
                        </button>

                        <input
                          ref={messageInputRef}
                          type="text"
                          value={tutorMessage}
                          onChange={(e) => setTutorMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                          placeholder="Ask me anything about AI..."
                          className="flex-1 py-2.5 px-2 bg-transparent focus:outline-none text-sm"
                          style={{ color: currentColor.text }}
                        />

                        <button className="p-2 rounded-xl hover:bg-gray-50 transition-all">
                          <Paperclip
                            className="w-5 h-5"
                            style={{ color: currentColor.primary }}
                          />
                        </button>

                        <button
                          onClick={handleSendMessage}
                          className="p-2.5 rounded-xl text-white transition-all duration-300 hover:scale-105 bg-gradient-to-r from-orange-500 to-orange-500 shadow-md"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Emoji Picker */}
                      {showEmojiPicker && (
                        <div
                          ref={emojiPickerRef}
                          className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl p-2 grid grid-cols-8 gap-1 border"
                        >
                          {emojis.map((emoji, i) => (
                            <button
                              key={i}
                              onClick={() => handleEmojiSelect(emoji)}
                              className="w-8 h-8 hover:bg-gray-100 rounded-lg transition-all text-lg"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Suggestions */}
                    <div className="flex items-center gap-2 mt-3">
                      <span
                        className="text-xs px-2 py-1 rounded-full bg-white/50"
                        style={{ color: `${currentColor.text}60` }}
                      >
                        Quick suggestions:
                      </span>
                      {[
                        "What is AI?",
                        "Tell me a joke",
                        "Help with code",
                        "Play game",
                      ].map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setTutorMessage(suggestion);
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                          className="text-xs px-2 py-1 rounded-full bg-white hover:bg-white/80 transition-all"
                          style={{ color: currentColor.text }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Voice Mode with Enhanced UI */}
                {activeTutorMode === "voice" && (
                  <div className="h-[400px] flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-500 rounded-full animate-ping opacity-20"></div>
                      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-500 flex items-center justify-center shadow-xl">
                        <Volume2 className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <p
                      className="text-xl font-semibold mb-2"
                      style={{ color: currentColor.text }}
                    >
                      AI Voice Learning
                    </p>
                    <p
                      className="text-sm text-center mb-6"
                      style={{ color: `${currentColor.text}99` }}
                    >
                      Click the microphone and start speaking
                      <br />
                      to interact with your AI tutor
                    </p>
                    <button className="px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-orange-500 to-orange-500 shadow-lg flex items-center gap-2">
                      <Mic className="w-5 h-5" />
                      Start Speaking
                    </button>
                  </div>
                )}

                {/* Code Mode with Enhanced UI */}
                {activeTutorMode === "code" && (
                  <div className="h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <select
                        value={activeChallenge}
                        onChange={(e) => {
                          setActiveChallenge(parseInt(e.target.value));
                          setCodeOutput("");
                        }}
                        className="px-3 py-2 rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 bg-white/80 backdrop-blur-sm"
                        style={{ focusRingColor: currentColor.primary }}
                      >
                        {codingChallenges.map((challenge, index) => (
                          <option key={challenge.id} value={index}>
                            {challenge.title}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleRunCode}
                        disabled={isCodeRunning}
                        className="px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 bg-gradient-to-r from-orange-500 to-orange-500 shadow-md"
                      >
                        {isCodeRunning ? "Running..." : "Run AI Code"}
                      </button>
                    </div>

                    <div className="flex-1 grid grid-rows-2 gap-2 min-h-0">
                      <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-auto shadow-inner">
                        <pre className="whitespace-pre-wrap">
                          {codingChallenges[activeChallenge].code}
                        </pre>
                      </div>
                      <div className="bg-gray-800 rounded-xl p-4 font-mono text-xs text-white overflow-auto shadow-inner">
                        {codeOutput ? (
                          <pre className="whitespace-pre-wrap">
                            {codeOutput}
                          </pre>
                        ) : (
                          <span className="text-gray-400">
                            Click 'Run AI Code' to see your AI in action! 🚀
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor:
                            codingChallenges[activeChallenge].difficulty ===
                            "Easy"
                              ? "#22c55e20"
                              : codingChallenges[activeChallenge].difficulty ===
                                "Medium"
                              ? "#eab30820"
                              : "#ef444420",
                          color:
                            codingChallenges[activeChallenge].difficulty ===
                            "Easy"
                              ? "#22c55e"
                              : codingChallenges[activeChallenge].difficulty ===
                                "Medium"
                              ? "#eab308"
                              : "#ef4444",
                        }}
                      >
                        {codingChallenges[activeChallenge].difficulty}
                      </span>
                      <span style={{ color: `${currentColor.text}99` }}>
                        👥 {codingChallenges[activeChallenge].participants}{" "}
                        solved
                      </span>
                    </div>
                  </div>
                )}

                {/* Quiz Mode with Enhanced UI */}
                {activeTutorMode === "quiz" && (
                  <div className="h-[400px] overflow-y-auto">
                    {!showQuizResult ? (
                      <div className="space-y-4">
                        {quizQuestions.map((q, qIndex) => (
                          <div
                            key={qIndex}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
                          >
                            <p
                              className="font-medium mb-3 text-sm"
                              style={{ color: currentColor.text }}
                            >
                              Q{qIndex + 1}: {q.question}
                            </p>
                            <div className="space-y-2">
                              {q.options.map((option, oIndex) => (
                                <button
                                  key={oIndex}
                                  onClick={() =>
                                    handleQuizAnswer(qIndex, oIndex)
                                  }
                                  className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-300 ${
                                    quizAnswers[qIndex] === oIndex
                                      ? "text-white shadow-md"
                                      : "bg-white/50 hover:bg-white/80"
                                  }`}
                                  style={{
                                    backgroundColor:
                                      quizAnswers[qIndex] === oIndex
                                        ? currentColor.primary
                                        : undefined,
                                    color:
                                      quizAnswers[qIndex] === oIndex
                                        ? "white"
                                        : currentColor.text,
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4 shadow-xl">
                          <Trophy className="w-12 h-12 text-white" />
                        </div>
                        <p
                          className="text-3xl font-bold mb-2"
                          style={{ color: currentColor.text }}
                        >
                          {gameScore}/{quizQuestions.length * 10}
                        </p>
                        <p
                          className="text-sm mb-6 text-center px-4"
                          style={{ color: `${currentColor.text}99` }}
                        >
                          {gameScore === 30
                            ? "🎉 Perfect! You're an AI expert!"
                            : gameScore >= 20
                            ? "💪 Good job! Keep learning about AI!"
                            : "📚 Try again to master AI concepts!"}
                        </p>
                        <button
                          onClick={resetQuiz}
                          className="px-6 py-2 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 shadow-md"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Video replaces chatbot */
              <div className="h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="font-semibold"
                    style={{ color: currentColor.text }}
                  >
                    🎥 AI Platform Demo
                  </h3>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="p-2 rounded-lg hover:bg-white/50 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-xl">
                  <iframe
                    src={videoUrl}
                    title="AI Demo Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p
                  className="text-xs text-center mt-2"
                  style={{ color: `${currentColor.text}99` }}
                >
                  Watch how our AI platform teaches through code and games! 🎮
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-4 py-24"
      >
        <h2
          className="text-4xl font-bold text-center mb-16"
          style={{ color: currentColor.text }}
        >
          Learn AI Through <span>Interactive Features</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:rotate-12"
                style={{
                  backgroundColor: `${currentColor.primary}20`,
                  color: currentColor.primary,
                }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: currentColor.text }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: `${currentColor.text}99` }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Games Section - AI Learning Games */}
      <section
        id="games"
        className="relative z-10 max-w-7xl mx-auto px-4 py-24"
      >
        <h2
          className="text-4xl font-bold text-center mb-4"
          style={{ color: currentColor.text }}
        >
          AI Tutor Available 24/7
        </h2>
        <p
          className="text-center mb-12"
          style={{ color: `${currentColor.text}99` }}
        >
          Get instant help anytime, anywhere • 24/7 unlimited conversations •
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Game 1: AI Learning Path */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🧠</div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: currentColor.text }}
            >
              AI Learning Path
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: `${currentColor.text}99` }}
            >
              Master AI concepts step by step. Earn XP and level up your AI
              knowledge!
            </p>
            <button
              onClick={() => setActiveGame("learning")}
              className="w-full py-2 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
              }}
            >
              Start Learning AI
            </button>
          </div>

          {/* Game 2: AI Ethics Dilemmas */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">⚖️</div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: currentColor.text }}
            >
              AI Ethics Dilemmas
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: `${currentColor.text}99` }}
            >
              Solve real-world AI ethics problems. Make ethical AI choices!
            </p>
            <button
              onClick={() => setActiveGame("ethics")}
              className="w-full py-2 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
              }}
            >
              Solve AI Dilemmas
            </button>
          </div>

          {/* Game 3: AI Neural Puzzle */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">🔗</div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: currentColor.text }}
            >
              AI Neural Puzzle
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: `${currentColor.text}99` }}
            >
              Build and train neural networks through fun AI puzzles!
            </p>
            <button
              onClick={() => setActiveGame("neural")}
              className="w-full py-2 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
              }}
            >
              Solve AI Puzzles
            </button>
          </div>
        </div>

        {/* Active Game Display */}
        {activeGame && (
          <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-xl font-bold"
                style={{ color: currentColor.text }}
              >
                {activeGame === "learning" && "🧠 AI Learning Path"}
                {activeGame === "ethics" && "⚖️ AI Ethics Dilemmas"}
                {activeGame === "neural" && "🔗 AI Neural Puzzle"}
              </h3>
              <div className="flex items-center gap-3">
                <span
                  className="text-sm px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${currentColor.primary}20`,
                    color: currentColor.primary,
                  }}
                >
                  XP: {gameScore}
                </span>
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-3 py-1 rounded-lg text-sm"
                  style={{
                    backgroundColor: `${currentColor.primary}20`,
                    color: currentColor.primary,
                  }}
                >
                  Close
                </button>
              </div>
            </div>

            {/* AI Learning Path Game */}
            {activeGame === "learning" && (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span
                      className="text-sm"
                      style={{ color: currentColor.text }}
                    >
                      AI Level {gameLevel}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: currentColor.text }}
                    >
                      Node {learningPath.currentNode + 1}/{learningNodes.length}
                    </span>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (learningPath.currentNode / learningNodes.length) *
                          100
                        }%`,
                        backgroundColor: currentColor.primary,
                      }}
                    />
                  </div>
                </div>

                {learningPath.currentNode < learningNodes.length ? (
                  <div className="bg-white rounded-xl p-6">
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: currentColor.text }}
                    >
                      {learningNodes[learningPath.currentNode].title}
                    </h4>
                    <p
                      className="text-sm mb-4"
                      style={{ color: `${currentColor.text}99` }}
                    >
                      {learningNodes[learningPath.currentNode].description}
                    </p>
                    <p
                      className="font-medium mb-3"
                      style={{ color: currentColor.text }}
                    >
                      {learningNodes[learningPath.currentNode].question}
                    </p>
                    <div className="space-y-2">
                      {learningNodes[learningPath.currentNode].options.map(
                        (opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (
                                idx ===
                                learningNodes[learningPath.currentNode].correct
                              ) {
                                setGameScore(
                                  (prev) =>
                                    prev +
                                    learningNodes[learningPath.currentNode].xp
                                );
                                setGameMessage(
                                  `✅ Correct! +${
                                    learningNodes[learningPath.currentNode].xp
                                  } XP`
                                );
                                setLearningPath((prev) => ({
                                  ...prev,
                                  currentNode: prev.currentNode + 1,
                                  score:
                                    prev.score +
                                    learningNodes[learningPath.currentNode].xp,
                                }));
                              } else {
                                setGameMessage(
                                  `❌ Try again! The correct answer was: ${
                                    learningNodes[learningPath.currentNode]
                                      .options[
                                      learningNodes[learningPath.currentNode]
                                        .correct
                                    ]
                                  }`
                                );
                              }
                            }}
                            className="w-full p-3 rounded-lg text-left transition-all duration-300 hover:scale-102 bg-gray-50 hover:bg-gray-100"
                          >
                            <span style={{ color: currentColor.text }}>
                              {opt}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                    {gameMessage && (
                      <p
                        className="mt-4 text-sm text-center"
                        style={{ color: currentColor.primary }}
                      >
                        {gameMessage}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: currentColor.primary }}
                    />
                    <h4
                      className="text-2xl font-bold mb-2"
                      style={{ color: currentColor.text }}
                    >
                      AI Learning Complete!
                    </h4>
                    <p
                      className="mb-4"
                      style={{ color: `${currentColor.text}99` }}
                    >
                      You've mastered the basics of AI!
                    </p>
                    <button
                      onClick={() => {
                        setLearningPath({
                          currentNode: 0,
                          completedNodes: [],
                          score: 0,
                        });
                        setGameLevel((prev) => prev + 1);
                        setGameMessage("");
                      }}
                      className="px-6 py-2 rounded-lg text-white"
                      style={{ backgroundColor: currentColor.primary }}
                    >
                      Next AI Level
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* AI Ethics Dilemmas Game */}
            {activeGame === "ethics" && (
              <div className="max-w-2xl mx-auto">
                {ethicsGame.currentDilemma < ethicsDilemmas.length ? (
                  <div className="bg-white rounded-xl p-6">
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: currentColor.text }}
                    >
                      {ethicsDilemmas[ethicsGame.currentDilemma].title}
                    </h4>
                    <p
                      className="text-sm mb-4 p-3 rounded-lg"
                      style={{
                        backgroundColor: `${currentColor.primary}10`,
                        color: currentColor.text,
                      }}
                    >
                      {ethicsDilemmas[ethicsGame.currentDilemma].scenario}
                    </p>
                    <div className="space-y-3">
                      {ethicsDilemmas[ethicsGame.currentDilemma].options.map(
                        (opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (opt.ethical) {
                                setEthicsGame((prev) => ({
                                  ...prev,
                                  score: prev.score + 10,
                                  currentDilemma: prev.currentDilemma + 1,
                                }));
                                setGameScore((prev) => prev + 10);
                                setGameMessage("🌟 Ethical choice! +10 points");
                              } else {
                                setGameMessage(
                                  "⚠️ Consider the ethical implications of this choice"
                                );
                              }
                            }}
                            className="w-full p-4 rounded-lg text-left transition-all duration-300 hover:scale-102"
                            style={{
                              backgroundColor: `${currentColor.primary}05`,
                            }}
                          >
                            <p
                              className="font-medium mb-1"
                              style={{ color: currentColor.text }}
                            >
                              {opt.text}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: `${currentColor.text}60` }}
                            >
                              {opt.explanation}
                            </p>
                          </button>
                        )
                      )}
                    </div>
                    {gameMessage && (
                      <p
                        className="mt-4 text-sm text-center"
                        style={{ color: currentColor.primary }}
                      >
                        {gameMessage}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Award
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: currentColor.primary }}
                    />
                    <h4
                      className="text-2xl font-bold mb-2"
                      style={{ color: currentColor.text }}
                    >
                      AI Ethics Master!
                    </h4>
                    <p
                      className="mb-4"
                      style={{ color: `${currentColor.text}99` }}
                    >
                      You scored {ethicsGame.score} points in AI Ethics!
                    </p>
                    <button
                      onClick={() => {
                        setEthicsGame({
                          currentDilemma: 0,
                          score: 0,
                          choices: [],
                        });
                        setGameMessage("");
                      }}
                      className="px-6 py-2 rounded-lg text-white"
                      style={{ backgroundColor: currentColor.primary }}
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* AI Neural Puzzle Game */}
            {activeGame === "neural" && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-xl p-8">
                  <Cpu
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: currentColor.primary }}
                  />
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: currentColor.text }}
                  >
                    AI Neural Network Puzzle
                  </h4>
                  <p
                    className="mb-6"
                    style={{ color: `${currentColor.text}99` }}
                  >
                    Connect the layers to build an AI neural network! Level{" "}
                    {neuralPuzzle.currentLevel}
                  </p>
                  <div className="flex justify-center gap-8 mb-6">
                    {[3, 4, 3].map((neurons, idx) => (
                      <div key={idx} className="text-center">
                        <div
                          className="text-sm mb-2"
                          style={{ color: currentColor.text }}
                        >
                          Layer {idx + 1}
                        </div>
                        {Array(neurons)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full mb-2"
                              style={{
                                backgroundColor: currentColor.primary,
                                opacity: 0.5 + i * 0.1,
                              }}
                            />
                          ))}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      if (neuralPuzzle.currentLevel < 5) {
                        setNeuralPuzzle((prev) => ({
                          ...prev,
                          currentLevel: prev.currentLevel + 1,
                        }));
                        setGameScore((prev) => prev + 20);
                        setGameMessage(
                          `✅ Level ${neuralPuzzle.currentLevel} complete! +20 XP`
                        );
                      } else {
                        setNeuralPuzzle({ currentLevel: 1, solved: true });
                      }
                    }}
                    className="px-6 py-2 rounded-lg text-white"
                    style={{ backgroundColor: currentColor.primary }}
                  >
                    {neuralPuzzle.currentLevel < 5
                      ? "Complete Level"
                      : "Finish Puzzle"}
                  </button>
                  {gameMessage && (
                    <p
                      className="mt-4 text-sm"
                      style={{ color: currentColor.primary }}
                    >
                      {gameMessage}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4 AI Tutor Tiers Section */}
      <section
        id="aitutors"
        className="relative z-10 max-w-7xl mx-auto px-4 py-24"
      >
        <h2
          className="text-4xl font-bold text-center mb-4"
          style={{ color: currentColor.text }}
        >
          Choose Your <span>AI Tutor</span>
        </h2>
        <p
          className="text-center mb-12"
          style={{ color: `${currentColor.text}99` }}
        >
          Select the perfect AI tutor for your learning journey
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 hover:scale-105 ${
                tier.popular ? "border-2" : "border-white/50"
              }`}
              style={{ borderColor: tier.popular ? tier.color : undefined }}
            >
              {tier.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: tier.color }}
                >
                  Most Popular
                </div>
              )}

              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${tier.color}20`,
                    color: tier.color,
                  }}
                >
                  {tier.icon}
                </div>
              </div>

              <h3
                className="text-xl font-bold text-center mb-2"
                style={{ color: currentColor.text }}
              >
                {tier.name}
              </h3>

              <div className="text-center mb-4">
                <span
                  className="text-3xl font-bold"
                  style={{ color: currentColor.text }}
                >
                  {tier.price}
                </span>
                <span
                  className="text-sm"
                  style={{ color: `${currentColor.text}60` }}
                >
                  /{tier.period}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: tier.color }}
                    />
                    <span style={{ color: `${currentColor.text}99` }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/register")}
                className="w-full py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: tier.popular ? tier.color : "white",
                  color: tier.popular ? "white" : tier.color,
                  border: `1px solid ${tier.color}`,
                }}
              >
                Select {tier.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 max-w-3xl mx-auto px-4 py-24">
        <h2
          className="text-4xl font-bold text-center mb-12"
          style={{ color: currentColor.text }}
        >
          Frequently Asked <span>Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-sm rounded-xl border border-white/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
              onClick={() =>
                setExpandedFaq(expandedFaq === index ? null : index)
              }
            >
              <div className="p-6 flex items-center justify-between">
                <h3
                  className="font-semibold"
                  style={{ color: currentColor.text }}
                >
                  {faq.question}
                </h3>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedFaq === index ? "rotate-90" : ""
                  }`}
                  style={{ color: currentColor.primary }}
                />
              </div>
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <p
                    className="text-sm"
                    style={{ color: `${currentColor.text}99` }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        <div
          className="rounded-3xl p-16 text-center border border-white/30 overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg, ${currentColor.primary}20, ${currentColor.secondary}20)`,
          }}
        >
          <h2
            className="text-5xl font-bold mb-4 relative z-10"
            style={{ color: currentColor.text }}
          >
            Ready to start your <span>AI journey</span>?
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto relative z-10"
            style={{ color: `${currentColor.text}99` }}
          >
            Join thousands of learners mastering Artificial Intelligence through
            games!
          </p>
          <button
            onClick={() => navigate("/register")}
            className="group px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-500 hover:scale-105 relative z-10"
            style={{
              background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
            }}
          >
            Start Learning AI Free
            <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 border-t"
        style={{ borderColor: `${currentColor.text}10` }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span
                  className="font-bold"
                  style={{ color: currentColor.text }}
                >
                  float AI
                </span>
              </div>
              <p
                className="text-sm"
                style={{ color: `${currentColor.text}99` }}
              >
                Learn Artificial Intelligence Through Games 🎮
              </p>
            </div>

            {["AI Games", "AI Tutors", "Company"].map((section, i) => (
              <div key={i}>
                <h4
                  className="font-bold mb-4"
                  style={{ color: currentColor.text }}
                >
                  {section}
                </h4>
                <ul className="space-y-2">
                  {["AI Learning Path", "AI Ethics", "AI Neural"].map(
                    (item, j) => (
                      <li key={j}>
                        <a
                          href="#"
                          className="text-sm hover:underline"
                          style={{ color: `${currentColor.text}99` }}
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pt-8 mt-8 border-t text-center"
            style={{ borderColor: `${currentColor.text}20` }}
          >
            <p className="text-sm" style={{ color: `${currentColor.text}60` }}>
              © 2024 float AI. Learn Artificial Intelligence Through Games
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float-random {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(10deg); }
          50% { transform: translate(-20px, 20px) rotate(-5deg); }
          75% { transform: translate(10px, -10px) rotate(5deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.05); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-15px, 15px) scale(0.95); }
        }

        @keyframes float-slowest {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(10px, -10px) scale(1.02); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .animate-float-random {
          animation: float-random 20s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 18s ease-in-out infinite;
        }

        .animate-float-slowest {
          animation: float-slowest 21s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Landing;
