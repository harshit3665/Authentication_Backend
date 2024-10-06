const jwt=require("jsonwebtoken");
const { login } = require("../controllers/Auth.cntroller");
require('dotenv').config();

exports.auth=(req,res,next)=>{
    try {
           //extract jwt token 
           const token = req.body.token;

           if (!token) {
            return res.json({
                success:false,
                messgae:"token is missing"
            })  
            }

            //verify the token 
            try {
                const payload=jwt.verify(token,process.env.JWT_SECRET);
                console.log(payload);
                req.user=payload;
                
            } catch (error) {
                return res.status(401)
                .json({
                    success:false,
                    message:"token is invalid"
                })
                
            }
            next();
                            
    } catch (error) {
        return res.status(401)
        .json({
            success:false,
            message:"something went wrong , while verify the token"
        })
        
        
    }
}
exports.isStudent=(req,res,next)=>{
try {
    if (req.user.role !== "Student") {
        return res.status(401)
        .json({
            success:false,
            message:"this a route for student"
        })
        
    }
    next();
} catch (error) {
    return res.status(500)
    .json({
        success:false,
        message:"user role not verify"
    })
    
}

}

exports.isAdmin=(req,res,next)=>{
    try {
        if (req.user.role !== "Admin") {
            return res.status(401)
            .json({
                success:false,
                message:"this a route for Admin"
            })
            
        }
        next();
    } catch (error) {
        return res.status(500)
        .json({
            success:false,
            message:"user role not verify"
        })
        
    }
    
    }