import CourseDisplay from "@/components/lms portal/courses-layout/CourseDisplay";
import React from "react";
import useInstructorCourses from "./courses/useInstructorCourses";

const CoursesCreated = () => {
  const getAllCourses = useInstructorCourses();

  return (
    <>
      <CourseDisplay courses={getAllCourses} type="instructor" />
    </>
  );
};

export default CoursesCreated;
