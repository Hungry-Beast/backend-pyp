const router = require("express").Router();
const Upload = require("../Models/UploadPage");
const { validationResult } = require("express-validator");
const {
    fetchUser,
    fetchAdmin,
    fetchApprovedUser,
} = require("../middleware/fetchUser");
// const router = express.router()

const UploadPage = router.post("/", fetchApprovedUser, async (req, res) => {
    try {
        // let UploadPage = await UploadPage.findOne({});
        console.log(req)
        const UploadData = await Upload.create({
            file: req.body.file,
            branch: req.body.branch,
            semester: req.body.semester,
            year: req.body.year,
            subject: req.body.subject,
            noOfDownloads: req.body.noOfDownloads,
            createdBy: req.body.createdBy,
        });
        res.status(200).json(UploadData);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
});

module.exports = UploadPage;
