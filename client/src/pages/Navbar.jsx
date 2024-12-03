import React, { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //logout user
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg || "Logout Successfully");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          navigate("/auth");
          setIsDropdownOpen(false);
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <header className="bg-white w-full border-b shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-500 duration-300"
        >
          Learnify
        </NavLink>

        <div className="md:hidden flex items-center gap-3">
          {authenticatedUser && (
            <div className="relative">
              <img
                src={
                  authenticatedUser?.image
                    ? authenticatedUser?.image
                    : "./profile.jpg"
                }
                alt="User Avatar"
                className="w-10 h-10 border border-gray-400  rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2 z-10">
                  {authenticatedUser?.role === "Instructor" ? (
                    <>
                      <NavLink
                        to="/instructor-dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/created-courses"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Created Courses
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      to="/my-courses"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Courses
                    </NavLink>
                  )}

                  <NavLink
                    to="/my-profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>

                  <NavLink
                    to="/forgot-password"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <MdOutlineLogout className="mr-2 mt-1" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button onClick={toggleMobileMenu} className="text-gray-700">
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </NavLink>
          <NavLink
            to="/courses/all"
            className="text-gray-700 hover:text-blue-600"
          >
            Courses
          </NavLink>
          {authenticatedUser?.role !== "Instructor" && (
            <>
              <NavLink
                to="/about"
                className="text-gray-700 hover:text-blue-600"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="text-gray-700 hover:text-blue-600"
              >
                Contact
              </NavLink>
            </>
          )}
          {authenticatedUser?.role === "Instructor" && (
            <NavLink
              to="/create-course"
              className="text-gray-700 hover:text-blue-600"
            >
              Create Course
            </NavLink>
          )}

          {authenticatedUser && (
            <div className="relative">
              <img
                src={
                  authenticatedUser?.image
                    ? authenticatedUser?.image
                    : "./profile.jpg"
                }
                alt="User Avatar"
                className="w-10 border border-gray-400  h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2 z-10">
                  {authenticatedUser?.role === "Instructor" ? (
                    <>
                      <NavLink
                        to="/instructor-dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/created-courses"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Created Courses
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      to="/my-courses"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Courses
                    </NavLink>
                  )}
                  <NavLink
                    to="/my-profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/forgot-password"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <MdOutlineLogout className="mr-2 mt-1" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            <NavLink to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </NavLink>
            <NavLink
              to="/courses/all"
              className="text-gray-700 hover:text-blue-600"
            >
              Courses
            </NavLink>

            {authenticatedUser?.role === "Instructor" && (
              <NavLink
                to="/create-course"
                className="text-gray-700 hover:text-blue-600"
              >
                Create Course
              </NavLink>
            )}

            {authenticatedUser?.role !== "Instructor" && (
              <>
                <NavLink
                  to="/about"
                  className="text-gray-700 hover:text-blue-600"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Contact
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
