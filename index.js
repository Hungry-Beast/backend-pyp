const express = require("express");
const mongoose = require("mongoose");
const subjectsRoute = require("./Routes/Subjects");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
app.use("/subjects", subjectsRoute);
app.use("/", (req, res) => {
    res.send("Hi chutiya");
});
// try {
//     // Connect to the MongoDB cluster
//     mongoose.connect(
//         process.env.DB_KEY,
//         {
//             useUnifiedTopology: true,
//             useNewUrlParser: true,
//         },
//         () => console.log(" Mongoose is connected")
//     );
// } catch (e) {
//     console.log("could not connect");
// }
// const client = new MongoClient(process.env.DB_KEY_LOCAL);
// try {
//     const connectMongodb = async () => {
//         await client.connect();
//         listDBs(client)
//     };
//     connectMongodb()
// } catch (error) {
//     console.log(error);
// }
const client = new MongoClient(process.env.DB_KEY_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
);

const listDBs = async (client) => {
    const DatabaseList = await client.db().admin().listDatabases();
    console.log("DBs");
    DatabaseList.databases.forEach((db, i) => {
        console.log(`DB(${i}):${db.name}`);
    });
};
