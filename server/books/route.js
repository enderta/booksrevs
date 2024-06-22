

const express = require("express");
const router = express.Router();
const bookController = require("./controller");
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

router.post('/book', verifyToken,bookController.createBook);
router.get('/books', verifyToken,bookController.getBooks);
router.get('/book/:id', verifyToken,bookController.getBookById);
router.put('/book/:id', verifyToken,bookController.updateBook);
router.delete('/book/:id', verifyToken,bookController.deleteBook);

module.exports = router;

