import React, { useEffect, useState } from 'react';

export default function Modal({ isOpen, onClose, subjectId }) {
  const [subject, setSubject] = useState({});
  const [classLog, setClassLog] = useState([]);

useEffect(() => {
  if (!subjectId) return;

  const fetchSubjectAndAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const resSubject = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/subject/${subjectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const subjectData = await resSubject.json();
      const subject = subjectData.subject || {};
      setSubject(subject);

      if (!subject.name) return;

      const resAttendance = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/student/attendance/get`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ subject: subject.name }),
        }
      );
      const attendanceData = await resAttendance.json();
      setClassLog(attendanceData.attendance || []);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  fetchSubjectAndAttendance();
}, [subjectId]);


  if (!isOpen) return null;

  const attendedCount = classLog.filter(cls => cls.status).length;
  const missedCount = classLog.length - attendedCount;

  return (
    <div
      
      className="fixed inset-0 bg-gradient-to-br from-blue-200/60 via-indigo-200/60 to-pink-200/60 backdrop-blur-md flex justify-center items-center z-[9999] px-2 md:px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/90 text-black rounded-2xl w-full max-w-md md:max-w-xl shadow-2xl border border-indigo-100 p-4 md:p-8 relative overflow-y-auto max-h-[90vh] md:max-h-[85vh] backdrop-blur-lg"
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-indigo-600 text-2xl font-bold transition"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Subject Summary */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 text-white text-2xl font-bold shadow">
              {subject.name ? subject.name[0] : '?'}
            </span>
            <h2 className="text-2xl font-extrabold text-indigo-700 tracking-tight">{subject.name}</h2>
          </div>
          <p className="text-gray-500 mb-1 text-sm">Subject Code: <span className="font-semibold text-indigo-500">{subject.code}</span></p>
          {subject.professor && (
            <p className="text-gray-500 mb-1 text-sm">Professor: <span className="font-semibold text-blue-700">{subject.professor}</span></p>
          )}
          {subject.department && (
            <p className="text-gray-500 mb-1 text-sm">Department: <span className="font-semibold text-pink-600">{subject.department}</span></p>
          )}
          {subject.credits && (
            <p className="text-gray-500 mb-1 text-sm">Credits: <span className="font-semibold text-green-600">{subject.credits}</span></p>
          )}
          <div className="flex flex-row justify-between bg-gradient-to-r from-blue-50 via-indigo-50 to-pink-50 p-4 rounded-xl gap-4 mb-4 shadow-sm">
            <div className="flex flex-col items-center flex-1 min-w-[90px]">
              <span className="text-xs text-gray-500">Total Classes</span>
              <span className="text-xl font-bold text-gray-800">{classLog.length}</span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[90px]">
              <span className="text-xs text-gray-500">Attended</span>
              <span className="text-xl font-bold text-green-600">{attendedCount}</span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[90px]">
              <span className="text-xs text-gray-500">Missed</span>
              <span className="text-xl font-bold text-red-500">{missedCount}</span>
            </div>
          </div>
        </div>

        {/* Calendar Overview */}
        <div>
          <h3 className="text-md font-semibold text-indigo-600 mb-3 flex items-center gap-2">🗓️ Calendar Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {classLog.map((cls, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between rounded-xl p-3 border shadow-sm text-sm 
                  ${cls.status ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} transition-all duration-200`}
              >
                <div>
                  <p className="font-semibold text-gray-800">Class {cls.number}</p>
                  <p className="text-xs text-gray-500">{cls.date}</p>
                </div>
                <div
                  className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm
                    ${cls.status ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'} transition-all duration-200`}
                >
                  {cls.status ? '✔ Attended' : '✖ Missed'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
