import { useState, useEffect } from "react";
//import ReviewedDetailModal from "./actualLeaveReviewedDetailInformationModal";
import { formatTextDateInput } from "@/helpers/dateHelper";

const TerminatedCasesView = ({ reviewedData }) => {
    console.log(reviewedData);
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [dataAvailable, setDataAvailable] = useState(false)
    const [showLeaveDetails, setShowLeaveDetails] = useState(false)
    const [searchType, setSearchType] = useState({
        name: "Staff name",
        codeName: "empNames",
        role: "lineManager"
    })
    const [leaveDetails, setLeaveDetails] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        department: "",
        returnDate: "",
        actingPerson: "",
        daysTaken: "",
        managerRequestDate: "",
        manager: "",
        staff: "",
        supervisorrequestdate: "",
        supervisor: ""
    })
    const toggleShowLeaveDetails = () => {
        setShowLeaveDetails(!showLeaveDetails)
    }
    const initiateShowLeaveDetails = (leave) => {
        setLeaveDetails({
            leaveType: leave.actualLeave.leaveType,
            startDate: leave.actualLeave.startDate,
            endDate: leave.actualLeave.endDate,
            returnDate: leave.actualLeave.returnDate,
            daysTaken: leave.actualLeave.daysTaken,
            actingPerson: leave.actualLeave.actingPerson.names,
            managerRequestDate: leave.actualLeave.managerRequestDate,
            manager: leave.actualLeave.lineManagerApproval.lineManager.names,
            staff: leave.leaveInfo.staff.empNames,
            department: leave.leaveInfo.staff.department,
            supervisorrequestdate: leave.actualLeave.supervisorRequestDate,
            supervisor: leave.actualLeave.supervisorApproval.supervisor.names
        });
        setShowLeaveDetails(true);
    };
    const prepData = async () => {
        const dataStatus = [];
        let count = 0;
        for (let i = 0; i < reviewedData.length; i++) {
            console.log("hello");
            const reviewedCase = reviewedData[i]
            if (reviewedCase.caseStatus === "REVIEWED") {
                count++
                dataStatus.push(reviewedCase)
            }
        }
        console.log(dataStatus);
        if (count > 0) {
            setData(dataStatus);
            setDataAvailable(true)
        }
        else {
            setDataAvailable(false)
        }
    };
    useEffect(() => {
        prepData();
    }, [])

    // const filteredData = data.filter(searchedLeave => searchedLeave.leaveInfo.staff.empNames.toLowerCase().startsWith(search.toLowerCase()));
    return (
        <>
            <div className="font-monospace mt-1" style={{ width: "100%" }}>
                <div className="mx-1 mt-2">
                    {dataAvailable && <div className="d-flex justify-content-end">
                        <div className="mx-2 mt-2 mb-2">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i class="bi bi-search"></i>
                                    </span>
                                </div>
                                <input type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="form-control" placeholder="Search..." />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" onClick={() => toggleSearchType()}>
                                        <small>{searchType.name}</small>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div style={{ maxHeight: "375px", minHeight: "378px", overflowY: "auto" }}>
                        {dataAvailable ? <table className="table mt-3 table-hover" >
                            <thead>
                                <tr className="table-primary">
                                    <th>NO.</th>
                                    <th>Name</th>
                                    <th>Driving license</th>
                                    <th>car plate number</th>
                                    <th>Location</th>
                                    <th>Date of occurence</th>
                                    <th>Case status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((caseData, index) => (
                                    <tr key={index}>
                                        {/* Add the necessary columns based on your data */}
                                        <td>{index + 1}</td>
                                        <td>{caseData.participants[0].driver.firstname} {caseData.participants[0].driver.lastname}</td>
                                        <td>{caseData.participants[0].driver.drivingLicense}</td>
                                        <td><p className="d-flex justify-content-center">{caseData.participants[0].vehicleInfo.plateNo}</p></td>
                                        <td>{caseData.location.province}</td>
                                        <td>{formatTextDateInput(caseData.createdAt)}</td>
                                        <td><span className="badge rounded-pill bg-success">Completed review</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> : (<div>
                            <div className="d-flex justify-content-center mt-5">
                                <div className="d-flex flex-column">
                                    <i class="bi bi-exclamation-triangle" style={{ fontSize: "7rem", color: "#007bff" }} ></i>
                                    <p style={{ fontSize: '2rem' }} className="mt-3">No leave requests</p>
                                </div>
                            </div>
                        </div>)
                        }
                    </div>
                </div>
            </div>
            <div>
                {showLeaveDetails && <ReviewedDetailModal
                    modalIsOpen={showLeaveDetails}
                    toggleModal={toggleShowLeaveDetails}
                    data={leaveDetails}
                />}
            </div>
        </>
    )
}

export default TerminatedCasesView;
