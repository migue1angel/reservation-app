import mongoose, { Schema } from "mongoose";

export const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
    // match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, // Validación formato 24h HH:mm
  },
  endTime: {
    type: String,
    required: true,
    // match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 240, // máximo 4 horas
  },
  pricePerPerson: {
    type: Number,
    required: true,
    min: 1,
  },
  maxCapacity: {
    type: Number,
    default: 1,
    min: 1,
  },
  minCapacity: {
    type: Number,
    default: 1,
    min: 1,
  },
  images: [
    {
      url: String,
      alt: String,
    },
  ],
  availability: {
    type: [
      {
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
    ],
    required: true,
  },
  requirements: [String],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  cancellationPolicy: {
    timeLimit: {
      type: Number,
      default: 24,
    },
    refundPercentage: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  unavailableDates: {
    type: [Date],
  },
  remainingReservations: {
    type: Number,
    required: true,
  },
});

serviceSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

serviceSchema.index({ category: 1 });
serviceSchema.index({ status: 1 });

export const ServiceModel = mongoose.model("Service", serviceSchema);
