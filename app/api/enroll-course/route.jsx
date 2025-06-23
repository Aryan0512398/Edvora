import { db } from "@/config/db";
import { enrollCourseTable, courseTable } from "@/config/schema";
import { eq, and, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { courseId } = await req.json();
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!user || !email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Check if already enrolled
    const enrolledCourses = await db
      .select()
      .from(enrollCourseTable)
      .where(
        and(
          eq(enrollCourseTable.cid, courseId),
          eq(
            enrollCourseTable.usersEmail,
            user?.primaryEmailAddress.emailAddress
          )
        )
      );

    if (enrolledCourses.length === 0) {
      // ✅ Insert new enrollment
      const result = await db
        .insert(enrollCourseTable)
        .values({
          cid: courseId,
          usersEmail: user?.primaryEmailAddress.emailAddress,
        })
        .returning(enrollCourseTable);

      return NextResponse.json(result);
    }

    // ⚠️ Already enrolled
    return NextResponse.json({ message: "Already Enrolled" }, { status: 200 });
  } catch (error) {
    console.error("Enrollment Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");
  if (!courseId) {
    const result = await db
      .select()
      .from(courseTable)
      .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
      .where(
        eq(
          enrollCourseTable.usersEmail,
          user?.primaryEmailAddress?.emailAddress
        )
      )
      .orderBy(desc(enrollCourseTable.id));
    return NextResponse.json(result);
  } else {
    const result = await db
      .select()
      .from(courseTable)
      .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(
            enrollCourseTable.usersEmail,
            user?.primaryEmailAddress?.emailAddress
          ),
          eq(enrollCourseTable.cid, courseId)
        )
      );
    return NextResponse.json(result[0]);
  }
}

export async function PUT(req) {
  try {
    const { completedChapter, courseId } = await req.json();
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .update(enrollCourseTable)
      .set({
        completedChapters: completedChapter,
      })
      .where(
        and(
          eq(enrollCourseTable.cid, courseId),
          eq(enrollCourseTable.usersEmail, user.primaryEmailAddress.emailAddress)
        )
      )
      .returning();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}