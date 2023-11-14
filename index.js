const express =require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const books = require("./routes/book.js");

const app = express();
const port = 4444;

app.use(express.static(path.join(__dirname, "public")));
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/books", books)

app.listen(port, ()=>{
    console.log(`Practice server running on port: ${port}`);
});