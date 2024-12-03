import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  return (
    <div className="container mx-auto p-6 mt-10 h-screen max-w-md mb-10">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <img
          src={
            authenticatedUser.image ? authenticatedUser.image : "./profile.jpg"
          }
          alt="User Avatar"
          className="w-32 border border-gray-400  h-32 mx-auto rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{authenticatedUser.name}</h2>
        <p className="text-gray-600 mb-4">{authenticatedUser.email}</p>
        <button
          onClick={handleUpdateProfile}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 duration-500"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
