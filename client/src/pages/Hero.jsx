import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Welcome to Your Learning Journey
          </h2>
          <p className="text-md sm:text-lg mb-6">
            Discover top-notch courses from expert instructors and gain the
            skills you need for your career.
          </p>
          <NavLink
            to="/courses/all"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200"
          >
            Explore Courses
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Hero;
