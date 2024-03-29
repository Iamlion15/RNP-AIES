import { useState, useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";
import Link from "next/link";

const UserLogin = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [errorMsg, setErrorMsg] = useState("")
    const toastId = useRef(null)
    const loginHandler = async (e) => {
        e.preventDefault()
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        try {
            const response = await axios.post("http://localhost:8000/api/user/login", data)
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("loggedInUser", JSON.stringify(response.data.loggedInUser))
            //  console.log(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user))
            toast.update(toastId.current, { render: "Successfully logged in", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            const role = response.data.user.role;
            if (role === "STAFF") {
                Router.push("/STAFF")
            }
            else if (role === "POLICE ADMIN") {
                Router.push("/ADMIN")
            }
            else if (role === "POLICE OFFICER") {
                Router.push("/OFFICER")
            }
            else if (role === "CITIZEN") {
                Router.push("/CITIZEN")
            }
            else {
                if (role === "RAB") {
                    Router.push("/RAB")
                }
            }
        } catch (error) {
            console.log(error);
            try {
                if (error.response.status === 404) {
                    toast.update(toastId.current, { render: "User not found", type: toast.TYPE.ERROR, autoClose: 2000 })
                }
                else if (error.response.status === 403) {
                    toast.update(toastId.current, { render: "Email or password is invalid", type: toast.TYPE.ERROR, autoClose: 2000 })
                }
                else {
                    toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
                }
            } catch (error) {
                toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
            }
        }

    }

    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center font-monospace" style={{ minHeight: "100vh" }}>
                <div className="card shadow p-4 rounded ">
                    <div className="display-5 text-primary"><strong>sign In</strong></div>
                    <div>
                        <div className="row" style={{ width: "700px" }}>
                            <div className="col">
                                <form className="mt-4">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter email"
                                            value={data.email}
                                            onChange={(e) => setData({ ...data, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={data.password}
                                            onChange={(e) => setData({ ...data, password: e.target.value })}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-primary text"><strong>Forgot password?</strong></p>
                                    </div>
                                    <div className='form-group'>
                                        <button type="submit"
                                            className="btn btn-outline-primary mt-2"
                                            style={{ width: "100%" }}
                                            onClick={loginHandler}
                                        >
                                            Signin</button>
                                    </div>
                                    <div className="mt-3">
                                        <p> <span className="lead text-sm">Activate account?</span><span className="text-warning text">
                                            <strong>  <Link href="user/activate"><a>activate?</a></Link></strong></span></p>
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


export default UserLogin;