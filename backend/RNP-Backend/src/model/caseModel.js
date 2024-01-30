const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    location: {
        province: String,
        district: String,
        sector: String,
        cell: String
    },
    file:{
        type:String,
    },
    OGPComment:{
        type:String,
    },
    ReportStatus:{
        type:String,
        default:"pending",
        enum:["answered","pending","under-review","completed"]
    },
    sceneReport:{
        type:String,
    },
    caseStatus:{
        type:String,
        default:"PENDING",
        enum:["PENDING","COMPLETE","REVIEWED"]
    },
    OPG: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    participants: [{
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        vehicleInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "vehicle",
        },
        answers: [mongoose.Schema.Types.Mixed],
        drunk: {
            type:Boolean
        },
        caseReviewed:{
            type:Boolean,
            default:false
        },
        ReportStatus:{
            type:String,
            default:"pending",
            enum:["answered","pending"]
        },
        caseStatus:{
            type:String,
            default:"PENDING",
            enum:["PENDING","COMPLETE","REVIEWED"]
        },
        
    }],
},{timestamps:true});

const caseModel = mongoose.model("case", caseSchema);

module.exports = caseModel;
