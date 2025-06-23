import { SelectedChapterIndex } from "@/context/SelectedChapterIndex";
import {
  CheckCircle,
  CrossIcon,
  Flag,
  Loader2Icon,
  VideoIcon,
  X,
} from "lucide-react";
import React, { useContext, useState } from "react";
import YouTube from "react-youtube";
import { Button } from "./ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const ChapterContent = ({ courseInfo, refreshData }) => {
  const { courseId } = useParams();
  const { courses, enrollCourse } = courseInfo ?? "";
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapterIndex } = useContext(SelectedChapterIndex);
  const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
  const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
  const [loading, setLoading] = useState(false);
  let completedChapter = enrollCourse?.completedChapters ?? [];

  const markChapterCompleted = async () => {
    setLoading(true);
    completedChapter.push(selectedChapterIndex);
    console.log("Completed Course Length is", completedChapter.length);
    const result = await axios.put("/api/enroll-course", {
      courseId: courseId,
      completedChapter: completedChapter,
    });
    console.log("Updated Result is", result);
    refreshData();

    toast(
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-5 h-5 text-green-600" />
        Chapter Marked Completed!!
      </div>
    );
    setLoading(false);
  };

  const markInChapterCompleted = async () => {
    setLoading(true);
    const completedChap = completedChapter.filter(
      (item) => item != selectedChapterIndex
    );
    console.log("Completed Course Length is", completedChapter.length);
    const result = await axios.put("/api/enroll-course", {
      courseId: courseId,
      completedChapter: completedChap,
    });
    console.log("Updated Result is", result);
    refreshData();
    toast(
      <div className="flex items-center gap-2 text-red-600">
        <Flag className="w-5 h-5 text-red-600" />
        Chapter Marked InCompleted!!
      </div>
    );
    setLoading(false);
  };

  return (
    <section className="flex-1 px-4 md:px-6 overflow-x-hidden overflow-y-scroll scrollbar-hide max-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold mb-4">
          {selectedChapterIndex + 1}.{" "}
          {courseContent?.[selectedChapterIndex]?.courseData?.chapterName}
        </h2>
        {!completedChapter?.includes(selectedChapterIndex) ? (
          <Button
            disabled={loading}
            className={"cursor-pointer"}
            onClick={() => markChapterCompleted()}
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <CheckCircle></CheckCircle>
            )}
            Mark As Completed
          </Button>
        ) : (
          <Button
            disabled={loading}
            variant={"outline"}
            onClick={() => markInChapterCompleted()}
            className={"cursor-pointer"}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : <X></X>} Mark
            Incomplete
          </Button>
        )}
      </div>

      {/* Related Videos */}
      <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <VideoIcon className="w-5 h-5" />
        Related Videos
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {videoData?.slice(0, 2).map((video, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-md">
            <YouTube
              videoId={video.videoId}
              opts={{ height: "250", width: "100%" }}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Topics */}
      {topics?.map((topic, index) => (
        <div
          key={index}
          className="p-6 mb-6 rounded-2xl bg-white shadow-md border border-gray-200"
        >
          <h4 className="text-xl font-bold text-primary mb-3">
            {index + 1}. {topic?.topic}
          </h4>
          <div
            className="text-gray-700 leading-relaxed text-base"
            dangerouslySetInnerHTML={{ __html: topic?.content }}
          />
        </div>
      ))}
    </section>
  );
};

export default ChapterContent;
