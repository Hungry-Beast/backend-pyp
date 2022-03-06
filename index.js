const express = require("express");
const mongoConnect = require('./db')
const subjectsRoute = require("./Routes/Subjects");

const { MongoClient, ServerApiVersion } = require("mongodb");

const Route = require('./Routes/auth')
const app = express();

const cors = require("cors");
require("dotenv/config");

mongoConnect()
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5050;
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors());
app.use("/auth", Route);
app.use("/login", subjectsRoute);
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

app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
);

