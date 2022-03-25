const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,

        },
        password: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        regNumber: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            default: "CR"
        },
        approved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("user", UserSchema)