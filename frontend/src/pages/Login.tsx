import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  Lock,
  Mail,
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

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);

      const res = await api.post("/auth/login", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
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
          {/* Left side - Brand (same as register) */}
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
                <p style={{ color: `${currentColor.text}99` }}>welcome back</p>
              </div>
            </div>

            {/* Welcome message */}
            <div>
              <h2
                className="text-6xl font-bold leading-tight"
                style={{ color: currentColor.text }}
              >
                Nice to
                <br />
                <span style={{ color: currentColor.primary }}>see you</span>
              </h2>
              <p
                className="text-lg mt-6 leading-relaxed"
                style={{ color: `${currentColor.text}cc` }}
              >
                Continue your creative journey. Access your projects, connect
                with the community, and keep creating.
              </p>
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

            {/* Testimonial */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-lg mb-4" style={{ color: currentColor.text }}>
                "This platform changed how I create. The community is amazing!"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                >
                  MJ
                </div>
                <div>
                  <p
                    className="font-medium"
                    style={{ color: currentColor.text }}
                  >
                    Maya Johnson
                  </p>
                  <p style={{ color: `${currentColor.text}99` }}>
                    Digital Artist
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
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
                    welcome back
                  </span>
                </div>

                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: currentColor.text }}
                >
                  Sign in
                </h2>
                <p style={{ color: `${currentColor.text}99` }}>
                  Continue your creative journey
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
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@creative.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: `${currentColor.primary}40`,
                        color: currentColor.text,
                      }}
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
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: `${currentColor.primary}40`,
                        color: currentColor.text,
                      }}
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
                </div>

                {/* Forgot password link */}
                <div className="text-right">
                  <a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: currentColor.primary }}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-semibold py-3.5 rounded-xl transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed group"
                  style={{
                    background: `linear-gradient(135deg, ${currentColor.primary}, ${currentColor.secondary})`,
                  }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign in
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>

                {/* Register link */}
                <p
                  className="text-center text-sm pt-4"
                  style={{ color: `${currentColor.text}99` }}
                >
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="font-medium hover:underline"
                    style={{ color: currentColor.primary }}
                  >
                    Create account
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

export default Login;
