"use client";
import Link from "next/link";
import Image from "next/image";
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
        <nav className="bg-gradient-to-r from-blue-700 via-blue-400 to-blue-300 text-white px-6 py-3 shadow-lg rounded-b-2xl transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo/Title */}
            <span
              className="text-3xl font-extrabold tracking-wide text-white font-playfair drop-shadow-[0_2px_8px_rgba(30,58,138,0.7)] transition-all duration-200 select-none cursor-pointer"
              style={{ letterSpacing: '0.04em' }}
              onClick={() => router.push("/")}
            >
              Notify
            </span>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center justify-end space-x-8">
              <Link href="/" className="flex items-center gap-2 font-medium transition-colors duration-200 group">
                {pathname === '/' ? (
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 transition-all duration-200">
                    <Home size={22} strokeWidth={2.2} className="text-indigo-600" />
                  </span>
                ) : (
                  <span className="transition-all duration-200 text-slate-100 group-hover:text-indigo-400">
                    <Home size={22} strokeWidth={2.2} />
                  </span>
                )}
                <span className="hidden lg:inline">Home</span>
              </Link>
              <Link href="/about" className="flex items-center gap-2 font-medium transition-colors duration-200 group">
                {pathname === '/about' ? (
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 transition-all duration-200">
                    <Info size={22} strokeWidth={2.2} className="text-indigo-600" />
                  </span>
                ) : (
                  <span className="transition-all duration-200 text-slate-100 group-hover:text-indigo-400">
                    <Info size={22} strokeWidth={2.2} />
                  </span>
                )}
                <span className="hidden lg:inline">About Us</span>
              </Link>
              {/* Toggle AttendanceBar Icon */}
              <Link href={'/schedule'}

                className="flex items-center gap-2 font-medium transition-colors duration-200 group cursor-pointer focus:outline-none"
                tabIndex={0}


              >
                {pathname === '/schedule' ? (
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 transition-all duration-200">
                    <CalendarCheck size={22} strokeWidth={2.2} className="text-indigo-600" />
                  </span>
                ) : (
                  <span className="transition-all duration-200 text-slate-100 group-hover:text-indigo-400">
                    <CalendarCheck size={22} strokeWidth={2.2} />
                  </span>
                )}
                <span className="hidden lg:inline">Schedule</span>
              </Link>



              {/* Profile Avatar as Dropdown Trigger (UI only) */}
              <div className="relative group">
                <Link href="/profile">
                  <Image
                    src="/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                    alt="Profile"
                    width={200}
                    height={200}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md group-hover:ring-4 group-hover:ring-blue-200 transition-all duration-200"
                  />
                </Link>
                {/* Future dropdown menu can go here */}
              </div>
            </div>
          </div>
        </nav>
        {showAttendanceBar && <AttendanceBar />}
        {/* - Bottom Bar --- */}
        <div className="fixed bottom-2 left-0 right-0 mx-auto max-w-xs md:hidden z-50">
          <div className="flex flex-row items-center justify-between gap-x-2 px-2 py-1 rounded-full bg-white shadow-2xl">


            {/* schedule icon  */}
            <Link href="/schedule" aria-label="Shedule" className="flex flex-col items-center group focus:outline-none">
              <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200
                ${pathname === '/schedule' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 group-hover:text-indigo-400'}`}
              >
                <CalendarCheck size={22} strokeWidth={2.2} />
              </span>
            </Link>

            {/* Star Icon */}
            <span
              onClick={() => setShowAttendanceBar(prev => !prev)}
              className="flex flex-col items-center group p-0 focus:outline-none"
              aria-label="Attendance"
            >
              <span
                className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200
      ${showAttendanceBar
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-slate-400 group-hover:text-amber-400'}`}
              >
                <Star size={20} strokeWidth={2.2} />
              </span>
            </span>




            <Link href="/" aria-label="Home" className="flex flex-col items-center group focus:outline-none">
              <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200
                ${pathname === '/' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 group-hover:text-indigo-400'}`}
              >
                <Home size={22} strokeWidth={2.2} />
              </span>

            </Link>
            {/* About Us Icon  */}
            <Link href="/about" aria-label="About Us" className="flex flex-col items-center group focus:outline-none">
              <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200
                ${pathname === '/about' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 group-hover:text-indigo-400'}`}
              >
                <Info size={22} strokeWidth={2.2} />
              </span>
            </Link>
            {/* Profile Icon */}
            <Link href="/profile" aria-label="Profile" className="flex flex-col items-center group focus:outline-none">
              <span className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200
                ${pathname === '/profile' ? 'bg-indigo-100 text-indigo-600' : 'text-slate-400 group-hover:text-indigo-400'}`}
              >
                <UserCircle size={22} strokeWidth={2.2} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;