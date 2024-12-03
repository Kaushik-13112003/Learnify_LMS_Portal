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

    payment_status: {
      type: String,
      require: true,
    },

    purchaseId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const purchaseModel = mongoose.model("purchase", purchaseSchema);
module.exports = purchaseModel;
