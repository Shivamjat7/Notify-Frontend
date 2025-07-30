"use client";
import Link from "next/link";
import { useState } from "react";
import AttendanceBar from "./AttendanceBar";
import { usePathname } from "next/navigation";
import { Home, Info, CalendarCheck, UserCircle, Star } from 'lucide-react';

const Navbar = ({ position }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showAttendanceBar, setShowAttendanceBar] = useState(false);

  return (
    <>
      <div className={`${position} w-full top-0 z-20`}>
        <nav className="bg-gradient-to-r from-white via-blue-50 to-white text-gray-800 px-8 py-4 shadow-lg backdrop-blur-xl border-b border-gray-200/50 relative overflow-hidden">
          {/* Modern Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
          
          <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
            {/* Logo/Title */}
            <Link href="/" className="group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/25 transition-all duration-500 group-hover:scale-110 group-hover:shadow-blue-500/40">
                    N
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-700">
                    Notify
                  </h1>
                  <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    <p className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></p>
                    Attendance Tracker
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="group relative">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                  pathname === '/' 
                    ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-300/50 shadow-md shadow-blue-500/20' 
                    : 'hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-indigo-500/5 border border-transparent hover:border-blue-300/30'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    pathname === '/' 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md shadow-blue-500/25' 
                      : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-500 group-hover:shadow-md group-hover:shadow-blue-500/25'
                  }`}>
                    <Home size={18} className={`transition-all duration-300 ${
                      pathname === '/' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                    }`} />
                  </div>
                  <span className={`font-medium transition-all duration-300 ${
                    pathname === '/' ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-700'
                  }`}>
                    Home
                  </span>
                </div>
              </Link>
              
              <Link href="/about" className="group relative">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                  pathname === '/about' 
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-300/50 shadow-md shadow-indigo-500/20' 
                    : 'hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-purple-500/5 border border-transparent hover:border-indigo-300/30'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    pathname === '/about' 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/25' 
                      : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:shadow-md group-hover:shadow-indigo-500/25'
                  }`}>
                    <Info size={18} className={`transition-all duration-300 ${
                      pathname === '/about' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                    }`} />
                  </div>
                  <span className={`font-medium transition-all duration-300 ${
                    pathname === '/about' ? 'text-indigo-700' : 'text-gray-600 group-hover:text-indigo-700'
                  }`}>
                    About
                  </span>
                </div>
              </Link>
              
              <Link href="/schedule" className="group relative">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                  pathname === '/schedule' 
                    ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/50 shadow-md shadow-emerald-500/20' 
                    : 'hover:bg-gradient-to-r hover:from-emerald-500/5 hover:to-teal-500/5 border border-transparent hover:border-emerald-300/30'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    pathname === '/schedule' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md shadow-emerald-500/25' 
                      : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:shadow-md group-hover:shadow-emerald-500/25'
                  }`}>
                    <CalendarCheck size={18} className={`transition-all duration-300 ${
                      pathname === '/schedule' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                    }`} />
                  </div>
                  <span className={`font-medium transition-all duration-300 ${
                    pathname === '/schedule' ? 'text-emerald-700' : 'text-gray-600 group-hover:text-emerald-700'
                  }`}>
                    Schedule
                  </span>
                </div>
              </Link>

              <Link href="/profile" className="group relative">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                  pathname === '/profile' 
                    ? 'bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-300/50 shadow-md shadow-rose-500/20' 
                    : 'hover:bg-gradient-to-r hover:from-rose-500/5 hover:to-pink-500/5 border border-transparent hover:border-rose-300/30'
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    pathname === '/profile' 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-md shadow-rose-500/25' 
                      : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-pink-500 group-hover:shadow-md group-hover:shadow-rose-500/25'
                  }`}>
                    <UserCircle size={18} className={`transition-all duration-300 ${
                      pathname === '/profile' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                    }`} />
                  </div>
                  <span className={`font-medium transition-all duration-300 ${
                    pathname === '/profile' ? 'text-rose-700' : 'text-gray-600 group-hover:text-rose-700'
                  }`}>
                    Profile
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
        
        {showAttendanceBar && <AttendanceBar />}
        
        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-sm md:hidden z-50 px-4">
          <div className="bg-white rounded-full border border-gray-200 shadow-lg">
            <div className="flex items-center justify-around py-3 px-2">
              {/* Schedule */}
              <Link href="/schedule" aria-label="Schedule" className="flex flex-col items-center group focus:outline-none">
                <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
                  pathname === '/schedule' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`}>
                  <CalendarCheck size={20} />
                </span>
              </Link>

              {/* Attendance Toggle */}
              <button
                onClick={() => setShowAttendanceBar(prev => !prev)}
                className="flex flex-col items-center group focus:outline-none"
                aria-label="Attendance"
              >
                <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
                  showAttendanceBar ? 'bg-blue-100 text-blue-600' : 'text-gray-400 group-hover:text-amber-500'
                }`}>
                  <Star size={20} />
                </span>
              </button>

              {/* Home */}
              <Link href="/" aria-label="Home" className="flex flex-col items-center group focus:outline-none">
                <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
                  pathname === '/' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`}>
                  <Home size={20} />
                </span>
              </Link>

              {/* About */}
              <Link href="/about" aria-label="About" className="flex flex-col items-center group focus:outline-none">
                <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
                  pathname === '/about' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`}>
                  <Info size={20} />
                </span>
              </Link>

              {/* Profile */}
              <Link href="/profile" aria-label="Profile" className="flex flex-col items-center group focus:outline-none">
                <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
                  pathname === '/profile' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`}>
                  <UserCircle size={20} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;