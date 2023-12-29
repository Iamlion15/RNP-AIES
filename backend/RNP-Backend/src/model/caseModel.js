const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    location: {
        province: String,
        district: String,
        sector: String,
        cell: String
    },
    ReportStatus:{
        type:String,
        default:"pending",
        enum:["answered","pending","under-review","completed"]

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
        drunk: {
            type:Boolean
        },
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
    }],
});

const caseModel = mongoose.model("case", caseSchema);

module.exports = caseModel;
