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
import AnswerQuestions from "./answerQuestions";

const PendingCasesToAnswer = ({ token }) => {
    const [data, setData] = useState([])
    const [dataPresent, setDataPresent] = useState(false)
    const [search, setSearch] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [answering, setAnswering] = useState(false)
    const [answerCase, setAnswerCase] = useState()
    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
    }
    const toggleAnswering = () => {
        setAnswering(!answering)
    }
    const initiateDeleteLeaveModal = (actualLeaveIndex) => {
        setDeleteInfo({
            leaveid: leaveId,
            index: actualLeaveIndex
        })
        setShowDeleteModal(true)
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
            const response = await axios.get(`http://localhost:8000/api/case/getcases/${user_id}`, config);
            console.log(response.data);
            const pendingData = [];
            let count = 0
            if (response.data.dataPresent) {
                for (let i = 0; i < response.data.cases.length; i++) {
                    const pendingCases = response.data.cases[i]
                    console.log("pendingg",pendingCases);
                    if (pendingCases.ParticipantReportStatus === "pending") {
                        for (let a = 0; a < pendingCases.participants.length; a++) {
                            if (pendingCases.participants[a].driver._id === user_id) {
                                count++
                                pendingData.push(pendingCases)
                            }
                        }
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
    const handleAnswers = (caseData) => {
        setAnswerCase(caseData)
        setAnswering(true)
    }

    useEffect(() => {
        fetchData()
    }, [])

    //const filteredData = data.filter(searchedLeave => searchedLeave.leaveType.toLowerCase().startsWith(search.toLowerCase()));
    return (
        <>
            <div className="font-monospace mt-0" style={{ width: "110%" }}>
                <div className="card rounded-3 shadow-sm">
                    <table className="table table-borderless">
                        <thead>
                            <tr className="table-primary">
                                <td className="d-flex justify-content-center"><p>Pending cases </p></td>
                            </tr>
                        </thead>
                    </table>
                    {!answering ? <div className="mx-0 mt-1">
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
                                    </tr>
                                </thead>
                                <tbody style={{ cursor: "pointer" }}>
                                    {data.map((caseData, index) => {
                                        return (
                                            <tr key={caseData._id} onClick={() => handleAnswers(caseData)}>
                                                <td>{index + 1}</td>
                                                <td>{caseData.location.province},{caseData.location.district}</td>
                                                <td>{caseData.OPG.firstname} {caseData.OPG.lastname}</td>
                                                <td>{formatTextDateInput(caseData.createdAt)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table> : (<div>
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="d-flex flex-column">
                                        <i class="bi bi-exclamation-triangle" style={{ fontSize: "7rem", color: "#007bff" }} ></i>
                                        <p style={{ fontSize: '2rem' }} className="mt-3">No cases found</p>
                                    </div>
                                </div>
                            </div>)
                            }
                        </div>
                    </div> : <AnswerQuestions pendingCase={answerCase} />}
                </div>
                <div>
                    <ToastContainer />
                </div>
            </div>

        </>
    )
}

export default PendingCasesToAnswer;
