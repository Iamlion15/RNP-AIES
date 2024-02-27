import { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import axios from "axios";
import GeneratevehiclePDF from "@/helpers/vehiclePDF";


const VehicleReportModal = ({ modalIsOpen, toggleModal }) => {
    const [data, setData] = useState([])
    const [count, setCount] = useState()
    const [plateNumber, setPlateNumber] = useState()
    const findVehicle = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };
        try {
            let ct=0
            const response = await axios.get("http://localhost:8000/api/statistics/vehiclereport", config);
            for(let i=0;i<response.data.allCases.length;i++){
                const vehicleCases = response.data.allCases[i]
                for(let a=0;a<vehicleCases.participants.length;a++){
                    let vehicle=vehicleCases.participants[a]
                    if(vehicle.vehicleInfo.plateNo.toLowerCase()===plateNumber.toLowerCase()){
                        ct++
                    }
                }
            }
            const vehicleParticpated = response.data.allCases.filter(vehicleCases => {
                return vehicleCases.participants.some(vehicle => {
                    return vehicle.vehicleInfo.plateNo.toLowerCase() === plateNumber.toLowerCase();
                });
            });            
            if(ct>0){
                const role= JSON.parse(localStorage.getItem('user')).role
                GeneratevehiclePDF(vehicleParticpated,role)
            }
            setCount(ct)
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size='md'>
            <div>
                <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">Detailed vehicle report</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div>
                        <div className="d-flex flex-column">

                            <div className="d-flex flex-row">
                                <div className="mx-3 mt-3">
                                    <small className="d-block text-uppercase font-weight-bold mb-3">
                                        Enter plate number
                                    </small>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter plate number here"
                                        value={plateNumber}
                                        onChange={(e) => setPlateNumber(e.target.value)}
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
                                    <button type="button" className={plateNumber ==="" ? "btn btn-light" : "btn btn-danger"} disabled={!plateNumber} onClick={findVehicle}>Generate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default VehicleReportModal;