const express = require("express");
const mongoConnect = require("./db");
const subjectsRoute = require("./Routes/Subjects");
const fireApp=require('./firebaseAuth')

const adminRoute = require("./Routes/admin");
// >>>>>>> 838833f6c3c639fe7174b56ba12d0797f26bfcd6
const app = express();

const cors = require("cors");
require("dotenv/config");

mongoConnect();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5050;

app.use("/auth", adminRoute);
app.use("/subjects", subjectsRoute);

app.use("/admin", adminRoute);

app.use("/subjects", subjectsRoute);
app.use("/", (req, res) => {
  res.send("Hi chutiya");
});
// try {
    // Connect to the MongoDB cluster
    // mongoose.connect(
    //     process.env.DB_KEY,
    //     {
    //         useUnifiedTopology: true,
    //         useNewUrlParser: true,
    //     },
    //     () => console.log(" Mongoose is connected")
    // );
// } catch (e) {
//     console.log("could not connect");
// }

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);

