import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  booksTaken: [
    {
      bookId: {
        type: Number,
        ref: "Book",
        required: true
      },

      takenAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

const Reader = new mongoose.Schema('Reader', readerSchema);
export default Reader;
