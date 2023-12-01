import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminSideNav from "@/components/adminDashboard/adminSideNav";
import Logout from "@/helpers/logout";
import HeaderComponent from "@/components/Header/Header";
import AddOfficer from "./addOfficer";
import PoliceOfficersView from "./policeOfficersView";
import Messages from "./Messages";




const Index = () => {
    const [page, setPage] = useState("Dashboard")

    useEffect(() => {
        console.log(page);
    }, [page])
    return (
        <>
            <div className="row" style={{ backgroundColor: "#F8F8F8", height: "100vh" }}>
                <div className="col-2">
                    <AdminSideNav setPage={setPage} logout={Logout}/>
                    </div>
                <div className="col-10">
                    <HeaderComponent page={page} logout={Logout} style={{ width: '100%' }}/>
                    <div className="mt-4 p-4">  
                        {page === "Add officer" && (
                            <AddOfficer  style={{ width: '100%' }}/>
                        )}
                         {page === "Police officers" && (
                            <PoliceOfficersView  style={{ width: '100%' }}/>
                        )}
                        {page === "Messages" && (
                            <Messages  style={{ width: '100%' }}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Index