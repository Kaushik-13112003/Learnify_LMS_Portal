// ForgotPassword.js

import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ email }) => {
      // Request password reset link
      try {
        const res = await fetch("/api/user/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Password reset link sent to your email");
        } else {
          toast.error(data.msg || "Failed to send reset link");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  const handleForgotPassword = (e) => {
    e.preventDefault();
    mutate({ email });
  };

  return (
    <div className="container mx-auto p-6 mt-10 h-screen max-w-md mb-10">
      <div className="w-full max-w-md p-8 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center ">
          Forgot Password
        </h2>
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            onClick={handleForgotPassword}
            className="w-full bg-blue-600 hover:bg-blue-500 mt-2 duration-500 text-white py-2 rounded"
          >
            {isLoading ? "Generating..." : "Generate Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
