const courseModel = require("../models/courseModel");
const courseProgressModel = require("../models/courseProgressModel");
const userModel = require("../models/userModel");

//mark current lecture as viewed
const markCurrentLectureViewdController = async (req, res) => {
  try {
    const { studentId, courseId, lectureId } = req.body;

    let currentLectureProgress = await courseProgressModel.findOne({
      studentId,
      courseId,
    });

    if (!currentLectureProgress) {
      currentLectureProgress = new courseProgressModel({
        studentId,
        courseId,
        lectureProgress: [
          {
            lectureId,
            isViewed: true,
            dateViewd: new Date(),
          },
        ],
      });
      await currentLectureProgress.save();
    } else {
      const lectureProgress = currentLectureProgress.lectureProgress.find(
        (lec) => lec.lectureId === lectureId
      );

      if (lectureProgress) {
        lectureProgress.isViewed = true;
        lectureProgress.dateViewd = new Date();
      } else {
        currentLectureProgress.lectureProgress.push({
          lectureId,
          isViewed: true,
          dateViewd: new Date(),
        });
      }

      await currentLectureProgress.save();
    }

    //find course & set complete state for course
    const course = await courseModel.findById(courseId);

    if (!course || !courseId) {
      return res.status(404).json({ msg: "course not found" });
    }

    //when all lecture watched
    const isAllLecturesViewd =
      currentLectureProgress.lectureProgress.length ===
      course.curriculum.length;

    if (isAllLecturesViewd) {
      currentLectureProgress.isCompleted = true;
      currentLectureProgress.completionDate = new Date();

      await currentLectureProgress.save();
    }

    return res.status(200).json({
      msg: "Lecture marked as viewd",
      progress: currentLectureProgress,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "user not created " });
  }
};

//get current progress of course
const getCurrentCourseProgressController = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    if (!courseId) {
      return res.status(404).json({ msg: "course not found" });
    }

    if (!studentId) {
      return res.status(404).json({ msg: "user not found" });
    }

    //find current student
    const findCurrentStudent = await userModel.findById(studentId);

    if (!findCurrentStudent) {
      return res.status(404).json({ msg: "user not found" });
    }

    if (!findCurrentStudent.my_courses.includes(courseId)) {
      return res.status(201).json({
        msg: "you need to purchase this course first",
        isPurchased: false,
      });
    }

    //when first time student come on course progrss page after baught
    const currentStudentCourseProgress = await courseProgressModel.findOne({
      studentId,
      courseId,
    });

    if (
      !currentStudentCourseProgress ||
      currentStudentCourseProgress.lectureProgress.length === 0
    ) {
      const course = await courseModel
        .findById(courseId)
        .populate("courseCreater");
      if (!course) {
        return res.status(201).json({ msg: "course not found" });
      }

      return res.status(200).json({
        msg: "No progress found, Start Watching Now",
        course: course,
        progress: [],
        isPurchased: true,
      });
    }

    const course = await courseModel
      .findById(courseId)
      .populate("courseCreater");

    //if lectureProgress not 0
    return res.status(200).json({
      course: course,
      progress: currentStudentCourseProgress.lectureProgress,
      isCompleted: currentStudentCourseProgress.isCompleted,
      isPurchased: true,
      completionDate: currentStudentCourseProgress.completionDate,
      courseDetails: currentStudentCourseProgress.courseId,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "user not created " });
  }
};

//reset course progress
const resetCurrentCourseProgressController = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    let currentLectureProgress = await courseProgressModel.findOne({
      studentId,
      courseId,
    });

    if (!currentLectureProgress) {
      return res.status(404).json({ msg: "progress not found" });
    }

    currentLectureProgress.lectureProgress = [];
    currentLectureProgress.isCompleted = false;
    currentLectureProgress.completionDate = null;

    await currentLectureProgress.save();

    return res.status(200).json({
      msg: "Course progres has been reseted ",
      progress: currentLectureProgress,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "user not created " });
  }
};

module.exports = {
  getCurrentCourseProgressController,
  markCurrentLectureViewdController,
  resetCurrentCourseProgressController,
};
