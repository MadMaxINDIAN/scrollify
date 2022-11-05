// importing libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

// initialising app
const app = express();

// configuring app
app.use(morgan("dev"));
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to the database
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// routers
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");

// routes
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.get("/", (req, res) => {
    console.log("Server is up...");
    res.send("Server is up and running...");
})

// listening to port
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});