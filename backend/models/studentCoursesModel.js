const mongoose = require("mongoose");

const studentCoursesSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },

    courses: [
      {
        purchaseId: String,
        courseId: String,
        title: String,
        instructorId: String,
        instructorName: String,
        dateOfPurchase: Date,
       
      },
    ],
  },
  { timestamps: true }
);

const studentCoursesModel = mongoose.model(
  "student-course",
  studentCoursesSchema
);
module.exports = studentCoursesModel;
