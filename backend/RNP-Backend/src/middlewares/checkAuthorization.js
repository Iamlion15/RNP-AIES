exports.checkPoliceAdminAuthorization = (req, res, next) => {
    try {
        if (req.user.role === "POLICE ADMIN") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}


exports.checkPoliceOfficerAuthorization = (req, res, next) => {
    try {
        if (req.user.role === "POLICE OFFICER") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}

exports.checkCitizenuthorization = (req, res, next) => {
    try {
        if (req.user.role === "RSB") {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}



exports.checkApproversAuthorization=(req,res,next)=>{
    try {
        if (req.user.role === "POLICE OFFICER" || req.user.role === "POLICE ADMIN" ) {
            next()
        }
        else {
            res.status(403).json({ "message": "no authorization" })
        }
    } catch (error) {
        res.status(400).json({ "message": "no authorization" })
    }
}