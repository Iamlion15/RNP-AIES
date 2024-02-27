const express=require("express")
const {CountCitizenDocuments,countStatsPerDocument,countOfficerStatistics,calculateCasesPerMonth,adminStats,casesReportDocument,IndividualReportDocument,vehicleReport}=require("../controller/statisticsController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const {checkPoliceAdminAuthorization,checkPoliceOfficerAuthorization,checkCitizenuthorization}=require("../middlewares/checkAuthorization")
const router=express.Router();


router.post("/citizenstatistics",checkAuthentication,checkCitizenuthorization,CountCitizenDocuments)
router.get("/adminstatistics",checkAuthentication,checkPoliceAdminAuthorization,adminStats)
router.post("/statspercase",checkAuthentication,checkCitizenuthorization,countStatsPerDocument)
router.post("/officerstatistics",checkAuthentication,checkPoliceOfficerAuthorization,countOfficerStatistics)
router.post("/statspermonth",checkAuthentication,checkPoliceOfficerAuthorization,calculateCasesPerMonth)
router.get("/adminstatspermonth",checkAuthentication,checkPoliceAdminAuthorization,calculateCasesPerMonth)
router.post("/casereport",checkAuthentication,casesReportDocument)
router.post("/individualreport",checkAuthentication,IndividualReportDocument)
router.get("/vehiclereport",checkAuthentication,checkCitizenuthorization,vehicleReport)
module.exports=router;