"use client";
import AppHeader from "@/components/AppHeader";
import ChapterContent from "@/components/ChapterContent";
import ChapterListSidebar from "@/components/ChapterListSidebar";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Course = () => {
  const [courseInfo, setCourseInfo] = useState({});
  const { courseId } = useParams();

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    try {
      const result = await axios.get("/api/enroll-course?courseId=" + courseId);
      setCourseInfo(result.data);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader hideSidebar />
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-8">
        <ChapterListSidebar courseInfo={courseInfo} />
        <ChapterContent courseInfo={courseInfo} refreshData={()=>GetEnrolledCourseById()} />
      </div>
    </div>
  );
};

export default Course;
