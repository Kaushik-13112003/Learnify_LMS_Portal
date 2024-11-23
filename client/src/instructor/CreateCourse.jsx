import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Introduction from "./courses/Introduction";
import Curriculum from "./courses/Curriculum";
import Settings from "./courses/Settings";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CreateCourse = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("course-introduction");
  const [courseID, setCourseID] = useState("");
  const [singleCourse, setSingleCourse] = useState("");

  const handleActiveTab = (value) => {
    setActiveTab(value);
  };

  if (id) {
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
            setSingleCourse(dataFromResponse?.singleCourse);
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
  }

  return (
    <>
      <p className="text-red-600 text-center m-4">
        do not refresh page or change page while creating course
      </p>
      <div className="mt-[30px] mb-[100px] flex items-center justify-center ">
        <div className=" w-[90vw] rounded-lg">
          <Tabs
            value={activeTab}
            defaultValue="course-introduction"
            onValueChange={handleActiveTab}
          >
            <TabsList className="flex bg-white  sm:flex-row flex-col   mb-4 space-x-4">
              <TabsTrigger
                value="course-introduction"
                className={`py-2 w-[100%] px-4 font-medium rounded ${
                  activeTab === "course-introduction"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500"
                }`}
                disabled={courseID}
              >
                Course Introduction
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className={`py-2 w-[100%]  px-4 font-medium rounded ${
                  activeTab === "curriculum"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500"
                }`}
                disabled={courseID}
              >
                Course Curriculum
              </TabsTrigger>
            </TabsList>

            <TabsContent value="course-introduction">
              <Introduction
                singleCourse={id && singleCourse ? singleCourse : ""}
                setCourseID={setCourseID}
                handleActiveTab={handleActiveTab}
              />
            </TabsContent>

            <TabsContent value="curriculum">
              <Curriculum
                courseID={courseID}
                singleCourse={id && singleCourse ? singleCourse : ""}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
