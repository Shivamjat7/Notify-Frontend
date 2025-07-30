"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    semester: "",
    branch: "",
    batch: "",
  });

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [emailError, setEmailError] = useState("");

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

  // Email validation function
  const validateEmail = (email) => {
    if (!email) {
      setEmailError("");
      return true;
    }
    
    const allowedDomain = '@mnit.ac.in';
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      setEmailError("Only @mnit.ac.in email addresses are allowed");
      return false;
    }
    
    setEmailError("");
    return true;
  };

  const branches = [
    "CSE",
    "ECE",
    "Mechanical",
    "Civil",
    "Electrical",
    "Chemical",
    "Architecture",
    "Metallurgy",
  ];
  const branchBatchMap = {
    CSE: ["A1", "A2", "A3", "A4"],
    ECE: ["E1", "E2", "E3", "E4", "E5"],
    Mechanical: ["M1", "M2", "M3"],
    Civil: ["C1", "C2"],
    Electrical: ["EL1", "EL2"],
    Chemical: ["CH1", "CH2"],
    Architecture: ["AR1"],
    Metallurgy: ["MT1", "MT2"],
  };

  const currentBatches = branchBatchMap[form.branch] || [];

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const onSumbitForm = async (e) => {
    e.preventDefault();
    
    // Validate email domain before submission
    if (!validateEmail(form.email)) {
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      
      if (response.ok && data.success) {
        setShowOTPForm(true);
        setMessage("Registration successful! Please check your email for verification code.");
        // Start 60-second cooldown
        setCooldown(60);
        setCooldownActive(true);
      } else {
        setMessage(data.msg || "Signup failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            otp: otp,
          }),
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("token", data.token);
        router.push("/");
      } else {
        setMessage(data.msg || "Verification failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (cooldownActive) return;
    
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/email/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
          }),
        }
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("New OTP sent successfully!");
        // Start 60-second cooldown
        setCooldown(60);
        setCooldownActive(true);
      } else {
        if (response.status === 429 && data.remainingTime) {
          setCooldown(data.remainingTime);
          setCooldownActive(true);
          setMessage(`Please wait ${data.remainingTime} seconds before requesting another OTP.`);
        } else {
          setMessage(data.msg || "Failed to resend OTP.");
        }
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "branch") {
      setForm({ ...form, branch: value, batch: "" }); // reset batch if branch changes
    } else {
      setForm({ ...form, [name]: value });
    }
    
    // Validate email when it changes
    if (name === "email") {
      validateEmail(value);
    }
  };

  if (showOTPForm) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left: Info/Brand Panel for desktop */}
        <div className="hidden md:flex flex-col justify-between w-1/2 min-h-screen relative overflow-hidden">
          <div className="flex-1 flex flex-col justify-center items-center px-12">
            <div className="relative flex flex-col items-center mb-8">
              <Image
                src="/79133041-1ab9-4ab2-a3d1-83b46e0d9650-removebg-preview.png"
                alt="Welcome cat"
                width={250}
                height={250}
                priority
                className="w-full max-w-xs drop-shadow-2xl rounded-2xl object-contain z-10"
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-24 h-6 bg-black/20 rounded-full blur-md z-0" />
            </div>
            <h3 className="font-sans text-4xl font-extrabold tracking-wide mb-4 text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Verify Your Email
            </h3>
            <p className="font-[cursive] text-lg text-slate-600 text-center max-w-md leading-relaxed">
              We've sent a verification code to your email. Please enter it below to complete your registration.
            </p>
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
              Enter the 6-digit code sent to <span className="font-semibold">{form.email}</span>
            </p>

            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${
                message.includes("successfully") || message.includes("successful") 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {message}
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
                onClick={() => setShowOTPForm(false)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to Sign Up
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
            <Image
              src="/79133041-1ab9-4ab2-a3d1-83b46e0d9650-removebg-preview.png"
              alt="Welcome cat"
              width={250}
              height={250}
              priority
              className="w-full max-w-xs drop-shadow-2xl rounded-2xl object-contain z-10"
            />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-24 h-6 bg-black/20 rounded-full blur-md z-0" />
          </div>
          <h3 className="font-sans text-4xl font-extrabold tracking-wide mb-4 text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Notify!
          </h3>
          <p className="font-[cursive] text-lg text-slate-600 text-center max-w-md leading-relaxed">
            Join the Notify to manage your schedule, attendance, and more with
            ease. Experience a seamless, modern academic journey.
          </p>
        </div>
        <div className="h-16" />
      </div>
      {/* Right: sign up form card */}
      <div className="flex flex-1 justify-center items-center bg-white/80">
        <div className="w-full max-w-lg p-12 bg-white/90 backdrop-blur shadow-2xl border border-gray-200 rounded-2xl animate-fade-in my-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 tracking-tight">
            Create your account
          </h2>
          
          {message && (
            <div className={`p-3 rounded-lg mb-4 text-sm ${
              message.includes("successfully") || message.includes("successful") 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={onSumbitForm} className="grid gap-7">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                onChange={handleChange}
                value={form.name}
                className="text-black placeholder-gray-400 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
                autoComplete="off"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@mnit.ac.in"
                onChange={handleChange}
                value={form.email}
                className={`text-black placeholder-gray-400 w-full px-4 py-3 text-base border rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:shadow transition-all ${
                  emailError 
                    ? 'border-red-300 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                autoComplete="off"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {emailError}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Only @mnit.ac.in email addresses are allowed
              </p>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={handleChange}
                value={form.password}
                className="text-black placeholder-gray-400 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
                autoComplete="off"
              />
            </div>
            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semester"
                onChange={handleChange}
                value={form.semester}
                className="text-gray-800 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
              >
                <option value="" disabled>
                  Select semester
                </option>
                {semesters.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="text-gray-800 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
              >
                <option value="" disabled>
                  Select branch
                </option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            {/* Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch
              </label>
              <select
                name="batch"
                onChange={handleChange}
                value={form.batch}
                disabled={!form.branch} // disable if no branch selected
                className="text-gray-800 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
              >
                <option value="" disabled>
                  Select batch
                </option>
                {currentBatches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || emailError}
              className="w-full py-3 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-2xl shadow-md active:scale-95 transition-all"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
          <p className="mt-4 text-xs text-center text-gray-400">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
