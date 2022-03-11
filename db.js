const mongoose = require('mongoose');
require("dotenv/config");

mongoose_URI = process.env.DB_KEY;
// mongoose_URI = "mongodb+srv://developer:developer@cluster0.2logr.mongodb.net/pyp-db?retryWrites=true&w=majority";
mongoConnect = async () => {
    try {
        await mongoose.connect(mongoose_URI, () => {
            console.log("Connected to mongo Successfully!")
        });
    } catch (error) {
        console.error()
    }

}
module.exports = mongoConnect