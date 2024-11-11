import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signin");

  const handleActiveTab = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="flex items-center p-12  justify-center  mb-[100px]">
      <div className="w-full max-w-md p-8 space-y-6  rounded-lg shadow-lg">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleActiveTab}
        >
          <TabsList className="flex justify-center bg-white mb-4 space-x-4">
            <TabsTrigger
              value="signin"
              className={`py-2 px-4 font-medium rounded ${
                activeTab === "signin"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className={`py-2 px-4 font-medium rounded ${
                activeTab === "signup"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <SignIn />
          </TabsContent>

          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
