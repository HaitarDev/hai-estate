const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { errorHandler } = require("../utils/error.js");

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcryptjs.hash(password, 12);

    const user = await User.create({ username, email, password: hashPassword });

    if (!user)
      return res.status(403).json({ message: "Invalid username or password" });

    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(errorHandler(403, "There  is no user "));

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword)
      return next(errorHandler(403, "your password is incorrect"));

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });

    return res.cookie("jwt", token).status(200).json(user);
  } catch (err) {
    next(err);
  }
};
