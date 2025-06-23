import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Gemini Prompt
const PROMPT = `Generate Learning Course depends on following details. In which make sure to add Course Name, Description, Chapter Name, Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3D format, Topic under each chapter, Duration for each chapter etc., in JSON format only.

schema
{
 "course":{
   "name":"string",
   "description":"string",
   "noOfChapters":"number",
   "includeVideo":"boolean",
   "level":"string",
   "category":"string",
   "bannerImagePrompt":"string",
   "chapters":[
     {
       "chapterName":"string",
       "duration":"string",
       "topics":["string"],
       "imagePrompt":"string"
     }
   ]
 }
}, User Input , React js ,3 chapters`;

export async function POST(req) {
  try {
    const formData = await req.json();
    const user = await currentUser();
    const { has } = await auth()
    const hasPremiumAccess = has({ plan: 'starter' })

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Initialize Gemini
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const model = "gemini-2.0-flash";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: PROMPT + "\n\nUser Input: " + JSON.stringify(formData),
          },
        ],
      },
    ];
    // If user has already created 3 courses
    if(!hasPremiumAccess){
      const result=await db.select().from(courseTable).where(eq(courseTable.userEmail,user?.primaryEmailAddress.emailAddress));
      if(result?.length >3){
        return NextResponse.json({"resp":"Limit Reached"})
      }
    }
    const response = await ai.models.generateContent({
      model,
      contents,
      generationConfig: {
        responseMimeType: "text/plain",
      },
    });

    // ✅ Safely extract generated text
    const generatedText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const RawJson = generatedText.replace("```json", "").replace("```", "");
    const JSONResp = JSON.parse(RawJson);
    const courseId = uuidv4();
    const ImagePrompt = JSONResp.course?.bannerImagePrompt;
    // Image Generation
    const bannerImageUrl=await GenerateImage(ImagePrompt)
    // ✅ Save to DB
    const result = await db.insert(courseTable).values({
      ...formData,
      courseJson: JSONResp,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      cid: courseId,
      bannerImageUrl:bannerImageUrl
    });
    console.log("Ai Data is", JSONResp);
    return NextResponse.json({ success: true, courseId: courseId });
  } catch (error) {
    console.error("💥 API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

const GenerateImage = async (imagePrompt) => {
  const BASE_URL = "https://aigurulab.tech";

  const result = await axios.post(
    `${BASE_URL}/api/generate-image`,
    {
      width: 1024,
      height: 1024,
      input: imagePrompt,
      model: "flux", // or 'flux'
      aspectRatio: "16:9",
    },
    {
      headers: {
        "x-api-key": process.env.AI_IMAGE_API, 
        "Content-Type": "application/json",
      },
    }
  );

  console.log(result.data.image);
   // Output: Base64 image
   return result.data.image
};
