const multer = require("multer");
const Listing = require("../models/ListingModel");
const { errorHandler } = require("../utils/error");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/listing");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `listing-${file.fieldname}-${Date.now()}.${ext}`);
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

exports.uploadImages = upload.array("images", 6);

// create
exports.createListing = async (req, res, next) => {
  if (!req.body) next(errorHandler(404, "There is no data on body"));
  const imagesPath = req.files.map((file) => file.filename);

  try {
    const {
      regularPrice,
      beds,
      baths,
      offer,
      furnished,
      parking,
      name,
      description,
      address,
      type,
    } = req.body;

    let newOffer;
    if (offer === "true") {
      newOffer = true;
    } else if (offer === "false") {
      newOffer = false;
    }
    let newFurnished;
    if (furnished === "true") {
      newFurnished = true;
    } else if (furnished === "false") {
      newFurnished = false;
    }
    let newParking;
    if (parking === "true") {
      newParking = true;
    } else if (parking === "false") {
      newParking = false;
    }

    const listing = await Listing.create({
      name,
      description,
      address,
      offer: newOffer,
      furnished: newFurnished,
      parking: newParking,
      baths: +baths,
      beds: +beds,
      regularPrice: +regularPrice,
      type,
      userRef: req.user.id,
      images: imagesPath,
    });

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// read listings
exports.getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json({ results: listings.length, listings });
  } catch (error) {
    next(error);
  }
};

// delete
exports.deleteList = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    next(errorHandler(400, "You cant delete other user listing"));

  try {
    await Listing.findByIdAndDelete(req.params.id, { new: true });
    res.status.json("This user listing was successfully deleted");
  } catch (error) {
    next(error);
  }
};

// update
exports.updateList = async (req, res, next) => {
  if (!req.body) next(errorHandler(404, "There is no data on body"));
  const imagesPath = req.files.map((file) => file.filename);
  console.log("body:", req.body);
  try {
    const {
      regularPrice,
      beds,
      baths,
      offer,
      furnished,
      parking,
      name,
      description,
      address,
      type,
    } = req.body;

    let newOffer;
    if (offer === "true") {
      newOffer = true;
    } else if (offer === "false") {
      newOffer = false;
    }
    let newFurnished;
    if (furnished === "true") {
      newFurnished = true;
    } else if (furnished === "false") {
      newFurnished = false;
    }
    let newParking;
    if (parking === "true") {
      newParking = true;
    } else if (parking === "false") {
      newParking = false;
    }

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          description,
          address,
          offer: newOffer,
          furnished: newFurnished,
          parking: newParking,
          baths: +baths,
          beds: +beds,
          regularPrice: +regularPrice,
          type,
          userRef: req.user.id,
          images: imagesPath,
        },
      },
      { new: true }
    );

    console.log("listing:", listing);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// get one listing
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      next(errorHandler(400, "Listing Not Found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
