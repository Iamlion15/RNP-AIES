const express=require("express")
const {sendMessage,getMessagesBetweenUsers,getMessages,markAsRead}=require("../controller/messageController")
const checkAuthentication=require("../middlewares/checkAuthentication")

const router=express.Router();

router.post("/send",checkAuthentication,sendMessage)
router.post('/getchat',checkAuthentication,getMessagesBetweenUsers)
router.get('/getmessages',checkAuthentication,getMessages)
router.put("/markasread/:messageId", checkAuthentication, markAsRead);




module.exports=router;

