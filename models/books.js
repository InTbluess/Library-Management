import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Integer,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});
