import { useState, useEffect, useRef } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { formatTextDateInput } from "../../helpers/dateHelper";
import ReviewCaseModal from "@/components/Modals/ReviewSceneModal";
import CompletedCaseDetailsModal from "@/components/Modals/completedCaseDetailsModal";

const FinalReportView = () => {
    const [data, setData] = useState([])
    const [dataPresent, setDataPresent] = useState(false)
    const [showReviewCaseModal, setShowReviewCaseModal] = useState(false)
    const [search, setSearch] = useState("")
    const [caseid, setCaseid] = useState()
    const [participants,setParticpants]=useState([])
    const [showDetails,setShowDetails]=useState(false)
    const toggleShowDetails=()=>{
        setShowDetails(!showDetails)
    }
    const initiateShowDetails=(casedata)=>{
        setParticpants(casedata.participants)
        setShowDetails(true)
    }
    const initiateReviewCase = (casedata) => {
        setCaseid(casedata._id)
        setShowReviewCaseModal(true)
    }
    const toggleReviewCaseModal = () => {
        setShowReviewCaseModal(!showReviewCaseModal)
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
            const response = await axios.post(`http://localhost:8000/api/case/police/getcases`,requestParams, config);
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

    useEffect(() => {
        fetchData()
    }, [showDetails])
    

    //const filteredData = data.filter(searchedLeave => searchedLeave.leaveType.toLowerCase().startsWith(search.toLowerCase()));
    return (
        <>
            <div className="font-monospace mt-0 mx-4" style={{ width: "100%" }}>
                <div className="card rounded-3  shadow-sm">
                    <div className="card-header">
                                <div className="d-flex justify-content-start"><p className="text-primary" style={{fontSize:"1.2em",fontWeight:"bold"}}>Final conclusion </p></div>
                    </div>
                    <div className="mx-0 mt-1">
                        {dataPresent && <div className="d-flex justify-content-end">
                            <div className="mx-0 mt-0 mb-2">
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
                                </div>
                            </div>
                        </div>}
                        <div style={{ maxHeight: "375px", minHeight: "378px", overflowY: "auto" }}>
                            {dataPresent ? <table className="table mt-3 table-hover">
                                <thead>
                                    <tr className="table-primary table-hover">
                                        <th>NO.</th>
                                        <th>Location</th>
                                        <th>OPG in charge</th>
                                        <th>Time of occurence</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody style={{ cursor: "pointer" }}>
                                    {data.map((caseData, index) => {
                                        return (
                                            <tr key={caseData._id} >
                                                <td>{index + 1}</td>
                                                <td>{caseData.location.province},{caseData.location.district}</td>
                                                <td>{caseData.OPG.firstname} {caseData.OPG.lastname}</td>
                                                <td>{formatTextDateInput(caseData.createdAt)}</td>
                                                <td>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" end>
                                                            <DropdownItem
                                                                onClick={() => initiateReviewCase(caseData)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                    <i className="bi bi-box-seam" style={{ fontWeight: "bold" }}></i>
                                                                    <strong><p className='mx-3 my-0 py-0 text-muted'>Review</p></strong>
                                                                </div>
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => initiateShowDetails(caseData)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                    <i className="bi bi-arrow-up-right-square" style={{ fontWeight: "bold" }}></i>
                                                                    <strong><p className='mx-3 my-0 py-0 text-muted'>Detailed Information</p></strong>
                                                                </div>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table> : (<div>
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-center"> <i className="bi bi-exclamation-triangle" style={{ fontSize: "7rem", color: "#007bff" }} ></i></div>
                                        <p style={{ fontSize: '2rem' }} className="mt-3">No cases found</p>
                                    </div>
                                </div>
                            </div>)
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <ToastContainer />
                </div>
                <div>
                    {showReviewCaseModal && <ReviewCaseModal
                        modalIsOpen={showReviewCaseModal}
                        toggleModal={toggleReviewCaseModal}
                        caseid={caseid}
                    />}
                </div>
                <div>
                    {showDetails && <CompletedCaseDetailsModal
                        modalIsOpen={showDetails}
                        toggleModal={toggleShowDetails}
                        data={participants}
                    />}
                </div>
            </div>

        </>
    )
}

export default FinalReportView;
