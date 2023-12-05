const mongoose=require("mongoose")

const caseSchema=new mongoose.Schema({
    
    location:{
        province:String,
        district:String,
        sector:String,
        cell:String
    },
    OPG:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
        vehicleInfo:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "vehicle",
    },
    answers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
    }],  
})

const caseModel=mongoose.model("case",caseSchema);

module.exports=caseModel;