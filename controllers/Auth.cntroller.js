const User=require("../model/User.model")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
require('dotenv').config();


//signup  
exports.signup=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        //check user exist or not

        const existUser=await User.findOne({email});
        if (existUser) {
            return res.status(400)
            .json({
                success:false,
                message:"user already exist",
            })
        }

        //password secure if user not exist

        let hashPassword
        try {
            hashPassword= await bcrypt.hash(password, 10)
        } catch (error) {
            return res.status(500)
            .json({
                success:false,
                message:"error in hash password"
            })
        }

        //create entry for user
        const user=await User.create({
            name,email,password:hashPassword,role
        })
        return res.status(200)
        .json({
            success:true,
            
            message:"user create successfully"
        })
    

    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({
                success:false,
                message:"User cannot be register ,please check the code"
            })
        
        
    }
}
//login controller

exports.login=async(req,res)=>{
   try {
     const {email,password}=req.body;
    
     if (!email || !password) {
         return res.status(400)
         .json({
             success:false,
             message:"email is not register",
         })
     }
     const user=await User.findOne({email})
     //if not a register user
 
     if(!user){
         return res.status(400)
         .json({
             success:false,
             message:"user is not register"
         })
     }
     const payload={
        email:user.email,
        id:user._id,
        role:user.role,
       
     }

     //verify passwaordand generate a jwt token
     if(await bcrypt.compare(password,user.password)){
        //token create
        let token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        console.log(user);
        // user=user.toObject();
        user.token=token;
        //user object se password hataya
        user.password=undefined;
        const options={
            expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 ),
            httpOnly:true,
        }


        res.cookie("token",token,options)
        .status(200)
        .json({
            success:true,
            user,
            token,
            message:"user logged in successfully"
        })

     }
     else{
        return res.status(400)
        .json({

            success:false,
            message:"passward is incorrect"
        })
     }
   } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500)
        .json({
            success:false,
            message:"login fail"
        })
    
    
   }


}