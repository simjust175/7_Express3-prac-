const statusCheck = (res, value) => {
    if (value.length < 1) {
        res.status(404);
        fs.createReadStream(path.join("./public/Error/error.html")).pipe(res);
    } else {
        res.status(200);
    }
}

class BookSystem {
    BOOKS = [];
    constructor(){
        this.BOOKS = [
            { "id": 1, "author": "Walt Disney", "title": "Mickie mouse" },
            { "id": 2, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 3, "author": "H.A. Ray", "title": "curious george" },
            { "id": 4, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 5, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 6, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 7, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 8, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 9, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 10, "author": "Mr. Someone", "title": "minnie the pooh" },
            { "id": 11, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 12, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 13, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 14, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 15, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 16, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 17, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 18, "author": "Mr. Someone", "title": "Winnie the pooh" },
            { "id": 19, "author": "Mr. Someone", "title": "Winnie the pooh" },
        ];
    }
    
    // static postBook(req, res){
    //     let book = req.body;
    //     this.BOOKS.push(book);
    //     let msg = { "msg": "Book successfully added", book }
    //     console.log(msg);
    //     res.send(msg)
    // }
    static putBook(req, res) {
        let book = req.body;
        let id = req.params.id;
        let currentBook = this.BOOKS[id - 1];
        this.BOOKS.splice(currentBook, 1, book)
        res.json({ msg: "Book successfully updated", book })
    }
    static getBooks(req, res) {
        statusCheck(res, this.BOOKS);
        res.send(this.BOOKS);
    }
    static getLimit(req, res) {
        statusCheck(res, BOOKS);
        let limit = parseInt(req.query.limit, 10) || 10;
        let offset = parseInt(req.query.offset, 10) || 0;
        let limitedBooks = BOOKS.slice(offset, offset + limit);
        res.send(limitedBooks)

    }
    static getById(req, res) {
        let id = req.params.id;
        statusCheck(res, id);
        let currentBook = BOOKS[id - 1];
        console.log(`CurrentBook: ${currentBook}`);
        res.status(200);
        res.send(currentBook);
    }
    static searchBooks(req, res) {
        statusCheck(res, BOOKS);
        let q = req.query.q.toLowerCase();
        let by = req.query.by || "title";
        let searchedBooks = BOOKS.filter(book => book[by].toLowerCase().includes(q)) || BOOKS;
        res.send(searchedBooks)

    }
    static patchBooks(req, res) {
        let id = req.params.id;
        let patch = req.body;
        let keys = Object.keys(patch);
        keys.forEach(key => BOOKS[id - 1][key] = patch[key])
        res.send({ "msg": "Item successfully patched.", patch })
    }
    static deleteBook(req, res) {
        let id = req.params.id;
        BOOKS.splice(id - 1, 1);
        res.send({ "msg": "Book successfully deleted" })
    }
}

module.exports = BookSystem;