const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        semister: {
            type: Number,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports=mongoose.model("Subject",SubjectSchema)