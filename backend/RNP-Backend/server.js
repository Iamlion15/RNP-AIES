const express=require("express");
const cors=require("cors");
const userRoutes=require("./src/routes/userRoute")
const messageRoutes=require("./src/routes/chatRoute")
const caseRoute=require("./src/routes/caseRoute")
const dbConnect=require("./src/database/db")


const app=express();

dbConnect()

//middlewares
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/api/user",userRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/case",caseRoute)


const port=process.env.PORT || 6000
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
