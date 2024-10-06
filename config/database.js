const mongoose=require("mongoose")

require('dotenv').config();
exports.connect=()=>{
    mongoose.connect(process.env.MONGODBURL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("db Connection done");
        
    })
    .catch((err)=>{
     console.log("db issue hai");
     console.error(err);
     process.exit(1);
     
    });

}