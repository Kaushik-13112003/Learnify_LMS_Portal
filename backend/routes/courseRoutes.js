const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaToCloudinary,
  createCourseController,
  getAllCourseController,
  getSpecificInstructorAllCourseController,
  updateCourseController,
  getSingleCourseController,
  addLecturesToCourseController,
  cancelCourseController,
  unpublishCourseController,
  bulkUploadController,
  commentOnCourseController,
  getAllCourseCommentController,
  likeCourseController,
} = require("../controllers/courseControllers");
const router = express.Router();
const protectedRoute = require("../middleware/protectedRoute");

const upload = multer({ dest: "uploads/" });

//upload media
router.post("/upload", upload.single("file"), uploadMediaToCloudinary);

//upload media
router.delete("/delete-media/:id", deleteMediaToCloudinary);

//create-course
router.post("/create-course", protectedRoute, createCourseController);

//add curriculum
router.put("/add-curriculum", protectedRoute, addLecturesToCourseController);

//get all course
router.get("/all-courses", protectedRoute, getAllCourseController);

//instructor-all-courses
router.get(
  "/instructor-all-courses",
  protectedRoute,
  getSpecificInstructorAllCourseController
);

//update course
router.put("/update-course/:id", protectedRoute, updateCourseController);

//get single course
router.get("/single-course/:id", protectedRoute, getSingleCourseController);

//delete-course
router.delete(
  "/delete-course/:courseID",
  protectedRoute,
  cancelCourseController
);

//unpublish-course
router.post("/unpublish-course/:id", protectedRoute, unpublishCourseController);

//bulk-upload
router.post("/bulk-upload", upload.array("files", 5), bulkUploadController);

//add-comment
router.post("/add-comment/:id", protectedRoute, commentOnCourseController);

//like-course
router.post("/like/:id", protectedRoute, likeCourseController);

module.exports = router;
