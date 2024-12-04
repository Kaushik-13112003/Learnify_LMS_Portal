const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
      minLength: 4,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    image: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      require: true,
      enum: ["Instructor", "Student"],
    },

    my_courses: {
      type: Array,
      default: [],
    },

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        default: [],
      },
    ],

    likedCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        default: [],
      },
    ],

    passwordResetLinkToken: { type: String },

    passworResetdExpiredAt: Date,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
