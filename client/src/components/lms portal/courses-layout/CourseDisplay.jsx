import { ArrowBigRight } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const CourseDisplay = ({ courses, type }) => {
  return (
    <>
      {type !== "instructor" && (
        <select
          name="sort"
          className="p-2  ml-4 cursor-pointer bg-white shadow-md "
        >
          <option value="">Sort By - </option>
          <option value="Price : Low to High">Price : Low to High</option>
          <option value="Price : High to Low">Price : High to Low</option>
        </select>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {type === "instructor" ? "Created Courses" : "Available Courses"}
        </h1>

        {courses?.reduce((acc, c, idx) => {
          return c.isPublished === true ? acc + 1 : acc + 0;
        }, 0) === 0 && <p>no course found...</p>}

        {courses?.map(
          (course, index) =>
            course?.isPublished && (
              <div className="flex sm:flex-row flex-col gap-4 sm:items-center bg-white shadow-md rounded-lg p-4 mb-6">
                {/* Image on the left */}
                <div className="flex flex-col gap-2 sm:items-center">
                  <img
                    src={course.banner}
                    alt={course.title}
                    className="w-32 h-32 border object-cover rounded-lg"
                  />
                  <NavLink
                    to={`/single-course/${course?._id}`}
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
              </div>
            )
        )}
      </div>
    </>
  );
};

export default CourseDisplay;
