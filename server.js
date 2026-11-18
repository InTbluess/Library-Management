import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db_connection.js";
import Book from "./models/books.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running! ");
});

//add books
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      message: "Book added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//Read books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(200).json({
        message: "No books in library",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findOne({
        bookId: Number(req.params.bookId)
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
