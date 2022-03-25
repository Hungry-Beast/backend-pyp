const router = require("express").Router();
const Subject = require('../Models/Subjects')
const { body, validationResult } = require('express-validator');
const { fetchUser, fetchAdmin } = require("../middleware/fetchUser");
const Subjects = require("../Models/Subjects");
// const router = express.router()

router.post("/", [
    body('createdBy', 'Must contain atleast 5 characters').isLength({ min: 3 }),
], async (req, res) => {
    //if there are errors return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // const { name, code, year, semester, createdBy } = req.body
    const { name: title, code: course_code, year, semester, createdBy } = req.body //schema's 'name' is changed to 'title'
    try {
        let subject = await Subject.findOne({
            name: req.body.name,
            code: req.body.code,
            year: req.body.year,
            semester: req.body.semester
        })
        console.log(subject)
        if (subject) {
            return res.status(400).json("Opps! This already exists.")
        }
        subject = await Subject.create({
            name: title,
            code: course_code,
            year: year,
            semester: semester,
            createdBy: createdBy
        })
        res.status(200).json(subject);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error!")
    }
})
router.get("/", fetchUser,
    async (req, res) => {
        //if there are errors return Bad Request and the errors
        try {
            const subjects = await Subject.find()
            console.log(subjects)
            res.status(200).json(subjects);

        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error!")
        }
    })
router.get("/admin", fetchAdmin,
    async (req, res) => {
        //if there are errors return Bad Request and the errors
        try {
            const subjects = await Subject.find({ approve: true })
            console.log(subjects)
            res.status(200).json(subjects);

        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error!")
        }
    })



module.exports = router
