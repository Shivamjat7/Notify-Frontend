"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { LuBookOpen } from "react-icons/lu";
import { TbTestPipe } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { GoLocation } from "react-icons/go";
import { BsClockHistory } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiTestTubes } from "react-icons/gi";
import { IoSchoolSharp } from "react-icons/io5";
import { Tag } from 'lucide-react';

import Loading from "@/components/Loading";


const typeColors = {
  Lecture: "bg-blue-100 text-blue-700 border-blue-200",
  Lab: "bg-pink-100 text-pink-700 border-pink-200",
  Tutorial: "bg-green-100 text-green-700 border-green-200",
};
const typeIcons = {
  Lecture: <LuBookOpen className="inline text-blue-400 mr-1" size={22} />,
  Lab: <TbTestPipe className="inline text-pink-400 mr-1" size={22} />,
  Tutorial: <PiStudentFill className="inline text-green-400 mr-1" size={22} />,
};

const typeBadgeIcons = {
  Lecture: <FaChalkboardTeacher className="inline mr-1" size={18} />,
  Lab: <GiTestTubes className="inline mr-1" size={18} />,
  Tutorial: <IoSchoolSharp className="inline mr-1" size={18} />,
};

export default function Schedule() {
  const router = useRouter();
  const [timetable, setTimetable] = useState([]);
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState(3);
  const [batch, setBatch] = useState("A1");
  const [loading, setLoading] = useState(false);
  // Add state for active cell (dayIdx, slotIdx)
  const [activeCell, setActiveCell] = useState({ dayIdx: null, slotIdx: null });

  const branches = ["CSE", "ECE", "Mechanical", "Civil", "Electrical","Chemical","Architecture","Metallurgy"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const batches = ["A1", "A2", "A3", "A4", "A5", "A6"];

  useEffect(() => {
    const tk = localStorage.getItem("token");
    if (!tk) {
      router.push("/");
      return;
    }
    const getTimeTable = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/schedule`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tk}`,
            },
            body: JSON.stringify({ branch, semester, batch }),
          }
        );
        const data = await response.json();
        setTimetable(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTimeTable();
  }, [router, branch, semester, batch]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const allTimes = new Set();
  timetable.forEach((day) => {
    if (Array.isArray(day)) {
      day.forEach((slot) => allTimes.add(slot.time.split("-")[0].trim()));
    }
  });

  const sortedTimes = Array.from(allTimes).sort((a, b) => {
    const getMinutes = (time) => {
      const [t, apm] = time.split(" ");
      const [h, m] = t.split(":");
      let hour = parseInt(h);
      if (apm === "pm" && hour !== 12) hour += 12;
      if (apm === "am" && hour === 12) hour = 0;
      return hour * 60 + parseInt(m);
    };
    return getMinutes(a) - getMinutes(b);
  });

  const getMinutes = (time) => {
    const [t, apm] = time.split(" ");
    const [h, m] = t.split(":");
    let hour = parseInt(h);
    if (apm === "pm" && hour !== 12) hour += 12;
    if (apm === "am" && hour === 12) hour = 0;
    return hour * 60 + parseInt(m);
  };

  return (
    <>
      <Navbar position={"fixed"} />
      <main className="p-2 pb-20 pt-16 sm:p-6 mt-16  min-h-screen">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 tracking-tight drop-shadow-sm">
          Weekly Schedule
        </h1>
        {/* Schedule Filter Form */}
        <form
          className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-white rounded-xl shadow p-4 mb-8 max-w-2xl mx-auto"
          onSubmit={e => { e.preventDefault(); }}
        >
          <div className="flex flex-col items-start w-full sm:w-auto min-w-[140px]">
            <label htmlFor="branch" className="text-sm font-medium text-gray-700 mb-1">Branch</label>
            <select
              id="branch"
              value={branch}
              onChange={e => setBranch(e.target.value)}
              className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm appearance-none"
            >
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="flex flex-col items-start w-full sm:w-auto min-w-[140px]">
            <label htmlFor="semester" className="text-sm font-medium text-gray-700 mb-1">Semester</label>
            <select
              id="semester"
              value={semester}
              onChange={e => setSemester(Number(e.target.value))}
              className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-sm appearance-none"
            >
              {semesters.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col items-start w-full sm:w-auto min-w-[140px]">
            <label htmlFor="batch" className="text-sm font-medium text-gray-700 mb-1">Batch</label>
            <select
              id="batch"
              value={batch}
              onChange={e => setBatch(e.target.value)}
              className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 shadow-sm appearance-none"
            >
              {batches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </form>


        <div className="overflow-x-auto rounded-3xl shadow-lg bg-white/80 backdrop-blur-md">
          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <Loading message="Fetching your schedule..." />
            </div>
          ) : sortedTimes.length > 0 ? (
            <table className="scrollbar-hidden min-w-full table-fixed border-separate text-sm text-gray-700 bg-transparent rounded-2xl overflow-hidden border-none">
                <thead className="bg-blue-100 text-blue-800 uppercase text-xs sticky top-0 z-10">
                  <tr>
                    <th className="p-4 text-left font-bold bg-white sticky left-0 z-20 border-none">Day</th>
                    {sortedTimes.map((time) => (
                      <th key={time} className="p-4 text-left font-semibold bg-white border-none">
                        {time}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((dayName, dayIdx) => {
                    const daySlots = Array.isArray(timetable[dayIdx]) ? timetable[dayIdx] : [];
                    const rowCells = [];
                    let skipCount = 0;
                    sortedTimes.forEach((slotTime, slotIdx) => {
                      if (skipCount > 0) {
                        skipCount--;
                        return;
                      }
                      const matching = daySlots.find(
                        (s) => s.time.split("-")[0].trim() === slotTime
                      );
                      if (matching) {
                        const start = getMinutes(matching.time.split("-")[0].trim());
                        const end = getMinutes(matching.time.split("-")[1].trim());
                        let span = 1;
                        for (let i = slotIdx + 1; i < sortedTimes.length; i++) {
                          const nextSlotTime = sortedTimes[i];
                          const nextSlotStart = getMinutes(nextSlotTime);
                          if (nextSlotStart < end) {
                            span++;
                          } else {
                            break;
                          }
                        }
                        skipCount = span - 1;
                        // Determine if this cell is active
                        const isActive = activeCell.dayIdx === dayIdx && activeCell.slotIdx === slotIdx;
                        rowCells.push(
                          <td
                            key={slotTime}
                            colSpan={span}
                            className="align-middle p-0 bg-transparent border-none h-[90px]"
                          >
                            <div
                              className={`m-1 bg-white border border-gray-200 rounded-xl flex flex-col justify-center items-center h-full min-h-[70px] text-center transition-all duration-200 space-y-1 p-3 ${isActive ? 'shadow-xl scale-105' : ''}`}
                              onMouseEnter={() => setActiveCell({ dayIdx, slotIdx })}
                              onMouseLeave={() => setActiveCell({ dayIdx: null, slotIdx: null })}
                              onTouchStart={() => setActiveCell({ dayIdx, slotIdx })}
                              onTouchEnd={() => setActiveCell({ dayIdx: null, slotIdx: null })}
                            >
                              <div className="font-semibold text-base flex items-center justify-center gap-1">
                                {typeIcons[matching.type]}
                                {matching.subject}
                              </div>
                              <div className="flex items-center justify-center gap-2 w-full mt-1 flex-nowrap overflow-hidden">
                                <span className={`px-2 py-0.5 rounded-full text-xs flex items-center justify-center gap-1 whitespace-nowrap ${typeColors[matching.type]}`}> <Tag className="w-4 h-4 text-green-400" /> {matching.type}</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap overflow-hidden text-ellipsis"><GoLocation className="inline text-pink-300 mr-1" size={18} />{matching.location}</span>
                              </div>
                              <div className="text-xs flex items-center justify-center gap-1 mt-1 text-gray-400 w-full">
                                <BsClockHistory className="inline text-blue-300 mr-1" size={18} />{matching.time}
                              </div>
                            </div>
                          </td>
                        );
                      } else {
                        rowCells.push(
                          <td key={slotTime} className="p-3 text-gray-300 bg-transparent text-center align-middle h-[90px] border-none">
                            <div className="min-h-[70px] flex items-center justify-center">-</div>
                          </td>
                        );
                      }
                    });
                    return (
                      <tr key={dayName} className="bg-transparent border-none">
                        <td className="p-4 font-bold text-blue-700 text-base sticky left-0 bg-white z-10 align-middle h-[90px] border-none">
                          <div className="min-h-[70px] flex items-center">{dayName}</div>
                        </td>
                        {rowCells}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-600 py-24">
              <span className="text-2xl mb-2">📅</span>
              <span className="text-lg font-medium">Currently, schedule for {branch}, Semester {semester}, Batch {batch} is not available. Please try again later.</span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
