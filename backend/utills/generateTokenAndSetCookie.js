const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.TOKEN, {
      expiresIn: "15d",
    });

    // console.log(token);

    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = generateTokenAndSetCookie;
