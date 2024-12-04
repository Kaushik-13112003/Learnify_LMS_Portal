// CourseDetail.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaLock, FaPlayCircle, FaRegHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import toast from "react-hot-toast";
import useLikeUnlike from "@/students/useLikeUnlike";

const SingleCourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });

  // State to manage dialog and selected video
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [activeCourseId, setActiveCourseId] = useState(null);

  //makr payment
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
          // navigate("/my-courses");
          sessionStorage.setItem("courseId", JSON.stringify(singleCourse?._id));
          sessionStorage.setItem(
            "purchaseId",
            JSON.stringify(dataFromResponse?.purchaseId)
          );

          window.location.href = dataFromResponse?.approveURL;
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

  //open comment model
  const openCommentsModal = (id) => {
    setActiveCourseId(id);
    document.getElementById("comments_modal" + id).showModal();
  };

  //close the model
  const closeCommentsModal = (id) => {
    setActiveCourseId(null);
    document.getElementById("comments_modal" + id).close();
  };

  // handleComment
  const { mutate: commentOnPost } = useMutation({
    mutationFn: async ({ id, commentText }) => {
      try {
        let res = await fetch(`/api/course/add-comment/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: commentText }),
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg);
          queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
          // queryClient.invalidateQueries({ queryKey: ["getComments"] });
        } else {
          toast.error(dataFromResponse?.msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleComment = async (id) => {
    if (commentText.trim()) {
      commentOnPost({ id, commentText });
      setCommentText(""); // Reset the comment input after submitting
      document.getElementById("comments_modal" + id).close(); // Close the modal after adding the comment
    } else {
      toast.error("Comment cannot be empty");
    }
  };

  // handleLectureClick
  const handleLectureClick = (video) => {
    setSelectedVideo(video);
    setDialogOpen(true);
  };

  const handleLikeUnlikeCourse = useLikeUnlike();

  if (isLoading) {
    return <div className="text-center mt-7">Loading...</div>;
  }

  return (
    <div className="relative mb-10 flex flex-col justify-center items-center">
      {/* Full-width image header */}

      <div
        className="relative shadow-lg w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${singleCourse?.banner})`,
        }}
      ></div>

      {authenticatedUser?.likedCourse?.includes(singleCourse?._id) ? (
        <FaHeart
          onClick={() => handleLikeUnlikeCourse(singleCourse?._id)}
          className=" absolute right-4 top-4 hover:cursor-pointer hover:duration-500 text-red-700 "
          size={30}
        />
      ) : (
        <FaRegHeart
          onClick={() => handleLikeUnlikeCourse(singleCourse?._id)}
          className=" absolute right-4 top-4 hover:cursor-pointer duration-500 hover:text-red-700 "
          size={30}
        />
      )}

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
            {authenticatedUser?._id !== singleCourse?.courseCreater?._id && (
              <>
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
              </>
            )}
            <span className="font-semibold text-blue-600 text-3xl">
              ${singleCourse?.pricing}
            </span>
          </div>
        </div>
      </div>

      {/* add comments */}
      <button
        className={` p-2 rounded-sm bg-blue-700 hover:bg-blue-500  duration-500 text-white
                  `}
        onClick={() => openCommentsModal(singleCourse?._id)}
      >
        Add Comment
      </button>

      {/* Modal for comments */}
      <dialog
        id={`comments_modal${singleCourse?._id}`}
        className="modal modal-bottom  rounded-md w-[50%] sm:modal-middle p-4"
      >
        <div className="modal-box border border-white">
          <h3 className="font-bold text-lg mb-3">COMMENTS</h3>

          <div className="modal-action flex flex-col gap-4">
            <form
              method="dialog"
              className="w-[100%]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-control">
                <textarea
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your opinion"
                  className="border border-black p-2 rounded-md h-[100px] w-[100%]"
                />
              </div>
              <div className="flex mb-4 items-center gap-4 mt-5">
                <button
                  className=" p-2 rounded-sm bg-blue-700 hover:bg-blue-500  duration-500 text-white w-[100px]"
                  type="button"
                  onClick={() => handleComment(singleCourse?._id)}
                >
                  Add
                </button>
                <button
                  className=" p-2 rounded-sm bg-red-700 hover:bg-red-500  duration-500 text-white w-[100px]"
                  type="button"
                  onClick={() => closeCommentsModal(singleCourse?._id)}
                >
                  Close
                </button>
              </div>
            </form>

            {/* all comments */}

            <div className=" h-[100px] overflow-auto">
              {/* {allComments?.comments?.length <= 0 && (
                <p>be the first to add comment !!</p>
              )} */}
            </div>
          </div>

          {/* all comments */}
          <div className=" h-[100px] overflow-auto -mt-[100px]">
            {singleCourse?.comments?.length <= 0 && (
              <p>be the first to add comment !!</p>
            )}

            {singleCourse?.comments?.length > 0 && (
              <div
                className="flex gap-3 flex-col "
                // onClick={() => navigate(`/profile/${ele?.username}`)}
              >
                {singleCourse?.comments?.map((com) => {
                  return (
                    <div className=" flex gap-5 items-center">
                      <img
                        src={com?.user?.image || "/profile.jpg"}
                        width={30}
                        className="rounded-full"
                        alt="Profile"
                      />
                      <div>
                        <div className="flex text-[10px] items-center gap-3">
                          <p className="text-blue-600 text-[14px]">
                            {com?.user?.name}
                          </p>
                          <p>{new Date(com?.commentTime).toLocaleString()}</p>
                        </div>
                        <h1 className="text-[15px]">{com?.text}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SingleCourseDetails;
