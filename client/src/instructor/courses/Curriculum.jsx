import { courseCurriculumInitialFormData } from "@/assets/data";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import VideoLectureDisplay from "./VideoLectureDisplay";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Curriculum = ({ courseID, singleCourse }) => {
  const navigate = useNavigate();
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData.map((item) => ({
      ...item,
      progress: false,
      deleteProgress: false,
      replaceProgress: false,
    }))
  );

  //add course
  const handleAddLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
        progress: false,
        deleteProgress: false,
        replaceProgress: false,
      },
    ]);
  };

  //remove course
  const handleCourseRemove = (idx) => {
    const filterCourses = courseCurriculumFormData.filter((ele, id) => {
      return id != idx;
    });
    setCourseCurriculumFormData(filterCourses);
  };

  //handle title change
  const handleCourseTitleChange = (e, idx) => {
    let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];

    copyOfCourseCurriculumFormData[idx] = {
      ...copyOfCourseCurriculumFormData[idx],
      title: e.target.value,
    };

    setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
  };

  //handle free preview change
  const handleFreePreviewChange = (value, idx) => {
    let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];

    copyOfCourseCurriculumFormData[idx] = {
      ...copyOfCourseCurriculumFormData[idx],
      freePreview: value,
    };

    setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
  };

  //   handle Lecture Upload Change
  const handleLectureUploadChange = async (e, idx) => {
    const file = e.target.files[0];
    // console.log(file);

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      //call api for upload

      const updatedData = [...courseCurriculumFormData];
      updatedData[idx].progress = true; // Start progress
      setCourseCurriculumFormData(updatedData);

      try {
        const res = await fetch("/api/course/upload", {
          method: "POST",

          body: formData,
        });

        let dataFromResponse = await res.json();
        if (res.ok) {
          let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];

          copyOfCourseCurriculumFormData[idx] = {
            ...copyOfCourseCurriculumFormData[idx],
            videoUrl: dataFromResponse?.result?.url,
            publicId: dataFromResponse?.result?.public_id,
            progress: false,
          };

          setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
        } else {
          setProgress(false);
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        updatedData[idx].progress = false; // Close progress
        setCourseCurriculumFormData(updatedData);
        console.log(err);
      }
    }
  };

  //handle Delete Lecture
  const handleDeleteLecture = async (public_ID, idx) => {
    if (!public_ID) {
      toast.error("Invalid Video URL");
      return;
    }

    let updatedData = [...courseCurriculumFormData];
    updatedData[idx].deleteProgress = true;
    setCourseCurriculumFormData(updatedData);

    try {
      const res = await fetch(`/api/course/delete-media/${public_ID}`, {
        method: "DELETE",
      });

      const dataFromResponse = await res.json();

      if (res.ok) {
        toast.success(dataFromResponse?.msg);

        let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];

        copyOfCourseCurriculumFormData[idx] = {
          ...copyOfCourseCurriculumFormData[idx],
          videoUrl: "",
          publicId: "",
          deleteProgress: false,
        };

        setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
      } else {
        toast.delete(dataFromResponse?.msg);
      }
    } catch (err) {
      updatedData[idx].deleteProgress = false;
      setCourseCurriculumFormData(updatedData);
      console.log(err);
    }
  };

  //handle Replace Lecture
  const handleLectureReplace = async (e, idx) => {
    let copyOfCourseCurriculumFormData = [...courseCurriculumFormData];

    let currentCoursePublicID = copyOfCourseCurriculumFormData[idx].publicId;

    let updatedData = [...courseCurriculumFormData];
    updatedData[idx].replaceProgress = true;
    updatedData[idx].deleteProgress = false;
    setCourseCurriculumFormData(updatedData);

    if (currentCoursePublicID) {
      try {
        const res = await fetch(
          `/api/course/delete-media/${currentCoursePublicID}`,
          {
            method: "DELETE",
          }
        );

        const dataFromResponse = await res.json();

        if (res.ok) {
          copyOfCourseCurriculumFormData[idx] = {
            ...copyOfCourseCurriculumFormData[idx],
            videoUrl: "",
            publicId: "",
          };

          //now replace video
          setCourseCurriculumFormData(copyOfCourseCurriculumFormData);

          const isVideoReplaced = handleLectureUploadChange(e, idx);

          if (isVideoReplaced) {
            updatedData[idx].replaceProgress = false;
            updatedData[idx].deleteProgress = false;
            setCourseCurriculumFormData(updatedData);
          }
        } else {
          toast.delete(dataFromResponse?.msg);
        }
      } catch (err) {
        console.log(err);
        updatedData[idx].replaceProgress = false;
        setCourseCurriculumFormData(updatedData);
      }
    }
  };

  //is course data valid
  const isCourseDataValidOrNot = () => {
    return courseCurriculumFormData.every((item) => {
      return item.title.trim() !== "" && item.videoUrl.trim() !== "";
    });
  };

  console.log(courseCurriculumFormData);

  const isEmpty = (value) => {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  };

  //validate form data before submit

  const disabledSubmitButton = () => {
    for (const key in courseCurriculumFormData) {
      if (isEmpty(courseCurriculumFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.publicId)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true;
      }
    }

    return hasFreePreview;
  };

  //save lecures to course
  //creaete-course
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ courseCurriculumFormData, courseID }) => {
      try {
        const res = await fetch("/api/course/add-curriculum", {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            curriculum: courseCurriculumFormData,
            id: courseID,
          }),
        });

        const dataFromResponse = await res.json();
        if (res.ok) {
          toast.success("Lectures Added Successfully!");
          navigate("/created-courses");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ courseCurriculumFormData, courseID });
  };

  // handleCourseCancel
  const {
    mutate: cancelCourseCreationProcess,
    isLoading: cancelCourseLoading,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/course/delete-course/${courseID}`, {
          method: "DELETE",

          body: JSON.stringify({ curriculum: courseCurriculumFormData }),
        });

        const dataFromResponse = await res.json();
        if (res.ok) {
          toast.success(dataFromResponse?.msg);
          navigate("/");
        } else {
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleCourseCancel = (e) => {
    e.preventDefault();
    cancelCourseCreationProcess({});
  };

  //update course
  const { mutate: updateCourse, isLoading: updateLoading } = useMutation({
    mutationFn: async ({}) => {
      try {
        const res = await fetch(
          `/api/course/update-course/${singleCourse?._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({ curriculum: courseCurriculumFormData }),
          }
        );

        if (res.ok) {
          navigate("/instructor-dashboard");
          toast.success("Course lectures updated successfully!");
        } else {
          toast.error("something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  // Submit updated data
  const handleUpdate = (e) => {
    e.preventDefault();
    updateCourse({});
  };

  useEffect(() => {
    //if is Updating...
    if (singleCourse) {
      setCourseCurriculumFormData(
        singleCourse?.curriculum.map((item) => ({
          ...item,
          progress: false,
          deleteProgress: false,
          replaceProgress: false,
        }))
      );
    }
  }, [singleCourse?._id]);

  return (
    <>
      <div className="sm:w-[100%] mt-7 p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center sm:flex-row flex-col ">
          <h2 className=" text-2xl font-semibold text-center mb-6">
            Create Course Curriculum
          </h2>

          <div className="flex gap-4 items-center sm:flex-row flex-col sm:w-auto w-[100%]">
            <Button className={"sm:w-[100px] w-[100%]"}>Bulk Upload</Button>
            <Button
              onClick={handleCourseCancel}
              className={
                "sm:w-[100px] bg-red-700 hover:bg-red-600 duration-300 w-[100%]"
              }
            >
              {cancelCourseLoading ? "Canceling..." : "Cancel Course"}
            </Button>
          </div>
        </div>

        {/* add lectures */}
        <div className="mt-9">
          <Button
            className="bg-blue-600 sm:w-[100px] w-[100%]"
            onClick={handleAddLecture}
            disabled={!isCourseDataValidOrNot()}
          >
            Add Lecture
          </Button>

          <div className="mt-8">
            {courseCurriculumFormData.map((ele, idx) => {
              return (
                <>
                  <div className="mt-8 relative">
                    <RxCross2
                      onClick={() => handleCourseRemove(idx)}
                      className="hover:text-red-500 duration-500  cursor-pointer absolute right-2 top-2"
                    />
                    <div className="flex items-center gap-6">
                      <h1 className=" font-bold">Lecture {idx + 1}</h1>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={courseCurriculumFormData[idx]?.freePreview}
                          onCheckedChange={(value) =>
                            handleFreePreviewChange(value, idx)
                          }
                          id={`freePreview-${idx}`}
                          name={`freePreview-${idx}`}
                        />
                        <p>Free Preview</p>
                      </div>
                    </div>
                    {/* add title & video url */}
                    <div className="mt-5">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id={`title-${idx}`}
                        name={`title-${idx}`}
                        value={courseCurriculumFormData[idx]?.title}
                        onChange={(e) => handleCourseTitleChange(e, idx)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder={`Enter chpater-${idx + 1} title`}
                        required
                      />
                    </div>

                    {/* upload video */}
                    <div className="mt-5">
                      <div className="flex items-center gap-2">
                        <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="title"
                        >
                          {courseCurriculumFormData[idx]?.videoUrl
                            ? ""
                            : !courseCurriculumFormData[idx]?.progress
                            ? `Upload Video for Chapter - ${idx + 1}`
                            : "Uploading"}
                        </label>
                        {courseCurriculumFormData[idx]?.progress && (
                          <img
                            src="./Loading.gif"
                            alt=""
                            className="w-[60px]"
                          />
                        )}
                      </div>

                      {courseCurriculumFormData[idx]?.videoUrl ? (
                        <div className="flex flex-col gap-4">
                          <VideoLectureDisplay
                            url={courseCurriculumFormData[idx]?.videoUrl}
                          />
                          <div className="flex gap-4 sm:flex-row flex-col">
                            {" "}
                            <label htmlFor={`replace-${idx}`}>
                              <Button
                                onClick={() =>
                                  document
                                    .getElementById(`replace-${idx}`)
                                    .click()
                                }
                                className="bg-blue-600 sm:w-[120px] w-[100%]"
                              >
                                {courseCurriculumFormData[idx]?.replaceProgress
                                  ? "Replacing..."
                                  : "Replace Lecture"}
                              </Button>
                              <input
                                type="file"
                                accept="video/*"
                                id={`replace-${idx}`} // Unique ID for each input
                                onChange={(e) => handleLectureReplace(e, idx)}
                                required
                                hidden
                              />
                            </label>
                            <Button
                              className="bg-red-600 hover:bg-red-400 duration-500 sm:w-[120px] w-[100%]"
                              onClick={() =>
                                handleDeleteLecture(
                                  courseCurriculumFormData[idx]?.publicId,
                                  idx
                                )
                              }
                            >
                              {courseCurriculumFormData[idx]?.deleteProgress
                                ? "Deleting..."
                                : "Delete Lecture"}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <input
                          type="file"
                          id={`video-${idx}`}
                          name={`video-${idx}`}
                          accept="video/*"
                          //   value={courseData.title}
                          onChange={(e) => handleLectureUploadChange(e, idx)}
                          className="w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          required
                        />
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        {singleCourse ? (
          <button
            type="submit"
            onClick={handleUpdate}
            disabled={!disabledSubmitButton()}
            className={`px-6 py-2  mt-4 mb-3 bg-blue-600 text-white font-medium rounded-md transition-colors  ${
              !disabledSubmitButton() ? "bg-slate-500" : "hover:bg-blue-700 "
            }`}
          >
            {updateLoading
              ? "Updating Lectures ..."
              : "Update Lectures to Course"}
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!disabledSubmitButton()}
            className={`px-6 py-2  mt-4 mb-3 bg-blue-600 text-white font-medium rounded-md transition-colors  ${
              !disabledSubmitButton() ? "bg-slate-500" : "hover:bg-blue-700 "
            }`}
          >
            {isLoading ? "Saving Lectures ..." : "Save Lectures to Course"}
          </button>
        )}
      </div>
    </>
  );
};

export default Curriculum;
