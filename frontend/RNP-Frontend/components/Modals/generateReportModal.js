import { useState, useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";
import axios from "axios";
import CompleteCasesPDF from "@/helpers/casesPDF";
import PendingCasesPDF from "@/helpers/pendingCasesPDF";
import GenerateIndividualReport from "../policeOfficerComponent/generateIndividualReport";


const GenerateReportModal = ({ modalIsOpen, toggleModal, confirmHandler }) => {
    const [activateConfrim, setActivateConfirm] = useState(false);
    
    const [data, setData] = useState([])
    const [caseStatus, setCaseStatus] = useState("")
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
        role: ""
    });
    const [count, setCount] = useState()
    const [category, setCategory] = useState("")
    // const [activateDateChooser]
    const [activeTab, setActiveTab] = useState('Cases');
    useEffect(async () => {
        setDateRange({ startDate: "", endDate: "" })
    }, [])
    const dateHandler = async (value) => {
        setDateRange({ ...dateRange, endDate: value, role: JSON.parse(localStorage.getItem('user')).role })
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };
        try {
            const response = await axios.post("http://localhost:8000/api/statistics/casereport", { "status": category, "startDate": dateRange.startDate, "endDate": value }, config);
            setCount(response.data.allCases.length)
            setCaseStatus(response.data.caseStatus)
            setData(response.data.allCases)
        } catch (error) {
            console.log("error", error);
        }
    }
    const print = (e) => {
        e.preventDefault()
        if (caseStatus === "COMPLETE") {
            CompleteCasesPDF(data, dateRange)
        } else {
            PendingCasesPDF(data, dateRange)
        }
    }
    useEffect(() => {
        if (data.length > 0) {
            setActivateConfirm(true)
        }
        else {
            setActivateConfirm(false)
        }
    }, [data])
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size='md'>
            <div>
                <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">Detailed review report</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div className="mb-1">
                        <ul className="nav nav-pills" style={{ width: '100%', cursor: "pointer" }}>
                            <li
                                className={`nav-link text-dark ${activeTab === 'Cases' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Cases')}
                                style={{
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBottom: activeTab === 'Cases' ? '2px solid blue' : 'none',
                                    borderRadius: 0,
                                    backgroundColor: activeTab === 'Cases' ? '#ffffff' : '',
                                }}
                            >
                                Cases
                            </li>
                            <li
                                className={`nav-link text-dark ${activeTab === 'Individual' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Individual')}
                                style={{
                                    width: '50%',
                                    textAlign: 'center',
                                    borderBottom: activeTab === 'Individual' ? '2px solid blue' : 'none',
                                    borderRadius: 0,
                                    backgroundColor: activeTab === 'Individual' ? '#ffffff' : '',
                                }}
                            >
                                Individual reports
                            </li>
                        </ul>
                    </div>
                    {activeTab === "Cases" ? (<div>
                        <div className="d-flex flex-column">
                            <div className="px-3">
                                <p>choose category</p>
                                <select className="form-select form-select-sm" onChange={(e) => setCategory(e.target.value)}>
                                    <option > Choose</option>
                                    <option value="COMPLETE" >COMPLETE</option>
                                    <option value="PENDING">PENDING</option>
                                </select>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="mx-3 mt-3">
                                    <small className="d-block text-uppercase font-weight-bold mb-3">
                                        Start Date
                                    </small>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Date Picker Here"
                                        value={dateRange.startDate}
                                        onChange={(e) =>
                                            setDateRange({ ...dateRange, startDate: e.target.value })
                                        }
                                        disabled={category === ""}
                                    />
                                </div>
                                <div className="mx-3 mt-3">
                                    <small className="d-block text-uppercase font-weight-bold mb-3">
                                        End Date
                                    </small>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Date Picker Here"
                                        value={dateRange.endDate}
                                        onChange={(e) => dateHandler(e.target.value)}
                                        min={dateRange.startDate} // Set the minimum date based on Start Date
                                        disabled={!dateRange.startDate} // Disable if Start Date is not filled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {count >= 0 && <div className=" d-flex justify-content-start m-4">
                                    <p> count : {count}</p>
                                </div>}
                            </div>
                            <div className="col">
                                <div className=" d-flex justify-content-end m-4">
                                    <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                                    <button type="button" className={!activateConfrim ? "btn btn-light" : "btn btn-danger"} disabled={!activateConfrim} onClick={print}>Print</button>
                                </div>
                            </div>
                        </div>
                    </div>) : (<GenerateIndividualReport toggleModal={toggleModal} />)}
                </div>
            </div>
        </Modal>
    )
}

export default GenerateReportModal;