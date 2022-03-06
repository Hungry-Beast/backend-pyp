import mongoose from "mongoose";
const { Schema } = mongoose;

const uploadPage = mongoose.Schema({
    branch: {
        type: String,
        required: true

    },
    semester: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
  
    noOfDownloads: {
        type: Number,
        required: true
    }
},{
    timestamps:true
}
);

const PostMessage = mongoose.model('UploadPage', UploadSchema);