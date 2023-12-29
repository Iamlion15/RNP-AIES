const userModel = require("../model/userModel")
const vehicleModel = require("../model/vehicleModel")
const caseModel = require("../model/caseModel")
const QuestionModel = require("../model/questionsModel")
const answerModel = require("../model/answerModel")

exports.startCase = async (req, res) => {
    const OPG = req.user._id;
    const ParticipantData = req.body.participantsDetails;
    let participants = [{
        participant: "",
        vehicle: ""
    }];
    try {
        for (let i = 0; i < ParticipantData.length; i++) {

            let driver = new userModel({
                firstname: ParticipantData[i].owner.firstname,
                lastname: ParticipantData[i].owner.lastname,
                nID: ParticipantData[i].owner.nID,
                email: ParticipantData[i].owner.email,
                drivingLicense: ParticipantData[i].owner.drivingLicense,
                role: "CITIZEN"
            })
            let vehicleDetail = new vehicleModel({
                plateNo: ParticipantData[i].plateNo,
                insuranceProvider: ParticipantData[i].insuranceProvider,
                insuranceNumber: ParticipantData[i].insuranceNumber
            })

            console.log(vehicleDetail);
            let participantId = await driver.save()
            let vehicleId = await vehicleDetail.save();
            participants[i] = {
                driver: participantId._id,
                vehicleInfo: vehicleId._id
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
    try {
        const data = await caseModel.find()
            .populate("OPG")
            .populate({
                path: "participants",
                populate: { path: "driver vehicleInfo" }
            });

        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ "message": err });
    }
};
