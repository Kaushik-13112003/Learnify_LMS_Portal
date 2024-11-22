import { useQuery } from "@tanstack/react-query";
import React from "react";

const useInstructorCourses = () => {
  // Fetching all courses
  const { data: getAllCourses, isLoading } = useQuery({
    queryKey: ["instructorAllCourses"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/course/instructor-all-courses", {
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

  return getAllCourses;
};

export default useInstructorCourses;
