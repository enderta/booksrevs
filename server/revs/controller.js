const reviewService = require('./service');

const createReview = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ error: "Access Denied: Admins only" });
    }
    try {
        const { book_id, user_id, review_text, rating } = req.body;
        const response = await reviewService.createReview(book_id, user_id, review_text, rating);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const getReviews = async (req, res) => {
    try {
        const response = await reviewService.getReviews();
        res.json(response);
    } catch (error) {
        console.error(error.message || error);
    }
}

const getReviewById = async (req, res) => {
    try {
        const response = await reviewService.getReviewById(req);
        if (response.error) {
            res.status(404).json({ message: response.error });
        } else {
            res.json(response);
        }
    } catch (error) {
        console.log(error.message || error);
    }
}

const updateReview = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ error: "Access Denied: Admins only" });
    }
    try {
        const response = await reviewService.updateReview(req, res);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

const deleteReview = async (req, res) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ error: "Access Denied: Admins only" });
    }
    try {
        const response = await reviewService.deleteReview(req, res);
        res.json(response);
    } catch (error) {
        console.log(error.message || error);
    }
}

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
};
