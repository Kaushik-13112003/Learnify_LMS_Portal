// CourseDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleCourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Mock fetching course data based on ID (you can fetch this from an API in a real app)
    const courseData = [
      {
        id: 1,
        title: "React for Beginners",
        category: "Web Development",
        level: "Beginner",
        language: "English",
        fees: "$50",
        description:
          "Learn React from scratch, including components, hooks, and state management.",
        imageUrl: "https://via.placeholder.com/1000x400", // Full-width image for the header
        syllabus: [
          "Introduction to React",
          "Components and JSX",
          "State Management",
          "Hooks",
        ],
        prerequisites: "Basic knowledge of JavaScript.",
        testimonials: [
          {
            name: "John Doe",
            comment: "Great course! The content is very well explained.",
          },
        ],
      },
      {
        title: "Advanced Python Programming",
        category: "Programming",
        level: "Advanced",
        language: "English",
        fees: "$100",
        description:
          "Master Python with advanced topics like decorators, generators, and OOP.",
        imageUrl: "https://via.placeholder.com/1000x400", // Full-width image for the header
        syllabus: [
          "Advanced Python Syntax",
          "Decorators",
          "Generators",
          "Object-Oriented Programming",
        ],
        prerequisites: "Intermediate knowledge of Python.",
        testimonials: [
          {
            name: "Jane Smith",
            comment: "An excellent deep dive into Python. I learned a lot!",
          },
        ],
      },
    ];

    setCourse(courseData[id]); // Set course based on ID
  }, [id]);

  if (!course) return <div className="text-center mt-6">Loading...</div>;

  return (
    <div>
      {/* Full-width image header */}
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${course.imageUrl})` }}
      >
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="mt-2 text-lg">
            {course.category} - {course.level}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4">Course Description</h2>
        <p>{course.description}</p>

        <h3 className="text-2xl font-semibold mt-6 mb-4">Syllabus</h3>
        <ul className="list-disc pl-6">
          {course.syllabus.map((item, index) => (
            <li key={index} className="text-lg">
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mt-6 mb-4">Prerequisites</h3>
        <p>{course.prerequisites}</p>

        <div className="mt-6  flex items-center gap-2">
          <p>make it yours just at</p>
          <span className="font-semibold text-blue-600 text-2xl">
            {course.fees}
          </span>
        </div>

        <h3 className="text-2xl font-semibold mt-6 mb-4">Testimonials</h3>
        {course.testimonials.map((testimonial, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-gray-600 italic">"{testimonial.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCourseDetails;
