'use client'

import React, { useState, useEffect } from "react";
import SubjectCard from "@/components/SubjectCard";
``


const SheduleBox = () => {
  const [subjects, setSubjects] = useState([]);
  const [show,setShow]= useState(true);

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
      return;
    }
  
// const today = new Date();
// const Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const day = Days[today.getDay()];
  
  const day = "Monday";

 
    const getSubjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/subject/get/${day}`,
          {
            headers:{
              "Content-Type": "application/json",
            "Authorization": `Bearer ${tk}`,
          }
        }
        );
        const data = await response.json();
        console.log(data);
        if(!data.length){
          setShow(false);
        }
        const sortedSubjects = sortSubjectsByTime(data)
        console.log(sortedSubjects)
        setSubjects(sortedSubjects);
      } catch (err) {
        console.error(err);
      }
    };

    getSubjects();
  }, []);

  
  return (
    <>
     

      <div className="flex flex-col items-center px-4 pt-16 pb-16 md:pb-12 md:pt-20 md:px-36 bg-gradient-to-r from-pink-200 via-blue-200 to-blue-50">
        <div className="flex flex-wrap gap-4 w-full justify-center">
          {show &&subjects.map((cls, index) => (
            <SubjectCard
              key={index}
              lectureName={cls.subject}
              time={cls.time}
              location={cls.location}
              type={cls.type}
              batch={cls.batch}
              subjectId={cls.id}
            
            />
          ))}{
           !show && <div className="div text-blue-900 text-6xl font-serif mt-5">No class today</div>
          }
        </div>
      </div>
    </>
  );
};

export default SheduleBox;
