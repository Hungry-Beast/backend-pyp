const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require("dotenv/config");

const JWT_SEC = process.env.JWT_SEC

const fetchUser = (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        return res.status(401).json({ 'error': 'Please authenticate using a valid token!' })
    }

    try {
        const data = jwt.verify(token, JWT_SEC)
        req.user = data.user
        console.log("this is data", data)
        next();
    } catch (error) {
        res.status(401).send({ 'error': "Please authenticate using a valid token!" })
    }
}

const fetchAdmin = (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        return res.status(401).json({ 'error': 'Please authenticate using  valid token here!' })
    }
    try {
        console.log("Hi")
        const data = jwt.verify(token, JWT_SEC)
        req.user = data.user
        console.log(data.user)
        if (data.user.type === "admin") {

            next();
        }
        else {

            res.status(403).send({ 'error': "forbidden!" })
        }
    } catch (error) {
        res.status(401).send({ 'error': "Please authenticate using a valid token!" })
    }
}

module.exports = { fetchUser, fetchAdmin }