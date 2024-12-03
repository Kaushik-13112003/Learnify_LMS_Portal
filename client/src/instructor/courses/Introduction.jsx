import { categories, courses, languages, levels } from "@/assets/data";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Introduction = ({ setCourseID, handleActiveTab, singleCourse }) => {
  const [courseData, setCourseData] = useState({
    title: "",
    category: "",
    level: "",
    language: "",
    subtitle: "",
    description: "",
    pricing: "",
  });

  const [banner, setBanner] = useState("");
  const [bannerProgress, setBannerProgress] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //handle banner upload
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      setBannerProgress(true);
      try {
        const res = await fetch("/api/course/upload", {
          method: "POST",

          body: formData,
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          setBanner(dataFromResponse?.result?.url);
          setBannerProgress(false);
        } else {
          setBannerProgress(false);
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //create-course
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/course/create-course", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ ...courseData, banner }),
        });

        const dataFromResponse = await res.json();
        if (res.ok) {
          setCourseID(dataFromResponse?.courseId); // Update courseID
          handleActiveTab("curriculum");
          toast.success("Course created successfully!");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!banner) {
      toast.error("add course banner");
      return;
    }

    mutate({ courseData, banner });
  };

  //update course
  const { mutate: updateCourse, isLoading: updateLoading } = useMutation({
    mutationFn: async ({}) => {
      try {
        const res = await fetch(
          `/api/course/update-course/${singleCourse?._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ ...courseData, banner }),
          }
        );

        const dataFromResponse = await res.json();

        if (res.ok) {
          setCourseID(dataFromResponse?.courseId); // Update courseID
          handleActiveTab("curriculum");
          toast.success("Course updated successfully!");
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Submit updated data
  const handleUpdate = (e) => {
    e.preventDefault();
    updateCourse({});
  };

  useEffect(() => {
    //if is Updating...
    if (singleCourse) {
      setCourseData(singleCourse);
      setBanner(singleCourse?.banner);
    }
  }, [singleCourse?._id]);

  return (
    <div className="sm:w-[100%] mt-7 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {singleCourse ? "Updating Course..." : "Create New Course"}
      </h2>

      <form className="space-y-4">
        {/* Course Title */}

        <div className="flex flex-col">
          <label htmlFor="image">
            <div className="flex  rounded-md text-white items-center justify-center  gap-3 bg-blue-600 p-2 cursor-pointer  hover:bg-blue-500 duration-500">
              <FaUpload />
              {bannerProgress ? "Uploading..." : "Uplaod Course Banner"}
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleBannerUpload}
            />
          </label>
        </div>

        <div>
          {banner && (
            <div className=" relative">
              <img src={banner} className="border -mt-[20px]" />
              <RxCross2
                size={20}
                onClick={() => setBanner("")}
                className="hover:text-red-500 duration-500  cursor-pointer absolute right-2 top-2"
              />
            </div>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter course title"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="subtitle"
          >
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={courseData.subtitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter course subtitle"
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter course description"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select category</option>
            {categories.map((category, idx) => {
              return (
                <option value={category.slug} key={idx}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Level */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="level"
          >
            Level
          </label>
          <select
            id="level"
            name="level"
            value={courseData.level}
            onChange={handleChange}
            className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select level</option>
            {levels.map((level, idx) => {
              return (
                <option value={level} key={idx}>
                  {level}
                </option>
              );
            })}
          </select>
        </div>

        {/* Language */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="language"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            value={courseData.language}
            onChange={handleChange}
            className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select language</option>
            {languages.map((language, idx) => {
              return (
                <option value={language} key={idx}>
                  {language}
                </option>
              );
            })}
          </select>
        </div>

        {/* Pricing */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="pricing"
          >
            Pricing ($)
          </label>
          <input
            type="number"
            id="pricing"
            name="pricing"
            value={courseData.pricing}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter course price"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          {singleCourse ? (
            <button
              type="submit"
              onClick={handleUpdate}
              className="px-6 py-2  mt-4 mb-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {updateLoading ? "Updating ..." : "Update Course"}
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2  mt-4 mb-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Creating ..." : "Create Course"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Introduction;
