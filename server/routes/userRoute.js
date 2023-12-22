const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", userController.readUsers);
router.patch(
  "/updateImg",
  // authController.protect,
  userController.uploadImage,
  userController.updateImg
);

module.exports = router;
