import React, { useEffect, useState } from "react";
import LeftPart from "./courses-layout/LeftPart";
import RightPart from "./courses-layout/RightPart";
import { IoFilterOutline } from "react-icons/io5";
import useGetAllCourses from "./courses-layout/useGetAllCourses";

const SingleCourse = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const allCourses = useGetAllCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleChange = () => {
    setIsFilterOpen((val) => !val);
  };

  useEffect(() => {
    setFilteredCourses(allCourses);
  }, []);

  useEffect(() => {
    let updatedCourses = allCourses;

    if (selectedCategories.length > 0) {
      updatedCourses = updatedCourses.filter((course) => {
        return selectedCategories?.includes(course.category);
      });
    }

    if (selectedLevels.length > 0) {
      updatedCourses = updatedCourses.filter((course) => {
        return selectedLevels?.includes(course.level);
      });
    }

    if (selectedLanguages.length > 0) {
      updatedCourses = updatedCourses.filter((course) => {
        return selectedLanguages?.includes(course.language);
      });
    }

    setFilteredCourses(updatedCourses);
  }, [selectedCategories, selectedLanguages, selectedLevels, allCourses]);

  return (
    <>
      <div className="flex gap-3 sm:flex-row flex-col ">
        <div className="sm:w-[20%] w-[100%] ">
          <div className="sm:hidden block p-3">
            <div
              className="flex items-center gap-2 mb-3"
              onClick={handleChange}
            >
              <IoFilterOutline />
              <p>filter courses</p>
            </div>
            {isFilterOpen && (
              <LeftPart
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedLanguages={selectedLanguages}
                setSelectedLanguages={setSelectedLanguages}
                selectedLevels={selectedLevels}
                setSelectedLevels={setSelectedLevels}
              />
            )}
          </div>

          <div className="scrollbar sm:block hidden  sm:h-screen overflow-auto">
            <LeftPart
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
              selectedLevels={selectedLevels}
              setSelectedLevels={setSelectedLevels}
            />
          </div>
        </div>

        <div className="courses sm:w-[80%] mb-[60px] w-[100%] sm:mt-[30px] sm:h-screen overflow-auto">
          <RightPart allCourses={filteredCourses} />
        </div>
      </div>
    </>
  );
};

export default SingleCourse;
