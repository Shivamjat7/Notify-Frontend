"use client"
import React, { useState } from "react";
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

  const branches = ["CSE", "ECE", "Mechanical", "Civil", "Electrical", "Chemical", "Architecture", "Metallurgy"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const batches = ["A1", "A2", "A3", "A4", "A5", "A6"];

  const onSumbitForm = async (e) => {
    e.preventDefault();
    const response = await fetch( `${process.env.NEXT_PUBLIC_HOST}/api/auth/login`,
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
      localStorage.setItem("token",data.token)
      router.push('/')
    } else {
      alert("Signup failed.");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <h3 className="font-sans text-4xl font-extrabold tracking-wide text-slate-800 mb-4 text-center">Welcome to Notify!</h3>
          <p className="font-sans text-lg text-slate-600 text-center max-w-md leading-relaxed">Join the Notify to manage your schedule, attendance, and more with ease. Experience a seamless, modern academic journey.</p>
        </div>
        <div className="h-16" />
      </div>
      {/* Right: sign up form card */}
      <div className="flex flex-1 justify-center items-center bg-white/80">
        <div className="w-full max-w-lg p-12 bg-white/90 backdrop-blur shadow-2xl border border-gray-200 rounded-2xl animate-fade-in my-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 tracking-tight">
            Create your account
          </h2>
          <form onSubmit={onSumbitForm} className="grid gap-7">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@mnit.ac.in"
                onChange={handleChange}
                value={form.email}
                className="text-black placeholder-gray-400 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
                autoComplete="off"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                name="semester"
                onChange={handleChange}
                value={form.semester}
                className="text-gray-800 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
              >
                <option value="" disabled>Select semester</option>
                {semesters.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            {/* Branch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="text-gray-800 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
              >
                <option value="" disabled>Select branch</option>
                {branches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            {/* Batch */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <select
                name="batch"
                onChange={handleChange}
                value={form.batch}
                className="text-gray-800 w-full px-4 py-3 text-base border border-gray-300 rounded-xl bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:shadow transition-all"
              >
                <option value="" disabled>Select batch</option>
                {batches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-md active:scale-95 transition-all"
            >
              Sign Up
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline font-medium">
              Log in
            </a>
          </p>
          <p className="mt-4 text-xs text-center text-gray-400">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}
