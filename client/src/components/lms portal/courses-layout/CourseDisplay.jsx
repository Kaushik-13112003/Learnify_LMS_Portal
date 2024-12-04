import useCourseUnpublish from "@/instructor/courses/useCourseUnpublish";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowBigRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import toast from "react-hot-toast";
import useBookmark from "@/students/useBookmark";

const CourseDisplay = ({ courses, type }) => {
  const [allCourses, setAllCourses] = useState([]);
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const handleCourseUnpublish = useCourseUnpublish();

  const handleSortByPrice = (e) => {
    const value = e.target.value;

    let sortedCoursesByPrice = [...allCourses];

    if (value === "Price : Low to High") {
      sortedCoursesByPrice.sort((a, b) => a.pricing - b.pricing);
    } else if (value === "Price : High to Low") {
      sortedCoursesByPrice.sort((a, b) => b.pricing - a.pricing);
    } else if (value === "Created At: Newest First") {
      sortedCoursesByPrice.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (value === "Created At: Oldest First") {
      sortedCoursesByPrice.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    setAllCourses(sortedCoursesByPrice);
  };

  //handle-bookmark
  const handleBookmark = useBookmark();

  useEffect(() => {
    setAllCourses(courses);
  }, [courses]);

  return (
    <>
      {type !== "instructor" && (
        <div className="flex gap-3 items-center">
          <select
            name="sort"
            onChange={handleSortByPrice}
            className="p-2  ml-4 cursor-pointer bg-white shadow-md "
          >
            <option value="">Sort By - </option>
            <option value="Price : Low to High">Price : Low to High</option>
            <option value="Price : High to Low">Price : High to Low</option>
            <option value="Created At: Newest First">
              Created At: Newest First
            </option>
            <option value="Created At: Oldest First">
              Created At: Oldest First
            </option>
          </select>
          <p>{courses?.length} results</p>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {type === "instructor" ? "Created Courses" : "Available Courses"}
        </h1>

        {allCourses?.reduce((acc, c, idx) => {
          return c.isPublished === true ? acc + 1 : acc + 0;
        }, 0) === 0 && (
          <div className="h-screen flex flex-col gap-4  ">
            <p className="text-red-600">no courses found</p>
            {type === "instructor" && (
              <NavLink
                to={"/create-course"}
                className={
                  "bg-blue-700 text-white rounded-md p-2 hover:bg-blue-600 duration-500 cursor-pointer sm:w-[130px] text-center w-[100%]"
                }
              >
                Create Course
              </NavLink>
            )}
          </div>
        )}

        {allCourses?.map(
          (course, index) =>
            course?.isPublished && (
              <div className="flex sm:flex-row flex-col gap-4 sm:items-center bg-white shadow-md rounded-lg p-4 mb-6 relative">
                {/* Image on the left */}
                <div className="flex flex-col gap-2 sm:items-center">
                  <img
                    src={course.banner}
                    alt={course.title}
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
                  <h2 className="text-2xl font-semibold">{course.title}</h2>
                  <div className="flex gap-2 mt-2">
                    <span className="flex items-center text-gray-600">
                      {course.category}
                    </span>
                    <span className="flex items-center text-gray-600">
                      - {"  " + course.language}
                    </span>
                  </div>
                  <p className="text-gray-800 mt-1">{course.description}</p>
                  <div className="mt-4">
                    <span className="text-xl font-semibold text-blue-600">
                      ${course.pricing}
                    </span>
                    <span className="text-sm text-gray-500 ml-3">
                      {course.level}
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
                  ) : authenticatedUser?.bookmarks?.includes(course?._id) ? (
                    <FaBookmark
                      onClick={() => handleBookmark(course?._id)}
                      className="hover:cursor-pointer duration-500 hover:text-blue-700"
                      size={20}
                    />
                  ) : (
                    <CiBookmark
                      onClick={() => handleBookmark(course?._id)}
                      className="hover:cursor-pointer duration-500 hover:text-blue-700"
                      size={20}
                    />
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default CourseDisplay;
