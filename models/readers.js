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
        required: true
      },

      takenAt: {
        type: Date,
        default: Date.now,
      }
    },
    
  ],
});

const Reader = mongoose.model('Reader', readerSchema);
export default Reader;
