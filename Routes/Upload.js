const multer = require("multer");
const { validationResult } = require("express-validator");
const router = require("express").Router();
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");
// const {storageRef}=require('firebase')

const Upload = require("../Models/UploadPage");
const storage = getStorage();

// 'file' comes from the Blob or File API

const {
    fetchUser,
    fetchAdmin,
    fetchApprovedUser,
} = require("../middleware/fetchUser");
// const router = express.router()

const UploadPage = router.post(
    "/",
    [fetchUser, multer().single("file")],
    async (req, res) => {
        try {
          
            let metadata = {
                contentType: req.file.mimetype,
                name: req.file.originalname,
            };
            // storage.put(req.file.buffer, metadata);
            // }
            const storageRef = ref(storage, `${req.file.originalname}`);
            const snapshot = await uploadBytes(
                storageRef,
                req.file.buffer,
                metadata
            );
            const downloadUrl = await getDownloadURL(snapshot.ref);

            const UploadData = await Upload.create({
                file: downloadUrl,
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
    }
);

router.post(
    "/files",
    [fetchUser, multer().single("file")],
    async function (req, res) {
        try {
            // const storageRef = admin.storage().bucket(`gs://hashnode-dev-c6f91.appspot.com`);
            console.log(req.file);
            console.log(req.body.Helo);
            var file = req.file;
            // if (file) {
            console.log(req.file);
            let metadata = {
                contentType: req.file.mimetype,
                name: req.file.originalname,
            };
            // storage.put(req.file.buffer, metadata);
            // }
            const storageRef = ref(storage, `${req.file.originalname}`);
            uploadBytes(storageRef, req.file.buffer, metadata).then(
                (snapshot) => {
                    console.log(snapshot);
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log("File available at", downloadURL);
                    });
                }
            );

            res.send(req.file);
        } catch (err) {
            console.log(err);
        }
    }
);
module.exports = UploadPage;
