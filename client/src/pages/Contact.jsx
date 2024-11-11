import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      const response = await fetch(`https://formspree.io/f/xrbgkgjd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Your inquiry has been sent successfully!");

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setSuccessMessage(
          "Failed to send your inquiry. Please try again later."
        );
      }
    } catch (error) {
      setSuccessMessage("An error occurred. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Contact Learnify Support
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have any questions, feedback, or need assistance with your courses?
          We're here to help! Reach out to us using the form below, and our team
          will get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="mt-12 w-full max-w-xl">
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {/* Name Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
              rows="5"
              required
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 duration-500"
            >
              Send Inquiry
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-center mt-4">{successMessage}</p>
          )}
        </form>
      </div>

      {/* Footer Section */}
      <div className="mt-12 text-center mb-5">
        <p className="text-gray-600">
          You can also reach us at:{" "}
          <span className="font-bold text-blue-600">support@learnify.com</span>
        </p>
        <p className="text-gray-600 mt-2">
          Call us:{" "}
          <span className="font-bold text-blue-600">+1 (800) 123-4567</span>
        </p>
      </div>
    </div>
  );
};

export default Contact;
