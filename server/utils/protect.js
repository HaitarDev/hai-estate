const User = require("../models/userModel");
const { errorHandler } = require("./error");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  // get token
  try {
    let token;
    console.log(req.cookies.jwt);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      return next(errorHandler(403, "there is no authorization for this user"));
    }

    // check tokens if correct
    const checkToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!checkToken)
      return next(errorHandler(403, "your token is invalid , try again !"));

    // check if there is user
    const { id } = jwt.decode(token);

    const user = await User.findById(id);

    if (!user) return next(errorHandler(403, "There is no user"));

    req.user = user;

    // then next
    next();
  } catch (err) {
    res.status(400).json({ status: "error", message: err });
  }
};
