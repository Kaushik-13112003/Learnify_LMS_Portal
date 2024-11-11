import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to Learnify, your trusted partner in online learning! Our
          mission is to empower individuals worldwide by providing high-quality,
          accessible, and affordable courses from industry experts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Our Mission */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To make education accessible, convenient, and affordable for
              everyone, helping learners gain valuable skills for their personal
              and professional growth.
            </p>
          </div>
          {/* Our Vision */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-600">
              Creating a world where anyone, anywhere, can transform their life
              through learning.
            </p>
          </div>
          {/* Our Values */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              Our Values
            </h2>
            <p className="text-gray-600">
              Integrity, Innovation, Quality, and Inclusivity are the core
              principles that drive us forward every day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
