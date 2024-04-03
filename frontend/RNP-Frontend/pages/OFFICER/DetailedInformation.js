import { useEffect, useState } from "react";
import { formatTextDateInput } from "@/helpers/dateHelper";
import AnsweredQuestionView from "@/components/Modals/answeredQuestions";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const DetailedInformation = ({ data, caseDetails, toggleShowDetails }) => {
    const [moreInformation, setMoreInformation] = useState({
        cause: "",
        shortStatement: ""
    });
    const [drunkTest, setDrunkTest] = useState(false)
    const [showAnswersModal, setShowAnswersModal] = useState(false);
    const toggleShowAnswers = () => {
        setShowAnswersModal(!showAnswersModal)
    }
    const handleCompleteCase = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };
        const requestParams = {
            conclusion: moreInformation,
            caseid: caseDetails.caseid,
            participantid: data._id
        }

        try {
            const response = await axios.put("http://localhost:8000/api/case/completecase", requestParams, config);
            toast.success("successfully answered to the question data!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
            toggleShowDetails()
        } catch (error) {
            console.log(error);
            toast.error("Failure!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
        }
    }
    useEffect(() => {
        if (data.drunk === true) {
            setDrunkTest(true)
            setMoreInformation({ ...moreInformation, cause: "Drunk" })
        }
        else {
            setDrunkTest(false)
        }
    }, [])
    const goBackToDefaultValue = (e) => {
        e.preventDefault()
        setDrunkTest(true)
        setMoreInformation({ ...moreInformation, cause: "Drunk" })
    }
    return (
        <>
            <div>
                <table className="table mt-0">
                    {/* <thead>
                        <tr className="table-primary">
                            <th>DETAILED INFORMATION OF THE case</th>
                        </tr>
                    </thead> */}
                </table>
                <table className="table table-borderless font-monospace">
                    <tbody>
                        <tr>
                            <td>Participant names :</td>
                            <td>{data.driver.firstname} {data.driver.lastname}</td>
                        </tr>
                        <tr>
                            <td>Car plate number:</td>
                            <td>{data.vehicleInfo.plateNo} </td>
                        </tr>
                        <tr>
                            <td>Car insurance provider:</td>
                            <td>{data.vehicleInfo.insuranceNumber} </td>
                        </tr>
                        {/* <tr>
                            <td>Drunk test :</td>
                            <td>{data.item.itemType} </td>
                        </tr> */}
                        <tr>
                            <td>Time of occurence :</td>
                            <td>{formatTextDateInput(caseDetails.createdAt)}</td>
                        </tr>
                        <tr>
                            <td>Answered questions:</td>
                            <td><button className="btn btn-primary btn-sm" onClick={() => toggleShowAnswers()}>View answers to questions</button> </td>
                        </tr>
                        <tr>
                            <td>Whats the primarily cause of this accident :</td>
                            <td>
                                {drunkTest ? <div>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" defaultValue="Drunk" disabled={true} />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => setDrunkTest(false)}>Modify</button>
                                        </div>
                                    </div>
                                </div>
                                    :
                                    <div>
                                        <div className="form-group">
                                            <select className="form-select" value={moreInformation.cause} onChange={(e) => setMoreInformation({ ...moreInformation, cause: e.target.value })}>
                                                <option >Choose</option>
                                                <option value="overspeeding">Overspeeding</option>
                                                <option value="car mantanaince issue">Car maintanaince problem</option>
                                                <option value="uburangare">Uburangare</option>
                                            </select>
                                        </div>
                                        {data.drunk && <button className="btn btn-sm btn-primary" onClick={goBackToDefaultValue}>Default value</button>}
                                    </div>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Officer statement:</td>
                            <td>
                                <div className="form-floating mt-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Officer observation"
                                        id="observation"
                                        style={{ height: "100px", width: "450px" }}
                                        value={moreInformation.shortStatement}
                                        required
                                        onChange={(e) => setMoreInformation({ ...moreInformation, shortStatement: e.target.value })}
                                    ></textarea>

                                    <label htmlFor="purpose">Police officer short statement</label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={handleCompleteCase}>Complete case</button>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    {showAnswersModal && <AnsweredQuestionView
                        toggleModal={toggleShowAnswers}
                        modalIsOpen={showAnswersModal}
                        questions={data.answers}
                    />}
                </div>

            </div>
        </>
    );
};

export default DetailedInformation;
