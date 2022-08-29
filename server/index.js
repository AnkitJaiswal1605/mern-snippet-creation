const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// setup express server

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
}));

app.listen(3000, () => console.log("Server started on port 3000"));

// setup routers

app.use("/snippet", require("./routers/snippetRouter"));

// connect to mongodb

mongoose.connect("mongodb+srv://AnkitJaiswal1605:91Fm8tUdiN7lcnDe@snippet-manager.brjmkea.mongodb.net/?retryWrites=true&w=majority", (err) => {
    if(err) return console.error(err);
    console.log("Connected to MongoDB");
});

