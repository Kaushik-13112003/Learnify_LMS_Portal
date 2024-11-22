import { courses } from "@/assets/data";
import React from "react";
import CourseDisplay from "./CourseDisplay";
import { useQuery } from "@tanstack/react-query";

const RightPart = () => {
  // Fetching all courses
  const { data: getAllCourses, isLoading } = useQuery({
    queryKey: ["allCourses"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/course/all-courses", {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse?.allCourses;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <>
      <CourseDisplay courses={getAllCourses} />{" "}
    </>
  );
};

export default RightPart;
