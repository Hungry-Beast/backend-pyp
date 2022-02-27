const express = require("express");
const mongoose = require("mongoose");
require('dotenv/config')
const app = express();

app.use(express.json())
const PORT = process.env.PORT || 5000;
console.log(process.env.DB_KEY);
// mongoose
//     .connect("mongodb+srv://developer:developer@cluster0.2logr.mongodb.net/pyp-db?retryWrites=true&w=majority", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    // )
    // .catch((error) => console.log(`${error} did not connect`));
