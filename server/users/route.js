const express = require("express");
const router = express.Router();
const userController = require("./controller");
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

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', verifyToken, userController.getUsers);
router.get('/user/:id', verifyToken, userController.getUserById);
router.put('/user/:id', verifyToken, userController.updateUser);
router.delete('/user/:id', verifyToken, userController.deleteUser);

module.exports = router;