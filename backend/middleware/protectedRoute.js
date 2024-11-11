const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ msg: "unauthorized access with no token " });
    }

    //verifyToken
    const verifyToken = await jwt.verify(token, process.env.TOKEN);

    let findUser = await userModel
      .findById({ _id: verifyToken?.userId })
      .select("-password");

    if (!findUser) {
      return res.status(400).json({ msg: "user not found " });
    }

    req.userId = findUser?._id;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = protectedRoute;
