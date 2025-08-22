import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  CategoryID: { type: String, required: true, unique: true },
  CategoryName: { type: String, required: true },
  Description: { type: String },
  Image: { type: Buffer },       
  Mime: { type: String } 
});

export default mongoose.model("Category", CategorySchema);