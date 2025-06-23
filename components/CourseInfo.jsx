import React, { useState } from "react";
import Loader from "./Loader";
import {
  BookOpenText,
  Clock,
  Gauge,
  Loader2Icon,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const CourseInfo = ({ course , viewCourse}) => {
  console.log("This is course", course)
  if (!course || !course.courseJson || !course.courseJson.course) {
    return <Loader />;
  }
  const courseLayout = course.courseJson.course;
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  console.log("Course Layout is", courseLayout)
  const GenearateCourseContent=async()=>{
    // Calling API For video
    setLoading(true)
    try {
       const result=await axios.post('/api/generate-course-content',{
      courseJSON:courseLayout, courseTitle:course?.name, courseId:course?.cid
    })
    console.log("API Result on client side is",result.data)
    setLoading(false)
    router.replace("/workspace")
    toast.success("Course Generated Successfully")

    } catch (error) {
      console.log("Error in GenearateCourseContent ",error)
      setLoading(false)
      toast.error("Server is down , Try Again Later !!")
    }
  }
  return (
    <div className="md:flex gap-5 justify-between p-5 rounded-2xl shadow bg-white">
      {/* Left Content */}
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-3xl">{courseLayout.name}</h2>
        <p className="line-clamp-2 text-gray-600">{courseLayout.description}</p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Duration */}
          <div className="flex gap-4 p-4 rounded-2xl shadow items-center hover:shadow-lg transition">
            <Clock className="text-blue-500 w-6 h-6" />
            <section>
              <h3 className="text-sm font-semibold text-gray-500">Duration</h3>
              <p className="text-base">{courseLayout.duration || "2 Hrs"}</p>
            </section>
          </div>

          {/* Chapters */}
          <div className="flex gap-4 p-4 rounded-2xl shadow items-center hover:shadow-lg transition">
            <BookOpenText className="text-green-500 w-6 h-6" />
            <section>
              <h3 className="text-sm font-semibold text-gray-500">Chapters</h3>
              <p className="text-base">{ "N/A"}</p>
            </section>
          </div>

          {/* Difficulty */}
          <div className="flex gap-4 p-4 rounded-2xl shadow items-center hover:shadow-lg transition">
            <Gauge className="text-red-500 w-6 h-6" />
            <section>
              <h3 className="text-sm font-semibold text-gray-500">Difficulty</h3>
              <p className="text-base">{courseLayout.level.charAt(0).toUpperCase() + courseLayout.level.slice(1)}</p>
            </section>
          </div>
        </div>

        {/* Generate Button */}
        {!viewCourse ?
       <Button className="mt-4 w-full cursor-pointer flex items-center gap-2  text-white  transition" disabled={loading} onClick={()=>GenearateCourseContent()}>
 {loading?<Loader2Icon className="animate-spin" />:<Sparkles/>}
  Generate Content
</Button>: <Link href={"/course/"+course?.cid}>
<Button  className={'cursor-pointer'}> <PlayCircle></PlayCircle>Continue Learning</Button>
</Link>}

      </div>

      {/* Right Image */}
      <Image
        src={course?.bannerImageUrl || "/placeholder.png"}
        alt="Banner Image"
        width={300}
        height={300}
        className="w-full h-[260px] mt-5 md:mt-0 object-cover rounded-2xl"
      />
    </div>
  );
};

export default CourseInfo;
