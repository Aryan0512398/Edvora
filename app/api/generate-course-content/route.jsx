import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and give response in JSON format.
Schema:
{
  chapterName: <string>,
  topics: [
    {
      topic: <string>,
      content: <string>
    }
  ]
}
User Input:`;

export async function POST(req) {
  try {
    const { courseJSON, courseTitle, courseId } = await req.json();

    if (!courseJSON?.chapters || courseJSON.chapters.length === 0) {
      return NextResponse.json(
        { error: "No chapters provided" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
      responseMimeType: "text/plain",
    };

    const model = "gemini-1.5-flash"; // Consider using 1.5 or latest stable

    const promises = courseJSON.chapters.map(async (chapter) => {
      try {
        const contents = [
          {
            role: "user",
            parts: [
              {
                text: PROMPT + JSON.stringify(chapter),
              },
            ],
          },
        ];

        const response = await ai.models.generateContent({
          model,
          config,
          contents,
        });
        const rawText =
          response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        // Sanitize and try parsing JSON
        const sanitized = rawText.replace(/```json|```/g, "").trim();
        const json = JSON.parse(sanitized);
        const YoutubeData = await GetYoutubeVideos(chapter?.chapterName);

        return { youtubeVideo: YoutubeData, courseData: json };
      } catch (innerError) {
        console.error(
          "Error generating content for chapter:",
          chapter?.name,
          innerError
        );
        return {
          chapterName: chapter?.name ?? "Unknown",
          error: "Failed to generate content",
        };
      }
    });

    const CourseContent = await Promise.all(promises);

    const dbResp=await db.update(courseTable).set({
      courseContent:CourseContent
    }).where(eq(courseTable.cid,courseId))
    return NextResponse.json({ courseName: courseTitle, CourseContent });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYoutubeVideos = async (topic) => {
  const params = {
    part: "snippet",
    q: topic,
    maxResult: 4,
    type: "video",
    key: process.env.YOUTUBE_API_KEY,
  };
  const resp = await axios.get(YOUTUBE_URL, { params });
  const youtubeVideoListResp = resp.data.items;
  const youtubeVideoList = [];

  youtubeVideoListResp.forEach((item) => {
    const data = {
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    };
    youtubeVideoList.push(data);
  });
  console.log("Youtube video list", youtubeVideoList);
  return youtubeVideoList;
};
