import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db_connection.js";
import Book from "./models/books.js";
import Reader from "./models/readers.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running! ");
});

//=======BOOKS=========================================
//C: add books
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      message: "Book added Successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A book with this ID already exists",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
});

//R: Read books
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
    // console.log(req.params.id);
    // console.log(Number(req.params.id));

    const book = await Book.findOne({
      bookId: Number(req.params.id),
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//U: Update book details
app.patch("/books/:id", async (req, res) => {
  try {
    const bookId = Number(req.params.id);

    if (!Number.isInteger(bookId)) {
      return res.status(400).json({
        message: "Invalid Book ID",
      });
    }

    const { bookName, author } = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { bookId: bookId },
      {
        bookName,
        author,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not Found",
      });
    }

    return res.status(200).json({
      message: "Book Updated",
      oldbook: Book,
      updatedbook: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

//D: delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = Number(req.params.id);

    const deletedBook = await Book.findOneAndDelete({ bookId: bookId });

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while deletion",
      err,
    });
  }
});

//=========Reader==================================
app.post("/reader", async (req, res) => {
  try {
    const reader = await Reader.create(req.body);
    res.status(201).json({
      message: "Reader Created",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A Reader with this ID already exists",
      });
    }

    return res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/reader/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    // console.log(Number(req.params.id));

    const reader = await Reader.findOne({
      userId: Number(req.params.id),
    });

    if (!reader) {
      return res.status(404).json({
        message: "Reader not found",
      });
    }
    return res.status(200).json(reader);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//===========================================================
app.patch("/reader/:userId/borrow/:bookId", async (req, res) => {
  try {
    const userID = Number(req.params.userId);
    const bookID = Number(req.params.bookId);

    if(!Number.isInteger(userID) || !Number.isInteger(bookID)){
      return res.status(400).json({
        message: "Invalid useridi or bookid"
      })
    }

    

  } catch (err) {
    return res.status(500).json(err)
  }
});
app.patch("/reader/:userId/return/:bookId", async (req, res) => {});

//=======Serverr===============================================
const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.log("Error starting server!");
  }
};

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

startServer();
