import { courseCurriculumInitialFormData } from "@/assets/data";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const Curriculum = () => {
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );
  const [progress, setProgress] = useState(false);

  //add course
  const handleAddLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
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
      setProgress(true);
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
          };

          setCourseCurriculumFormData(copyOfCourseCurriculumFormData);
          setProgress(false);
          //   queryClient.invalidateQueries({ queryKey: ["authUser"] });
          //   navigate("/");
        } else {
          setProgress(false);
          toast.error(dataFromResponse.msg || "Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(courseCurriculumFormData);

  return (
    <>
      <div className="sm:w-[100%] mt-7 p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center sm:flex-row flex-col ">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Course Curriculum
          </h2>
          <Button className={"sm:w-[100px] w-[100%]"}>Bulk Upload</Button>
        </div>

        {/* add lectures */}
        <div className="mt-9">
          <Button
            className="bg-blue-600 sm:w-[100px] w-[100%]"
            onClick={handleAddLecture}
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
                          {!progress
                            ? `Upload Video for Chapter - ${idx + 1}`
                            : "Uploading"}
                        </label>
                        {progress && (
                          <img
                            src="./Loading.gif"
                            alt=""
                            className="w-[60px]"
                          />
                        )}
                      </div>
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
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Curriculum;
