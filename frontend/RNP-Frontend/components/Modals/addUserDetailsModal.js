import { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";

const UserDetailsModal = ({ modalIsOpen, toggleModal, data, setData, index, setProceed }) => {
    const [userDetail, setUserDetail] = useState({
        firstname: "",
        lastname: "",
        email: "",
        nID: "",
        drivingLicense: ""
    })
    const saveUserDetails = () => {
        if (data[index].owner.firstname.trim() === "" && data[index].owner.lastname.trim() === "" && data[index].owner.email.trim() === "" && data[index].owner.nID.trim() === "" && data[index].owner.drivingLicense.trim() === "") {
            toast.error("Please fill in all data!", {
                position: toast.POSITION.TOP_RIGHT, autoClose: 10000
            });
        }
        else {
            setProceed(true)
            toggleModal()
        }
    }

    const handleInputChange = (field, value) => {
        const updatedData = [...data]
        updatedData[index].owner[field] = value
        setData(updatedData)
    }

    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
            <ModalHeader toggle={toggleModal}>
                <div className="m-2">
                    <h4 className="text-primary">Add vehicle driver information</h4>
                </div>
            </ModalHeader>
            <>
                <div className="mx-2">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>First name</td>
                                <td><input type="text"
                                    placeholder="Fisrt name"
                                    className="form-control"
                                    value={data[index].owner.firstname}
                                    onChange={(e) => handleInputChange("firstname", e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td>Last name</td>
                                <td><input type="text"
                                    placeholder="Last name"
                                    className="form-control"
                                    value={data[index].owner.lastname}
                                    onChange={(e) => handleInputChange("lastname", e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td>national ID</td>
                                <td><input type="text"
                                    placeholder="National ID"
                                    className="form-control"
                                    value={data[index].owner.nID}
                                    onChange={(e) => handleInputChange("nID", e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td>email</td>
                                <td><input type="email"
                                    placeholder="email"
                                    className="form-control"
                                    value={data[index].owner.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                /></td>
                            </tr>
                            <tr>
                                <td>Driving license</td>
                                <td><input type="text"
                                    placeholder="driving ID"
                                    className="form-control"
                                    value={data[index].owner.drivingLicense}
                                    onChange={(e) => handleInputChange("drivingLicense", e.target.value)}
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary mb-3" style={{ paddingLeft: "150px", paddingRight: "150px" }} onClick={saveUserDetails}>SAVE</button>
                </div>
            </>
        </Modal>
    )
}

export default UserDetailsModal