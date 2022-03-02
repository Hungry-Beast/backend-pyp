const router = require("express").Router();

// const router = express.router()

router.get("/",async(req, res) => {
    res.send("Subjects data");
});

module.exports=router