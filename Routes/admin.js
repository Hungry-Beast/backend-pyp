const router = require("express").Router();
const UploadPage = require("../Models/UploadPage");
const user = require("../Models/User");
const {fetchAdmin} = require("../middleware/fetchUser.js");

const File = router.get("/admin", async (req, res) => {
  try {
    let TempUploadPage = await UploadPage.find();
    console.log(TempUploadPage);
    res.status(200).json(UploadPage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }

  try {
    let TempUser = await user.find();
    console.log(TempUser);
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
});

module.exports = File;
