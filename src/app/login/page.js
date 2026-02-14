"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, ChevronLeft } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        router.replace("/dashboard");
      }
    } catch {}
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail && !password) {
      setError("Oops! Please enter your email and password to continue.");
      return;
    } else if (!normalizedEmail) {
      setError("We need your email to log you in.");
      return;
    } else if (!password) {
      setError("Your password is missing. Please enter it to continue.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError(
        "Hmm… that doesn’t look like a valid email address. Please check and try again."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.auth.login({
        email: normalizedEmail,
        password,
      });

      if (response.status === 200 && response.data) {
        router.replace("/dashboard");
      }
    } catch (err) {
      setError(
        err?.response?.data?.msg || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="mb-10">
        <img src="/logo.svg" alt="Logo" className="w-10" />
      </div>

      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Sign in to your account
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Enter your credentials to continue
      </p>

      {error && (
        <div
          role="alert"
          className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg"
        >
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin} noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={loading}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0045E6] focus:border-[#0045E6] disabled:bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0045E6] focus:border-[#0045E6] disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              className="accent-[#0045E6]"
              disabled={loading}
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-[#0045E6] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading && <Spinner size={4} color="white" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-8 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="text-[#0045E6] font-medium hover:underline"
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
