const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.get("/", userController.readUsers);
router.patch(
  "/updateImg",
  // userController.deleteImgFile,
  userController.uploadImage,
  userController.updateImg
);
router.patch("/updateUser/:id", protect, userController.updateUser);
router.delete("/deleteUser/:id", protect, userController.deleteUser);
router.get("/myListing/:id", protect, userController.userListing);

module.exports = router;
