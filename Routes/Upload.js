const router = require("express").Router();
const UploadPage = require('../Models/UploadPage');
const { validationResult } = require('express-validator');
// const router = express.router()

const UploadPage = router.post("/", async (req, res) => {
    //if there are errors return Bad Request and the errors
    // const errors = validationResult(req);
       const { file, branch, semester, year, subject, noOfDownloads, createdBy, timestamps } = req.body
    try {
        let UploadPage = await UploadPage.findOne({
            file: req.body.file,
            branch: req.body.branch,
            semester: req.body.semester,
            year: req.body.year,
            subject: req.body.subject,
            noOfDownloads: req.body.noOfDownloads,
            createdBy: req.body.createdBy,
            timestamps: req.body.timestamps
        })
        console.log(UploadPage)
        if (UploadPage) {
            return res.status(400).json("Opps! This already exists.")
        }
        UploadPage = await UploadPage.create({
            file: req.body.file,
            branch: req.body.branch,
            semester: req.body.semester,
            year: req.body.year,
            subject: req.body.subject,
            noOfDownloads: req.body.noOfDownloads,
            createdBy: req.body.createdBy,
            timestamps: req.body.timestamps
        })
        res.status(200).json(UploadPage);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error!")
    }
})



module.exports = UploadPage
