import { useQuery } from "@tanstack/react-query";
import React from "react";

const useGetAllCourses = () => {
  // Fetching all courses
  const { data: allCourses, isLoading } = useQuery({
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

  return allCourses;
};

export default useGetAllCourses;
