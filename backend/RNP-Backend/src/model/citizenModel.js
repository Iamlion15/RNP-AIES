const mongoose=require("mongoose")

const citizenSchema=new mongoose.Schema({
    
    nID:{
        type:String,
        required:true 
    },
    drivingID:{
        type:String,
        unique:true,
        required:true
    },
        auth_token:{
        type:String,
    }  
})

const citizenModel=mongoose.model("citizen",citizenSchema);

module.exports=citizenModel;