"use client"
import ChapterTopicList from '@/components/ChapterTopicList'
import CourseInfo from '@/components/CourseInfo'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditCourse = ({viewCourse=false}) => {
  const params = useParams()
  const courseId = params.courseId
  const [loading, setLoading] = useState(false)
  const [course,setCourse]=useState([]);

  console.log("ID is", courseId)

  useEffect(() => {
    if (courseId) {
      GetCoursesInfo()
    }
  }, [courseId])

  const GetCoursesInfo = async () => {
    try {
      setLoading(true)
      const result = await axios.get("/api/courses?courseId=" + courseId)
      console.log("Get Courses", result.data)
      setLoading(false)
      setCourse(result.data)
    } catch (err) {
      console.error("Error fetching course:", err)
    } 
  }

  return (
    <div>
      <CourseInfo course={course[0]} viewCourse={viewCourse}/>
      <ChapterTopicList course={course[0]}></ChapterTopicList>
    </div>
  )
}

export default EditCourse
