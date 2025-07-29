"use client"

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setError(response.msg);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Info/Brand Panel for desktop */}
      <div className="hidden md:flex flex-col justify-between w-1/2 min-h-screen bg-gradient-to-br from-blue-300 via-blue-200 to-pink-200 relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center px-12">
          <div className="relative flex flex-col items-center mb-8">
            <Image src="/79133041-1ab9-4ab2-a3d1-83b46e0d9650-removebg-preview.png" alt="Welcome cat" width={250} height={250} priority className="w-full max-w-xs drop-shadow-2xl rounded-2xl object-contain z-10" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-24 h-6 bg-black/20 rounded-full blur-md z-0" />
          </div>
          <h3 className="font-sans text-4xl font-extrabold tracking-wide text-slate-800 mb-4 text-center">Welcome Back!</h3>
          <p className="font-sans text-lg text-slate-600 text-center max-w-md leading-relaxed">Log in to Notify to manage your schedule, attendance, and more. Experience a seamless, modern academic journey.</p>
        </div>
        <div className="h-16" />
      </div>
      {/* Right: login form card */}
      <div className="flex flex-1 justify-center items-center bg-white/80 relative overflow-hidden">
        {/* Subtle blurred blue/purple shape for depth */}
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-gradient-to-br from-blue-200 via-purple-200 to-transparent rounded-full blur-3xl opacity-30 z-0 pointer-events-none" />
        <div className="w-full max-w-lg p-12 bg-white/90 backdrop-blur shadow-2xl border border-gray-200 rounded-2xl animate-fade-in my-12 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 tracking-tight">
            Log in to your account
          </h2>
          <form onSubmit={handleLogin} className="grid gap-7">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiMail size={18} /></span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@mnit.ac.in"
                  className="pl-10 placeholder-gray-400 text-black w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
                  autoComplete="off"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiLock size={18} /></span>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 placeholder-gray-400 text-black w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
                  autoComplete="off"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
            {/* Error */}
            {error && (
              <div className="flex items-center justify-center bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg py-2 px-3">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              Log In
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}