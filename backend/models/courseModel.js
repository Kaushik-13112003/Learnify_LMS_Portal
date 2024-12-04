const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  videoUrl: {
    type: String,
    require: true,
  },

  publicId: {
    type: String,
    require: true,
  },

  freePreview: {
    type: Boolean,
    require: true,
  },
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    category: {
      type: String,
      require: true,
    },

    level: {
      type: String,
      require: true,
    },

    banner: {
      type: String,
      require: true,
    },

    language: {
      type: String,
      require: true,
    },

    subtitle: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    pricing: {
      type: String,
      require: true,
    },

    courseCreater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    students: [
      {
        studentId: String,
        studentName: String,
        studentEmail: String,
        paidAmount: Number,
      },
    ],

    curriculum: [lectureSchema],

    isPublished: {
      type: Boolean,
    },

    comments: [
      {
        text: {
          type: String,
          require: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          require: true,
        },
        commentTime: {
          type: Date,
          default: Date.now(),
        },
      },
    ],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },

  { timestamps: true }
);

const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;
