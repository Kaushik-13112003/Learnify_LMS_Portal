import { useQuery } from "@tanstack/react-query";
import { ArrowBigRight } from "lucide-react";
import React, { useState } from "react";
import { CiBookmark, CiCircleRemove } from "react-icons/ci";
import { FaBookmark, FaEdit, FaHeart, FaRegHeart } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import useLikeUnlike from "./useLikeUnlike";

const Favourites = () => {
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const [allCourses, setAllCourses] = useState([]);

  //handle-likes
  const handleLikeUnlikeCourse = useLikeUnlike();

  // Fetching authenticated user
  const { data: courses, isLoading } = useQuery({
    queryKey: ["allLikedCourses"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/my-liked-course", {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          setAllCourses(dataFromResponse?.allCourses);
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
        <h1 className="text-3xl font-bold mb-6 text-center">My Favourites</h1>
        {allCourses?.length <= 0 && (
          <div className="mt-5 h-screen flex flex-col gap-3 items-center">
            <p>you haven't any Favourites course yet</p>
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
        {allCourses?.length > 0 &&
          allCourses?.map(
            (course, index) =>
              course?.isPublished && (
                <div
                  key={index}
                  className="flex sm:flex-row flex-col gap-4 sm:items-center bg-white shadow-md rounded-lg p-4 mb-6 relative"
                >
                  {/* Image on the left */}
                  <div className="flex flex-col gap-2 sm:items-center">
                    <img
                      src={course?.banner}
                      alt={course?.title}
                      className="w-32 h-32 border object-cover rounded-lg"
                    />
                    <NavLink
                      to={`${
                        authenticatedUser?.my_courses?.includes(course?._id)
                          ? `/course-progress/${course?._id}`
                          : `/single-course/${course?._id}`
                      }`}
                      className="flex cursor-pointer gap-2 items-center  hover:text-blue-400 duration-500 "
                    >
                      <p>see more</p>
                      <ArrowBigRight className="mt-[6px]" />
                    </NavLink>
                  </div>

                  {/* Course details on the right */}
                  <div className="">
                    <h2 className="text-2xl font-semibold">{course?.title}</h2>
                    <div className="flex gap-2 mt-2">
                      <span className="flex items-center text-gray-600">
                        {course?.category}
                      </span>
                      <span className="flex items-center text-gray-600">
                        - {"  " + course?.language}
                      </span>
                    </div>
                    <p className="text-gray-800 mt-1">{course?.description}</p>
                    <div className="mt-4">
                      <span className="text-xl font-semibold text-blue-600">
                        ${course?.pricing}
                      </span>
                      <span className="text-sm text-gray-500 ml-3">
                        {course?.level}
                      </span>
                    </div>
                  </div>

                  <div className=" absolute right-4 top-4 flex gap-4 items-center">
                    {course?.courseCreater === authenticatedUser?._id ? (
                      <>
                        <NavLink to={`/update-course/${course?._id}`}>
                          <FaEdit
                            size={20}
                            className="hover:cursor-pointer duration-500 hover:text-green-700"
                          />
                        </NavLink>

                        {course?.isPublished ? (
                          <TiTick
                            size={20}
                            className="hover:cursor-pointer duration-500 hover:text-green-500 text-green-700"
                            onClick={() => handleCourseUnpublish(course?._id)}
                          />
                        ) : (
                          <CiCircleRemove
                            size={20}
                            className="hover:cursor-pointer duration-500 hover:text-red-700"
                            onClick={() => handleCourseUnpublish(course?._id)}
                          />
                        )}
                      </>
                    ) : authenticatedUser?.likedCourse?.includes(
                        course?._id
                      ) ? (
                      <FaHeart
                        onClick={() => handleLikeUnlikeCourse(course?._id)}
                        className="hover:cursor-pointer duration-500  text-red-700"
                        size={20}
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => handleLikeUnlikeCourse(course?._id)}
                        className="hover:cursor-pointer duration-500 hover:text-blue-700"
                        size={20}
                      />
                    )}
                  </div>
                </div>
              )
          )}{" "}
      </div>
    </>
  );
};

export default Favourites;
