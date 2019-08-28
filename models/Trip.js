const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  locationFrom: String,
  locationTo: String,
  startTime: Date,
  availableSeates: Number,
  fee: Number,
  passengers: [
    {
      userId: { type: mongoose.Schema.ObjectId, ref: "User" },
      numberOfBookingSeats: Number
    }
  ],
  isFinished: { type: Boolean, default: false }
});

const Trip = mongoose.model("Trip", TripSchema, "Trip");
module.exports = {
  TripSchema,
  Trip
};
