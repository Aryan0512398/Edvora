import { BadgeCheck, Book, LoaderCircle, LucideBadgeCheck, PlayCircleIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Progress } from "./ui/progress";

const EnrollCourseCard = ({ course, enrollCourse }) => {
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const calculateProgress = () => {
  const completed = enrollCourse?.completedChapters?.length ?? 0;
  const total = course?.courseContent?.length ?? 1; // Avoid division by 0
  return Math.round((completed / total) * 100);
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

        <div className="mt-5">
          <h2 className="flex justify-between text-sm text-primary mb-2">
            Progress <span>{calculateProgress()}%</span>
          </h2>
          <Progress value={calculateProgress()} />
          <Link href={"/workspace/view-course/" + course?.cid}>
            {" "}
            <Button className={`w-full mt-2 cursor-pointer ${calculateProgress() === 100 ? "bg-green-600 hover:bg-green-600" : ""}`}>
              {calculateProgress() === 100 ? (
                <div className="flex items-center gap-2 justify-center ">
                  <LucideBadgeCheck className="inline-block w-5 h-5 " />
                  <span>Course Completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center" >
                  <PlayCircleIcon className="inline-block w-5 h-5" />
                  <span>Continue Learning</span>
                </div>
              )}{" "}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseCard;
