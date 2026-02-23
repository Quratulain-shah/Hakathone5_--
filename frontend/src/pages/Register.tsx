import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  Mail,
  Lock,
  User,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Heart,
  Smile,
  Coffee,
  Music,
  Palette,
  Sun,
} from "lucide-react";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeColor, setActiveColor] = useState("peach");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post(
        "/auth/register",
        {
          email: formData.email,
          password: formData.password,
          full_name: formData.name,
        },
        {
          params: {
            email: formData.email,
            password: formData.password,
            full_name: formData.name,
          },
        }
      );

      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.password.length >= 6
    );
  };

  const colorOptions = [
    { id: "peach", icon: <Sun className="w-4 h-4" />, color: "#FF9A8B" },
    { id: "mint", icon: <Smile className="w-4 h-4" />, color: "#84DCC6" },
    { id: "lavender", icon: <Heart className="w-4 h-4" />, color: "#B8A9E6" },
    { id: "coral", icon: <Coffee className="w-4 h-4" />, color: "#FFB3A6" },
    { id: "sky", icon: <Music className="w-4 h-4" />, color: "#89CFF0" },
    { id: "rose", icon: <Palette className="w-4 h-4" />, color: "#F7CAC9" },
  ];

  return (
    <div
      style={{ backgroundColor: currentColor.bg }}
      className="min-h-screen transition-colors duration-500"
    >
      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-float"
          style={{ backgroundColor: currentColor.primary }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20 animate-float animation-delay-2000"
          style={{ backgroundColor: currentColor.secondary }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 animate-float animation-delay-4000"
          style={{ backgroundColor: currentColor.accent }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 min-h-screen flex items-center py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left side - Brand */}
          <div className="space-y-8">
            {/* Color selector */}
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm p-2 rounded-2xl inline-flex">
              {colorOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveColor(option.id)}
                  className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${
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

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: currentColor.text }}
                >
                  Synapse Tutor
                </h1>
                <p style={{ color: `${currentColor.text}99` }}>create freely</p>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h2
                className="text-6xl font-bold leading-tight"
                style={{ color: currentColor.text }}
              >
                Start
                <br />
                <span style={{ color: currentColor.primary }}>creating</span>
              </h2>
              <p
                className="text-lg mt-6 leading-relaxed"
                style={{ color: `${currentColor.text}cc` }}
              >
                Join a community of creators who share your passion. Build,
                learn, and grow together.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">🎨</div>
                <div
                  className="font-medium"
                  style={{ color: currentColor.text }}
                >
                  Create
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">🤝</div>
                <div
                  className="font-medium"
                  style={{ color: currentColor.text }}
                >
                  Share
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">✨</div>
                <div
                  className="font-medium"
                  style={{ color: currentColor.text }}
                >
                  Grow
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: currentColor.text }}
                >
                  10k+
                </div>
                <div style={{ color: `${currentColor.text}99` }}>creators</div>
              </div>
              <div
                className="w-px h-10"
                style={{ backgroundColor: `${currentColor.text}20` }}
              ></div>
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: currentColor.text }}
                >
                  50k+
                </div>
                <div style={{ color: `${currentColor.text}99` }}>projects</div>
              </div>
              <div
                className="w-px h-10"
                style={{ backgroundColor: `${currentColor.text}20` }}
              ></div>
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: currentColor.text }}
                >
                  4.9
                </div>
                <div style={{ color: `${currentColor.text}99` }}>rating</div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white">
              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ backgroundColor: currentColor.light }}
                >
                  <Heart
                    className="w-4 h-4"
                    style={{ color: currentColor.primary }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: currentColor.text }}
                  >
                    join for free
                  </span>
                </div>

                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: currentColor.text }}
                >
                  Sign up
                </h2>
                <p style={{ color: `${currentColor.text}99` }}>
                  Start your creative journey
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentColor.text }}
                  >
                    What's your name?
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: `${currentColor.text}60` }}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: `${currentColor.primary}40`,
                        color: currentColor.text,
                        focus: { borderColor: currentColor.primary },
                      }}
                      placeholder="Alex Rivera"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentColor.text }}
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: `${currentColor.text}60` }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: `${currentColor.primary}40`,
                        color: currentColor.text,
                      }}
                      placeholder="hello@creative.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentColor.text }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: `${currentColor.text}60` }}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: `${currentColor.primary}40`,
                        color: currentColor.text,
                      }}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: `${currentColor.text}60` }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: `${currentColor.text}80` }}
                  >
                    Minimum 6 characters
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !isFormValid()}
                  className="w-full text-white font-semibold py-3.5 rounded-xl transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed group"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Create account
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>

                {/* Login link */}
                <p
                  className="text-center text-sm pt-4"
                  style={{ color: `${currentColor.text}99` }}
                >
                  Already have an account?{" "}
                  <a
                    href="/login"
                    style={{ color: currentColor.primary }}
                    className="font-medium hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(0px, 0px) scale(1); }
          75% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
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

export default Register;
