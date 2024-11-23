import React from "react";
import CourseDisplay from "./CourseDisplay";

const RightPart = ({ allCourses }) => {
  return (
    <>
      <CourseDisplay courses={allCourses} />{" "}
    </>
  );
};

export default RightPart;
