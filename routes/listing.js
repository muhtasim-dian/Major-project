
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
// file require using multer

const multer = require("multer");
const {storage} = require("../cloudConfig.js");


const upload = multer({ storage });

// require cloud



// router route to compact the same getway

// index route and  create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);


// new and create route
router.get("/new", isLoggedIn, listingController.renderNewForm);


// update show delete route
router.route("/:id")
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.get(wrapAsync(listingController.showListing))
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);


// Edit route  and update route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;

// testing path
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the jungle",
//     price: 1400,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });
