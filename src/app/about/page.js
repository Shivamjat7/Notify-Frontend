"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  Info,
  Sparkles,
  Mail,
  Linkedin,
  Instagram,
  GraduationCap,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function About() {
  const [suggestion, setSuggestion] = useState("");
  const [tk, setTk] = useState(null);
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setTk(token);
  }, []);

  const onSubmitSuggestion = async (e) => {
    e.preventDefault();
    console.log(suggestion);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/services/suggestions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tk}`,
          },
          body: JSON.stringify({ suggestion }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setApiMessage(data.msg || "Thanks for your suggestion!");
        setSuggestion("");
      } else {
        setApiMessage(data.msg || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setApiMessage("Network error. Please try again.");
    }
    setTimeout(() => setApiMessage(""), 3000);
  };
  const onChange = (e) => {
    setSuggestion(e.target.value);
  };

  return (
    <>
      <Navbar showAttendanceBar={false} position={"relative"} />
      <main className="min-h-screen pb-24 bg-gradient-to-br from-blue-50 via-indigo-100 to-pink-50 py-12 px-2 md:px-0 flex flex-col items-center">
        {/* Header & Intro */}
        <section className="w-full max-w-3xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-400 bg-clip-text text-transparent tracking-tight font-playfair drop-shadow-lg">
              About This App
            </h1>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 mt-2">
            <p className="text-lg md:text-xl text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" /> Welcome to Notify —
              an advanced attendance marking and management app that’s free for
              all students.
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" /> I built this to
              help everyone track attendance easily, stay informed, and focus
              more on what really matters — learning and teaching!
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> Whether you’re a
              student or a teacher, Notify is here to modernize attendance,
              provide transparency, and simplify your day.
            </p>
            <p className="text-lg md:text-xl text-gray-700 italic mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" /> “Forget dull
              timetables and attendance stress — we make it effortless so you
              can focus on what really matters!”
            </p>
          </div>
        </section>

        {/* Profile Section */}
        <section className="w-full max-w-3xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8 gap-6">
            <div className="relative w-32 h-32 flex-shrink-0 mb-4 md:mb-0">
              <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-400 via-blue-400 to-pink-300 blur opacity-30"></span>
              <Image
                src="/shivamjat.jpg"
                alt="Shivam Jat"
                width={200}
                height={200}
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-xl relative z-10"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-400" /> Shivam Jat
              </h2>
              <p className="text-gray-700 mb-2">
                Hi! 👋 I’m Shivam, a CSE 2nd-year student at MNIT Jaipur. I love
                solving real problems with code and building useful tools for
                students. I hope this helps you too!
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
                  <GraduationCap className="w-4 h-4" /> MNIT Jaipur, CSE 2nd
                  Year
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="w-full max-w-3xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" /> Contact Information
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex-1 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-indigo-400" />{" "}
                  <span>Email:</span>{" "}
                  <a
                    href="mailto:shivamjat531@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    shivamjat531@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Linkedin className="w-4 h-4 text-blue-500" />{" "}
                  <span>LinkedIn:</span>{" "}
                  <a
                    href="https://www.linkedin.com/in/shivamjat"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    linkedin.com/in/shivamjat
                  </a>
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Instagram className="w-4 h-4 text-pink-400" />{" "}
                  <span>Instagram:</span>{" "}
                  <a
                    href="https://www.instagram.com/shivamjat.07"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    @shivamjat.07
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Suggestion Box */}
        <section className="w-full max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" /> Suggestion Box
            </h3>
            <p className="text-gray-700 mb-4">
              Have an idea to improve this app? Want to share your feedback?
              Send me your suggestions below — I’d love to hear from you!
            </p>
            <form
              onSubmit={onSubmitSuggestion}
              className="flex flex-col space-y-4 max-w-md mx-auto"
            >
              <textarea
                placeholder="Your suggestions..."
                value={suggestion}
                onChange={onChange}
                rows={4}
                className="placeholder-gray-500 text-gray-800 resize-none w-full p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 shadow"
              ></textarea>
              {apiMessage.length > 0 && (
                <div className="text-sm text-green-700 bg-green-100 px-4 py-2 rounded-md shadow">
                  {apiMessage}
                </div>
              )}
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
              >
                Send Suggestion
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
