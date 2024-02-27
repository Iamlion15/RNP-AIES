import { useState, useEffect } from "react";
import axios from "axios";
import IndividualCasePDF from "@/helpers/IndividualParticipantsPDF";


const GenerateIndividualReport = ({toggleModal}) => {
    const [data, setData] = useState([])
    const [activateConfrim, setActivateConfirm] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
        role: ""
    });
    const [count, setCount] = useState()
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
            const response = await axios.post("http://localhost:8000/api/statistics/individualreport", {"startDate": dateRange.startDate, "endDate": value }, config);
            setCount(response.data.allCases.length)
            setData(response.data.allCases)
            console.log(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }
    const print = (e) => {
        e.preventDefault()
        IndividualCasePDF(data, dateRange)
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
        <>
            <div className="d-flex flex-column">
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
                    {count && <div className=" d-flex justify-content-start m-4">
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
        </>
    )
}
export default GenerateIndividualReport