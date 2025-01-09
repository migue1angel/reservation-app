import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: {
      _id: false,
      day: String,
      startTime: {
        type: String,
        required: true,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      },
      endTime: {
        type: String,
        required: true,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      },
    },
  },
  numberParticipants: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled", "no-show"],
    default: "pending",
  },
});

reservationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const ReservationModel = mongoose.model(
  "Reservation",
  reservationSchema
);
