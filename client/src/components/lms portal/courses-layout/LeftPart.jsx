import React, { useEffect } from "react";
import { categories, languages, levels } from "@/assets/data";
import { useParams } from "react-router-dom";
import { FcClearFilters } from "react-icons/fc";

const LeftPart = ({
  selectedCategories,
  setSelectedCategories,
  selectedLanguages,
  setSelectedLanguages,
  selectedLevels,
  setSelectedLevels,
}) => {
  const { category } = useParams();

  //category selection
  const handleCategoryCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  //languages selection
  const handleLanguageCheckboxChange = (language) => {
    setSelectedLanguages((prevLanguage) =>
      prevLanguage?.includes(language)
        ? prevLanguage.filter((lang) => lang !== language)
        : [...prevLanguage, language]
    );
  };

  //level selection
  const handleLevelCheckboxChange = (level) => {
    setSelectedLevels((prevSelected) =>
      prevSelected.includes(level)
        ? prevSelected.filter((item) => item !== level)
        : [...prevSelected, level]
    );
  };

  const handleFilter = async () => {
    try {
      const res = await fetch(`/api/student/filter-courses`, {
        method: "GET",

        body: JSON.stringify({
          categories: selectedCategories,
          levels: selectedLevels,
          languages: selectedLanguages,
        }),
      });

      const dataFromResponse = await res.json();

      if (res.ok) {
        console.log(dataFromResponse?.allCourses);
      } else {
        console.log("Something went Wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      category &&
      category !== "all" &&
      !selectedCategories.includes(category)
    ) {
      setSelectedCategories((prevSelected) => [category]);
    }
  }, [category]);

  return (
    <div className="p-4 bg-gray-50">
      <div
        className="flex items-center hover:text-gray-500 duration-500 p-2 gap-2 mb-3 -ml-3 w-[100%] cursor-pointer"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedLanguages([]);
          setSelectedLevels([]);
        }}
      >
        <p>
          {" "}
          <FcClearFilters />
        </p>
        <p>clear filter</p>
      </div>

      <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
      <div className="flex flex-col gap-2">
        {categories?.map((category) => (
          <label key={category.slug} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={category.name}
              checked={selectedCategories?.includes(category.slug)}
              onChange={() => {
                handleCategoryCheckboxChange(category.slug), handleFilter;
              }}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-800">{category.name}</span>
          </label>
        ))}
      </div>

      {/* language */}
      <h3 className="text-lg font-semibold mb-4 mt-7">Filter by Language</h3>
      <div className="flex flex-col gap-2">
        {languages?.map((language) => (
          <label key={language} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={language}
              checked={selectedLanguages?.includes(language)}
              onChange={() => handleLanguageCheckboxChange(language)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-800">{language}</span>
          </label>
        ))}
      </div>

      {/* level */}
      <h3 className="text-lg font-semibold mb-4 mt-7">Filter by Levels</h3>
      <div className="flex flex-col gap-2">
        {levels?.map((level) => (
          <label key={level} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={level}
              checked={selectedLevels?.includes(level)}
              onChange={() => handleLevelCheckboxChange(level)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-800">{level}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LeftPart;
