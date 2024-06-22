const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors(
    {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    }
));

// Use bodyParser.json() or express.json(), not both
app.use(bodyParser.json());

// Your routes go here
const userRoute = require("./users/route");
const bookRoute = require("./books/route");
const revRoute = require("./revs/route");


app.use("/api", userRoute);
app.use("/api", bookRoute);
app.use("/api", revRoute);


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});