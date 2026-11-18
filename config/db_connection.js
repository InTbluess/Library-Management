import mongoose from "mongoose";
import Book from "../models/books.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // console.log("AutoIndex:", mongoose.get("autoIndex"));

    // await Book.createIndexes();
    // console.log("Book indexes:", await Book.collection.indexes());

  } catch (error) {
    console.log("MongoDB Connection Failed!", error);
  }
};

export default connectDB;
