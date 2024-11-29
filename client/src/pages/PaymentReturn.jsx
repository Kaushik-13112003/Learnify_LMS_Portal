import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const PaymentReturn = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    const capturePayment = async () => {
      const id = JSON.parse(sessionStorage.getItem("currentOrderId"));
      try {
        const res = await fetch(`/api/payment/get-payment`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: id,
            paymentId,
            payerId,
          }),
        });

        if (res.ok) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "my-courses";
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (payerId && paymentId) {
      capturePayment();
    }
  }, [payerId, paymentId]);

  return (
    <>
      <p className="mt-10  h-screen text-center shadow p-3 rounded-md">
        Processing your Payment...
      </p>
    </>
  );
};

export default PaymentReturn;
