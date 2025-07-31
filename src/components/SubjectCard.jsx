"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Tag, UserCircle, ThumbsUp, ThumbsDown, Ban, Check, X, Clock, Loader2 } from 'lucide-react';

const SheduleCard = ({ lectureName, time, location, type, subjectId }) => {

  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState({ attended: false, not: false, cancelled: false });
  const [success, setSuccess] = useState({ attended: false, not: false, cancelled: false });
  const [activeButton, setActiveButton] = useState(null);
  const router = useRouter();
 
  const token = localStorage.getItem("token");

  const handleMarkAttendance = async (subject, status) => {
    const buttonType = status ? 'attended' : 'not';
    setLoading(prev => ({ ...prev, [buttonType]: true }));
    setActiveButton(buttonType);
    
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
      
      // Show success state
      setSuccess(prev => ({ ...prev, [buttonType]: true }));
      setLoading(prev => ({ ...prev, [buttonType]: false }));
      
      // Hide card after success animation
      setTimeout(() => {
        setVisible(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setLoading(prev => ({ ...prev, [buttonType]: false }));
    } finally {
      setActiveButton(null);
    }
  };

  const handleRemove = () => {
    setLoading(prev => ({ ...prev, cancelled: true }));
    setActiveButton('cancelled');
    
    // Show success state
    setTimeout(() => {
      setSuccess(prev => ({ ...prev, cancelled: true }));
      setLoading(prev => ({ ...prev, cancelled: false }));
    }, 300);
    
    setTimeout(() => {
      setVisible(false);
    }, 800);
  };

  const handleCardClick = () => {
    router.push(`/subject/${subjectId}`);
  };

  if (!visible ) return null;

  return (
    <div className="relative">
      <div
        onClick={handleCardClick}
        className="min-w-[85vw] sm:min-w-100 max-w-sm bg-white/95 rounded-2xl border border-gray-200/50 shadow-2xl hover:shadow-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        style={{
          boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="p-3 flex-col justify-around">
          <div className="flex sm:hidden items-center justify-center mb-2 w-full">
           {lectureName.length >20?( <h3 className="text-2xl font-semibold text-gray-800 truncate w-full text-center">
              {lectureName.slice(0,20)}...
            </h3>):(
            <h3 className="text-2xl font-semibold text-gray-800 truncate w-full text-center">
              {lectureName}
            </h3>)}
          </div>
          <div className=" hidden sm:flex items-center justify-center mb-2 w-full">
           {lectureName.length >25?( <h3 className="text-2xl font-semibold text-gray-800 truncate w-full text-center">
              {lectureName.slice(0,25)}...
            </h3>):(
            <h3 className="text-2xl font-semibold text-gray-800 truncate w-full text-center">
              {lectureName}
            </h3>)}
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
              {/* Mobile: Buttons with enhanced active states */}
              <div className="flex flex-row gap-2 mt-3 sm:hidden">
                <button
                  className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/50 shadow-md shadow-emerald-500/15 hover:from-emerald-500/20 hover:to-teal-500/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 hover:border-emerald-400/70 active:from-emerald-500/30 active:to-teal-500/30 active:scale-[0.95] active:shadow-inner active:shadow-emerald-500/20 active:border-emerald-500/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeButton === 'attended' ? 'ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/30' : ''
                  } ${success.attended ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/80' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, true);
                  }}
                  disabled={loading.attended || loading.not || loading.cancelled || success.attended || success.not || success.cancelled}
                >
                  {loading.attended ? (
                    <span className="font-medium text-emerald-700 text-sm animate-pulse">Processing...</span>
                  ) : success.attended ? (
                    <span className="font-medium text-emerald-700 text-sm">Marked!</span>
                  ) : (
                    <span className="font-medium text-emerald-700 text-sm">Attended</span>
                  )}
                </button>
                <button
                  className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-300/50 shadow-md shadow-rose-500/15 hover:from-rose-500/20 hover:to-pink-500/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/25 hover:border-rose-400/70 active:from-rose-500/30 active:to-pink-500/30 active:scale-[0.95] active:shadow-inner active:shadow-rose-500/20 active:border-rose-500/80 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeButton === 'not' ? 'ring-2 ring-rose-500/50 shadow-lg shadow-rose-500/30' : ''
                  } ${success.not ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500/80' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, false);
                  }}
                  disabled={loading.attended || loading.not || loading.cancelled || success.attended || success.not || success.cancelled}
                >
                  {loading.not ? (
                    <span className="font-medium text-rose-700 text-sm animate-pulse">Processing...</span>
                  ) : success.not ? (
                    <span className="font-medium text-rose-700 text-sm">Marked!</span>
                  ) : (
                    <span className="font-medium text-rose-700 text-sm">Not</span>
                  )}
                </button>
                <button
                  className={`relative px-3 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-slate-500/10 to-gray-500/10 border border-slate-300/50 shadow-md shadow-slate-500/15 hover:from-slate-500/20 hover:to-gray-500/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-500/25 hover:border-slate-400/70 active:from-slate-500/30 active:to-gray-500/30 active:scale-[0.95] active:shadow-inner active:shadow-slate-500/20 active:border-slate-500/80 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeButton === 'cancelled' ? 'ring-2 ring-slate-500/50 shadow-lg shadow-slate-500/30' : ''
                  } ${success.cancelled ? 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 border-slate-500/80' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  disabled={loading.attended || loading.not || loading.cancelled || success.attended || success.not || success.cancelled}
                >
                  {loading.cancelled ? (
                    <span className="font-medium text-slate-700 text-sm animate-pulse">Removing...</span>
                  ) : success.cancelled ? (
                    <span className="font-medium text-slate-700 text-sm">Removed!</span>
                  ) : (
                    <span className="font-medium text-slate-700 text-sm">Cancelled</span>
                  )}
                </button>
              </div>
              {/* Desktop: Buttons with enhanced active states */}
              <div className="hidden sm:flex flex-row gap-2 mt-3">
                <button
                  className={`relative px-4 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-300/50 shadow-md shadow-emerald-500/15 hover:from-emerald-500/20 hover:to-teal-500/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 hover:border-emerald-400/70 active:from-emerald-500/30 active:to-teal-500/30 active:scale-[0.95] active:shadow-inner active:shadow-emerald-500/20 active:border-emerald-500/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeButton === 'attended' ? 'ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/30' : ''
                  } ${success.attended ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/80' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName,true);
                  }}
                  disabled={loading.attended || loading.not || loading.cancelled || success.attended || success.not || success.cancelled}
                >
                  {loading.attended ? (
                    <span className="font-medium text-emerald-700 text-base animate-pulse">Processing...</span>
                  ) : success.attended ? (
                    <span className="font-medium text-emerald-700 text-base">Marked!</span>
                  ) : (
                    <span className="font-medium text-emerald-700 text-base">Attended</span>
                  )}
                </button>
                <button
                  className={`relative px-4 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-300/50 shadow-md shadow-rose-500/15 hover:from-rose-500/20 hover:to-pink-500/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/25 hover:border-rose-400/70 active:from-rose-500/30 active:to-pink-500/30 active:scale-[0.95] active:shadow-inner active:shadow-rose-500/20 active:border-rose-500/80 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeButton === 'not' ? 'ring-2 ring-rose-500/50 shadow-lg shadow-rose-500/30' : ''
                  } ${success.not ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-500/80' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAttendance(lectureName, false);
                  }}
                  disabled={loading.attended || loading.not || loading.cancelled || success.attended || success.not || success.cancelled}
                >
                  {loading.not ? (
                    <span className="font-medium text-rose-700 text-base animate-pulse">Processing...</span>
                  ) : success.not ? (
                    <span className="font-medium text-rose-700 text-base">Marked!</span>
                  ) : (
                    <span className="font-medium text-rose-700 text-base">Not</span>
                  )}
                </button>
                <button
                  className={`relative px-4 py-1.5 rounded-lg transition-all duration-300 bg-gradient-to-r from-slate-500/10 to-gray-500/10 border border-slate-300/50 shadow-md shadow-slate-500/15 hover:from-slate-500/20 hover:to-gray-500/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-500/25 hover:border-slate-400/70 active:from-slate-500/30 active:to-gray-500/30 active:scale-[0.95] active:shadow-inner active:shadow-slate-500/20 active:border-slate-500/80 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeButton === 'cancelled' ? 'ring-2 ring-slate-500/50 shadow-lg shadow-slate-500/30' : ''
                  } ${success.cancelled ? 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 border-slate-500/80' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  disabled={loading.attended || loading.not || loading.cancelled || success.attended || success.not || success.cancelled}
                >
                  {loading.cancelled ? (
                    <span className="font-medium text-slate-700 text-base animate-pulse">Removing...</span>
                  ) : success.cancelled ? (
                    <span className="font-medium text-slate-700 text-base">Removed!</span>
                  ) : (
                    <span className="font-medium text-slate-700 text-base">Cancelled</span>
                  )}
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
