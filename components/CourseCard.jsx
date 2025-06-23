import { Book, LoaderCircle, PlayCircleIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

const CourseCard = ({ course }) => {
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/enroll-course", {
        courseId: course?.cid,
      });
      console.log("On Enroll Course", result.data);
      if(result.data.message==="Already Enrolled"){
        toast.warning("Already Enrolled !!")
      }
      else{
        toast.success("Enrolled !!!")
      }
      
      setLoading(false);
    } catch (error) {
      toast.error("Error in On Enroll Course");
      console.log("Error in On Enroll Course", error);
      setLoading(false);
    }
  };
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden flex flex-col">
      <div className="relative w-full aspect-video">
        <Image
          src={course?.bannerImageUrl || "/placeholder.png"}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900">
            {courseJson?.name || "Untitled Course"}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3">
            {courseJson?.description || "No description provided."}
          </p>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Book className="h-5 w-5 text-indigo-500" />
            {courseJson?.noOfChapters || 0} Chapters
          </div>

          {course?.courseContent?.length ? (
            <Button onClick={onEnrollCourse} size="sm" className="gap-1 cursor-pointer" disabled={loading}>
              {loading? <LoaderCircle className="animate-spin"/>:<PlayCircleIcon className="h-4 w-4" />}
              Enroll Course
            </Button>
          ) : (
            <Link href={`/workspace/edit-course/${course?.cid}`}>
              <Button
                size="sm"
                variant="outline"
                className="gap-1 cursor-pointer hover:text-indigo-600"
              >
                <SettingsIcon className="h-4 w-4" />
                Generate Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
