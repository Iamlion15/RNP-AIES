const mongoose=require("mongoose")

const vehicleSchema=new mongoose.Schema({
    
    plateNo:{
        type:String,
        required:true,
        unique:true
    },
    insuranceProvider:{
        type:String,
        required:true
    },
        insuranceNumber:{
        type:String,
        required:true
    }  
},{timestamps:true})
const vehicleModel=mongoose.model("vehicle",vehicleSchema);
module.exports=vehicleModel;