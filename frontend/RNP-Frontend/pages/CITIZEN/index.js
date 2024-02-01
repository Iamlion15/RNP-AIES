import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav from "@/components/citizenComponents/sideBar";
import CitizenHeaderComponent from "@/components/citizenComponents/citizenHeader";
import Dashboard from "./dashboard";
import Logout from "@/helpers/logout";
import MyRequests from "./myRequests";
import PendingCasesToAnswer from "./pendingCases";
import CompleteCasesToAnswer from "./completeCases";
import PoliceDecisionView from "./policeDecision";

const Index = () => {
    const [page, setPage] = useState("Dashboard")
    useEffect(() => {
        console.log(page);
    }, [page])
    return (
        <>
            <CitizenHeaderComponent page={page} logout={Logout} />
            <div className="row mx-1">
                <div className="col-3">
                    <SideNav page={page} setPage={setPage} logout={Logout}/>
                </div>
                <div className="col-8">

                    <div className="mt-4 p-4">
                        {page === "Dashboard" && (
                            <Dashboard />
                        )}
                        {page === 'Review Requests' && (
                            <MyRequests />
                        )}
                        {page === 'Pending cases' && (
                            <PendingCasesToAnswer />
                        )}
                        {page === 'Complete cases' && (
                            <CompleteCasesToAnswer />
                        )}
                        {page === 'Police decisions' && (
                            <PoliceDecisionView />
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}


export default Index