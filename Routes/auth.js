const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const fetchUser = require('../middleware/fetchUser')
require("dotenv/config");

const JWT_SEC = process.env.JWT_SEC;

//Creating a route for aading an user to the DB
router.post('/createuser', [
    body('name', 'Name must be atleast 3 chraracters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters long').isLength({ min: 5 }),

    body("regNumber", "Enter a valid Reg. No.").isLength({ max: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Checks if the user with same email exists already
        const email = await User.findOne({
            email: req.body.email,
        })
        const reg = await User.findOne({
            regNumber: req.body.regNumber
        })
        if (email || reg) {
            return res.status(400).json("User already exists!")
        }
        let salt = await bcrypt.genSalt(10)
        let secPassword = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            branch: req.body.branch,
            regNumber: req.body.regNumber
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SEC)
        res.status(200).json({ authToken })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal error occured")
    }
})
// Route2: Creating a router for logging in.
router.post('/login', [
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    try {
        let user = await User.findOne({ name })
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SEC)
        res.status(200).json({ authToken })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal error occured")
    }
})
module.exports = router