import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Adjust the path to your desired route
  };

  return (
    <div className="h-screen">
      <div className="flex items-center  justify-center mt-10  ">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500">Payment Canceled</h1>
          <p className="mt-4 text-gray-600">
            We noticed you canceled the payment process. If this was a mistake,
            please try again or contact support for assistance.
          </p>
          <button
            onClick={handleGoBack}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
