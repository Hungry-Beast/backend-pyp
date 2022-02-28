const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5002;
console.log(process.env.DB_KEY);
let DB_URL =
    "mongodb+srv://developer:developer@cluster0.2logr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let DB_URL2 =
    "mongodb://developer:developer@cluster0-shard-00-00.2logr.mongodb.net:27017,cluster0-shard-00-01.2logr.mongodb.net:27017,cluster0-shard-00-02.2logr.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zgh7qu-shard-0&authSource=admin&retryWrites=true&w=majority";
let DB_local = "mongodb://localhost:27017/test";
// mongoose
//     .connect(DB_local, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("Db connected"));
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
          DB_URL,
          { useNewUrlParser: true, useUnifiedTopology: true },
          () => console.log(" Mongoose is connected")
        );
      } catch (e) {
        console.log("could not connect");
      }
// .catch((error) => console.log(`${error} did not connect`));
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://developer:developer@cluster0.2logr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("Connected");
//   // perform actions on the collection object
//   client.close();
// });
app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
);
