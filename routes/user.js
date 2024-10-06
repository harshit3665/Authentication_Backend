const express=require("express")
const router=express.Router();
const {login,signup}=require("../controllers/Auth.cntroller")
const {auth ,isStudent , isAdmin}=require("../middleware/Auth.midleware")
router.post("/login",login);
router.post("/signup",signup);

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the test"
    })
})


router.get("/student",auth,isStudent, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the student"
    })
})
router.get("/Admin",auth,isAdmin, (req,res)=>{
    res.json({
        success:true,
        message:"welcome to the admin"
    })
})

module.exports=router;