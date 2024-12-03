import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const PaymentReturn = () => {
  const location = useLocation();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  // Extract payment parameters from URL
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  // Flag to prevent multiple API calls
  let isPaymentCaptured = false;

  useEffect(() => {
    const capturePayment = async () => {
      if (isPaymentCaptured) return; // Prevent duplicate API calls
      isPaymentCaptured = true;

      // Retrieve stored values from sessionStorage
      const courseId = JSON.parse(sessionStorage.getItem("courseId"));
      const purchaseId = JSON.parse(sessionStorage.getItem("purchaseId"));

      try {
        // Send payment capture request to the backend
        const res = await fetch(`/api/payment/get-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            purchasedBy: authenticatedUser?._id, // Ensure authenticated user data is valid
            id: courseId, // Directly use without parsing
            paymentId,
            payerId,
            purchaseId,
          }),
        });

        if (res.ok) {
          // Success: Parse response and redirect user
          const dataFromResponse = await res.json();
          sessionStorage.removeItem("courseId");
          sessionStorage.removeItem("purchaseId");
          window.location.href = "my-courses"; // Redirect to courses page
          toast.success(dataFromResponse?.msg || "Payment captured successfully!");
        } else {
          // Error: Handle server response
          const errorResponse = await res.json();
          toast.error(errorResponse?.msg || "Something went wrong");
        }
      } catch (err) {
        // Network error handling
        console.error("Network error:", err);
        toast.error("Network error occurred while processing payment");
      }
    };

    // Trigger payment capture only if paymentId and payerId are present
    if (payerId && paymentId) {
      capturePayment();
    }
  }, [payerId, paymentId, authenticatedUser]); // Dependencies for useEffect

  return (
    <>
      <p className="mt-10 h-screen text-center shadow p-3 rounded-md">
        Processing your Payment...
      </p>
    </>
  );
};

export default PaymentReturn;
