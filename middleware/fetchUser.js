const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require("dotenv/config");

const JWT_SEC = process.env.JWT_SEC

const fetchUser = (req, res, next) => {
    const token = req.header('authToken');
    if (!authToken) {
        return res.status(401).json({ 'error': 'Please authenticate using a valid token!' })
    }
    try {
        const data = jwt.verify(token, JWT_SEC)
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({ 'error': "Please authenticate using a valid token!" })
    }
}
module.exports = fetchUser