

exports.checkIfAllHasBeenAnswered = (findCase, participantId) => {
    let check = true;
    for (let i = 0; i < findCase.participants.length; i++) {
        if (findCase.participants[i]._id.toString() === participantId) {
            for (let a = 0; a < findCase.participants[i].answers.length; a++) {
                if (findCase.participants[i].answers[a].answer === "") {
                    check = false;
                    break
                }
            }
        }
    }
    return check;
}

exports.checkIfAllParticipantHaveBeenReviewed = (findCase) => {
    let check = true;
    for (let i = 0; i < findCase.participants.length; i++) {
        if (findCase.participants[i].caseStatus === "PENDING") {
            check = false;
            break
        }
    }
    return check;
}