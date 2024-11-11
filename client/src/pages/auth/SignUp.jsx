import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ name, email, password, role }) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ name, email, password, role }),
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(
            dataFromResponse?.msg || "User Registered Successfully"
          );
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
    mutate({ name, email, password, role });
  };

  return (
    <div>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
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

        <select
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none cursor-pointer focus:border-blue-500"
          name="role"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role - </option>
          <option value="Instructor">Instructor</option>
          <option value="Student">Student</option>
        </select>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
