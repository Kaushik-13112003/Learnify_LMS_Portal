import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Introduction from "@/instructor/courses/Introduction";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FcLeft, FcRight } from "react-icons/fc";
import { GrLanguage } from "react-icons/gr";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ReactPlayer from "react-player";
import { FaCheck, FaPlay } from "react-icons/fa";

const CourseProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: authenticatedUser } = useQuery({ queryKey: ["authUser"] });
  const [isLocked, setIsLocked] = useState(false);
  const [studentCurrentCourseProgress, setStudentCurrentCourseProgress] =
    useState({});
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchCurrentCourseProgress = async () => {
    const studentId = authenticatedUser?._id;
    const courseId = id;

    try {
      const res = await fetch(
        `/api/progress/progress/${studentId}/${courseId}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();
      if (res.ok) {
        // console.log(dataFromResponse);
        if (!dataFromResponse?.isPurchased) {
          setIsLocked(true);
        } else {
          setStudentCurrentCourseProgress({
            course: dataFromResponse?.course,
            progress: dataFromResponse?.progress,
          });

          if (dataFromResponse?.isCompleted) {
            setIsCompleted(true);
            setShowDialog(true);
            setShowConfetti(true);
            setCurrentLecture(dataFromResponse?.course?.curriculum[0]);

            return;
          }

          if (dataFromResponse?.progress?.length === 0) {
            setCurrentLecture(dataFromResponse?.course?.curriculum[0]);
          } else {
            const lastViewdCourseIndex = dataFromResponse?.progress?.reduce(
              (acc, ele, idx) => {
                return acc === -1 && ele?.isViewed ? idx : acc;
              },
              -1
            );

            setCurrentLecture(
              dataFromResponse?.course?.curriculum[lastViewdCourseIndex + 1]
            );
            window.scrollTo(0, 0);

            // console.log("next-done", lastViewdCourseIndex);
          }
        }
      } else {
        console.log(dataFromResponse?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //handleSiderbar
  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  //handle tab switch
  const handleActiveTab = (value) => {
    setActiveTab(value);
  };

  //handleLectureUpdate
  const handleUpdateCourseProgress = async () => {
    if (currentLecture) {
      try {
        const res = await fetch(`/api/progress/mark-lecture-viewed`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            studentId: authenticatedUser?._id,
            courseId: id,
            lectureId: currentLecture?._id,
          }),
        });

        if (res.ok) {
          fetchCurrentCourseProgress();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLectureUpdate = (state) => {
    if (state) {
      handleUpdateCourseProgress();
    }
  };

  //   handleWatchAgain
  const handleWatchAgain = async () => {
    try {
      const res = await fetch(`/api/progress/reset-progress`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          studentId: authenticatedUser?._id,
          courseId: id,
        }),
      });

      const dataFromResponse = await res.json();
      if (res.ok) {
        fetchCurrentCourseProgress();
        setShowConfetti(false);
        setIsCompleted(false);
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id && authenticatedUser?._id) {
      fetchCurrentCourseProgress();
    }
  }, [id]);

  console.log(studentCurrentCourseProgress);

  return (
    <>
      <div className="m-5">
        <div className="flex ml-3 sm:items-center sm:flex-row flex-col gap-4 mt-8">
          <Button className="w-[200px]" onClick={() => navigate(`/my-courses`)}>
            Back to My Courses
          </Button>

          <h1 className="font-bold text-2xl">
            {studentCurrentCourseProgress?.course?.title}
          </h1>
        </div>

        {/* course lectures & sidebar */}
        <div className="mt-6  p-7 flex   border shadow-md gap-3">
          <div
            className={`h-[100%] ${
              showSidebar ? "sm:w-[70%] sm:block hidden" : "sm:w-[100%]"
            }`}
          >
            <div>
              <h1 className="font-bold text-2xl mt-3 mb-3">
                {currentLecture?.title}
              </h1>
            </div>
            <ReactPlayer
              url={currentLecture?.videoUrl}
              width="100%"
              height="100%"
              controls={true} // Enable default controls
              playing={false} // Optional: control auto-play
              onEnded={() => handleLectureUpdate(1)}
            />
          </div>
          <div
            className={`${
              showSidebar
                ? "sm:w-[30%] w-[100%] border flex flex-col gap-2 bg-slate-50"
                : ""
            } `}
          >
            <div
              className={`bg-black p-2 ${
                !showSidebar && "rounded-md"
              } text-white `}
            >
              {showSidebar ? (
                <MdKeyboardDoubleArrowRight
                  size={30}
                  onClick={handleSidebar}
                  className="hover:text-blue-200 duration-500 cursor-pointer"
                />
              ) : (
                <MdOutlineKeyboardDoubleArrowLeft
                  size={30}
                  onClick={handleSidebar}
                  className="hover:text-blue-200 duration-500 cursor-pointer"
                />
              )}
            </div>

            <div className="p-4 ">
              {showSidebar && (
                <>
                  <div className="transition-all duration-500s">
                    <Tabs
                      value={activeTab}
                      defaultValue="overview"
                      onValueChange={handleActiveTab}
                    >
                      <TabsList className="flex bg-white  sm:flex-row flex-col   sm:mb-[20px] mb-[45px] gap-2 mt-2">
                        <TabsTrigger
                          value="overview"
                          className={`py-2 w-[100%] px-4 font-medium rounded ${
                            activeTab === "course-introduction"
                              ? "bg-blue-500 text-white"
                              : "text-blue-500"
                          }`}
                        >
                          Overview
                        </TabsTrigger>
                        <TabsTrigger
                          value="content"
                          className={`py-2 w-[100%]  px-4 font-medium rounded ${
                            activeTab === "curriculum"
                              ? "bg-blue-500 text-white"
                              : "text-blue-500"
                          }`}
                        >
                          Content
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview">
                        <div className="p-2">
                          <h1 className="font-bold text-2xl">
                            {" "}
                            {studentCurrentCourseProgress?.course?.title}
                          </h1>

                          <p className="mt-2">
                            {studentCurrentCourseProgress?.course?.category} -{" "}
                            {studentCurrentCourseProgress?.course?.level}{" "}
                            <span>Level</span>
                          </p>

                          <p className="mt-2">
                            Created By -{" "}
                            <span className="text-blue-500">
                              {" "}
                              {
                                studentCurrentCourseProgress?.course
                                  ?.courseCreater?.name
                              }
                            </span>
                          </p>
                          <p className="mt-2">
                            Created At -{" "}
                            <span className="text-blue-500">
                              {" "}
                              {new Date(
                                studentCurrentCourseProgress?.course?.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </p>

                          <p className="flex items-center gap-2 mt-2">
                            <GrLanguage />{" "}
                            {studentCurrentCourseProgress?.course?.language}
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="content">
                        <h1 className=" font-bold">Lectures:</h1>

                        {studentCurrentCourseProgress?.course?.curriculum?.map(
                          (cur, idx) => {
                            return (
                              <div className="flex gap-2 items-center">
                                {studentCurrentCourseProgress?.progress?.find(
                                  (item) => item.lectureId === cur?._id
                                )?.isViewed ? (
                                  <FaCheck
                                    className="text-green-700 mt-[7px]"
                                    size={15}
                                  />
                                ) : (
                                  <FaPlay
                                    className="text-blue-700 mt-[9px]"
                                    size={15}
                                  />
                                )}
                                <button
                                  key={idx}
                                  onClick={() => setCurrentLecture(cur)}
                                  className={`mt-2 hover:text-blue-500 duration-500 hover:underline flex flex-col gap-3 ${
                                    currentLecture === cur &&
                                    "underline text-green-700"
                                  }`}
                                >
                                  {cur?.title}{" "}
                                </button>
                              </div>
                            );
                          }
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {showConfetti && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              pointerEvents: "none",
            }}
          >
            <Confetti />
          </div>
        )}
        <Dialog open={isLocked}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sorry, you cant' watch this course</DialogTitle>
              <DialogDescription className="mt-5">
                <div className="flex gap-3 items-center">
                  <Button
                    className="mt-3"
                    onClick={() => navigate(`/single-course/${id}`)}
                  >
                    Buy Now
                  </Button>

                  <Button
                    className="mt-3 bg-blue-700 hover:bg-blue-500 duration-500"
                    onClick={() => navigate(`/`)}
                  >
                    Go to Home
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={isCompleted}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Congratulation 🎉🎊 </DialogTitle>
              <DialogDescription>
                you have nicely completed this course
              </DialogDescription>
              <DialogDescription className="mt-5">
                <div className="flex gap-3 items-center">
                  <Button
                    className="mt-3"
                    onClick={() => navigate(`/my-courses`)}
                  >
                    Back to My Courses
                  </Button>

                  <Button
                    className="mt-3 bg-blue-700 hover:bg-blue-500 duration-500"
                    onClick={handleWatchAgain}
                  >
                    Watch Again
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CourseProgress;
