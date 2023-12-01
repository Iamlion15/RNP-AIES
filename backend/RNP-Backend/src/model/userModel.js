const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    nID:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        default:"POLICE OFFICER",
        enum:["POLICE ADMIN","POLICE OFFICER"]
    },
    password:{
        type:String,
        required:true
    }
    
})



const userModel=mongoose.model("user",userSchema);

module.exports=userModel;