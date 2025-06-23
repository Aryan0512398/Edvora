import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndex } from "@/context/SelectedChapterIndex";
import { CheckCircle } from "lucide-react";

const ChapterListSidebar = ({ courseInfo }) => {
  const courseContent = courseInfo?.courses?.courseContent;
  const { courses, enrollCourse } = courseInfo ?? "";
  const { selectedChapterIndex, setSelectedChapterIndex } =
    useContext(SelectedChapterIndex);
  let completedChapter = enrollCourse?.completedChapters ?? [];

  return (
    <aside className="w-full md:w-80 p-4 md:p-6 bg-gradient-to-b from-white to-secondary rounded-2xl shadow-xl h-screen overflow-y-scroll scrollbar-hide">
      <h2 className="mb-4 font-bold text-xl text-primary">
        Chapters ({courseContent?.length})
      </h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem
            key={index}
            value={chapter?.courseData?.chapterName}
            onClick={() => setSelectedChapterIndex(index)}
          >
            <AccordionTrigger className="text-md font-semibold">
              <span>{!completedChapter.includes(index) ?` ${index + 1}.` :<CheckCircle className="bg-green-100"></CheckCircle>}</span>
              {chapter?.courseData?.chapterName || "Untitled Chapter"}
            </AccordionTrigger>
            <AccordionContent asChild>
              <div className="space-y-2">
                {chapter?.courseData?.topics?.map((topic, index_) => (
                  <h3
                    key={index_}
                    className={ `text-sm p-3 rounded-lg transition-all ${completedChapter.includes(index) ?"bg-green-100 hover:bg-green-50" : "bg-white hover:bg-slate-100" }` }
                  >
                    {topic?.topic}
                  </h3>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};

export default ChapterListSidebar;
