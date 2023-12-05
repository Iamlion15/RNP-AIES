const userModel = require("../model/userModel")
const vehicleModel = require("../model/vehicleModel")
const caseModel = require("../model/caseModel")
const answerModel = require("../model/answerModel")

exports.startCase = async (req, res) => {
    const OPG = req.user._id;
    const ParticipantData = req.body.particpants;
    let participant = [];
    try {
        for (let i = 0; i < ParticipantData.length; i++) {
            let particip = new userModel({
                firstname: ParticipantData[i].firstname,
                lastname: ParticipantData[i].lastname,
                nID: ParticipantData[i].nID,
                email: ParticipantData[i].email,
                drivingLicense: ParticipantData[i].drivingLicense;
            })
            let participantId = await particip.save()
            participant[i] = participantId._id
        }
    } catch (error) {

    }
}