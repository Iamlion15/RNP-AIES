import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboardComponent/ApproversDashboardCard";
import axios from "axios";
import DoughnutChart from "@/components/reporting/dognut";
import Select from "react-select";
import CaseDoughnutChart from "@/components/reporting/caseReportDognut";


const Dashboard = () => {
    const [data, setData] = useState({
        answered: "",
        notanswered: "",
        complete:""
    })
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const user_id = JSON.parse(localStorage.getItem("loggedInUser"))._id
            const response = await axios.post("http://localhost:8000/api/statistics/statspercase",{userid:user_id}, config);
            console.log(response.data);
            setData({
                answered: response.data.answered,
                notanswered: response.data.notanswered,
                complete:response.data.complete
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <div className="row mt-5">
                <DashboardCard color="bg-warning" message="Not-answered case(s)" icon="bi-stopwatch" number={data.answered} />
                <DashboardCard color="bg-success" message="Answered case(s)" icon="bi-back mx-2" number={data.notanswered} />
                <DashboardCard color="bg-primary" message="police reviewed case(s)" icon="bi-file-earmark-check-fill" number={data.complete} />
            </div>
            <div className="row">
                <div className="col-6 mt-5">
                    <DoughnutChart statsdata={data}/>
                </div>
                <div className="col-6 mt-5">
                    <div className="row">
                        <div className="col-6">
                        <Select
                                    // onChange={(e) => setActualLeave({ ...actualLeave, actingPersonCode: e.value })}
                                    // options={listOfActingPerson.map((actingPerson) => ({
                                    //     value: actingPerson.empCode,
                                    //     label: actingPerson.empNames
                                    // }))}
                                />
                        </div>
                        <div className="col-6">
                        <CaseDoughnutChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Dashboard;