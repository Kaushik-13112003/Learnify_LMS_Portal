import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  //update prifle
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ name, image }) => {
      try {
        const res = await fetch("/api/user/update-profile", {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ name, image }),
        });

        if (res.ok) {
          toast.success("profile updated");
          navigate("/my-profile");
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Submit updated data
  const handleUpdatee = (e) => {
    e.preventDefault();
    mutate({ name, image });
  };

  //  image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setEmail(authenticatedUser.email);
    setImage(authenticatedUser.image);
    setName(authenticatedUser.name);
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6 max-w-md mb-10">
      <form className="bg-white shadow-md rounded-lg p-6 text-center flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <div className="flex flex-col items-center justify-center">
          <img
            src={image ? image : "./profile.jpg"}
            alt="Profile"
            className="w-32 h-32 mx-auto border border-gray-200 rounded-full object-cover mb-4"
          />
          <label htmlFor="image">
            <div className="flex w-[200px] rounded-md text-white items-center justify-center  gap-3 bg-blue-600 p-2 cursor-pointer  hover:bg-blue-500 duration-500">
              <FaUpload />
              Uplaod
            </div>
            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          onClick={handleUpdatee}
          className="px-4 py-2 mt-2 w-[100%] bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 duration-500"
        >
          {isLoading ? "Saving Changes..." : "Save Changes"}{" "}
        </button>

        <NavLink
          to="/my-profile"
          className="px-4 py-2 w-[100%] bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 duration-500"
        >
          Go Back
        </NavLink>
      </form>
    </div>
  );
};

export default UpdateProfile;
