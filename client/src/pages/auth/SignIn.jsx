import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email, password }),
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg || "User Logged in Successfully");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          navigate("/");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="">
      <form className="space-y-4 ">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
