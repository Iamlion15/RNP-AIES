const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    location: {
        province: String,
        district: String,
        sector: String,
        cell: String
    },
    file: {
        type: String,
    },
    insuranceDocuments: {
        type: String,
    },
    completedCaseOn: {
        type: Date,
    },
    OGPComment: {
        type: String,
    },
    ParticipantReportStatus: {
        type: String,
        default: "pending",
        enum: ["all-answered", "pending"]
    },
    sceneReport: {
        type: String,
    },
    caseStatus: {
        type: String,
        default: "PENDING",
        enum: ["PENDING", "COMPLETE"]
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
            type: Boolean,
            default:false
        },
        caseReviewed: {
            type: Boolean,
            default: false
        },
        ReportStatus: {
            type: String,
            default: "pending",
            enum: ["answered", "pending"]
        },
        caseStatus: {
            type: String,
            default: "PENDING",
            enum: ["PENDING", "COMPLETE"]
        },
        conclusion: {
            type: String
        },
        shortStatement: {
            type: String
        }

    }],
}, { timestamps: true });

const caseModel = mongoose.model("case", caseSchema);

module.exports = caseModel;
