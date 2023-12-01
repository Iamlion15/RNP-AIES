import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddOfficer = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        nID: "",
        phone: "",
        email: "",
        password: ""
    });
    const toastId = useRef(null)
    const linearGradientBackground = {
        background: 'linear-gradient(195deg, #1b3261, #0057A3)',
        borderColor: 'linear-gradient(195deg, #1b3261, #0057A3)',
        width: "100%"
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        toastId.current=toast.info("saving............",{
            position:toast.POSITION.TOP_LEFT,
            autoClose:false
        })
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response=await axios.post("http://localhost:8000/api/user/save",data,config)
            toast.update(toastId.current,{render: "Successfully saved",type:toast.TYPE.SUCCESS,autoClose:2000})
        } catch (error) {
            toast.update(toastId.current,{render: "Error in saving",type:toast.TYPE.ERROR,autoClose:2000})
            console.log(error)
        }
    }

    return (
        <>
            <div className="row font-monospace shadow-lg rounded-5 border-4 mx-5" style={{ backgroundColor: "#FFFFFF"}}>
                <div className="col-5 mt-3 mx-2">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-center">
                            <h3 className="lead">POLICE OFFICER DETAILS</h3>
                        </div>
                        <hr />
                        <form className="mt-3">
                            <div className="form-group">
                                <label htmlFor="fname">FIRST NAME</label>
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    id="fname"
                                    placeholder="Enter the first name of the officer"
                                    value={data.firstname}
                                    required
                                    onChange={(e) => setData({ ...data, firstname: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lname">LAST NAME</label>
                                <input
                                    type="text"
                                    className="form-control my-3"
                                    id="lname"
                                    placeholder="Enter the last name of the officer"
                                    value={data.lastname}
                                    required
                                    onChange={(e) => setData({ ...data, lastname: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nid">NATIONAL IDENTIFICATION</label>
                                <input
                                    type="number"
                                    className="form-control my-3"
                                    id="nid"
                                    placeholder="Enter national id"
                                    value={data.nID}
                                    required
                                    onChange={(e) => setData({ ...data, nID: e.target.value })}
                                />
                            </div>
                            <div className='mt-auto mb-3'>
                                <button className='btn text-white' style={linearGradientBackground} onClick={handleSubmit}>
                                    <strong className="mx-2">SAVE OFFICER</strong>
                                    <i class="bi bi-plus-circle" style={{ fontSize: '1.5em', fontWeight: 'bold' }}></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-6">
                    {/* Sample Information */}
                    <div className="d-flex flex-column mt-3">
                        <div className="d-flex justify-content-center">
                            <h3 className="lead">CONTACT INFORMATION</h3>
                        </div>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="phone">PHONE NUMBER</label>
                            <input
                                type="phone"
                                className="form-control my-3"
                                id="phone"
                                placeholder="Enter the officer mobile number"
                                value={data.phone}
                                required
                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">EMAIL</label>
                            <input
                                type="email"
                                className="form-control my-3"
                                id="email"
                                placeholder="Enter the officer mobile number"
                                value={data.email}
                                required
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">PASSWORD</label>
                            <input
                                type="password"
                                className="form-control my-3"
                                id="phone"
                                placeholder="Enter the officer password"
                                value={data.password}
                                required
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default AddOfficer;
