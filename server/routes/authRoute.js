// const mongoose = require('mongoose');
const express = require("express");
const authController = require("../controllers/authController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout/:id", protect, authController.signout);
router.post("/google", authController.google);

module.exports = router;
