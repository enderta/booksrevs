const pool = require("../db.config");

const createBook = async (title, author, description, pic_url) => {
  //only admin can create book
    try {
        const response = await pool.query(
        "INSERT INTO books (title, author, description, pic_url) VALUES ($1, $2, $3, $4) RETURNING *;",
        [title, author, description, pic_url]
        );
        return response.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Error creating book");
    }
};

const getBooks = async () => {
    try {
        const response = await pool.query("SELECT * FROM books");
        return response.rows;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching books");
    }
};

const getBookById = async (id) => {
    try {
        const response = await pool.query("SELECT * FROM books WHERE id = $1;", [id]);
        if (response.rows.length === 0) {
            return { error: "Book not found" };
        } else {
            return response.rows[0];
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching book");
    }
};

const updateBook = async (id, title, author, description, pic_url) => {
    try {
        const response = await pool.query(
            "UPDATE books SET title = $1, author = $2, description = $3, pic_url = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *;",
            [title, author, description, pic_url, id]
        );
        return response.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Error updating book");
    }
};

const deleteBook = async (id) => {
    try {
        const response = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *;", [id]);
        return response.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting book");
    }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };
