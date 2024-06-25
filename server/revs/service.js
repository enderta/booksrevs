/*CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    review_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
require("bcrypt");
const pool = require("../db.config");
require("jsonwebtoken");
const createReview = async (book_id, user_id, review_text, rating) => {
    try {
        const response = await pool.query(
            "insert into reviews (book_id, user_id, review_text, rating) values ($1, $2, $3, $4) returning *;",
            [book_id, user_id, review_text, rating]
        );
        return response
    } catch (error) {
        console.log(error);
    }
}

const getReviews = async () => {
   //get reviews as an array
    try {
        const response = await pool.query(
            "select * from reviews;"
        );
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}

const getReviewById = async (req) => {
    //get review by book id as an array
    try {
        const id = req.params.id;
        const response = await pool.query(
            "select * from reviews where book_id = $1;",
            [id]
        );
        return response.rows;
    } catch (error) {
        console.log(error);
    }

}

const updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        const {book_id, user_id, review_text, rating} = req.body;
        const response = await pool.query(
            "update reviews set book_id = $1, user_id = $2, review_text = $3, rating = $4 where id = $5 returning *;",
            [book_id, user_id, review_text, rating, id]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

const deleteReview = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query(
            "delete from reviews where id = $1 returning *;",
            [id]
        );
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
};

