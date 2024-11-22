// CourseDetail.js
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleCourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL

  // Fetching authenticated user
  const { data: singleCourse, isLoading } = useQuery({
    queryKey: ["singleCourse"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/course/single-course/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse?.singleCourse;
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
    <div className="mb-10">
      {/* Full-width image header */}
      <div
        className="relative shadow-lg w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${singleCourse?.banner})`,
        }}
      ></div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">{singleCourse?.title}</h1>
        <p className="mt-2 text-lg">
          {singleCourse?.category} - {singleCourse?.level}
        </p>
      </div>

      <div className="container mx-auto px-4 py-3">
        {/* <h2 className="text-3xl font-semibold mb-4">Description</h2>
        <p>{singleCourse?.description}</p> */}

        <div className="mt-6  flex items-center gap-2">
          <p>make it yours just at</p>
          <span className="font-semibold text-blue-600 text-2xl">
            ${singleCourse?.pricing}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseDetails;
