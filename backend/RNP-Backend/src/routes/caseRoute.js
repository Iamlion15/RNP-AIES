const router = require("express").Router();
const checkAuthentication = require("../middlewares/checkAuthentication")
const uploadDocument = require("../middlewares/uploadDocument")
const { checkPoliceAdminAuthorization,checkPoliceOfficerAuthorization,checkCitizenuthorization} = require("../middlewares/checkAuthorization")


const {  startCase,addQuestions,getCases,ListOfQuestions,UpdateQuestion,deleteQuestion,getCasesByUser,getUserByEmail,answerToCases,policeReviewCase,completeCase,deleteOfficer,getInsuranceCopy} = require("../controller/caseController")


router.post("/startcase", checkAuthentication, checkPoliceOfficerAuthorization, startCase)
router.post('/addquestion',checkAuthentication,checkPoliceAdminAuthorization,addQuestions)
router.get('/get/questions',checkAuthentication,checkPoliceAdminAuthorization,ListOfQuestions)
router.delete('/delete/question/:questionid',checkAuthentication,checkPoliceAdminAuthorization,deleteQuestion)
router.post('/update/question/:questionid',checkAuthentication,checkPoliceAdminAuthorization,UpdateQuestion)
router.post('/getcases',checkAuthentication,checkCitizenuthorization,getCases)
router.post('/police/getinsurancecopy',checkAuthentication,checkPoliceOfficerAuthorization,getInsuranceCopy)
router.post('/police/getcases',checkAuthentication,checkPoliceOfficerAuthorization,getCases)
router.get('/getcases/:userId',checkAuthentication,checkCitizenuthorization,getCasesByUser)
router.post('/getuser',checkAuthentication,checkPoliceOfficerAuthorization,getUserByEmail)
router.put('/answercase',checkAuthentication,checkCitizenuthorization,answerToCases)
router.put('/police/review',checkAuthentication,checkPoliceOfficerAuthorization,uploadDocument,policeReviewCase)
router.put('/completecase',checkAuthentication,checkPoliceOfficerAuthorization,completeCase)
router.delete('/delete/officer/:userid',checkAuthentication,checkPoliceAdminAuthorization,deleteOfficer)



module.exports = router