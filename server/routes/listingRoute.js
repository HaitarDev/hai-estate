const express = require("express");
const {
  createListing,
  getListings,
  getListing,
  uploadImages,
  deleteList,
  updateList,
} = require("../controllers/listingController");
const { protect } = require("../utils/protect");

const router = express.Router();

router.route("/").post(protect, uploadImages, createListing).get(getListings);
router.route("/:id").get(getListing);

router.route("/deleteList/:id").delete(protect, deleteList);
router.route("/updateList/:id").post(protect, uploadImages, updateList);

module.exports = router;
