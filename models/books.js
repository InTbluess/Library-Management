import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
    unique: true,
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

const Book = mongoose.model("Book", bookSchema);
export default Book;