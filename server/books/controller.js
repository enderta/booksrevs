const bookService = require('./services.js');


const createBook = async (req, res) => {
    //only admin can create book
    if (req.role !== 'admin') {
        return res.status(403).json({ error: "Access Denied: Admins only" });
    }
    try {
        const { title, author, description, pic_url } = req.body;
        const book = await bookService.createBook(title, author, description, pic_url);
        res.json(book);
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ error: "Error creating book" });
    }

};

const getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks();
        res.json(books);
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ error: "Error fetching books" });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);
        if (book.error) {
            res.status(404).json({ message: book.error });
        } else {
            res.json(book);
        }
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ error: "Error fetching book" });
    }
};

const updateBook = async (req, res) => {
    //only admin can update book
    if (req.role !== 'admin') {
        return res.status(403).json({ error: "Access Denied: Admins only" });
    }
    try {
        const { id } = req.params;
        const { title, author, description, pic_url } = req.body;
        const book = await bookService.updateBook(id, title, author, description, pic_url);
        res.json(book);
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ error: "Error updating book" });
    }
};

const deleteBook = async (req, res) => {
    //only admin can delete book
    if (req.role !== 'admin') {
        return res.status(403).json({ error: "Access Denied: Admins only" });
    }
    try {
        const { id } = req.params;
        const book = await bookService.deleteBook(id);
        res.json(book);
    } catch (error) {
        console.error(error.message || error);
        res.status(500).json({ error: "Error deleting book" });
    }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
