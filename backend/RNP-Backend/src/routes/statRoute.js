const express=require("express")
const {CountCitizenDocuments,countStatsPerDocument}=require("../controller/statisticsController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const {checkPoliceAdminAuthorization,checkPoliceOfficerAuthorization,checkCitizenuthorization}=require("../middlewares/checkAuthorization")
const router=express.Router();


router.post("/citizenstatistics",checkAuthentication,checkCitizenuthorization,CountCitizenDocuments)
router.post("/statspercase",checkAuthentication,checkCitizenuthorization,countStatsPerDocument)

module.exports=router;