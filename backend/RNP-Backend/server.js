const express=require("express");
const cors=require("cors");
const userRoutes=require("./src/routes/userRoute")
const caseRoute=require("./src/routes/caseRoute")
const statRoute=require("./src/routes/statRoute")
const dbConnect=require("./src/database/db")


const app=express();

dbConnect()

//middlewares
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/api/user",userRoutes)
app.use("/api/case",caseRoute)
app.use("/api/statistics",statRoute)

const port=process.env.PORT || 6000
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
