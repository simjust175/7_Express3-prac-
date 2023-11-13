const express =require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3333;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const statusCheck = (res, value) => {
    if (value.length < 1) {
        res.status(404);
        fs.createReadStream(path.join("./Error/error.html")).pipe(res);
    } else {
        res.status(200);
    }
}

const BOOKS = [
    { "id": 1, "author": "Walt Disney", "title": "Mickie mouse"},
    { "id": 2, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 3, "author": "H.A. Ray", "title": "curious george"},
    { "id": 4, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 5, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 6, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 7, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 8, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 9, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 10, "author": "Mr. Someone", "title": "minnie the pooh"},
    { "id": 11, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 12, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 13, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 14, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 15, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 16, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 17, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 18, "author": "Mr. Someone", "title": "Winnie the pooh"},
    { "id": 19, "author": "Mr. Someone", "title": "Winnie the pooh"},
];

//Post
app.post("/book", (req, res)=>{
    let book = req.body;
    BOOKS.push(book);
    let msg = {"msg": "Book successfully added", book}
    console.log(msg);
    res.send(msg)
});


//Get all
app.get("/", (req, res)=>{
    statusCheck(res, BOOKS);
    res.send(BOOKS);
});

//Get with queries
app.get("/books", (req, res)=>{
    statusCheck(res, BOOKS);
    let limit = parseInt(req.query.limit, 10) || 10;
    let offset = parseInt(req.query.offset, 10) || 0;
    let limitedBooks = BOOKS.slice(offset, offset + limit);
    res.send(limitedBooks)

})

//GET with Search
app.get("/books/search", (req, res)=>{
    statusCheck(res, BOOKS);
    let q = req.query.q.toLowerCase();
    let by = req.query.by || "title";
    let searchedBooks = BOOKS.filter(book => book[by].toLowerCase().includes(q)) || BOOKS;
    res.send(searchedBooks)

})

//Get (by id)
app.get("/books/:id", (req, res)=>{
    let id = req.params.id;
    statusCheck(res, id); 
    let currentBook = BOOKS[id -1];
    console.log(`CurrentBook: ${currentBook}`);
    res.status(200);
    res.send(currentBook);
})

//Put (update)
app.put("/books/:id", (req, res)=>{
    let book = req.body;
    let id = req.params.id;
    let currentBook = BOOKS[id -1];
    BOOKS.splice(currentBook, 1, book)
    res.send({"msg": "Book successfully updated" , book})
})

//Delete
app.delete("/books/:id", (req, res)=>{
    let id = req.params.id;
    BOOKS.splice(id -1, 1);
    res.send({"msg": "Book successfully deleted"})
});


//Patch
app.patch("/books/:id", (req, res)=>{
    let id = req.params.id;
    let patch = req.body;
    let keys = Object.keys(patch);
    keys.forEach(key => BOOKS[id -1][key] = patch[key])
    res.send({"msg": "Item successfully patched.", patch})
});

app.listen(port, ()=>{
    console.log(`Practice server running on port: ${port}`);
});