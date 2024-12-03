import React, { useEffect } from "react";
import { Button } from "./components/ui/button";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import SingleCourse from "./components/lms portal/SingleCourse";
import SingleCourseDetails from "./components/lms portal/SingleCourseDetails";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import { useQuery } from "@tanstack/react-query";
import Profile from "./profile/Profile";
import UpdateProfile from "./profile/UpdateProfile";
import ForgotPassword from "./profile/ForgotPassword";
import ResetPassword from "./profile/ResetPassword";
import Dashboard from "./instructor/Dashboard";
import CreateCourse from "./instructor/CreateCourse";
import CoursesCreated from "./instructor/CoursesCreated";
import StudentCourses from "./students/StudentCourses";
import PaymentReturn from "./pages/PaymentReturn";
import PaymentCancel from "./pages/PaymentCancel";
import CourseProgress from "./students/CourseProgress";

const App = () => {
  const navigate = useNavigate();

  // Fetching authenticated user
  const { data: authenticatedUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/get-auth-user", {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse?.currentUser;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <>
      <Toaster />
      <ScrollToTop smooth className="flex items-center justify-center" />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route
          path="/courses/:category"
          element={
            authenticatedUser ? <SingleCourse /> : <Navigate to="/auth" />
          }
        ></Route>
        <Route
          path="/single-course/:id"
          element={
            authenticatedUser ? (
              <SingleCourseDetails />
            ) : (
              <Navigate to="/auth" />
            )
          }
        ></Route>

        <Route
          path="/single-course/:id"
          element={
            authenticatedUser ? (
              <SingleCourseDetails />
            ) : (
              <Navigate to="/auth" />
            )
          }
        ></Route>

        <Route
          path="/my-profile"
          element={authenticatedUser ? <Profile /> : <Navigate to="/auth" />}
        ></Route>

        <Route
          path="/my-courses"
          element={
            authenticatedUser ? <StudentCourses /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/payment-return"
          element={
            authenticatedUser ? <PaymentReturn /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/payment-cancel"
          element={
            authenticatedUser ? <PaymentCancel /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/update-profile"
          element={
            authenticatedUser ? <UpdateProfile /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/course-progress/:id"
          element={
            authenticatedUser ? <CourseProgress /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/forgot-password"
          element={
            authenticatedUser ? <ForgotPassword /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/reset-password/:token"
          element={
            authenticatedUser ? <ResetPassword /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/instructor-dashboard"
          element={authenticatedUser ? <Dashboard /> : <Navigate to="/auth" />}
        ></Route>

        <Route
          path="/create-course"
          element={
            authenticatedUser ? <CreateCourse /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/update-course/:id"
          element={
            authenticatedUser ? <CreateCourse /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route
          path="/created-courses"
          element={
            authenticatedUser ? <CoursesCreated /> : <Navigate to="/auth" />
          }
        ></Route>

        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms-of-service" element={<TermsOfService />}></Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;
