const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
   
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]    },
})
module.exports=mongoose.model("user",userSchema)