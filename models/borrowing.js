import mongoose, { Mongoose } from "mongoose";

const borrowingSchema = new mongoose.Schema({
    reader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reader",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    borrowedAt:{
        type: Date,
        default: Date.now,
    }

})

const Borrowing = new mongoose.Schema('Borrow', borrowingSchema);

export default Borrowing;
