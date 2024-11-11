import React, { useState } from "react";
import LeftPart from "./courses-layout/LeftPart";
import RightPart from "./courses-layout/RightPart";
import { IoFilterOutline } from "react-icons/io5";

const SingleCourse = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleChange = () => {
    setIsFilterOpen((val) => !val);
  };

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
            {isFilterOpen && <LeftPart />}
          </div>

          <div className="scrollbar sm:block hidden  sm:h-screen overflow-auto">
            <LeftPart />
          </div>
        </div>

        <div className="courses sm:w-[80%] mb-[60px] w-[100%] sm:mt-[30px] sm:h-screen overflow-auto">
          <RightPart />
        </div>
      </div>
    </>
  );
};

export default SingleCourse;
