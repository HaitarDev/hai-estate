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

    console.log(listing);
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

exports.getListings = async (req, res, next) => {
  try {
    const listing = await Listing.find();

    if (!listing) next(errorHandler(404, "There is no data"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

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
