const { v2 } = require("cloudinary");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { forgotPasswordMail } = require("../mailtrap/generateMail");
const purchaseModel = require("../models/purchaseModel");

const updateProfileController = async (req, res) => {
  try {
    const currentUser = req.userId;

    const findUser = await userModel.findById(currentUser);

    if (!findUser) {
      return res.status(404).json({ msg: "user not found" });
    }

    let { name, image } = req.body;

    if (image && findUser.image !== image) {
      if (findUser.image) {
        const publicId = findUser.image.split("/").pop().split(".")[0];

        try {
          await v2.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          if (cloudinaryError.http_code === 404) {
            console.log("Image not found in Cloudinary, skipping deletion.");
          } else {
            console.error("Cloudinary error:", cloudinaryError);
            return res
              .status(500)
              .json({ msg: "Error deleting image from Cloudinary" });
          }
        }
      }

      const imgResponse = await v2.uploader.upload(image);
      image = imgResponse.secure_url;
    }

    //update profile
    await userModel.findByIdAndUpdate(
      currentUser,
      { name, image },
      { new: true }
    );

    return res.status(200).json({ msg: "profile updated" });
  } catch (err) {
    console.log(err);
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const currentUser = req.userId;

    const findUser = await userModel.findById(currentUser);

    if (!findUser) {
      return res.status(404).json({ msg: "user not found" });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ msg: "enter email" });
    }

    const isUserExist = await userModel.findOne({ email: email });

    if (!isUserExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    //generate token
    const passwordResetLinkToken = crypto.randomBytes(20).toString("hex");
    const tokenExpireTime = new Date(Date.now() + 10 * 60 * 1000);

    if (passwordResetLinkToken) {
      //save token to user model
      await userModel.findByIdAndUpdate(
        currentUser,
        {
          passwordResetLinkToken: passwordResetLinkToken,
          passworResetdExpiredAt: tokenExpireTime,
        },
        { new: true }
      );

      //send to reset mail
      await forgotPasswordMail(
        isUserExist?.email,
        `http://localhost:5173/reset-password/${passwordResetLinkToken}`
      );
      return res
        .status(200)
        .json({ msg: "password reset link sent to your email  " });
    } else {
      return res.status(500).json({ msg: "something went wrong" });
    }
  } catch (err) {
    console.log(err);
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;

    const findUser = await userModel.findOne({
      passwordResetLinkToken: token,
      passworResetdExpiredAt: { $gt: Date.now() },
    });

    if (!findUser) {
      return res
        .status(404)
        .json({ msg: "user not found or token expired !! try again" });
    }

    let { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(404).json({ msg: "complete the fields" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: "password must be of length 6 " });
    }

    //update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(
      findUser._id,
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({ msg: "password updated" });
  } catch (err) {
    console.log(err);
  }
};

const getMyCoursesController = async (req, res) => {
  try {
    const { id } = req.params;

    const findUser = await userModel.findById(id);

    if (!findUser) {
      return res.status(404).json({ msg: "user not found" });
    }

    //find current user all courses
    const allCourses = await purchaseModel
      .find({ purchasedBy: id })
      .populate("course")
      .sort({ createdAt: -1 });

    if (allCourses) {
      return res.status(200).json({ allCourses: allCourses });
    } else {
      return res.status(404).json({ msg: "no courses found" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateProfileController,
  forgotPasswordController,
  resetPasswordController,
  getMyCoursesController,
};
