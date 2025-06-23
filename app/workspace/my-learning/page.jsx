import EnrollCourseList from '@/components/EnrollCourseList'
import WelcomeBanner from '@/components/WelcomeBanner'
import React from 'react'

const MyLearning = () => {
  return (
    <div>
        <WelcomeBanner></WelcomeBanner>
      <h2 className='font-bold text-2xl mt-5'>My Learning</h2>
      <EnrollCourseList></EnrollCourseList>
    </div>
  )
}

export default MyLearning
