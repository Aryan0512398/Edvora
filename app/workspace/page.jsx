import CourseList from "@/components/CourseList";
import EnrollCourseList from "@/components/EnrollCourseList";
import WelcomeBanner from "@/components/WelcomeBanner";
const Workspace = () => {
  return (
    <div>
      <WelcomeBanner />
      <EnrollCourseList/>
      <CourseList></CourseList>
    </div>
  );
};

export default Workspace;
