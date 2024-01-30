const userModel = require("../model/userModel")
const vehicleModel = require("../model/vehicleModel")
const caseModel = require("../model/caseModel")
const QuestionModel = require("../model/questionsModel")
const answerModel = require("../model/answerModel")
const { checkIfAllHasBeenAnswered } = require("../helpers/checkAnswers")
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
                    participantIndex=i;
                    if (findCase.participants[i].answers[a].text === req.body.answers.text) {
                        findCase.participants[i].answers[a].answer = req.body.answers.answer
                    }
                }
            }
        }
        const check = checkIfAllHasBeenAnswered(findCase, req.body.case.participantId)
        if (check) {
            //findCase.ReportStatus = "answered"
            findCase.participants[participantIndex].ReportStatus="answered"
        }
        
        await caseModel.findOneAndUpdate({ _id: findCase._id }, findCase)
        return res.status(200).json({ "message": "successfully updated" })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ "message": err.message });
    }
};
exports.policeReviewCase=async(req,res)=>{
    try {
        console.log(req.body);
        let fileLocation;
    if (req.file) {
        fileLocation = path.resolve(req.file.path)
    } else {
        return res.status(400).json({ error: 'No file was uploaded' });
    }
   // console.log(fileLocation);
        const findCase=await caseModel.findOne({ _id: req.body.caseid })
        findCase.file=fileLocation;
        findCase.OGPComment=req.body.policeOfficerComment
        findCase.caseStatus="REVIEWED"
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

