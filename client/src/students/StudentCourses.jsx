import CourseDisplay from "@/components/lms portal/courses-layout/CourseDisplay";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigRight } from "lucide-react";
import React from "react";
import { FaEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const StudentCourses = () => {
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  // Fetching authenticated user
  const { data: myCourses, isLoading } = useQuery({
    queryKey: ["myCourses"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `/api/user/my-courses/${authenticatedUser?._id}`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          console.log(dataFromResponse?.allCourses);
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
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">My Courses</h1>

        {myCourses?.length <= 0 && (
          <div className="mt-5 h-screen flex flex-col gap-3 items-center">
            <p>you haven't purchased any course yet</p>
            <NavLink
              to="/courses/all"
              className={
                "bg-blue-700 text-white hover:bg-blue-500 hover:duration-500 rounded-md p-2"
              }
            >
              Explore Courses
            </NavLink>
          </div>
        )}

        {myCourses?.map((ele, idx) => {
          return (
            <div className="flex sm:flex-row flex-col gap-4 sm:items-center bg-white border rounded-lg p-4 mb-6 relative">
              {/* Image on the left */}
              <div className="flex flex-col gap-2 sm:items-center">
                <img
                  src={ele?.course?.banner}
                  alt={ele?.course?.title}
                  className="w-32 h-32 border object-cover rounded-lg"
                />
                <NavLink
                  to={`/single-course/${ele?.course?._id}`}
                  className="flex cursor-pointer gap-2 items-center  hover:text-blue-400 duration-500 "
                >
                  <p>see more</p>
                  <ArrowBigRight className="mt-[6px]" />
                </NavLink>
              </div>

              {/* Course details on the right */}
              <div className="">
                <h2 className="text-2xl font-semibold">{ele?.course?.title}</h2>
                <div className="flex gap-2 mt-2">
                  <span className="flex items-center text-gray-600">
                    {ele?.course?.category}
                  </span>
                  <span className="flex items-center text-gray-600">
                    - {"  " + ele?.course?.language}
                  </span>
                </div>
                <p className="text-gray-800 mt-1">{ele?.course?.description}</p>
                <div className="mt-4">
                  <span className="text-xl font-semibold text-blue-600">
                    ${ele?.course?.pricing}
                  </span>
                  <span className="text-sm text-gray-500 ml-3">
                    {ele?.course?.level}
                  </span>
                </div>
              </div>

              <NavLink
                className=" absolute flex justify-center items-center gap-2 right-4 top-4 hover:text-blue-500 duration-500"
                to={`/course-progress/${ele?.course?._id}`}
              >
                <FaEye className="mt-[6px]" />
                <p>view course</p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StudentCourses;
