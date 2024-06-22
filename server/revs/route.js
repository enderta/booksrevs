
const express = require("express");
const router = express.Router();
const revController = require("./controller");
const verifyToken = require("../middleware/verifyToken");
const cors = require("cors");
const bodyParser = require("body-parser"); // Add this line

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Rest of your code...give cors permission all the routes all origins

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

router.post('/rev', verifyToken,revController.createReview);
router.get('/revs', verifyToken,revController.getReviews);
router.get('/rev/:id', verifyToken,revController.getReviewById);
router.put('/rev/:id', verifyToken,revController.updateReview);
router.delete('/rev/:id', verifyToken,revController.deleteReview);

module.exports = router;

