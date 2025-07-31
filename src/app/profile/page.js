"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Mail, User, GraduationCap, Key, BookOpen } from "lucide-react";
import Loading from "@/components/Loading";

export default function Profile() {
  const router = useRouter();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [student, setStudent] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    semester: "",
    branch: "",
    batch: "",
    password: "",
    profileImage: null,
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/student/fetchstudent`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || 'Failed to fetch student');
        setStudent(data.student);
        setFormData({
          name: data.student.name || "",
          semester: data.student.semester || "",
          branch: data.student.branch || "",
          batch: Array.isArray(data.student.batches)
            ? data.student.batches[0] || ""
            : data.student.batches || "",
          password: "",
          profileImage: null,
        });
        const attendance = data.student.attendance || {}; // the object
        const subjectsArray = [];
        for (const [subjectName, records] of Object.entries(attendance)) {
          const total = records.length;
          const present = records.filter((r) => r.status).length;
          const percentage = total === 0 ? 0 : Math.round((present / total) * 100);
          subjectsArray.push({ name: subjectName, percentage });
        }
        setSubjects(subjectsArray);
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching attendance");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [router]);
const branchBatchMap = {
  CSE: ["A1", "A2", "A3", "A4"],
  ECE: ["E1", "E2", "E3", "E4", "E5"],
  Mechanical: ["M1", "M2", "M3"],
  Civil: ["C1", "C2"],
  Electrical: ["EL1", "EL2"],
  Chemical: ["CH1", "CH2"],
  Architecture: ["AR1"],
  Metallurgy: ["MT1", "MT2"],
};

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "branch") {
      setFormData((prev) => ({
        ...prev,
        branch: value,
        batch: "", // reset batch when branch changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/student/updatedetails`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            semester: formData.semester,
            branch: formData.branch, // send as 'branch' to backend
            batches: formData.batch, // send as 'batches' to backend
            password: formData.password || undefined, // skip if empty
          
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
    
        setStudent(data.updated);
        setUpdateProfile(false);
        setFormData({
          name: data.updated.name || "",
          semester: data.updated.semester || "",
          branch: data.updated.branch || "",
          batch: Array.isArray(data.updated.batches)
            ? data.updated.batches[0] || ""
            : data.updated.batches || "",
          password: "",
        
        });
      } else {
        alert(data.msg || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating profile.");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <Navbar showAttendanceBar={false} position={""} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-100 pt-8 pb-20 md:py-10 px-4 flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Loading message="Loading your profile..." />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-96">
            <p className="text-lg text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-stretch gap-10 w-full max-w-4xl">
            {/* Profile Section */}
            <div
              className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl border border-slate-100 p-8 flex flex-col items-center
          md:h-[500px] h-auto"
            >
              {!updateProfile ? (
                <div className="flex flex-col items-center space-y-5 w-full">
                  <div className="relative mb-2">
                    <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-400 via-blue-400 to-pink-300 blur opacity-30"></span>
                    <Image
                      src="/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                      alt="Profile"
                      width={140}
                      height={140}
                      className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-xl relative z-10"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center justify-center gap-2">
                      <User className="w-5 h-5 text-indigo-400" />
                      {student.name || "No Name"}
                    </h2>
                    <p className="text-base text-indigo-600 font-medium flex items-center justify-center gap-1">
                      <GraduationCap className="w-4 h-4" /> B.Tech | Semester{" "}
                      {student.semester || "No semester"}
                    </p>
                    <p className="text-sm text-blue-400 flex items-center justify-center gap-1">
                      <BookOpen className="w-4 h-4" /> Branch:{" "}
                      {`${student.branch}`.toUpperCase() || "No Branch"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 w-full text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4  text-indigo-400" />
                      <span className="font-semibold">Batch:</span>{" "}
                      {student.batches || "No batch"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      <span className="font-semibold">Email:</span>{" "}
                      {student.email || "no email"}
                    </div>
                    {/* Average Attendance Stat */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">Avg Attendance:</span>
                      <span
                        className={`text-lg font-bold ${
                          subjects.length > 0 &&
                          Math.round(
                            subjects.reduce((acc, s) => acc + s.percentage, 0) /
                              subjects.length
                          ) >= 75
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {subjects.length > 0
                          ? Math.round(
                              subjects.reduce((acc, s) => acc + s.percentage, 0) /
                                subjects.length
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4 w-full justify-center">
                    <button
                      onClick={() => setUpdateProfile(true)}
                      className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogOut}
                      className="px-5 py-2 bg-gradient-to-r from-pink-400 to-red-400 text-white font-semibold rounded-full shadow hover:from-pink-500 hover:to-red-500 transition"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} id="profile-edit-form" className="space-y-5 w-full">
                    <div className="flex flex-col items-center gap-2">
                      <Image
                        src={
                          formData.profileImage
                            ? URL.createObjectURL(formData.profileImage)
                            : "/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                        }
                        name='profileImage'
                        alt="Preview"
                        width={120}
                        height={120}
                        className="w-24 h-24 rounded-full object-cover border-2 border-indigo-200 shadow"
                      />
                    </div>
                    {/* Name Field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        onChange={handleChange}
                        value={formData.name}
                        className="peer placeholder-transparent text-gray-800 mt-1 w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white shadow"
                      />
                      <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-indigo-500 font-semibold peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent transition-all duration-200">
                        Name
                      </label>
                    </div>
                    {/* Branch Dropdown */}
                    <div className="relative">
                      <select
                        name="branch"
                        onChange={handleChange}
                        value={formData.branch || ""}
                        className="mt-1 w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white shadow text-gray-800"
                      >
                        <option value="" disabled>
                          Select branch
                        </option>
                        {Object.keys(branchBatchMap).map((branch) => (
                          <option key={branch} value={branch}>
                            {branch}
                          </option>
                        ))}
                      </select>
                      <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-indigo-500 font-semibold transition-all duration-200">
                        Branch
                      </label>
                    </div>
                    {/* Semester Dropdown */}
                    <div className="relative">
                      <select
                        name="semester"
                        onChange={handleChange}
                        value={formData.semester || ""}
                        className="mt-1 w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white shadow text-gray-800"
                      >
                        <option value="" disabled>
                          Select semester
                        </option>
                        {[...Array(8)].map((_, i) => (
                          <option key={i + 1} value={String(i + 1)}>
                            Semester {i + 1}
                          </option>
                        ))}
                      </select>
                      <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-indigo-500 font-semibold transition-all duration-200">
                        Semester
                      </label>
                    </div>
                    {/* Batch Dropdown */}
                    <div className="relative">
                      <select
                        name="batch"
                        onChange={handleChange}
                        value={formData.batch || ""}
                        className="mt-1 w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white shadow text-gray-800"
                      >
                        <option value="" disabled>
                          Select batch
                        </option>
                        {(branchBatchMap[formData.branch] || []).map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-indigo-500 font-semibold transition-all duration-200">
                        Batch
                      </label>
                    </div>
                    {/* Password Field */}
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={formData.password}
                        className="peer placeholder-transparent text-gray-800 mt-1 w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-white shadow"
                      />
                      <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-indigo-500 font-semibold peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent transition-all duration-200">
                        Password
                      </label>
                    </div>
                  </form>
                  <div className="flex gap-3 justify-center pt-6 w-full">
                    <button
                      type="submit"
                      form="profile-edit-form"
                      className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpdateProfile(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold shadow hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Attendance Section */}
            <div
              className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl border border-slate-100 p-8 flex flex-col items-center mt-8 md:mt-0 md:ml-8
          md:h-[500px] h-auto overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-400" /> Subjects &
                Attendance
              </h2>
              <ul className="space-y-4 w-full">
                {subjects.length > 0 ? (
                  subjects.map((subject, idx) => (
                    <li key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-300" />{" "}
                          {subject.name}
                        </span>
                        <span
                          className={`font-semibold text-lg ${
                            subject.percentage >= 75
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {subject.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            subject.percentage >= 75
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${subject.percentage}%` }}
                        ></div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No attendance data available.
                  </p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
