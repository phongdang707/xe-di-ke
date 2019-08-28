const { Trip } = require("../../../models/Trip");
const { User } = require("../../../models/User");

// driver
// (POST) /api/trip
module.exports.createTrip = (req, res, next) => {
  const driverId = req.user.id;
  console.log(driverId);
  const {
    locationFrom,
    locationTo,
    startTime,
    availableSeates,
    fee
  } = req.body;
  const newTrip = new Trip({
    driverId,
    locationFrom,
    locationTo,
    startTime,
    availableSeates,
    fee
  });
  newTrip
    .save()
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};
module.exports.getTrip = (req, res, next) => {
  Trip.find()
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};
module.exports.getTripById = (req, res, next) => {
  const { tripId } = req.params;
  Trip.findById(tripId)
    .populate("driverId")
    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};
module.exports.deleteTrip = (req, res, next) => {
  const { tripId } = req.params;
  Trip.deleteOne({ _id: tripId })
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err));
};
module.exports.updateTrip = (req, res, next) => {
  const { tripId } = req.params;
  const {
    locationFrom,
    locationTo,
    startTime,
    availableSeates,
    fee
  } = req.body;
  Trip.findById(tripId)
    .then(trip => {
      trip.locationFrom = locationFrom;
      trip.locationTo = locationTo;
      trip.startTime = startTime;
      trip.availableSeates = availableSeates;
      trip.fee = fee;

      return trip.save();
    })

    .then(trip => {
      res.status(200).json(trip);
    })
    .catch(err => res.json(err));
};
module.exports.bookTrip = (req, res, next) => {
  const passengerId = req.user.id;
  const { numberOfBookingSeats } = req.body;
  const { tripId } = req.params;
  Trip.findById(tripId)
    .then(trip => {
      if (trip.availableSeates < numberOfBookingSeats)
        return Promise.reject({ status: 400, message: "Not enough seats" });
      const passenger = {
        passengerId,
        numberOfBookingSeats
      };
      trip.passengers.push(passenger);
      trip.availableSeates = trip.availableSeates - numberOfBookingSeats;
      return trip.save();
    })
    .then(trip => {
      console.log(trip);
      res.status(200).json(trip);
    })
    .catch(err => {
      console.log(err);

      if (!err.status) return res.json(err);
      res.status(err.status).json({ message: err.message });
    });
};
module.exports.finishTrip = (req, res, next) => {
  const tripId = req.params.id;
  Trip.findById(tripId)
    .then(trip => {
      trip.isFinished = true;
      return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err));
};
