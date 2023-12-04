import { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CaseScenario = () => {
   

    return (
        <>
            <div className="card shadow mx-5" style={{ backgroundColor: "#FFFFFF"}}>
                <div className="card-header bg-primary">
                    <div className="d-flex justify-content-center ">
                    <p className="text-white m-0 p-0" style={{fontSize:"1.7em"}}>Start case</p>
                    </div>
                </div>

                <div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default CaseScenario;
