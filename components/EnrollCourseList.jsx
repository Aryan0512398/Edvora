"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EnrollCourseCard from "./EnrollCourseCard";

const EnrollCourseList = () => {
  const [enrolledCoursesList, setEnrolledCoursesList] = useState([]);
  useEffect(() => {
    GetEnrolledCourse();
  }, []);
  const GetEnrolledCourse = async () => {
    const result = await axios.get("/api/enroll-course");
    console.log("GetEnrolledCourse", result.data);
    setEnrolledCoursesList(result.data);
  };
  return (
    enrolledCoursesList?.length > 0 && (
      <div className="mt-3">
        <h2 className="font-bold text-xl mb-2">
          Continue Learning your Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCoursesList.map((course, index) => (
            <EnrollCourseCard
              course={course?.courses}
              enrollCourse={course?.enrollCourse}
              key={index}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default EnrollCourseList;
