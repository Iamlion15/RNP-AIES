import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import PoliceSideNav from "@/components/policeOfficerDashboard/policeSideNav"; 
import Logout from "@/helpers/logout";
import HeaderComponent from "@/components/Header/Header";
import CaseScenario from "./caseScenario";
import AllCasesDashboard from "./allCasesView";
import CompletedReviewAndAnswering from "./completeReviewedCases";
import FinalReportView from "./finalReport";
import CasesHistoryview from "./CaseHistory";




const Index = () => {
    const [page, setPage] = useState("Dashboard")

    useEffect(() => {
        console.log(page);
    }, [page])
    return (
        <>
            <div className="row" style={{ backgroundColor: "#F8F8F8", height: "100vh" }}>
                <div className="col-2">
                    <PoliceSideNav setPage={setPage} logout={Logout}/>
                    </div>
                <div className="col-10">
                    <HeaderComponent page={page} logout={Logout} style={{ width: '100%' }}/>
                    <div className="mt-4 p-4">  
                        {page === "Review scene" && (
                            <CaseScenario  style={{ width: '100%' }}/>
                        )}
                         {page === "Complete review" && (
                            <CompletedReviewAndAnswering  style={{ width: '100%' }}/>
                        )}
                        {page === "CASES" && (
                            <AllCasesDashboard  style={{ width: '100%' }}/>
                        )}
                         {page === "FINAL REPORT" && (
                            <FinalReportView  style={{ width: '100%' }}/>
                        )}
                         {page === "CASE HISTORY" && (
                            <CasesHistoryview  style={{ width: '100%' }}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Index