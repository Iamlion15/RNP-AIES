import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

const ActivateAccount = () => {
    const [data, setData] = useState({
        id: "",
        email: "",
        password: "",
        drivingLicense: "",
        firstname: "",
        lastname: "",
    })
    const [drivingLicense, setDrivingLicense] = useState("")
    const [disableConfirm, setDisableConfirm] = useState(false)
    const [activateButton, setActivateButton] = useState(false)
    const [showConfirm, setShowConfirm] = useState(true)
    const [showEnterPassword, setShowEnterPassword] = useState(false)
    const checkEmail = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/checkemail", data, config)
            const evaluate = response.data
            if (evaluate.confirm === true) {
                setShowConfirm(false)
                setData({ ...data, id: response.data.user._id, firstname: response.data.user.firstname, lastName: response.data.user.lastname, drivingLicense: response.data.user.drivingLicense })
            }
            else if(evaluate.confirm===false &&evaluate.message) {
                toast.warning('Already account activated', {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000,
                });
            }
            else{
                toast.error('nO RECORD FOUND!', {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    const createPassword = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/activatepassword", { id: data.id, password: data.password }, config);
            setData({
                id: "",
                email: "",
                password: "",
                drivingLicense: "",
                firstname: "",
                lastname: "",
            })
            setActivateButton(false)
            setShowEnterPassword(false)
            toast.success('Created password', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 5000,
            });
            Router.push("/")
        } catch (error) {
            toast.error('Failure', {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 10000,
            });
        }
    }
    const handleChangeDrivinglicense = (e) => {
        const value = e.target.value;
        setDrivingLicense(value)
        if (value === data.drivingLicense) {
            setShowEnterPassword(true)
        }
        else {
            setShowEnterPassword(false)
        }
    }
    useEffect(() => {
        if (data.email.trim() !== "") {
            setDisableConfirm(false)
        }
        else {
            setDisableConfirm(true)
        }
    }, [data.email])
    useEffect(() => {
        if (data.password.trim() !== "") {
            setActivateButton(false)
        }
        else {
            setActivateButton(true)
        }
    }, [data.password])
    const goBack = (e) => {
        e.preventDefault();
        setData({
            id: "",
            email: "",
            password: "",
            drivingLicense: "",
            firstname: "",
            lastname: "",
        })
        setDrivingLicense("")
        setDisableConfirm(false)
        setActivateButton(false)
        setShowEnterPassword(false)
        setShowConfirm(true)
    }
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center font-monospace" style={{ minHeight: "100vh", backgroundColor: "#d1e6ff" }}>
                <div className="card shadow p-4 rounded ">
                    <div className="display-7 text-primary"><strong>Activate account</strong></div>
                    <div>
                        <div className="row" style={{ width: "700px" }}>
                            <div className="col">
                                <form className="mt-4">
                                    <div className="form-group">
                                        <label htmlFor="email" className="mt-2 mb-2">Email</label>
                                        {showConfirm ? <div>
                                            <input type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter email"
                                                value={data.email}
                                                required
                                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                            />
                                            <small id="emailHelp" className="form-text text-muted">Please enter the email you provided</small>
                                        </div>
                                            :
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" defaultValue={data.email} disabled={true} />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="button" onClick={goBack}>Go back</button>
                                                </div>
                                            </div>}
                                    </div>
                                    {!showConfirm && (
                                        <div className="form-group">
                                            <label htmlFor="license" className="mt-2 mb-2">Driving license</label>
                                            <input type="text"
                                                className={`form-control ${showEnterPassword ? 'is-valid' : 'is-invalid'}`}
                                                id="license"
                                                placeholder="Enter your driving license"
                                                value={drivingLicense}
                                                disabled={showEnterPassword}
                                                onChange={(e) => handleChangeDrivinglicense(e)}
                                            />
                                        </div>

                                    )}
                                    {showEnterPassword && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="pass" className="mt-2 mb-2">Enter password </label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="pass"
                                                    placeholder="Enter password"
                                                    value={data.password}
                                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="button" className="btn btn-primary mt-2" disabled={activateButton} onClick={createPassword} style={{ width: "100%" }}>Activate</button>
                                            </div>
                                        </>

                                    )}
                                    {showConfirm && (
                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="btn btn-outline-primary mt-2" disabled={disableConfirm} onClick={checkEmail} style={{ width: "100%" }}>Confirm</button>
                                        </div>
                                    )}
                                    <div className="mt-3">
                                        <p> <span className="lead text-sm">Account activated?</span><span className="text-warning text">
                                            <strong>  <Link href="/"><a>login</a></Link></strong></span></p>
                                    </div>
                                </form>
                            </div>
                            <div className="col">
                                <Image
                                    src="/images/Rwanda_National_Police.png"
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <Footer />
                </div>
                <div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}


export default ActivateAccount;