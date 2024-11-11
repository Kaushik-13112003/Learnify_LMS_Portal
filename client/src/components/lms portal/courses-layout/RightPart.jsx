import { courses } from "@/assets/data";
import React from "react";
import CourseDisplay from "./CourseDisplay";

const RightPart = () => {
  return (
    <>
      <CourseDisplay courses={courses} />{" "}
    </>
  );
};

export default RightPart;
