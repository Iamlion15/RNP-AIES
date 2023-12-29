import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddQuestions = () => {
    const [data, setData] = useState([{
        qstn: ""
    }]);
    const toastId = useRef(null)
    const handleChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;
        setData(updatedData);
    };
    const handleAddData = () => {
        const lastData = data[data.length - 1];
        if (lastData.qstn.trim() !== "") {
            setData([...data, {
                qstn: "",
            }]);
        } else {
            toast.warning("Please fill in data!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
        }

    };
    const handleDeleteQuestion = (index) => {
        const updatedQuestion = data.filter((_, i) => i !== index);
        setData(updatedQuestion);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("saving............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:8000/api/case/addquestion", data, config)
            toast.update(toastId.current, { render: "Successfully saved", type: toast.TYPE.SUCCESS, autoClose: 2000 })
        } catch (error) {
            toast.update(toastId.current, { render: "Error in saving", type: toast.TYPE.ERROR, autoClose: 2000 })
            console.log(error)
        }
    }

    return (
        <>
            <div className="font-monospace shadow-lg card mx-5" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="card-header bg-primary">
                    <div className="d-flex justify-content-center">
                        <h3 className="lead text-white">POLICE ASKED QUESTIONS</h3>
                    </div>
                </div>
                <div className="mt-2">
                    <table className="table table-borderless">
                        <thead>
                            <tr className="table-primary">
                                <th>NO.</th>
                                <th>QUESTION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((question, index) => (
                                <tr key={index} >
                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={question.qstn}
                                                onChange={(e) => handleChange(index, 'qstn', e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        {data.length - 1 !== index ? (
                                            <button
                                                className='btn btn-danger btn-sm mx-1'
                                                onClick={() => handleDeleteQuestion(index)}
                                            >
                                                <i className="bi bi-trash" style={{ color: "white", fontSize: '1.3em', fontWeight: 'bold' }}></i>
                                                <span className="">DELETE</span>
                                            </button>
                                        ) : (
                                            <button
                                                className='btn btn-primary btn-sm mx-1'
                                                onClick={() => handleAddData()}
                                            >
                                                <span className='mx-2'>new</span>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className="row">
                    <div className='col-5 mt-auto mb-3 mx-3'>
                        <button className='btn btn-primary btn-sm' onClick={handleSubmit}>
                            <strong className="mx-2">SAVE QUESTIONS</strong>
                            <i class="bi bi-plus-circle" style={{ fontSize: '1.5em', fontWeight: 'bold' }}></i>
                        </button>
                    </div>
                </div>
                <div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default AddQuestions;
