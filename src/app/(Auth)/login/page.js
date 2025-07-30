"use client"

import React, { useState, useEffect } from "react";
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
  const [needsVerification, setNeedsVerification] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);
    } else {
      setCooldownActive(false);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

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
        if (data.needsVerification) {
          setNeedsVerification(true);
          setShowVerificationForm(true);
          setError("Please verify your email before logging in.");
        } else {
          setError(data.msg || "Login failed.");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVerificationMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setVerificationMessage(data.msg || "Verification failed.");
      }
    } catch (error) {
      setVerificationMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (cooldownActive) return;
    
    setLoading(true);
    setVerificationMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/email/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setVerificationMessage("New OTP sent successfully!");
        // Start 60-second cooldown
        setCooldown(60);
        setCooldownActive(true);
      } else {
        if (response.status === 429 && data.remainingTime) {
          setCooldown(data.remainingTime);
          setCooldownActive(true);
          setVerificationMessage(`Please wait ${data.remainingTime} seconds before requesting another OTP.`);
        } else {
          setVerificationMessage(data.msg || "Failed to resend OTP.");
        }
      }
    } catch (error) {
      setVerificationMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showVerificationForm) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left: Info/Brand Panel for desktop */}
        <div className="hidden md:flex flex-col justify-between w-1/2 min-h-screen relative overflow-hidden">
          <div className="flex-1 flex flex-col justify-center items-center px-12">
            <div className="relative flex flex-col items-center mb-8">
              <Image src="/79133041-1ab9-4ab2-a3d1-83b46e0d9650-removebg-preview.png" alt="Welcome cat" width={250} height={250} priority className="w-full max-w-xs drop-shadow-2xl rounded-2xl object-contain z-10" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-24 h-6 bg-black/20 rounded-full blur-md z-0" />
            </div>
            <h3 className="font-sans text-4xl font-extrabold tracking-wide mb-4 text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Verify Your Email</h3>
            <p className="font-[cursive] text-lg text-slate-600 text-center max-w-md leading-relaxed">Please verify your email address to complete your login.</p>
          </div>
          <div className="h-16" />
        </div>

        {/* Right: OTP verification form */}
        <div className="flex flex-1 justify-center items-center bg-white/80">
          <div className="w-full max-w-lg p-12 bg-white/90 backdrop-blur shadow-2xl border border-gray-200 rounded-2xl animate-fade-in my-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 tracking-tight">
              Email Verification
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
            </p>

            {verificationMessage && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${
                verificationMessage.includes("successfully") || verificationMessage.includes("successful") 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {verificationMessage}
              </div>
            )}

            <form onSubmit={verifyOTP} className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-black placeholder-gray-400 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all text-center text-2xl tracking-widest"
                  maxLength={6}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-2xl shadow-md active:scale-95 transition-all"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>

              <div className="text-center">
                {cooldownActive ? (
                  <div className="text-gray-500 text-sm">
                    Resend available in {cooldown} seconds
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={resendOTP}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 text-sm"
                  >
                    {loading ? "Sending..." : "Resend Code"}
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setShowVerificationForm(false);
                  setNeedsVerification(false);
                  setOtp("");
                  setVerificationMessage("");
                  setCooldown(0);
                  setCooldownActive(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Info/Brand Panel for desktop */}
      <div className="hidden md:flex flex-col justify-between w-1/2 min-h-screen  relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center px-12">
          <div className="relative flex flex-col items-center mb-8">
            <Image src="/79133041-1ab9-4ab2-a3d1-83b46e0d9650-removebg-preview.png" alt="Welcome cat" width={250} height={250} priority className="w-full max-w-xs drop-shadow-2xl rounded-2xl object-contain z-10" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-24 h-6 bg-black/20 rounded-full blur-md z-0" />
          </div>
          <h3 className="font-sans text-4xl font-extrabold tracking-wide mb-4 text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Welcome Back!</h3>
          <p className="font-[cursive] text-lg text-slate-600 text-center max-w-md leading-relaxed">Log in to Notify to manage your schedule, attendance, and more. Experience a seamless, modern academic journey.</p>
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
              <p className="mt-1 text-xs text-gray-500">
                Use your @mnit.ac.in email address
              </p>
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
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}