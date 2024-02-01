const caseModel = require("../model/caseModel")
const { formatTextDateInput } = require("../helpers/dateHelper")
exports.documentStatistics = async (req, res) => {
    try {
        const approvals = await DocumentApproval.find();

        let approvedCount = 0;
        let pendingCount = 0;
        let canceledCount = 0;
        let underReviewCount = 0;

        for (const approval of approvals) {
            const hasRABApproved = approval.RAB_Approval.approved;
            const hasRICAApproved = approval.RICA_Approval.approved;
            const hasRSBApproved = approval.RSB_Approval.approved;
            const hasAnyApprovalTime = approval.RAB_Approval.timeOfApproval || approval.RICA_Approval.timeOfApproval || approval.RSB_Approval.timeOfApproval;

            if (hasRABApproved && hasRICAApproved && hasRSBApproved) {
                approvedCount++;
            } else if (hasRABApproved && hasRSBApproved && !hasRICAApproved) {
                underReviewCount++;
            } else if (!hasRABApproved && !hasRICAApproved && !hasRSBApproved) {
                if (hasAnyApprovalTime) {
                    canceledCount++;
                } else {
                    pendingCount++;
                }
            } else {
                pendingCount++;
            }
        }

        res.status(200).json({
            "approved": approvedCount,
            "underReview": underReviewCount,
            "pending": pendingCount,
            "canceled": canceledCount
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(400).json({ "error": err });
    }
}

exports.CountCitizenDocuments = async (req, res) => {
    try {
        let participantCase = [];
        let howManyCases = 0;
        let countAnsweredCases = 0
        let countNotAnsweredCases = 0
        let countCompletedCases = 0
        const cases = await caseModel.find().populate({ path: "participants", populate: { path: "driver vehicleInfo" } })
        for (let i = 0; i < cases.length; i++) {
            let searchcases = cases[i];
            for (let a = 0; a < searchcases.participants.length; a++) {
                let findParticipant = cases[i].participants[a]
                if (findParticipant.driver._id.toString() === req.body.userid) {
                    participantCase.push(findParticipant)
                    if (findParticipant.caseStatus === "COMPLETE") {
                        countCompletedCases++
                    }
                }
            }
        }
        //counting answered and not answered cases
        for (let i = 0; i < participantCase.length; i++) {
            let data = participantCase[i]
            for (let a = 0; a < data.answers.length; a++) {
                let answers = data.answers[a]
                if (answers.text === "") {
                    countNotAnsweredCases++
                    break
                }
            }
        }
        howManyCases = participantCase.length
        countAnsweredCases = howManyCases - countNotAnsweredCases
        res.status(200).json({
            "answered": countAnsweredCases,
            "notanswered": countNotAnsweredCases,
            "complete": countCompletedCases,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.countStatsPerDocument = async (req, res) => {
    let participantCase = [{
        casename: "",
        caseAnswered: false,
        caseNotanswered: false,
        caseCompleted: false,
        percentage: 0
    }];
    try {
        const cases = await caseModel.find().populate({ path: "participants", populate: { path: "driver vehicleInfo" } })
        for (let i = 0; i < cases.length; i++) {
            let searchcases = cases[i];
            let participantDetails = {
                casename: "",
                caseNotanswered: false,
                caseCompleted: false,
                caseClosed: false
            }
            participantDetails.casename = "case-" + formatTextDateInput(cases[i].createdAt)
            for (let a = 0; a < searchcases.participants.length; a++) {
                let findParticipant = cases[i].participants[a]
                if (findParticipant.driver._id.toString() === req.body.userid) {
                    for (let x = 0; x < findParticipant.answers.length; x++) {
                        if (findParticipant.answers[x].answer === "") {
                            participantDetails.caseNotanswered = true
                            break;
                        }
                    }
                    if (findParticipant.caseStatus === "COMPLETE") {
                        participantDetails.caseCompleted = true
                    }
                }
                if (searchcases.caseStatus === "COMPLETE") {
                    participantDetails.caseClosed = true
                }
                let count;
                if (participantDetails.caseClosed) {
                    count = 100
                }
                else if (participantDetails.caseClosed === false && participantDetails.caseCompleted === true) {
                    count = 75
                }
                else if (participantDetails.caseCompleted === false && participantDetails.caseNotanswered === false) {
                    count = 50
                }
                else {
                    count = 25
                }
                participantCase = [{ casename: participantDetails.casename, caseNotanswered: participantDetails.caseNotanswered, caseAnswered: !participantDetails.caseNotanswered, caseCompleted: participantDetails.caseCompleted, percentage: count }]
            }
        }
        console.log(participantCase);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.CountDocumentsByRICAApproval = async (req, res) => {
    try {
        const countApproved = await DocumentApproval.countDocuments({ 'RICA_Approval.approved': true });
        const countNotApproved = await DocumentApproval.countDocuments({
            'RAB_Approval.approved': true,
            'RSB_Approval.approved': true,
            'RICA_Approval.approved': false
        });

        res.status(200).json({
            approved: countApproved || 0,
            pending: countNotApproved || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getDocumentInRange = async (req, res) => {
    const { startDate, endDate, organisation } = req.body;
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (organisation === "RAB") {
            const count = await DocumentApproval.countDocuments({
                'RAB_Approval.timeOfApproval': { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RAB_Approval.timeOfApproval': { $gte: start, $lte: end }
            }).populate("owner").populate("document");

            res.status(200).json({ count, documents });
        }
        else if (organisation === "RSB") {
            const count = await DocumentApproval.countDocuments({
                'RSB_Approval.timeOfApproval': { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RSB_Approval.timeOfApproval': { $gte: start, $lte: end }
            }).populate("owner").populate("document");

            res.status(200).json({ count, documents });
        }
        else {
            if (organisation === "RICA") {
                const count = await DocumentApproval.countDocuments({
                    'RICA_Approval.timeOfApproval': { $gte: start, $lte: end }
                });
                const documents = await DocumentApproval.find({
                    'RICA_Approval.timeOfApproval': { $gte: start, $lte: end }
                }).populate("owner").populate("document");
                res.status(200).json({ count, documents });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getPendingDocumentInRange = async (req, res) => {
    const { startDate, endDate, organisation } = req.body;
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (organisation === "RAB") {
            const count = await DocumentApproval.countDocuments({
                'RAB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RAB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            }).populate("owner").populate("document");
            res.status(200).json({ count, documents });
        }
        else if (organisation === "RSB") {
            const count = await DocumentApproval.countDocuments({
                'RAB_Approval.approved': true,
                'RSB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            });
            const documents = await DocumentApproval.find({
                'RAB_Approval.approved': false,
                createdAt: { $gte: start, $lte: end }
            }).populate("owner").populate("document");
            res.status(200).json({ count, documents });
        }
        else {
            if (organisation === "RICA") {
                const count = await DocumentApproval.countDocuments({
                    'RAB_Approval.approved': true,
                    'RSB_Approval.approved': true,
                    'RICA_Approval.approved': false,
                    createdAt: { $gte: start, $lte: end }
                });
                const documents = await DocumentApproval.find({
                    'RAB_Approval.approved': false,
                    createdAt: { $gte: start, $lte: end }
                }).populate("owner").populate("document");
                res.status(200).json({ count, documents });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};




