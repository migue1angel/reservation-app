import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  code: {
    type: Number,
    required: [true, "Code is required"],
    unique: true,
  },
});

categorySchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
