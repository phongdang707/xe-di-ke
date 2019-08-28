const express = require("express");
const router = express.Router();
const tripController = require("./tripController");
const { authenticate, authorize } = require("../../../middlewares/auth");
const { uploadImage } = require("../../../middlewares/uploadimage");

// POST     {host}/api/user (PRIVATE - DRIVER)

// GET      {host}/api/trips
// POST     {host}/api/trips
router.post(
  "/",
  authenticate,
  authorize(["driver"]),
  tripController.createTrip
);
// GET      {host}/api/trips
router.get("/", tripController.getTrip);
router.get("/:tripId", tripController.getTripById);
// DELETE   {host}/api/trips
router.delete("/:tripId", tripController.deleteTrip);
// PUT      {host}/api/trips
router.put(
  "/:tripId",
  authenticate,
  authorize(["driver"]),
  tripController.updateTrip
);
router.put(
  "/booking-trip/:tripId",
  authenticate,
  // authorize(["passenger"]),
  tripController.bookTrip
);
router.put("/:tripId", tripController.finishTrip);
module.exports = router;
