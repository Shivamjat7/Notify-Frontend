"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Tag, UserCircle, ThumbsUp, ThumbsDown, Ban } from 'lucide-react';

const SheduleCard = ({ lectureName, time, location, type, subjectId }) => {

  const [visible, setVisible] = useState(true);
  const router = useRouter();
 
  const token = localStorage.getItem("token");

  const handleMarkAttendance = async (subject, status) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/student/attendance`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ subject, status }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark attendance");
      }
      console.log("Attendance marked:", status);
    
      setVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = () => {
    setVisible(false);
  };

  const handleCardClick = () => {
    router.push(`/subject/${subjectId}`);
  };

  if (!visible ) return null;

  return (
    <div className="relative">
      <div
        onClick={handleCardClick}
        className="w-100 max-w-sm bg-white/95 rounded-2xl border border-gray-200/50 shadow-2xl hover:shadow-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        style={{
          boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="p-3 flex-col justify-around">
          <div className="flex items-center justify-center mb-2 w-full">
            <h3 className="text-2xl font-semibold text-gray-800 truncate w-full text-center">
              {lectureName}
            </h3>
          </div>
          <div>
            <div className="flex justify-around">
              <div>
               <p className="text-gray-600 text-sm font-bold flex items-center gap-1"><Calendar className="w-4 h-4 text-blue-400" />{time}</p>
               <p className="text-gray-600 text-sm flex items-center gap-1"><MapPin className="w-4 h-4 text-pink-400" />{location}</p>
              </div>
              <div>
               <p className="text-gray-600 text-sm font-bold flex items-center gap-1"><Tag className="w-4 h-4 text-green-400" />{type.toUpperCase()}</p>
              </div>
            </div>
            <div className="grid justify-center">
              {/* Mobile: Buttons without icons */}
              <div className="flex flex-row gap-2 mt-3 sm:hidden">
                <button
                  className="px-3 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/50 shadow-md shadow-emerald-500/15 hover:from-emerald-500/15 hover:to-teal-500/15 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-300/70 active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, true);
                  }}
                >
                  <span className="font-medium text-emerald-700 text-sm">Attended</span>
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-300/50 shadow-md shadow-rose-500/15 hover:from-rose-500/15 hover:to-pink-500/15 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/20 hover:border-rose-300/70 active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, false);
                  }}
                >
                  <span className="font-medium text-rose-700 text-sm">Not</span>
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-slate-500/10 to-gray-500/10 border border-slate-300/50 shadow-md shadow-slate-500/15 hover:from-slate-500/15 hover:to-gray-500/15 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-500/20 hover:border-slate-300/70 active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  <span className="font-medium text-slate-700 text-sm">Cancelled</span>
                </button>
              </div>
              {/* Desktop: Buttons without icons */}
              <div className="hidden sm:flex flex-row gap-2 mt-3">
                <button
                  className="px-4 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/50 shadow-md shadow-emerald-500/15 hover:from-emerald-500/15 hover:to-teal-500/15 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-300/70 active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName,true);
                  }}
                >
                  <span className="font-medium text-emerald-700 text-base">Attended</span>
                </button>
                <button
                  className="px-4 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-300/50 shadow-md shadow-rose-500/15 hover:from-rose-500/15 hover:to-pink-500/15 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/20 hover:border-rose-300/70 active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, false);
                  }}
                >
                  <span className="font-medium text-rose-700 text-base">Not</span>
                </button>
                <button
                  className="px-4 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-slate-500/10 to-gray-500/10 border border-slate-300/50 shadow-md shadow-slate-500/15 hover:from-slate-500/15 hover:to-gray-500/15 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-500/20 hover:border-slate-300/70 active:scale-[0.98]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  <span className="font-medium text-slate-700 text-base">Cancelled</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheduleCard;
