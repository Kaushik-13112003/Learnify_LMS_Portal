import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import Introduction from "./courses/Introduction";
import Curriculum from "./courses/Curriculum";
import Settings from "./courses/Settings";

const CreateCourse = () => {
  const [activeTab, setActiveTab] = useState("course-introduction");

  const handleActiveTab = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className="mt-[100px] mb-[100px] flex items-center justify-center ">
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
                  activeTab === "signin"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500"
                }`}
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
              >
                Curriculum
              </TabsTrigger>

              <TabsTrigger
                value="settings"
                className={`py-2 w-[100%]  px-4 font-medium rounded ${
                  activeTab === "settings"
                    ? "bg-blue-500 text-white"
                    : "text-blue-500"
                }`}
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="course-introduction">
              <Introduction />
            </TabsContent>

            <TabsContent value="curriculum">
              <Curriculum />
            </TabsContent>

            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
