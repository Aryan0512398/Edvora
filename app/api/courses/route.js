import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, ne, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get("courseId");
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let result;
    if(courseId==="HIIII"){
      result = await db
        .select()
        .from(courseTable)
        .where(sql`${courseTable.courseContent}::jsonb !='{}'::jsonb`);
      console.log("Explore Course output is", result)
      return NextResponse.json(result);
    }
    console.log("Hiiiiiiiii")
    if (courseId) {
      result = await db
        .select()
        .from(courseTable)
        .where(eq(courseTable.cid, courseId));
    } else {
      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        return NextResponse.json({ error: "User email not found" }, { status: 400 });
      }

      result = await db
        .select()
        .from(courseTable)
        .where(eq(courseTable.userEmail, email)).orderBy(desc(courseTable.id));
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

