const courseModel = require("../models/courseModel");

const filterCoursesController = async (req, res) => {
  try {
    const { categories, levels, languages } = req.body;

    const allCourses = await courseModel.find({
      $or: [
        { $in: { category: categories } },
        { $in: { level: levels } },
        { $in: { language: languages } },
      ],
    });

    return res.status(200).json({ allCourses: allCourses });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { filterCoursesController };
