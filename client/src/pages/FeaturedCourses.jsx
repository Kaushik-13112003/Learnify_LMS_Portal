import React from "react";
import { NavLink } from "react-router-dom";

const FeaturedCourses = () => {
  return (
    <>
      <section id="courses" className="bg-gray-100 py-10 mb-10">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
            Featured Courses
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition mt-2"
                >
                  <img
                    src={`https://via.placeholder.com/300x200?text=Course+${
                      i + 1
                    }`}
                    alt={`Course ${i + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-700">
                      Course Title {i + 1}
                    </h4>
                    <p className="mt-2 text-gray-600">
                      Brief description of the course content goes here.
                    </p>
                    <NavLink
                      to={`/single-course/${i}`}
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
