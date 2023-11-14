const express = require("express");
let BookSystem = require("../controllers/BookControllers.js");

const route = express.Router();

// const BookSystem = new BookSystem();

//Post
route.post("/book", BookSystem.postBook);

//Get all
route.get("/", BookSystem.getBooks);

//Get with queries
route.get("/books", BookSystem.getLimit)

//GET with Search
route.get("/books/search", BookSystem.searchBooks)

//Get (by id)
route.get("/books/:id", BookSystem.getById)

//Put (update)
route.put("/books/:id", BookSystem.putBook)

//Delete
route.delete("/books/:id", BookSystem.deleteBook);

//Patch
route.patch("/books/:id", BookSystem.patchBooks);

module.exports = route;