import useGetAllCourses from "@/components/lms portal/courses-layout/useGetAllCourses";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink } from "react-router-dom";

const FeaturedCourses = () => {
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

  return (
    <>
      <section id="courses" className="bg-gray-100 py-10 mb-10">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
            Featured Courses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition mt-2"
              >
                <NavLink to={`/single-course/${course?._id}`}>
                  <img
                    src={
                      course?.banner
                        ? course?.banner
                        : `https://via.placeholder.com/300x200?text=Course+${
                            i + 1
                          }`
                    }
                    alt={`Course ${i + 1}`}
                    className="w-full h-48 object-cover border"
                  />
                </NavLink>
                <div className="p-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-700">
                    {course?.title}
                  </h4>
                  <p className="mt-2 text-gray-600">{course?.description}</p>
                  <p className="mt-2 text-gray-600">${course?.pricing}</p>

                  <NavLink
                    to={`/single-course/${course?._id}`}
                    className="mt-4 block text-blue-600 font-semibold hover:underline"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedCourses;
