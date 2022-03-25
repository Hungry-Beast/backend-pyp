const mongoose = require("mongoose");
const { Schema } = mongoose;

const UploadSchema = new Schema(
  {
    file: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },

    noOfDownloads: {
      default: 0,
      type: Number
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

module.exports = mongoose.model("UploadPage", UploadSchema);
