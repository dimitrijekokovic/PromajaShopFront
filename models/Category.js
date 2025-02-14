import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
});

export const Category = models?.Category || model("Category", CategorySchema);

