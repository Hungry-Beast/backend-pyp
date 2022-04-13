const router = require("express").Router();
const UploadPage = require("../Models/UploadPage");
const user = require("../Models/User");
const {fetchAdmin} = require("../middleware/fetchUser.js");
const Subject = require("../Models/Subjects");

const File = router.get("/admin/file", async (req, res) => {
  try {
    let TempUploadPage = await UploadPage.find();
    console.log(TempUploadPage);
    res.status(200).json(UploadPage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
})
const Users=router.get("/admin/users", async (req, res) => {
  try {
    let TempUser = await user.find();
    console.log(TempUser);
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
});


const ApprovedSub = router.put("/subject", fetchAdmin, async (req, res) => {
  const {id, isApproved} = req.body;
  try {
    await Subject.findOneAndUpdate({_id:id}, {$set: {approved: isApproved}});
    const tempSubject=await Subject.findOne({_id:id})
    res.status(200).json(tempSubject);

  } catch (error) {
    res.status(500).send("Internal server error!");
  }

});

module.exports = router;
