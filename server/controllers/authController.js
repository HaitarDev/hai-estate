const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { errorHandler } = require("../utils/error.js");

const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
  return token;
};

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

    const token = signToken(user._id);

    const { password: newPassword, ...rest } = user._doc;

    // console.log(rest);

    return res.cookie("jwt", token, { httpOnly: true }).status(200).json(rest);
  } catch (err) {
    next(err);
  }
};

// google
exports.google = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  try {
    // if there is already a user ---------
    const user = await User.findOne({ email });
    if (user) {
      const token = signToken(user._id);

      const { password, ...rest } = user;

      res.cookie("jwt", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const password =
        Math.random().toString(32).slice(-8) +
        Math.random().toString(32).slice(-8);

      const hashPassword = await bcryptjs.hash(password, 12);
      const newUser = await User.create({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(32).slice(-4),
        password: hashPassword,
        email,
        avatar,
      });
      const newToken = signToken(newUser._id);

      const { password: newPassword, ...rest } = user._doc;

      res.cookie("jwt", newToken, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// exports.protect = async (req, res, next) => {
//   // get token
//   try {
//     let token;

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     } else if (req.cookies.jwt) {
//       token = req.cookies.jwt;
//     } else {
//       return next(errorHandler(403, "there is no authorization for this user"));
//     }

//     // check tokens if correct
//     const checkToken = jwt.verify(token, process.env.SECRET_KEY);

//     if (!checkToken)
//       return next(errorHandler(403, "your token is invalid , try again !"));

//     // check if there is user
//     const { id } = jwt.decode(token);

//     const user = await User.findById(id);

//     if (!user) return next(errorHandler(403, "There is no user"));

//     req.user = user;
//     // then next
//     next();
//   } catch (err) {
//     res.status(400).json({ status: "error", message: err });
//   }
// };
