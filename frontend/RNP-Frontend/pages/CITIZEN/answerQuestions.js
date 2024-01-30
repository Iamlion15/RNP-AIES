import React, { useEffect, useState, } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { formatTextDateInput } from "../../helpers/dateHelper";
import axios from "axios";

const AnswerQuestions = ({ pendingCase }) => {
    const [data, setData] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [answerData, setAnswerData] = useState([{
        answer: ""
    }]);
    const [dataPresent, setDataPresent] = useState(false);
    const [caseAnswer,setCaseAnswer]=useState()
    const [editRows, setEditRows] = useState([]);
    const initialiseData = async () => {
        let questions = []
        const user_id = JSON.parse(localStorage.getItem("loggedInUser"))._id
        for (let i = 0; i < pendingCase.participants.length; i++) {
            if (pendingCase.participants[i].driver._id === user_id) {
                for (let answers of pendingCase.participants[i].answers) {
                    questions.push(answers)
                    setCaseAnswer({caseid:pendingCase._id,participantId:pendingCase.participants[i]._id})
                }
            }
        }
        if (questions.length > 0) {
            setData(questions)
            setDataPresent(true)
            console.log(questions);
        }
        else {
            setDataPresent(false)
        }
    }
    useEffect(async () => {
        initialiseData()
    }, []);
    const handleChange = (index, value) => {
        const newData = [...answerData];
        newData[index].answer = value;
        setAnswerData(newData);
    };

    const handleModifyClick = (index) => {
        setEditRows((prevEditRows) => {
            const updatedEditRows = [...prevEditRows];
            updatedEditRows[index] = !updatedEditRows[index];
            setAnswerData((prevAnswerData) => {
                const answers = [...prevAnswerData];
                answers[index] = { ...data[index], answer: data[index].answer };
                return answers;
            });
            return updatedEditRows;
        });
    };

    const handleUpdateAll = async () => {
        let updateArray = [];
        updateData = updateData.filter(date => date !== undefined).filter(date => date.comment !== "")
        for (let i = 0; i < updateData.length; i++) {
            let isDuplicate = false;
            for (let a = 0; a < data.length; a++) {
                if (
                    updateData[i].comment === data[a].comment &&
                    formatTextDateInput(updateData[i].day) === formatTextDateInput(data[a].day)
                ) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                updateArray.push(updateData[i]);
            }
        }
        console.log("update array", updateArray);
        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await axios.put(`${API}/leave/offdays/updatemany`, updateArray, config);
            toast.success("successfully updated data!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
            setEditRows(prevEditRows => {
                const updatedEditRows = prevEditRows.map((value, index) => {
                    return editRows[index] ? false : value;
                });
                return updatedEditRows;
            });
            fetchData()

        } catch (error) {
            console.log(error);
            toast.error("Failed to update dates!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
        }
    };

    const handleAnswerOne = async (dataToAnswer,index) => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };
        const requestAnswers={
            answers:dataToAnswer,
            case:caseAnswer
        }
        try {
            const response = await axios.put("http://localhost:8000/api/case/answercase", requestAnswers, config);
            data[index].answer = answerData[index].answer;
            handleModifyClick(index)
            toast.success("successfully answered to the question data!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });

        } catch (error) {
            console.log(error);
            toast.error("Failed to update dates!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
        }
    }

    return (
        <div className="mt-1 font-monospace" style={{ maxHeight: "375px", minHeight: "378px", overflowY: "auto" }}>
            {dataPresent ? (
                <table className="table table-borderless">
                    <thead>
                        <tr className="table-success table-dark">
                            <th>NO.</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((info, index) => (
                            <tr key={info._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {info.text}
                                </td>
                                <td>
                                    {editRows[index] ? (
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={editRows[index] ? answerData[index].answer : info.answer}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                        />
                                    ) : (
                                        info.answer === "" ? <span className="badge rounded-pill bg-success">Answer questions</span> : info.answer
                                    )}
                                </td>
                                <td>
                                    {!editRows[index] ? (
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
                                                <DropdownItem onClick={() => handleModifyClick(index)}>
                                                    <div className='d-flex flex-row'>
                                                        <i className="bi bi-box-seam" style={{ fontWeight: "bold" }}></i>
                                                        <strong><p className='mx-3 my-0 py-0 text-muted'>Answer</p></strong>
                                                    </div>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>)
                                        : (
                                            <div className="d-flex flex-row">
                                                <button className="btn btn-sm btn-primary mx-3"
                                                    onClick={() => handleAnswerOne(answerData[index], index)}
                                                    disabled={
                                                        data[index].answer === answerData[index].answer
                                                    }
                                                >
                                                    Confirm,answer
                                                </button>
                                                <button className="btn btn-sm btn-light"
                                                    onClick={() => handleModifyClick(index)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            ) : (
                <div>
                    <div className="d-flex justify-content-center mt-5">
                        <div className="d-flex flex-column">
                            <i className="bi bi-exclamation-triangle" style={{ fontSize: "7rem", color: "#007bff" }} ></i>
                            <p style={{ fontSize: '2rem' }} className="mt-3">No answers</p>
                        </div>
                    </div>
                    <div>
                        <ToastContainer />
                    </div>
                </div>

            )}
        </div>
    );
}

export default AnswerQuestions;
