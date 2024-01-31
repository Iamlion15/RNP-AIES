import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboardComponent/ApproversDashboardCard";
import axios from "axios";
import DoughnutChart from "@/components/reporting/dognut";
import LineChart from "@/components/reporting/lineChart";


const Dashboard = () => {
    const [data, setData] = useState({
        pending: "",
        approved: ""
    })
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:5000/api/document/rsbstatistics", config);
            console.log(response.data);
            setData({
                pending: response.data.pending,
                approved: response.data.approved,
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <div className="row mt-5">
                <DashboardCard color="bg-warning" message="Not-answered case(s)" icon="bi-stopwatch" number={data.pending} />
                <DashboardCard color="bg-success" message="Answered case(s)" icon="bi-file-earmark-check-fill" number={data.approved} />
                <DashboardCard color="bg-primary" message="Complete police decision case(s)" icon="bi-file-earmark-check-fill" number={data.approved} />
            </div>
            <div className="row mt-5">
                <div className="col-6">
                <DoughnutChart/>
                </div>
                <div className="col-6">
                <LineChart/>
                </div>
            </div>
        </>
    )
}



export default Dashboard;