import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboardComponent/ApproversDashboardCard";
import axios from "axios";
import LineChart from "@/components/reporting/adminLineChart";


const Dashboard = () => {
    const [data, setData] = useState({
        OGP: "",
        cases: "",
        closed: ""
    })
    const [statspermonth, setStatspermonth] = useState([])
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const user_id = JSON.parse(localStorage.getItem("loggedInUser"))._id
            const response = await axios.get("http://localhost:8000/api/statistics/adminstatistics", config);
            const responsestats = await axios.get("http://localhost:8000/api/statistics/adminstatspermonth", config);
            setStatspermonth(responsestats.data)
            console.log(responsestats.data);
            setData({
                closed: response.data.closedcases,
                cases: response.data.numberOfCases,
                OGP: response.data.numberofOGP
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
        <div style={{ marginLeft: "24px" }}>
            <div className="row mt-0" >
                <DashboardCard color="bg-warning" message="total number of OGP" icon="bi-stopwatch" number={data.OGP} />
                <DashboardCard color="bg-success" message="total number of cases" icon="bi-back mx-2" number={data.cases} />
                <DashboardCard color="bg-primary" message="total number of closed case(s)" icon="bi-file-earmark-check-fill" number={data.closed} />
            </div>
            <div className="row">
                <div className="col-10 mt-5">
                <LineChart statspermonth={statspermonth}/>
                </div>
            </div>
            </div>
        </>
    )
}



export default Dashboard;