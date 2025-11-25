const jwt = require("jsonwebtoken");
const { max } = require("lodash");

module.exports = async (payload, res) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.cookie("jwt", token, {
    maxAge: 2 * 60 * 60 * 1000, //! 2 hours
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};
