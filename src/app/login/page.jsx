"use client";

import { useState } from "react";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { Camera, Mail, Lock, ArrowRight } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // <-- এটি যুক্ত করা হয়েছে (কুকি রিসিভ করার জন্য জরুরি)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed!");
      }

      // টোকেন কুকিতে সেভ হচ্ছে, তবে চাইলে ইউজার ইনফো লোকালস্টোরেজে রাখতে পারেন
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleUser = await userInfoRes.json();

        const res = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: tokenResponse.access_token,
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
          }),
          credentials: "include", // <-- এখানেও যুক্ত করা হয়েছে
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Google login failed!");
        }

        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Google login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (error) {
        toast.error(error.message || "Google authentication failed!");
      }
    },
    onError: () => {
      toast.error("Google Sign In Failed");
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white tracking-wider mb-2">
          <div className="p-2 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-xl text-black">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span>Studio<span className="text-amber-500">Space</span></span>
        </Link>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Welcome back</h2>
        <p className="text-sm text-neutral-400 mt-1">Sign in to manage your studio spaces and bookings</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-neutral-900 border border-neutral-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="creator@studiospace.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">Password</label>
                <a href="#" className="text-xs text-amber-500 hover:text-amber-400 font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl py-2.5 text-sm transition-colors shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-900 px-2 text-neutral-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => handleGoogleLogin()}
                className="w-full flex items-center justify-center gap-3 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl py-2.5 text-sm font-medium text-white transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.19v3.15C3.17 21.3 7.25 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.6H1.19C.43 8.14 0 9.89 0 12s.43 3.86 1.19 5.4l4.09-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.25 0 3.17 2.7 1.19 6.6l4.09 3.15c.95-2.84 3.6-4.95 6.72-4.95z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-neutral-400 mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-amber-500 hover:text-amber-400 font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}