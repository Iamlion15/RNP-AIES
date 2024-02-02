const express=require("express")
const {CountCitizenDocuments,countStatsPerDocument,countOfficerStatistics,calculateCasesPerMonth,adminStats}=require("../controller/statisticsController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const {checkPoliceAdminAuthorization,checkPoliceOfficerAuthorization,checkCitizenuthorization}=require("../middlewares/checkAuthorization")
const router=express.Router();


router.post("/citizenstatistics",checkAuthentication,checkCitizenuthorization,CountCitizenDocuments)
router.get("/adminstatistics",checkAuthentication,checkPoliceAdminAuthorization,adminStats)
router.post("/statspercase",checkAuthentication,checkCitizenuthorization,countStatsPerDocument)
router.post("/officerstatistics",checkAuthentication,checkPoliceOfficerAuthorization,countOfficerStatistics)
router.post("/statspermonth",checkAuthentication,checkPoliceOfficerAuthorization,calculateCasesPerMonth)
router.get("/adminstatspermonth",checkAuthentication,checkPoliceAdminAuthorization,calculateCasesPerMonth)
module.exports=router;