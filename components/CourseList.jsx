"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) GetCoursesList();
  }, [user]);

  const GetCoursesList = async () => {
    try {
      const result = await axios.get("/api/courses");
      console.log("Course data:", result.data);
      setCourseList(result.data);
    } catch (error) {
      console.error("❌ Error fetching courses:", error.response?.data || error.message);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-3xl font-bold text-gray-800">Your Courses</h2>
        {courseList.length > 0 && (
          <AddNewCourseDialog>
            <Button className="px-4 py-2 text-sm font-semibold">+ Add New Course</Button>
          </AddNewCourseDialog>
        )}
      </div>

      {courseList.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center border border-dashed border-gray-300 rounded-xl bg-secondary p-10">
          <Image src="/2.png" alt="No Courses" width={80} height={80} className="mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Courses Found</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Start by creating your first course and begin sharing your knowledge.
          </p>
          <AddNewCourseDialog>
            <Button size="sm" className="text-sm">
              + Create Your First Course
            </Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
