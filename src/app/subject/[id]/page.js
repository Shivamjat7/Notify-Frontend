'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Calendar, BookOpen, User, Building, Award, Clock, TrendingUp, CheckCircle, XCircle, Sparkles, Target, Zap } from 'lucide-react';
import Loading from '@/components/Loading';

export default function SubjectPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.id;
  
  const [subject, setSubject] = useState({});
  const [classLog, setClassLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subjectId) return;

    const fetchSubjectAndAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push('/login');
          return;
        }

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
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectAndAttendance();
  }, [subjectId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/30 to-indigo-100/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Loading message="Loading subject details..." />
        </div>
      </div>
    );
  }

  const attendedCount = classLog.filter(cls => cls.status).length;
  const missedCount = classLog.length - attendedCount;
  const attendancePercentage = classLog.length > 0 ? Math.round((attendedCount / classLog.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/30 to-indigo-100/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_50%)]"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className=" z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.back()}
              className="group p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border border-purple-200/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
            </button>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-purple-500/25">
                  {subject.name ? subject.name[0] : '?'}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-indigo-400/20 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {subject.name}
                </h1>
                <p className="text-slate-600 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  Subject Analytics Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subject Information */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 p-8 hover:bg-white/90 transition-all duration-500 group shadow-xl hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200/50">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                Subject Information
              </h2>
              <div className="space-y-6">
                {subject.code && (
                  <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 hover:border-blue-300 hover:bg-blue-100/50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover/item:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Subject Code</p>
                      <p className="font-bold text-slate-800 text-lg">{subject.code}</p>
                    </div>
                  </div>
                )}
                {subject.professor && (
                  <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 hover:border-green-300 hover:bg-green-100/50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25 group-hover/item:scale-110 transition-transform duration-300">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Professor</p>
                      <p className="font-bold text-slate-800 text-lg">{subject.professor}</p>
                    </div>
                  </div>
                )}
                {subject.department && (
                  <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/50 hover:border-pink-300 hover:bg-pink-100/50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover/item:scale-110 transition-transform duration-300">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-pink-600 font-medium">Department</p>
                      <p className="font-bold text-slate-800 text-lg">{subject.department}</p>
                    </div>
                  </div>
                )}
                {subject.credits && (
                  <div className="group/item flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200/50 hover:border-purple-300 hover:bg-purple-100/50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover/item:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Credits</p>
                      <p className="font-bold text-slate-800 text-lg">{subject.credits}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Attendance Statistics */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 p-8 hover:bg-white/90 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                Attendance Analytics
              </h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 border border-blue-200/50 hover:border-blue-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 font-medium">Total Classes</p>
                      <p className="text-3xl font-bold text-slate-800">{classLog.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="group bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-6 border border-green-200/50 hover:border-green-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 font-medium">Attended</p>
                      <p className="text-3xl font-bold text-slate-800">{attendedCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="group bg-gradient-to-br from-red-50 to-pink-100 rounded-3xl p-6 border border-red-200/50 hover:border-red-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 font-medium">Missed</p>
                      <p className="text-3xl font-bold text-slate-800">{missedCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="group bg-gradient-to-br from-purple-50 to-violet-100 rounded-3xl p-6 border border-purple-200/50 hover:border-purple-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 font-medium">Percentage</p>
                      <p className="text-3xl font-bold text-slate-800">{attendancePercentage}%</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-slate-800">Attendance Rate</span>
                  <span className="text-lg font-bold text-purple-600">{attendancePercentage}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ease-out shadow-lg ${
                        attendancePercentage >= 75 ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/50' : 
                        attendancePercentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-yellow-500/50' : 
                        'bg-gradient-to-r from-red-500 to-pink-500 shadow-red-500/50'
                      }`}
                      style={{ width: `${attendancePercentage}%` }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Calendar Overview */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200/50">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  Class History
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-2">
                  {classLog.map((cls, idx) => (
                    <div
                      key={idx}
                      className={`group flex items-center justify-between rounded-3xl p-5 border shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-101 ${
                        cls.status 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50 hover:border-green-300' 
                          : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200/50 hover:border-red-300'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-slate-800 text-lg">Class {cls.number}</p>
                        <p className="text-sm text-slate-600">{cls.date}</p>
                      </div>
                      <div
                        className={`px-4 py-2 text-sm font-bold rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 group-hover:scale-110 ${
                          cls.status 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/25' 
                            : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25'
                        }`}
                      >
                        {cls.status ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Attended
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            Missed
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 