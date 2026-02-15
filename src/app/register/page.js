"use client";

import Link from "next/link";
import { Mail, Lock, User, ChevronLeft } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { validateRegister } from "@/util/util";
import Spinner from "@/components/Spinner";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateRegister(
      form.firstName,
      form.lastName,
      form.email,
      form.password,
      form.confirmPassword
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await api.auth.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      if (res.status === 200 || res.status === 201) {
        router.push("/login");
      } else {
        setError(res.data?.msg || "Failed to register.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.msg || "Something went wrong during registration."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      {/* Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Logo */}
      <div className="mb-10">
        <img src="/logo.svg" alt="Logo" className="w-10" />
      </div>

      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Create your account
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Start organizing your workflow today
      </p>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="John"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0045E6] focus:border-[#0045E6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0045E6] focus:border-[#0045E6]"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0045E6] focus:border-[#0045E6]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0045E6] focus:border-[#0045E6]"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0045E6] focus:border-[#0045E6]"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting && <Spinner size={4} color="white" />}
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="mt-8 text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#0045E6] font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
