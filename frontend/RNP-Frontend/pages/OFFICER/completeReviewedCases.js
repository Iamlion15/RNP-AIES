import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { formatTextDateInput } from "../../helpers/dateHelper";
import DetailedInformation from "./DetailedInformation";

const CompletedReviewAndAnswering = ({ token }) => {
    const [data, setData] = useState([])
    const [renderedRowCount, setRenderedRowCount] = useState(0);
    const [dataPresent, setDataPresent] = useState(false)
    const [search, setSearch] = useState("")
    const [showDetails, setShowDetails] = useState(false)
    const [detaildata, setDetailData] = useState()
    const [caseDetails, setCaseDetails] = useState({
        caseid: "",
        createdAt: ""
    })
    const [searchType, setSearchType] = useState({
        name: "Staff name",
        codeName: "empNames",
        role: "lineManager"
    })

    const fetchData = async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };

        try {
            const user_id = JSON.parse(localStorage.getItem("loggedInUser"))._id
            const requestParams = {
                OPG: user_id
            }
            const response = await axios.post("http://localhost:8000/api/case/police/getcases", requestParams, config);
            const dataStatus = [];
            let count = 0
            if (response.data.dataPresent) {
                for (let i = 0; i < response.data.cases.length; i++) {
                    const reviewedCase = response.data.cases[i]
                    if (reviewedCase.caseStatus === "PENDING") {
                        count++
                        dataStatus.push(reviewedCase)

                    }
                }
                console.log(dataStatus);
                if (count > 0) {
                    setData(dataStatus);
                    let innerCounter = 0
                    let howManyParticipants = 0;
                    for (let i = 0; i < dataStatus.length; i++) {
                        console.log("participant", dataStatus[i].participants.length);
                        for (let a = 0; a < dataStatus[i].participants.length; a++) {
                            let howManyParticipants = howManyParticipants + dataStatus[i].participants.length;
                            const participant = dataStatus[i].participants[a];
                            if (participant.ReportStatus === "answered" && participant.caseStatus === "PENDING") {
                                innerCounter++
                            }
                        }
                    }
                    if (innerCounter === howManyParticipants) {
                        setDataPresent(false)
                    }
                    else {
                        setDataPresent(true)
                    }
                }
                else {
                    setDataPresent(false)
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [showDetails])
    const toggleShowDetails = () => {
        setShowDetails(!showDetails)
    }
    const initiateDetails = (participant, casedata) => {
        console.log(casedata);
        setCaseDetails({
            caseid: casedata._id,
            createdAt: casedata.createdAt
        })
        setDetailData(participant)
        setShowDetails(true)
    }

    //const filteredData = data.filter(searchedLeave => searchedLeave.leaveType.toLowerCase().startsWith(search.toLowerCase()));
    return (
        <>
            <div className="font-monospace mt-0 mx-4" style={{ width: "100%" }}>
                <div className="card rounded-3 shadow-sm">
                    <table className="table table-borderless">
                        <thead>
                            <tr className="table-primary">
                                <td className="d-flex justify-content-center"><p>Pending cases </p></td>
                            </tr>
                        </thead>
                    </table>
                    {!showDetails ? <div className="mx-0 mt-1">
                        {dataPresent && <div className="d-flex justify-content-end">
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
                            {dataPresent ? <table className="table mt-3 table-hover">
                                <thead>
                                    <tr className="table-primary">
                                        <th>NO.</th>
                                        <th>Name</th>
                                        <th>Driving license</th>
                                        <th>car plate number</th>
                                        <th>Location</th>
                                        <th>Date of occurence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((caseData, index) => {
                                        let renderedRowCount = 0;
                                        return caseData.participants.map((participant, participantIndex) => (
                                            participant.ReportStatus==="answered"&& participant.caseStatus==="PENDING"&&
                                            (<tr key={`${index}-${participantIndex}`} style={{cursor:"pointer"}} onClick={()=>initiateDetails(participant,caseData)}>
                                                <td>{++renderedRowCount}</td>
                                                <td>{participant.driver.firstname} {participant.driver.lastname}</td>
                                                <td>{participant.driver.drivingLicense}</td>
                                                <td><p className="d-flex justify-content-center">{participant.vehicleInfo.plateNo}</p></td>
                                                <td>{caseData.location.province}</td>
                                                <td>{formatTextDateInput(caseData.createdAt)}</td>
                                            </tr>)
                                        ))
                                    })}
                                </tbody>
                            </table> : (<div>
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex justify-content-center"> <i class="bi bi-exclamation-triangle" style={{ fontSize: "7rem", color: "#007bff" }} ></i></div>
                                        <p style={{ fontSize: '2rem' }} className="mt-3">No complete case found</p>
                                    </div>
                                </div>
                            </div>)
                            }
                        </div>
                    </div> : <DetailedInformation data={detaildata} caseDetails={caseDetails} toggleShowDetails={toggleShowDetails} />}
                </div>
                <div>
                    <ToastContainer />
                </div>
            </div>

        </>
    )
}

export default CompletedReviewAndAnswering;
