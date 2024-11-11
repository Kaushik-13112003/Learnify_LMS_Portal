import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-md sm:text-lg">
            © 2024 LMS Portal. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-4 sm:space-x-6">
            <NavLink
              to="/privacy-policy"
              className="text-gray-200 hover:text-white"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="/terms-of-service"
              className="text-gray-200 hover:text-white"
            >
              Terms of Service
            </NavLink>
            <NavLink to="/contact" className="text-gray-200 hover:text-white">
              Contact Us
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
