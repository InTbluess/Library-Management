import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
    unnique: true,
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

const Book = mongoose.model("Message", bookSchema);
export default Book;