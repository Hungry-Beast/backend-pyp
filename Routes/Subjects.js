const router = require("express").Router();
const Subject = require('../Models/Subjects')
const { body, validationResult } = require('express-validator');
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
    const { name: title, code: course_code, year, semester, createdBy,fileUrl } = req.body //schema's 'name' is changed to 'title'
    try {
        let subject=await Subject.findOne({code:course_code})
        // console.log(subject);
        if(subject){
            res.status(400).json("Opps! This subject already exist")
            return
        }
         subject = await Subject.create({
            name: title,
            code: course_code,
            year: year,
            semester: semester,
            createdBy: createdBy,
            fileUrl:fileUrl
        })
        res.status(200).json(subject);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error!")
    }
})


module.exports = router
