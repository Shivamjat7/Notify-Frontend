import React, { useState, useEffect } from 'react'

const AttendanceBar = () => {
  const [todayClasses, setTodayClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();

  // Get full date in readable format
  const dateString = today.toDateString(); // e.g., "Fri Jul 11 2025"

  // Get individual components
  const day = today.getDay(); // returns 0–6 (0 = Sunday)
  const date = today.getDate(); // day of the month
  const month = today.getMonth() + 1; // months are 0-indexed
  const year = today.getFullYear();

  // Convert day number to name
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = daysOfWeek[day];

  useEffect(() => {
    const fetchTodayClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/student/today-classes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setTodayClasses(data.classes);
          }
        }
      } catch (error) {
        console.error("Error fetching today's classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayClasses();
  }, []);

  // Get counts for today's classes
  const upcomingCount = todayClasses.filter(cls => cls.status === 'upcoming').length;
  const attendedCount = todayClasses.filter(cls => cls.status === 'attended').length;
  const notAttendedCount = todayClasses.filter(cls => cls.status === 'not_attended').length;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 shadow-md rounded-xl px-6 py-3 my-3 mx-2">
      {/* Date Section */}
      <div className="flex items-center space-x-3 mb-2 md:mb-0">
        {/* Calendar Icon */}
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="#fff"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/></svg>
        <span className="text-lg font-bold text-blue-800 font-raleway">{`${dayName}, ${date}/${month}/${year}`}</span>
      </div>
      {/* Stats Section */}
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <span className="px-4 py-1 rounded-full bg-blue-200 text-blue-900 font-semibold shadow-sm">
          {loading ? "..." : `Upcoming: ${upcomingCount}`}
        </span>
        <span className="px-4 py-1 rounded-full bg-green-200 text-green-900 font-semibold shadow-sm">
          {loading ? "..." : `Attended: ${attendedCount}`}
        </span>
        <span className="px-4 py-1 rounded-full bg-red-200 text-red-900 font-semibold shadow-sm">
          {loading ? "..." : `Not Attended: ${notAttendedCount}`}
        </span>
      </div>
    </div>
  )
}

export default AttendanceBar