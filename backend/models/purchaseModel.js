const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      require: true,
    },

    paymentId: {
      type: String,
      require: true,
    },

    // studentId: {
    //   type: String,
    //   require: true,
    // },

    // studentName: {
    //   type: String,
    //   require: true,
    // },

    // studentEmail: {
    //   type: String,
    //   require: true,
    // },

    // studentImage: {
    //   type: String,
    //   require: true,
    // },

    // instructorId: {
    //   type: String,
    //   require: true,
    // },

    // instructorName: {
    //   type: String,
    //   require: true,
    // },

    // instructorImage: {
    //   type: String,
    //   require: true,
    // },

    // courseId: {
    //   type: String,
    //   require: true,
    // },

    // purchase_status: {
    //   type: String,
    //   require: true,
    // },

    // payment_method: {
    //   type: String,
    //   require: true,
    // },

    // payment_status: {
    //   type: String,
    //   require: true,
    // },

    // purchase_date: {
    //   type: Date,
    //   require: true,
    // },

    // paymentId: {
    //   type: String,
    //   require: true,
    // },

    // payerId: {
    //   type: String,
    //   require: true,
    // },

    // courseTitle: {
    //   type: String,
    //   require: true,
    // },

    // coursePrice: {
    //   type: String,
    //   require: true,
    // },

    // courseImage: {
    //   type: String,
    //   require: true,
    // },
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model("purchase", purchaseSchema);
module.exports = purchaseModel;
