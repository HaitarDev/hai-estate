const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");

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
