// CourseDetail.js
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaLock, FaPlayCircle } from "react-icons/fa";
import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import toast from "react-hot-toast";

const SingleCourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  // State to manage dialog and selected video
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [approveURL, setApproveURL] = useState("");

  //make payment to purchase course
  // const { mutate: handlePayment, isLoading: isPaymentLoading } = useMutation({
  //   mutationFn: async ({}) => {
  //     try {
  //       const res = await fetch(`/api/payment/make-payment`, {
  //         method: "POST",

  //         headers: {
  //           "Content-Type": "application/json",
  //         },

  //         body: JSON.stringify({
  //           studentId:
  //             authenticatedUser?.role !== "instructor" &&
  //             authenticatedUser?._id,
  //           studentName: authenticatedUser?.name,
  //           studentEmail: authenticatedUser?.email,
  //           instructorId: singleCourse?.courseCreater?._id,
  //           instructorName: singleCourse?.courseCreater?.name,
  //           courseId: singleCourse?._id,
  //           payment_status: "Initiated",
  //           payment_method: "paypal",
  //           purchase_status: "Pending",
  //           purchase_date: new Date(),
  //           paymentId: "",
  //           payerId: "",
  //           coursePrice: singleCourse?.pricing,
  //           courseTitle: singleCourse?.title,
  //           courseImage: singleCourse?.image,
  //         }),
  //       });

  //       const dataFromResponse = await res.json();
  //       if (res.ok) {
  //         // navigate("/instructor-dashboard");
  //         sessionStorage.setItem(
  //           "currentOrderId",
  //           JSON.stringify(dataFromResponse?.purchaseId)
  //         );
  //         setApproveURL(dataFromResponse?.approveURL);
  //         toast.success(dataFromResponse?.msg);
  //       } else {
  //         toast.error("something went wrong");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // });

  const { mutate: handlePayment, isLoading: isPaymentLoading } = useMutation({
    mutationFn: async ({}) => {
      try {
        const res = await fetch(`/api/payment/make-payment`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            purchasedBy: authenticatedUser?._id,
            instructor: singleCourse?.courseCreater?._id,
            courseId: singleCourse?._id,
            coursePrice: singleCourse?.pricing,
            courseTitle: singleCourse?.title,
          }),
        });

        const dataFromResponse = await res.json();
        if (res.ok) {
          navigate("/my-courses");
          toast.success(dataFromResponse?.msg);
        } else {
          toast.error(dataFromResponse?.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // buyNowController
  const buyNowController = (e) => {
    e.preventDefault();
    handlePayment({});
  };

  // Fetching authenticated user
  const { data: singleCourse, isLoading } = useQuery({
    queryKey: ["singleCourse"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/course/single-course/${id}`, {
          method: "GET",
        });

        if (!res.ok) {
          return null;
        } else {
          const dataFromResponse = await res.json();
          return dataFromResponse?.singleCourse;
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  // if (approveURL !== "") {
  //   window.location.href = approveURL;
  // }

  // handleLectureClick
  const handleLectureClick = (video) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };

  return (
    <div className="mb-10 flex flex-col justify-center items-center">
      {/* Full-width image header */}

      <div
        className="relative shadow-lg w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${singleCourse?.banner})`,
        }}
      ></div>

      <div className="flex sm:w-[90vw]    justify-between  sm:flex-row flex-col gap-8 p-10">
        <div className="">
          <div>
            <h1 className="sm:text-4xl text-3xl font-bold">
              {singleCourse?.title}
            </h1>
            <p className="mt-2">
              {singleCourse?.category} - {singleCourse?.level}{" "}
              <span>Level</span>
            </p>
          </div>
          <p className="mt-2 text-lg">
            Created By -{" "}
            <span className="text-blue-500">
              {" "}
              {singleCourse?.courseCreater?.name}
            </span>
          </p>
          <p className="mt-2 text-lg">
            Created At -{" "}
            <span className="text-blue-500">
              {" "}
              {new Date(singleCourse?.createdAt).toLocaleDateString()}
            </span>
          </p>

          <div className="mt-2 text-lg flex items-center gap-4">
            <p className="flex items-center gap-2">
              <GrLanguage /> {singleCourse?.language}
            </p>
            <p className="flex items-center gap-2">
              {singleCourse?.students?.length && (
                <div>{singleCourse?.students?.length}</div>
              )}{" "}
              Students
            </p>
          </div>

          <div className="mt-7 border p-3 rounded-md">
            <h1 className="text-2xl font-bold">Description</h1>
            <p className="mt-2">{singleCourse?.description}</p>
          </div>

          {singleCourse?.curriculum?.length && (
            <ul className="mt-7 border p-3 rounded-md=]">
              <h1 className="text-2xl font-bold">Curriculum</h1>
              {singleCourse?.curriculum?.map((cur, idx) => {
                return (
                  <div
                    className={`mt-5 flex flex-col gap-3 ${
                      cur?.freePreview
                        ? " cursor-pointer hover:text-blue-700 hover:underdivne duration-300"
                        : " cursor-not-allowed"
                    }`}
                    onClick={
                      cur?.freePreview ? () => handleLectureClick(cur) : ""
                    }
                  >
                    <div className="flex items-center gap-2">
                      {cur?.freePreview ? <FaPlayCircle /> : <FaLock />}{" "}
                      {cur.title}{" "}
                      {cur?.freePreview && (
                        <span className="text-green-700">(Free Preview)</span>
                      )}
                    </div>
                  </div>
                );
              })}

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Free Preview </DialogTitle>
                    <DialogDescription className="mt-5">
                      {selectedVideo?.title}
                    </DialogDescription>
                    <ReactPlayer
                      url={selectedVideo?.videoUrl}
                      width={"100%"}
                      height={"200px"}
                      controls={true} // Enable default controls
                      playing={false}
                    ></ReactPlayer>
                  </DialogHeader>
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Close
                  </button>
                </DialogContent>
              </Dialog>
            </ul>
          )}
        </div>

        <div className="">
          <div className=" flex items-center gap-2">
            <button
              className={` p-2 rounded-sm  duration-500 text-white w-[100px]
                 ${
                   authenticatedUser?.my_courses?.includes(singleCourse?._id)
                     ? "bg-slate-500 cursor-not-allowed"
                     : "bg-blue-700 hover:bg-blue-500"
                 }  `}
              onClick={buyNowController}
              disabled={authenticatedUser?.my_courses?.includes(
                singleCourse?._id
              )}
            >
              {authenticatedUser?.my_courses?.includes(singleCourse?._id)
                ? "Purchased"
                : isPaymentLoading
                ? "Processing..."
                : "Buy Now"}
            </button>
            <p>at</p>
            <span className="font-semibold text-blue-600 text-2xl">
              ${singleCourse?.pricing}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseDetails;
