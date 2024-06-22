const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, "secret", (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: "Unauthorized" });
        } else {
            req.decoded = decoded;
            req.role = decoded.role; // Add this line
            next();
        }
    });
};

module.exports = verifyToken;