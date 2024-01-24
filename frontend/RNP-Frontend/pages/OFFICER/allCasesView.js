import { useState, useEffect } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import ChooseSearchType from "./chooseSearchTypeModal";
import 'react-toastify/dist/ReactToastify.css';
// import TerminatedCasesView from "./terminatedCaseView";

import { formatTextDateInput } from "../../helpers/dateHelper";



const AllCasesDashboard = () => {
    const [data, setData] = useState([])
    const [leaveData, setLeaveData] = useState([])
    const [currentStaff, setCurrentStaff] = useState();
    const [search, setSearch] = useState("")
    const [showSearchType, setShowSearchType] = useState(false)
    const [searchType, setSearchType] = useState({
        name: "Staff name",
        codeName: "empNames",
        role: "lineManager"
    })
    const [dataPresent, setDataPresent] = useState(false)
    const [activeTab, setActiveTab] = useState("Pending");
    const [showApproveRequestModal, setShowApproveRequestModal] = useState(false)
    const [showLeaveDetails, setShowLeaveDetails] = useState(false)
    const [approveData, setApproveData] = useState({
        leaveId: "",
        actualLeaveId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        returnDate: "",
        daysTaken: "",
        status: "",
        actingPerson: {
            names: "",
            empCode: ""
        },
        staff: {
            names: "",
            empCode: ""
        },
        comment: ""
    })
    const [leaveDetails, setLeaveDetails] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        department: "",
        returnDate: "",
        daysTaken: "",
        managerRequestDate: "",
        staff: "",
        supervisorrequestdate: "",
        supervisor: ""
    })
    const toggleApproveModal = () => {
        setShowApproveRequestModal(!showApproveRequestModal)
    }
    const toggleSearchType = () => {
        setShowSearchType(!showSearchType)
    }
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
            managerRequestDate: leave.actualLeave.managerRequestDate,
            staff: leave.leaveInfo.staff.empNames,
            department: leave.leaveInfo.staff.department,
            supervisorrequestdate: leave.actualLeave.supervisorRequestDate,
            supervisor: leave.actualLeave.supervisorApproval.supervisor.names
        });
        setShowLeaveDetails(true);
    };
    const initiateUpdateLeaveModal = (leave, actualLeaveIndex) => {
        setApproveData({
            leaveId: leave.leaveInfo.leaveid,
            actualLeaveId: leave.actualLeave._id,
            leaveType: leave.actualLeave.leaveType,
            startDate: leave.actualLeave.startDate,
            endDate: leave.actualLeave.endDate,
            returnDate: leave.actualLeave.returnDate,
            daysTaken: leave.actualLeave.daysTaken,
            actingPerson: {
                names: leave.actualLeave.actingPerson.names,
                empCode: leave.actualLeave.actingPerson.empCode
            },
            staff: {
                names: leave.leaveInfo.staff.empNames,
                empCode: leave.leaveInfo.staff.empCode
            }

        })
        setShowApproveRequestModal(!showApproveRequestModal)
    }
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
            console.log(user_id);
            const response = await axios.post("http://localhost:8000/api/case/getcases", requestParams, config);
            const pendingData = [];
            let count = 0
            if (response.data.dataPresent) {
                for (let i = 0; i < response.data.cases.length; i++) {
                    const pendingCases = response.data.cases[i]
                    if (pendingCases.caseStatus === "PENDING") {
                        count++
                        pendingData.push(pendingCases)
                    }
                }
                console.log(pendingData);
                if (count > 0 && response.data.dataPresent) {
                    setData(pendingData);
                    setDataPresent(true)
                }
                else {
                    setDataPresent(false)
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReview = async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }
        }
        try {
            await axios.put(`${API}/leave/actualleave/hrmanager/review`, approveData, config)
            toast.success("successfully reviewed!", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 5000
            });
            toggleApproveModal()
        } catch (error) {
            console.log(error)
            toast.error("Failure!", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 5000
            });
        }
    }

    useEffect(() => {
        fetchData()
    }, [showApproveRequestModal, showLeaveDetails])

    // const filteredData = data.filter(searchedLeave => {
    //     let nestedValue;
    //     if (searchType.codeName === "empNames" || searchType.codeName === "department") {
    //         nestedValue = searchedLeave.leaveInfo.staff[searchType.codeName];
    //     }
    //     else if (searchType.codeName === "leaveType") {
    //         nestedValue = searchedLeave.actualLeave[searchType.codeName];
    //     }
    //     return nestedValue && nestedValue.toLowerCase().startsWith(search.toLowerCase());
    // });
    return (
        <>
            <div className="font-monospace mt-0 mx-4" style={{ width: "100%" }}>
                <div className="card rounded-3 shadow-sm">
                    <table className="table table-borderless py-0">
                        <thead>
                            <tr className="table-primary">
                                <td className="d-flex justify-content-center">{activeTab === "Approved" ? <p>Approved leave request</p> : <p>Pending leave request</p>}</td>
                            </tr>
                        </thead>
                    </table>
                    <div className="mb-1">
                        <ul className="nav nav-pills" style={{ width: '100%', cursor: "pointer" }}>
                            <li
                                className={`nav-link text-dark ${activeTab === 'Pending' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Pending')}
                                style={{
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBottom: activeTab === 'Pending' ? '2px solid blue' : 'none',
                                    borderRadius: 0,
                                    backgroundColor: activeTab === 'Pending' ? '#ffffff' : '',
                                }}
                            >
                                Pending Cases
                            </li>
                            <li
                                className={`nav-link text-dark ${activeTab === 'Approved' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Approved')}
                                style={{
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBottom: activeTab === 'Approved' ? '2px solid blue' : 'none',
                                    borderRadius: 0,
                                    backgroundColor: activeTab === 'Approved' ? '#ffffff' : '',
                                }}
                            >
                                Terminated Cases
                            </li>
                        </ul>
                    </div>
                    {activeTab === "Pending" ? <div className="mx-1 mt-2">
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
                            {dataPresent ? <table className="table mt-3" >
                                <thead>
                                    <tr className="table-primary">
                                        <th>NO.</th>
                                        <th>Name</th>
                                        <th>Driving license</th>
                                        <th>car plate number</th>
                                        <th>Drunk</th>
                                        <th>Location</th>
                                        <th>Date of occurence</th>
                                        <th>Case status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {data.map((caseData, index) => (
                                            caseData.participants.map((scenario, participantIndex) => (
                                                <tr key={`${index}-${participantIndex}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{scenario.driver.firstname} {scenario.driver.lastname}</td>
                                                    <td>{scenario.driver.drivingLicense}</td>
                                                    <td ><p className="d-flex justify-content-center">{scenario.vehicleInfo.plateNo}</p></td>
                                                    <td>{scenario.drunk ? 'Yes' : 'No'}</td>
                                                    <td>{caseData.location.province}</td>
                                                    <td>{formatTextDateInput(caseData.createdAt)}</td>
                                                    <td><span className="badge rounded-pill bg-warning">Pending</span></td>
                                                    <td className="">
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <i class="bi bi-three-dots-vertical"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                onClick={() => showModifyData(question)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                    <i className="bi bi-box-seam" style={{fontWeight:"bold"}}></i>
                                                                    <strong><p className='mx-3 my-0 py-0 text-muted'>Update</p></strong>
                                                                </div>
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => showDeleteData(question._id)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                <i className="bi bi-trash" style={{fontWeight:"bold"}}></i>
                                                                    <strong><p className='mx-3 my-0 py-0 text-muted'>Delete</p></strong>
                                                                </div>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                                </tr>
                                            ))
                                        ))}
                                </tbody>
                            </table> : (<div>
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="d-flex flex-column">
                                        <i class="bi bi-exclamation-triangle" style={{ fontSize: "7rem", color: "#007bff" }} ></i>
                                        <p style={{ fontSize: '2rem' }} className="mt-3">No pending cases</p>
                                    </div>
                                </div>
                            </div>)
                            }
                        </div>
                    </div> : <AllCasesDashboard />}
                </div>
                {/* <div>
                    {showApproveRequestModal && <HRManagerReviewRequest
                        modalIsOpen={showApproveRequestModal}
                        toggleModal={toggleApproveModal}
                        data={approveData}
                        token={token}
                        setData={setApproveData}
                        handleReview={handleReview}

                    />}
                </div>
                <div>
                    {showLeaveDetails && <ActualLeaveRequestDetails
                        modalIsOpen={showLeaveDetails}
                        toggleModal={toggleShowLeaveDetails}
                        data={leaveDetails}
                    />}
                </div>
                <div>
                    {showSearchType && <ChooseSearchType
                        modalIsOpen={showSearchType}
                        toggleModal={toggleSearchType}
                        data={searchType}
                        setData={setSearchType}
                    />}
                </div> */}
                <div>
                    <ToastContainer />
                </div>
            </div>

        </>
    )
}

export default AllCasesDashboard;
