const userModel = require("../model/userModel")
const vehicleModel = require("../model/vehicleModel")
const caseModel = require("../model/caseModel")
const QuestionModel = require("../model/questionsModel")
const answerModel = require("../model/answerModel")
const { checkIfAllHasBeenAnswered, checkIfAllParticipantHaveBeenReviewed } = require("../helpers/checkAnswers")
const sendEMail=require("../helpers/caseEmailToParticipants")
const path = require("path")



exports.startCase = async (req, res) => {
    const OPG = req.user._id;
    const ParticipantData = req.body.participantsDetails;
    let participants = [{
        participant: "",
        vehicle: ""
    }];
    try {
        const questions = await QuestionModel.find();
        let questionArray = [];
        for (let a = 0; a < questions.length; a++) {
            quest = { text: questions[a].text, answer: "" }
            questionArray.push(quest)
        }
        for (let i = 0; i < ParticipantData.length; i++) {
            const isUserPresent = await userModel.findOne({ email: ParticipantData[i].owner.email })
            const isVehiclePresent = await vehicleModel.findOne({ plateNo: ParticipantData[i].plateNo })
            let participantId
            let vehicleId
            if (!isUserPresent) {
                let driver = new userModel({
                    firstname: ParticipantData[i].owner.firstname,
                    lastname: ParticipantData[i].owner.lastname,
                    nID: ParticipantData[i].owner.nID,
                    email: ParticipantData[i].owner.email,
                    drivingLicense: ParticipantData[i].owner.drivingLicense,
                    role: "CITIZEN"
                })
                participantId = await driver.save()
            }
            else {
                participantId = isUserPresent._id
            }
            if (!isVehiclePresent) {
                let vehicleDetail = new vehicleModel({
                    plateNo: ParticipantData[i].plateNo,
                    insuranceProvider: ParticipantData[i].insuranceProvider,
                    insuranceNumber: ParticipantData[i].insuranceNumber
                })
                vehicleId = await vehicleDetail.save();
            }
            else {
                vehicleId = await isVehiclePresent._id
            }
            participants[i] = {
                driver: participantId._id,
                vehicleInfo: vehicleId._id,
                answers: questionArray
            }
        }

        const newCase = new caseModel({
            location: {
                province: req.body.location.province,
                district: req.body.location.district,
                sector: req.body.location.sector,
                cell: req.body.location.cell,
            },
            drunk: req.body.drunk,
            participants: participants,
            OPG: OPG
        })

        await newCase.save();
        res.status(200).json({ "message": "successfully saved" })
    }

    catch (error) {
        console.log(error);
        res.status(400).json({ "error": error.message })
    }
}


exports.addQuestions = async (req, res) => {
    const questions = req.body;

    try {
        for (let i = 0; i < questions.length; i++) {
            let question = new QuestionModel({
                text: questions[i].qstn
            })
            await question.save();
        }
        res.status(200).json({ "message": "successfull" })
    } catch (error) {
        res.status(400).json({ "message": error })
    }

}

exports.ListOfQuestions = async (req, res) => {
    try {
        const questions = await QuestionModel.find()
        res.status(200).json(questions)
    } catch (error) {
        res.status(400).json({ "message": error })
    }
}

exports.UpdateQuestion = async (req, res) => {
    try {
        const question = await QuestionModel.findOne({ _id: req.params.questionid })
        question.text = req.body.text
        await QuestionModel.findOneAndUpdate({ _id: question._id }, question)
        res.status(200).json({ "message": "successfully updated" })
    } catch (error) {
        res.status(400).json({ "message": error })
    }
}

exports.deleteQuestion = async (req, res) => {
    try {
        await QuestionModel.findOneAndDelete({ _id: req.params.questionid })
        res.status(200).json({ "message": "successfully deleted" })
    } catch (error) {
        res.status(400).json({ "message": error })
    }
}

exports.deleteOfficer = async (req, res) => {
    try {
        await userModel.findOneAndDelete({ _id: req.params.userid })
        res.status(200).json({ "message": "successfully deleted officer" })
    } catch (error) {
        res.status(400).json({ "message": error })
    }
}

exports.getCases = async (req, res) => {
    console.log(req.body)
    try {
        const data = await caseModel.find({ OPG: req.body.OPG })
            .populate("OPG")
            .populate({
                path: "participants",
                populate: { path: "driver vehicleInfo" }
            });
        if (data.length > 0) {
            res.status(200).json({ cases: data, dataPresent: true })
        }
        else {
            res.status(200).json({ "message": "There is no data found", dataPresent: false })
        }
    } catch (err) {
        res.status(400).json({ "message": err });
    }
};

exports.answerToCases = async (req, res) => {
    try {
        let participantIndex;
        const findCase = await caseModel.findOne({ _id: req.body.case.caseid })
        for (let i = 0; i < findCase.participants.length; i++) {
            if (findCase.participants[i]._id.toString() === req.body.case.participantId) {
                for (let a = 0; a < findCase.participants[i].answers.length; a++) {
                    participantIndex = i;
                    if (findCase.participants[i].answers[a].text === req.body.answers.text) {
                        findCase.participants[i].answers[a].answer = req.body.answers.answer
                    }
                }
            }
        }
        const check = checkIfAllHasBeenAnswered(findCase, req.body.case.participantId)
        if (check) {
            //findCase.ReportStatus = "answered"
            findCase.participants[participantIndex].ReportStatus = "answered"
        }

        await caseModel.findOneAndUpdate({ _id: findCase._id }, findCase)
        return res.status(200).json({ "message": "successfully updated" })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ "message": err.message });
    }
};
exports.policeReviewCase = async (req, res) => {
    try {
        const completedOn=new Date()
        let fileLocation;
        let insuranceFileLocation;
        if (req.files[0]&&req.files[1]) {
            fileLocation = path.resolve(req.files[0].path)
            insuranceFileLocation=path.resolve(req.files[1].path)
        } else {
            return res.status(400).json({ error: 'No file was uploaded' });
        }
        const findCase = await caseModel.findOne({ _id: req.body.caseid }).populate({path: "participants",populate: { path: "driver vehicleInfo" }})
        for (let i = 0; i < findCase.participants.length; i++) {
           const participant=findCase.participants[i];
           const names=participant.driver.firstname+" "+participant.driver.lastname
           const email=participant.driver.email;
           sendEMail(email,names,insuranceFileLocation)
        }
        findCase.file = fileLocation;
        findCase.completedCaseOn=completedOn;
        findCase.insuranceDocuments=insuranceFileLocation
        findCase.OGPComment = req.body.policeOfficerComment
        findCase.caseStatus = "COMPLETE"
        await caseModel.findOneAndUpdate({ _id: findCase._id }, findCase)
        return res.status(200).json({ "message": "successfully updated" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ "message": error.message });
    }
}
exports.completeCase = async (req, res) => {
    try {
        let participantIndex;
        const findCase = await caseModel.findOne({ _id: req.body.caseid })
        for (let i = 0; i < findCase.participants.length; i++) {
            if (findCase.participants[i]._id.toString() === req.body.participantid) {
                participantIndex = i;
                break;
            }
        }
        findCase.participants[participantIndex].conclusion = req.body.conclusion.cause;
        findCase.participants[participantIndex].shortStatement = req.body.conclusion.shortStatement;
        findCase.participants[participantIndex].caseStatus = "COMPLETE";
        const check = checkIfAllParticipantHaveBeenReviewed(findCase)
        if (check) {
            findCase.ParticipantReportStatus = "all-answered"
        }
        await caseModel.findOneAndUpdate({ _id: findCase._id }, findCase)
        return res.status(200).json({ "message": "successfully updated" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ "message": error.message });
    }
}

exports.getCasesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const data = await caseModel.find({
            "participants": { $elemMatch: { $or: [{ driver: userId }] } }
        }).populate({
            path: "participants",
            populate: { path: "driver vehicleInfo" }
        }).populate("OPG");

        if (data.length > 0) {
            res.status(200).json({ cases: data, dataPresent: true });
        } else {
            res.status(200).json({ "message": "There is no data found", dataPresent: false });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const data = await userModel.findOne({ email: req.body.email })

        if (data) {
            res.status(200).json({ found: data, dataPresent: true });
        } else {
            res.status(200).json({ "message": "There is no data found", dataPresent: false });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
};

exports.getCarByPlate = async (req, res) => {
    try {
        const data = await vehicleModel.findOne({ plateNo: req.body.plateNo })

        if (data) {
            res.status(200).json({ found: data, dataPresent: true });
        } else {
            res.status(200).json({ "message": "There is no data found", dataPresent: false });
        }
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
};

