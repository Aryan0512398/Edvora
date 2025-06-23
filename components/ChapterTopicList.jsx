import React from "react";

const ChapterTopicList = ({ course }) => {
  const courseLayout = course?.courseJson?.course;

  if (!courseLayout?.chapters?.length) {
    return (
      <div className="mt-24 px-4 md:px-10">
        <p className="text-center text-gray-500 mt-6"></p>
      </div>
    );
  }

  return (
    <div className="mt-24 px-4 md:px-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-14">
        Chapters & Topics
      </h2>

      <div className="space-y-24">
        {courseLayout.chapters.map((chapter, index) => (
          <div key={index}>
            {/* Chapter Card */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl px-6 py-6 text-center shadow-xl mb-16">
              <h3 className="text-xs uppercase tracking-widest">
                Chapter {index + 1}
              </h3>
              <h2 className="text-2xl font-semibold mt-1">
                {chapter.chapterName}
              </h2>
              <div className="flex justify-center gap-8 text-sm mt-2 opacity-90">
                <span>⏱ {chapter.duration || "N/A"}</span>
                <span>📚 Topics: {chapter.topics?.length || 0}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-200 h-full z-0" />

              <div className="flex flex-col gap-16 z-10 relative">
                {chapter.topics?.map((topic, topicIndex) => {
                  const isLeft = topicIndex % 2 === 0;

                  return (
                    <div
                      key={topicIndex}
                      className="flex flex-col md:flex-row items-center justify-between w-full relative"
                    >
                      {/* Card (Left or Right) */}
                      <div
                        className={`w-full md:w-1/2 px-4 ${
                          isLeft
                            ? "text-right md:order-1"
                            : "md:order-3 text-left md:ml-auto"
                        }`}
                      >
                        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 max-w-md mx-auto">
                          <h4 className="text-base text-gray-800 font-medium">
                            {topic}
                          </h4>
                        </div>
                      </div>

                      {/* Dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 bg-gradient-to-tr from-purple-600 to-indigo-600 w-6 h-6 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">
                          {topicIndex + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterTopicList;
