import React from "react";
import useInstructorCourses from "./courses/useInstructorCourses";
import { FaEdit } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import useCourseUnpublish from "./courses/useCourseUnpublish";

const Dashboard = () => {
  const instructorAllCourses = useInstructorCourses();

  const handleCourseUnpublish = useCourseUnpublish();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Instructor Dashboard
      </h1>

      {/* Summary Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-100 rounded-lg text-center shadow-md">
          <h2 className="text-xl font-medium text-blue-800">
            Total Courses Created
          </h2>
          <p className="text-2xl font-bold text-blue-900 mt-2">
            {instructorAllCourses?.length}
          </p>
        </div>
        <div className="p-6 bg-purple-100 rounded-lg text-center shadow-md">
          <h2 className="text-xl font-medium text-purple-800">
            Students Enrolled
          </h2>
          <p className="text-2xl font-bold text-purple-900 mt-2">
            {/* {instructorAllCourses?.reduce((acc, course) => {
              return acc + course?.students?.length;
            }, 0)}{" "} */}
          </p>
        </div>
        <div className="p-6 bg-green-100 rounded-lg text-center shadow-md">
          <h2 className="text-xl font-medium text-green-800">Total Earnings</h2>
          <p className="text-2xl font-bold text-green-900 mt-2">
            $
            {/* {instructorAllCourses &&
              instructorAllCourses?.reduce((acc, course) => {
                return acc + course?.students?.length * course?.pricing;
              }, 0)}{" "} */}
          </p>
        </div>
      </div>

      {/* Student List Table */}
      <h2 className="text-2xl mt-[50px] font-semibold text-center mb-4">
        Student List
      </h2>
      <div className="overflow-x-auto mt-8 mb-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Course Name
              </th>
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Students
              </th>
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Revenue
              </th>

              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Created At
              </th>

              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {instructorAllCourses?.length > 0 ? (
              instructorAllCourses?.map((course, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-center">{course?.title}</td>
                  <td className="py-2 px-4 text-center">
                    {course?.students?.length}
                  </td>
                  <td className="py-2 px-4 text-center">
                    ${course?.students?.length * course?.pricing}
                  </td>

                  <td className="py-2 px-4 text-center">
                    {new Date(course?.createdAt).toLocaleString()}
                  </td>

                  <td className="py-2 px-4 text-center flex gap-4 items-center justify-center">
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No students enrolled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
