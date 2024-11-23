const { v2 } = require("cloudinary");
const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");

const uploadMediaToCloudinary = async (req, res) => {
  try {
    const result = await v2.uploader.upload(req.file.path, {
      resource_type: "auto",
    });

    return res
      .status(200)
      .json({ msg: "uploaded successfully", result: result });
  } catch (err) {
    console.log(err);
  }
};

const deleteMediaToCloudinary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ msg: "Assest ID not found" });
    }

    await v2.uploader.destroy(id);
    return res.status(200).json({ msg: "Video Deleted" });
  } catch (err) {
    console.log(err);
  }
};

const bulkUploadController = async (req, res) => {
  try {
    const uploadPromises = req.files.map((fileItem) =>
      v2.uploader.upload(fileItem.path, { resource_type: "auto" })
    );

    const results = await Promise.all(uploadPromises);

    return res.status(200).json({ msg: "Videos Uploaded", results: results });
  } catch (err) {
    console.log(err);
  }
};

const createCourseController = async (req, res) => {
  try {
    const { title, category, level, language, subtitle, description, pricing } =
      req.body;

    if (
      !title ||
      !category ||
      !subtitle ||
      !description ||
      !pricing ||
      !language ||
      !level
    ) {
      return res.status(404).json({ msg: "complete the fields" });
    }

    //creating new course
    const newCourse = await courseModel.create({
      ...req.body,
      isPublished: false,
      courseCreater: req.userId,
    });

    if (newCourse) {
      return res
        .status(200)
        .json({ msg: "Course Created", courseId: newCourse._id });
    } else {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } catch (err) {
    console.log(err);
  }
};

const addLecturesToCourseController = async (req, res) => {
  try {
    const { id, curriculum } = req.body;

    if (!id) {
      return res.status(404).json({ msg: "Invalid course ID" });
    }

    //find course
    const findCourse = await courseModel.findById(id);
    if (!findCourse) {
      return res.status(404).json({ msg: "course not found" });
    }

    //add lecture or curriculum
    const isCurriculumAdded = await courseModel.findByIdAndUpdate(
      id,
      {
        curriculum: curriculum,
        isPublished: true,
      },
      { new: true }
    );

    if (isCurriculumAdded) {
      return res.status(200).json({ msg: "Lecutres added to Course" });
    } else {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateCourseController = async (req, res) => {
  try {
    //find current instructor
    const findInstructor = await userModel.findById(req.userId);

    if (!findInstructor) {
      return res.status(404).json({ msg: "instructor not found" });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ msg: "Invalid course ID" });
    }

    //find course
    const findCourse = await courseModel.findById(id);
    if (!findCourse) {
      return res.status(404).json({ msg: "course not found" });
    }

    //update course
    await courseModel.findByIdAndUpdate(id, { ...req.body }, { new: true });

    return res.status(200).json({ msg: "Course Updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getAllCourseController = async (req, res) => {
  try {
    const allCourses = await courseModel.find();

    if (allCourses) {
      return res.status(200).json({ allCourses: allCourses });
    } else {
      return res.status(404).json({ msg: "no courses found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getSpecificInstructorAllCourseController = async (req, res) => {
  try {
    //find current instructor
    const findInstructor = await userModel.findById(req.userId);

    if (!findInstructor) {
      return res.status(404).json({ msg: "instructor not found" });
    }

    //get instructor all course
    const allCourses = await courseModel.find({ courseCreater: req.userId });

    if (allCourses) {
      return res.status(200).json({ allCourses: allCourses });
    } else {
      return res.status(404).json({ msg: "no courses found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const getSingleCourseController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ msg: "Invalid course ID" });
    }

    //find course
    const findCourse = await courseModel.findById(id);
    if (!findCourse) {
      return res.status(404).json({ msg: "course not found" });
    }

    return res.status(200).json({ singleCourse: findCourse });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const cancelCourseController = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { curriculum } = req.body;

    if (!courseID) {
      return res.status(404).json({ msg: "Invalid course ID" });
    }

    //find course
    const findCourse = await courseModel.findById(courseID);
    if (!findCourse) {
      return res.status(404).json({ msg: "course not found" });
    }

    if (findCourse.public_id) {
      await v2.uploader.destroy(findCourse.public_id);
    }

    console.log(curriculum);

    if (curriculum) {
      for (const key in curriculum) {
        console.log(curriculum[key]);
        if (curriculum[key].publicId) {
          await v2.uploader.destroy(curriculum[key].publicId);
        }
      }
    }

    await courseModel.findByIdAndDelete(courseID);

    return res.status(200).json({ msg: "Course Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const unpublishCourseController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ msg: "Invalid course ID" });
    }

    //find course
    const findCourse = await courseModel.findById(id);
    if (!findCourse) {
      return res.status(404).json({ msg: "course not found" });
    }

    //update public status
    if (findCourse.courseCreater.toString() === req.userId.toString()) {
      await courseModel.findByIdAndUpdate(
        id,
        { isPublished: !findCourse.isPublished },
        { new: true }
      );

      if (!findCourse.isPublished) {
        return res.status(200).json({ msg: "Course Published" });
      } else {
        return res.status(200).json({ msg: "Course Unpublished" });
      }
    } else {
    }
    return res.status(401).json({ msg: "Unauthorized Access" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  uploadMediaToCloudinary,
  deleteMediaToCloudinary,
  createCourseController,
  updateCourseController,
  getAllCourseController,
  getSingleCourseController,
  getSpecificInstructorAllCourseController,
  addLecturesToCourseController,
  cancelCourseController,
  unpublishCourseController,
  bulkUploadController,
};
