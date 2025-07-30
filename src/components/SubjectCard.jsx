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
        className="w-100 max-w-sm bg-white/95 rounded-2xl border border-gray-200/50 shadow-2xl hover:shadow-3xl overflow-hidden cursor-pointer"
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
              {/* Mobile: Only icon buttons, large and spaced */}
              <div className="flex flex-row gap-3 mt-3 sm:hidden">
                <button
                  className="bg-blue-500 text-white px-2.5 py-1.5 rounded shadow font-semibold hover:bg-blue-600 active:scale-95 transition min-w-[56px] text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, true);
                  }}
                >
                  Attended
                </button>
                <button
                  className="bg-red-500 text-white px-2.5 py-1.5 rounded shadow font-semibold hover:bg-red-600 active:scale-95 transition min-w-[56px] text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, false);
                  }}
                >
                  Not
                </button>
                <button
                  className="bg-gray-400 text-white px-2.5 py-1.5 rounded shadow font-semibold hover:bg-gray-500 active:scale-95 transition min-w-[56px] text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  Cancelled
                </button>
              </div>
              {/* Desktop: Icon+label pill buttons */}
              <div className="hidden sm:flex flex-row gap-3 mt-3">
                <button
                  className="flex items-center gap-2 bg-blue-500 text-white px-2.5 py-1.5 rounded-full shadow hover:bg-blue-600 active:scale-95 transition font-semibold min-w-[70px] text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName,true);
                  }}
                >
                  <ThumbsUp className="w-5 h-5" strokeWidth={2.2} /> Attended
                </button>
                <button
                  className="flex items-center gap-2 bg-red-500 text-white px-2.5 py-1.5 rounded-full shadow hover:bg-red-600 active:scale-95 transition font-semibold min-w-[70px] text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, false);
                  }}
                >
                  <ThumbsDown className="w-5 h-5" strokeWidth={2.2} /> Not
                </button>
                <button
                  className="flex items-center gap-2 bg-gray-400 text-white px-2.5 py-1.5 rounded-full shadow hover:bg-gray-500 active:scale-95 transition font-semibold min-w-[70px] text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  <Ban className="w-5 h-5" strokeWidth={2.2} /> Cancelled
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
