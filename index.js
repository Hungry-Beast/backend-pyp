const express = require("express");
const mongoose = require("mongoose");
const subjectsRoute = require("./Routes/Subjects");
const cors=require('cors')
require("dotenv/config");

const app = express();

// app.use(express.json());
const PORT = process.env.PORT || 5000;
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
app.use('/subjects',subjectsRoute)
app.use("/", (req, res) => {
    res.send("Hi chutiya");
});
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.DB_KEY,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );
} catch (e) {
    console.log("could not connect");
}

app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
);
