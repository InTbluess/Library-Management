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
  booksTaken: {
    type: [Number],
    default: []
  }
});

const Reader = new mongoose.Schema('Reader', readerSchema);
export default Reader;
