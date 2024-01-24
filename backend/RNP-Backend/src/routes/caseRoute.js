const router = require("express").Router();
const checkAuthentication = require("../middlewares/checkAuthentication")
const uploadDocument = require("../middlewares/uploadDocument")
const { checkPoliceAdminAuthorization,checkPoliceOfficerAuthorization} = require("../middlewares/checkAuthorization")


const {  startCase,addQuestions,getCases,ListOfQuestions,UpdateQuestion,deleteQuestion} = require("../controller/caseController")


router.post("/startcase", checkAuthentication, checkPoliceOfficerAuthorization, startCase)
router.post('/addquestion',checkAuthentication,checkPoliceAdminAuthorization,addQuestions)
router.get('/get/questions',checkAuthentication,checkPoliceAdminAuthorization,ListOfQuestions)
router.delete('/delete/question/:questionid',checkAuthentication,checkPoliceAdminAuthorization,deleteQuestion)
router.post('/update/question/:questionid',checkAuthentication,checkPoliceAdminAuthorization,UpdateQuestion)
router.post('/getcases',getCases)



module.exports = router