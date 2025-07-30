'use client'

import React, { useState, useEffect } from "react";
import SubjectCard from "@/components/SubjectCard";
import Image from "next/image";
import Loading from "@/components/Loading";

const SheduleBox = () => {
  const [subjects, setSubjects] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);

  function sortSubjectsByTime(subjects) {
    function parseTime(timeStr) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier.toLowerCase() === 'pm' && hours !== 12) hours += 12;
      if (modifier.toLowerCase() === 'am' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    }

    return subjects.sort((a, b) => {
      const timeA = a.time.split(' - ')[0];
      const timeB = b.time.split(' - ')[0];
      if (!timeA) return 1;
      if (!timeB) return -1;
      return parseTime(timeA) - parseTime(timeB);
    });
  }

  useEffect(() => {
    const tk = localStorage.getItem("token");

    if (!tk) {
      console.log("No token found — not fetching subjects.");
      setLoading(false);
      return;
    }

    const today = new Date();
    const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = Days[today.getDay()];

    const getSubjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/subject/get/${day}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tk}`,
            }
          }
        );
        const data = await response.json();
        console.log(data);
        if (!data.length) {
          setShow(false);
        }
        const sortedSubjects = sortSubjectsByTime(data)
        console.log(sortedSubjects)
        setSubjects(sortedSubjects);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getSubjects();
  }, []);

  return (
    <div className="flex h-full mt-8 md:mt-10  md:h-[100vh] flex-col items-center px-4 pt-16 pb-16 md:pb-12 md:pt-20 md:px-36 min-h-[60vh] ">
      <div className="w-full  max-w-6xl md:max-w-7xl bg-white/90 rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
        {loading ? (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-2">Today's Schedule</h1>
              <p className="text-indigo-600 text-sm md:text-base">Your classes for today</p>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-center md:gap-4">
              <Loading type="gradient" size="large" message="Loading your schedule..." />
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-center md:min-w-72  mb-8 md:mb-0">
                <Image 
                  src="/bird.png" 
                  alt="logo" 
                  className="hidden md:block w-64 md:h-48 lg:w-80 lg:h-60" 
                  width={800} 
                  height={600}
                  quality={100}
                />
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full p-2">
                  
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-800">Today's Schedule</h1>
              </div>
              <p className="font-[cursive] text-indigo-600 text-sm md:text-base">Your classes for today</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {show && subjects.length > 0 ? (
                subjects.map((cls, index) => (
                  <div key={index} className="transform transition-all duration-200 hover:scale-105 hover:z-10 relative">
                    <SubjectCard
                      lectureName={cls.subject}
                      time={cls.time}
                      location={cls.location}
                      type={cls.type}
                      batch={cls.batch}
                      subjectId={cls.id}
                    />
                  </div>
                ))
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-4">
                    <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-indigo-800">No Classes Today!</h2>
                    <p className="text-indigo-600 text-sm">Enjoy your free time!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SheduleBox;
