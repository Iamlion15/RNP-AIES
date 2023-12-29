import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import StartCase from "@/components/policeOfficerComponent/startCase";
import CaseDetails from "@/components/policeOfficerComponent/caseDetails";
import TestDetailCase from "@/components/policeOfficerComponent/testDetails";
import ParticipantDrunkTest from "@/components/policeOfficerComponent/participantsDrunkTest";

const CaseScenario = () => {
    const [step, setStep] = useState(1)
    const [selectedOption, setSelectedOption] = useState(null);
    const [proceed,setProceed]=useState(false)
    const [locationDetails, setLocationDetails] = useState({
        province: "",
        district: "",
        sector: "",
        cell: ""
    })
    const [data, setData] = useState([{
        plateNo: "",
        insuranceProvider: "",
        insuranceNumber: "",
        drunkTest: "",
        owner: {
            firstname: "",
            lastname: "",
            nID: "",
            email: "",
            drivingLicense: ""

        }
    }])
    const toastId = useRef(null)
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const startCaseScenario = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("LOADING............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        const serverData = {
            location: locationDetails,
            drunk: selectedOption === "yes" ? true : false,
            participantsDetails: data
        }
        try {
            const response = await axios.post("http://localhost:8000/api/case/startcase", serverData, config)
            toast.update(toastId.current, { render: "Successfully saved", type: toast.TYPE.SUCCESS, autoClose: 2000 })
        } catch (error) {
            toast.update(toastId.current, { render: "Error in saving", type: toast.TYPE.ERROR, autoClose: 2000 })
            console.log(error);
        }
    }

    return (
        <>
            <div className="card shadow mx-5" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="card-header bg-primary">
                    <div className="d-flex justify-content-center ">
                        {step === 1 && <p className="text-white m-0 p-0" style={{ fontSize: "1.7em" }}>Start case</p>}
                        {step == 2 && <p className="text-white m-0 p-0" style={{ fontSize: "1.7em" }}>Detailed description</p>}
                        {step === 3 && <p className="text-white m-0 p-0" style={{ fontSize: "1.7em" }}>Metrics</p>}
                    </div>
                </div>
                <div className="card mx-3 my-3 shadow border-light">
                    < div className="row my-3">
                        <div className="col" style={{ marginLeft: "10px" }}>
                            <div className="row">
                                <div className="col">
                                    <i className="bi bi-1-circle" style={{ fontSize: step === 1 ? '1.8em' : '1.7em', fontWeight: 'bold', color: step === 1 ? 'blue' : '' }}></i>
                                </div>
                                <div className="col mt-1">
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex justify-content-center" >
                            <i className="bi bi-2-circle" style={{ fontSize: step === 2 ? '1.8em' : '1.7em', fontWeight: 'bold', color: step === 2 ? 'blue' : '' }}></i>
                        </div>
                        <div className="col" style={{ marginLeft: "10px" }}>
                            <div className="row">
                                <div className="col mt-1">
                                    <hr />
                                </div>
                                <div className="col d-flex justify-content-center" style={{ marginLeft: "10px" }}>
                                    <i className="bi bi-3-circle" style={{ fontSize: step === 3 ? '1.8em' : '1.7em', fontWeight: 'bold', color: step === 3 ? 'blue' : '' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    {step === 1 && <StartCase locationDetails={locationDetails} setLocationDetails={setLocationDetails} nextStep={nextStep} />}
                    {step === 2 && <CaseDetails data={data} setData={setData}  setProceed={setProceed} />}
                    {step === 3 && <ParticipantDrunkTest setSelectedOption={setSelectedOption} selectedOption={selectedOption} prevStep={prevStep} data={data} setData={setData} startCaseScenario={startCaseScenario} />}
                </div>

                <div>
                    <ToastContainer />
                </div>
                {step > 1 &&
                    <div className="card-footer">
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary btn-sm" onClick={prevStep}>Previous</button>
                            </div>
                            {step === 2 &&proceed&&< div className="col">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary btn-sm" onClick={nextStep}>Next</button>
                            </div>
                        </div>}
                    </div>
                    </div>
                }
        </div >
        </>
    );
};

export default CaseScenario;
