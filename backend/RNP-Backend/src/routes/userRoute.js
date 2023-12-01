const express=require("express")
const {addUser,getUsers,loginUser,updateUser,checkPassword,updateUserPassword,updateOfficer}=require("../controller/userController")
const checkAuthentication=require("../middlewares/checkAuthentication")
const {checkPoliceAdminAuthorization,checkPoliceOfficerAuthorization}=require("../middlewares/checkAuthorization")

const router=express.Router();


router.post("/login",loginUser)
router.post("/update",checkAuthentication,updateUser)
router.post("/checkpassword",checkAuthentication,checkPassword)
router.post("/updatepassword",checkAuthentication,updateUserPassword)
router.post("/save",checkAuthentication,checkPoliceAdminAuthorization,addUser)
router.get("/getofficers",checkAuthentication,checkPoliceAdminAuthorization,getUsers)
router.post("/updateofficer",checkAuthentication,checkPoliceAdminAuthorization,updateOfficer)




module.exports=router;