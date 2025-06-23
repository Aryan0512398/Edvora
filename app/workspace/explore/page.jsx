"use client";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) GetCoursesList();
  }, [user]);

  const GetCoursesList = async () => {
    try {
      const result = await axios.get("/api/courses?courseId=HIIII");
      console.log("Course data:", result.data);
      setCourseList(result.data);
    } catch (error) {
      console.error(
        "❌ Error fetching courses:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div>
      <h2 className="font-bold text-3xl mb-7">Explore More Courses !!</h2>
      <div className="flex  gap-5">
        <Input placeholder="Search"></Input>
        <Button>
          <SearchIcon></SearchIcon> Search
        </Button>
      </div>

      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {courseList.length > 0
    ? courseList.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))
    : [0, 1, 2, 3].map((item, index) => (
        <Skeleton key={index} className="h-[200px] w-full rounded-xl" />
      ))}
</div>

    </div>
  );
};

export default Explore;
