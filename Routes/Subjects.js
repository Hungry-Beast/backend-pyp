const router = require("express").Router();
const Subject=require('../Models/Subjects')
// const router = express.router()

router.get("/",async(req, res) => {
    // res.send("Subjects data");
    const newSubject=new Subject()
    // try{
        console.log(newSubject);
        const savedSubject= await Subject.find()
        res.status(200).json(savedSubject)
    // }
    // catch(err){
    //     res.status(500).json(err)
    // }
});
router.post('/',async(req,res)=>{
    const data=req.body
    const newSubject=new Subject({
        name:data.name,
        code:data.code,
        year:data.year,
        semister:data.semister,
        createdBy:data.createdBy
    })
    // try{
        console.log(newSubject);
        const savedSubject= await newSubject.save()
        res.status(200).json(savedSubject)
    // }
    // catch(err){
    //     res.status(500).json(err)
    // }
})

module.exports=router