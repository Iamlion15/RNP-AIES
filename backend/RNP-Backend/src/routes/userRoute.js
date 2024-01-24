const express=require("express")
const {addUser,getUsers,loginUser,updateUser,checkPassword,updateUserPassword,updateOfficer,checkEmail,createCitizenPassword}=require("../controller/userController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const {checkPoliceAdminAuthorization,checkPoliceOfficerAuthorization}=require("../middlewares/checkAuthorization")

const router=express.Router();


router.post("/login",loginUser)
router.post("/update",checkAuthentication,updateUser)
router.post("/checkpassword",checkAuthentication,checkPassword)
router.post("/checkemail",checkEmail)
router.post("/updatepassword",checkAuthentication,updateUserPassword)
router.post("/activatepassword",createCitizenPassword)
router.post("/save",checkAuthentication,checkPoliceAdminAuthorization,addUser)
router.get("/getofficers",checkAuthentication,checkPoliceAdminAuthorization,getUsers)
router.post("/updateofficer",checkAuthentication,checkPoliceAdminAuthorization,updateOfficer)




module.exports=router;