import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Reset password request
      try {
        const res = await fetch(`/api/user/reset-password/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, confirmPassword }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Password reset successfully. Please login.");
          navigate("/auth"); // Redirect to login page
        } else {
          toast.error(data.msg || "Failed to reset password");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  const handleResetPassword = (e) => {
    e.preventDefault();
    mutate({ newPassword, confirmPassword });
  };

  return (
    <div className="container mx-auto p-6 mt-10 h-screen max-w-md mb-10">
      <div className="w-full max-w-md p-8 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form>
          <label className="block mb-2 font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Enter new password"
          />
          <label className="block mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Confirm new password"
          />
          <button
            type="submit"
            onClick={handleResetPassword}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {isLoading ? "Reseting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
