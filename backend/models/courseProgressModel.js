const mongoose = require("mongoose");

const lectureProgressSchema = new mongoose.Schema({
  lectureId: {
    type: String,
    require: true,
  },

  isViewed: {
    type: Boolean,
    default: false,
    require: true,
  },

  dateViewd: {
    type: Date,
  },
});

const courseProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      require: true,
    },

    completionDate: {
      type: Date,
    },

    lectureProgress: [lectureProgressSchema],

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseProgressModel = mongoose.model(
  "courseProgress",
  courseProgressSchema
);
module.exports = courseProgressModel;
