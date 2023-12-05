import { useState } from "react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserDetailsModal from "../Modals/addUserDetailsModal";

const CaseDetails = ({data,setData,nextStep,prevStep}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [indexx, setIndexx] = useState('')
    const [proceed,setProceed]=useState(false)
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }
    const handleAddData = () => {
        const lastItem = data[data.length - 1];
        if (lastItem.plateNo.trim() !== "" && lastItem.insuranceProvider.trim() !== "" && lastItem.insuranceProvider.trim() !== "" && lastItem.owner.firstname.trim() !== "" && lastItem.owner.lastname.trim() !== "" && lastItem.owner.nID.trim() !== "" && lastItem.owner.email.trim() !== "") {
            setData([...data, {
                plateNo: "",
                insuranceProvider: "",
                insuranceNumber: "",
                owner: {
                    firstname: "",
                    lastname: "",
                    nID: "",
                    email: "",

                }
            }]);
        } else {
            toast.error("Please fill in all data!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 15000
            });
        }

    };
    const showUserDetailModal = (index) => {
        setIndexx(index)
        setModalIsOpen(true)
    }
    const handleChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;
        setData(updatedData);
    };
    return (

        <>
            <div className="d-flex justify-content-center font-monospace">
                <p className="display-6">Detailed description of the incident</p>
            </div>
            <div className="bg-light">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-outline-primary mx-1" onClick={prevStep}>Previous</button>
                    </div>
                    {proceed &&
                        <div className="col">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-primary mx-1" onClick={nextStep}>Next</button>
                            </div>
                        </div>}
                </div>
            </div>
            <div className="mt-2">
                <table className="table table-borderless">
                    <thead>
                        <tr className="table-primary">
                            <th>NO.</th>
                            <th>Plate number</th>
                            <th>Insurance provider</th>
                            <th>Insurance number</th>
                            <th>user detail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>

                                <td>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={data.plateNo}
                                            onChange={(e) => handleChange(index, 'plateNo', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={data.insuranceProvider}
                                            onChange={(e) => handleChange(index, 'insuranceProvider', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={data.insuranceNumber}
                                            onChange={(e) => handleChange(index, 'insuranceNumber', e.target.value)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex flex-row">
                                        <button
                                            className='btn btn-outline-primary btn-sm mx-1'
                                            onClick={() => showUserDetailModal(index)}
                                        >
                                            <span className='mx-2'>Vehicle owner detail</span>
                                        </button>
                                        <button
                                            className='btn btn-primary btn-sm mx-1'
                                            onClick={() => handleAddData()}
                                        >
                                            <span className='mx-2'>new</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    {modalIsOpen && (<UserDetailsModal
                        modalIsOpen={modalIsOpen}
                        toggleModal={toggleModal}
                        data={data}
                        setProceed={setProceed}
                        index={indexx}
                    />)}
                </div>
            </div>
        </>
    )
}

export default CaseDetails