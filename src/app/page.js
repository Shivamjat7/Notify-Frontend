"use client"
import { useState,useEffect } from "react";
import AttendanceBar from "@/components/AttendanceBar";
import Navbar from "@/components/Navbar";
import SheduleBox from "@/components/AttendanceBox";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
const [token, setToken] = useState("");

useEffect(() => {
  const tk = localStorage.getItem("token");
  setToken(tk);
  if(!tk) router.push('/login')
}, [router]);

 
  
  return (
    
    <>
    <Navbar showAttendanceBar={true} position={"fixed"}/>
    <SheduleBox/>
    
    </>
  );
}
