const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { errorHandler } = require("../utils/error");
const User = require("../models/userModel");
const Listing = require("../models/ListingModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/users");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(errorHandler(400, "Not an image! , Please upload only images."));
  }
};

const upload = multer({ storage: storage, fileFilter: filter });

exports.uploadImage = upload.single("avatar");

// update img
exports.updateImg = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const { id } = jwt.decode(token);
    if (!id) return next(errorHandler(403, "Invalid ID provided"));

    const pathName = req.file.filename;
    const user = await User.findByIdAndUpdate(
      id,
      { avatar: pathName },
      { new: true }
    );

    res.status(200).json(user.avatar);
  } catch (err) {
    next(err);
  }
};

// exports.deleteImgFile = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;

//     const { id } = jwt.decode(token);
//     const user = await User.findById(id);

//     await fs.unlink(`../public/users/${user.avatar}`, (err) => {
//       if (err) {
//         console.log("error occurred :", err);
//       }
//       console.log("image deleted successfully");
//     });

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// read users
exports.readUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) next(errorHandler(400, "Users not found"));

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// update user
exports.updateUser = async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.user.id !== req.params.id)
      return next(
        errorHandler(404, "You cant update other users information. ")
      );

    if (req.body.password) {
      req.body.password = bcryptjs.hash(req.body.password, 12);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          password: req.body.password,
        },
      },
      { new: true, runValidators: true }
    );

    const { password, ...rest } = user._doc;
    console.log(rest);

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete
exports.deleteUser = async (req, res, next) => {
  console.log(12);
  if (req.params.id !== req.user.id)
    return next(errorHandler(404, "You cant delete other users accounts. "));
  try {
    await User.findByIdAndDelete(req.params.id, { new: true });
    res.clearCookie("jwt");
    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

exports.userListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.user.id });

      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(400, "You do not have permission to access this page."));
  }
};
