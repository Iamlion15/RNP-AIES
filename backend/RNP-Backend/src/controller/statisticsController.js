const caseModel = require("../model/caseModel")
const { formatTextDateInput } = require("../helpers/dateHelper")
const UserModel = require("../model/userModel")

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
            participantDetails.casename = " Case" + "-" + (i + 1) + "-" + formatTextDateInput(cases[i].createdAt) + " "
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
        res.status(200).json(participantCase);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.countOfficerStatistics = async (req, res) => {
    try {
        let officerCase = [];
        let howManyCases = 0;
        let countPendingCases = 0
        let countCompletedReviewCases = 0
        let countClosedCases = 0
        const cases = await caseModel.find({ OPG: req.body.userid }).populate({ path: "participants", populate: { path: "driver vehicleInfo" } })
        for (let i = 0; i < cases.length; i++) {
            let searchcases = cases[i];
            let participantDetails = {
                caseReviewed: false,
                caseNotReviewed: false,
                caseClosed: false
            }
            let completeCaseInfo = {
                howManyParticipants: searchcases.participants.length,
                count: 0
            }
            for (let a = 0; a < searchcases.participants.length; a++) {
                let findParticipant = cases[i].participants[a]
                for (let x = 0; x < findParticipant.answers.length; x++) {
                    if (findParticipant.answers[x].answer === "") {
                        participantDetails.caseNotReviewed = true
                        break;
                    }
                }
                if (findParticipant.caseStatus === "COMPLETE") {
                    completeCaseInfo.count++;

                }
            }
            if (searchcases.caseStatus === "COMPLETE") {
                participantDetails.caseClosed = true
            }
            if (completeCaseInfo.count === completeCaseInfo.howManyParticipants) {
                participantDetails.caseReviewed = true
            }
            officerCase.push(participantDetails)
        }
        howManyCases = officerCase.length;
        for (let i = 0; i < officerCase.length; i++) {
            if (officerCase[i].caseClosed) {
                countClosedCases++
            }
            if (officerCase[i].caseNotReviewed) {
                countPendingCases++
            }
            if (officerCase[i].caseReviewed) {
                countCompletedReviewCases++
            }
        }
        res.status(200).json({ "numberOfCases": howManyCases, "closedCases": countClosedCases, "pendingCases": countPendingCases, "reviewedCases": countCompletedReviewCases });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}



exports.calculateCasesPerMonth = async (req, res) => {
    try {
        const allCases = await caseModel.find();
        const countsPerMonth = Array.from({ length: 12 }, () => 0);
        allCases.forEach((singleCase) => {
            const createdAt = new Date(singleCase.createdAt);
            const monthIndex = createdAt.getMonth();
            countsPerMonth[monthIndex]++;
        });

        res.status(200).json(countsPerMonth);
    } catch (error) {
        console.error('Error calculating cases per month:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.adminStats = async (req, res) => {
    try {
        const allCases = await caseModel.find();
        const OGP = await UserModel.find({ role: "POLICE OFFICER" })
        let closedCases = 0
        for (let i = 0; i < allCases.length; i++) {
            if (allCases[i].caseStatus === "COMPLETE") {
                closedCases++
            }
        }
        res.status(200).json({ "closedcases": closedCases, "numberofOGP": OGP.length, "numberOfCases": allCases.length });
    } catch (error) {
        console.error('Error calculating cases per month:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.casesReportDocument = async (req, res) => {
    try {
        const status = req.body.status;
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate)
        const allCases = await caseModel.find({ caseStatus: status, createdAt: {
            $gte: startDate,
            $lte: endDate
        } }).populate("OPG")
        res.status(200).json({ allCases, "caseStatus": status })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.vehicleReport = async (req, res) => {
    try {
        const allCases = await caseModel.find().populate({ path: "participants", populate: { path: "driver vehicleInfo" } })
        res.status(200).json({ allCases })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.IndividualReportDocument = async (req, res) => {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate)
    try {
        const allCases = await caseModel.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }).populate("OPG").populate({ path: "participants", populate: { path: "driver vehicleInfo" } })
        res.status(200).json({ allCases })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}


