import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboardComponent/officerDashboardCard";
import axios from "axios";
import DoughnutChart from "@/components/reporting/officerDognut";
import LineChart from "@/components/reporting/lineChart";


const Dashboard = () => {
    const [data, setData] = useState({
        completed: "",
        closed: "",
        pending: "",
        total:""
    })
    const [selectedCase, setSelectedCase] = useState()
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
            const response = await axios.post("http://localhost:8000/api/statistics/officerstatistics", { userid: user_id }, config);
           const responsestats = await axios.post("http://localhost:8000/api/statistics/statspermonth", { userid: user_id }, config);
            setStatspermonth(responsestats.data)
            setData({
                completed: response.data.reviewedCases,
                pending: response.data.pendingCases,
                closed: response.data.closedCases,
                total:response.data.numberOfCases
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <div style={{ marginLeft: "20px" }}>
                <div className="row mt-0">
                    <DashboardCard color="bg-warning" message="Pending case(s)" icon="bi-stopwatch" number={data.pending} />
                    <DashboardCard color="bg-success" message=" Completely reviewed" icon="bi-back mx-2" number={data.completed} />
                    <DashboardCard color="bg-primary" message="closed case(s)" icon="bi-file-earmark-check-fill" number={data.closed} />
                    <DashboardCard color="bg-primary" message="How many cases(s)" icon="bi-file-earmark-check-fill" number={data.total} />
                </div>
                <div className="row">
                    <div className="col-5 mt-5">
                        <DoughnutChart statsdata={data} />
                    </div>
                    <div className="col-6 mt-5" style={{marginRight:"10px"}}>
                        <LineChart statspermonth={statspermonth}/>
                    </div>
                </div>
                </div>
            </>
            )
}



            export default Dashboard;