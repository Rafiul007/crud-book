const express = require("express");
// import { Book } from "../Models/book.model.js";
const Book = require("../Models/book.model") 
const router = express.Router();

// route to save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || req.body.publishYear) {
      return res.status(400).json({ message: "Missing fields" });
    }
    // new book object
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: parseInt(req.body.publishYear),
    };
    // create the new book and add it to our database
    const book = await Book.create(newbook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "error creating new book" });
  }
});

// route to get all books in the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Error getting books." });
  }
});

// route to find a specific book by its id
router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .send({ message: "Could not find book with that ID." });
    }
    res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Error finding book." });
  }
});
// router to update an existing book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || req.body.publishYear) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const { id } = req.params.id;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "No book found for this id" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});
// delete a book from the database using its id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(400).json({ message: "No such book exists!" });
    }
    res.status(200).json(book);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
module.exports = router;
