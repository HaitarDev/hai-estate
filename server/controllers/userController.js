const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const { errorHandler } = require("../utils/error");
const User = require("../models/userModel");

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
