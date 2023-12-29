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
    },
    role:{
        type:String,
        default:"POLICE OFFICER",
        enum:["POLICE ADMIN","POLICE OFFICER","CITIZEN"]
    },
    password:{
        type:String,
    },
    drivingLicense:{
        type:String,
    }
    
})



const userModel=mongoose.model("user",userSchema);

module.exports=userModel;