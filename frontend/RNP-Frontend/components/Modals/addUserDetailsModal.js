import { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";

const UserDetailsModal = ({ modalIsOpen, toggleModal, data, index, setProceed }) => {
    const [userDetail, setUserDetail] = useState({
        firstname: "",
        lastname: "",
        email: "",
        nID: "",
        drivingLicense:""
    })
    const saveUserDetails = () => {
        if (userDetail.firstname.trim() === "" && userDetail.lastname.trim() === "" && userDetail.email.trim() === "" && userDetail.nID.trim() === "") {
            toast.error("Please fill in all data!", {
                position: toast.POSITION.TOP_RIGHT, autoClose: 10000
            });
        }
        else {
            const updatedData = [...data];
            updatedData[index].owner.firstname = userDetail.firstname;
            updatedData[index].owner.lastname = userDetail.lastname;
            updatedData[index].owner.email = userDetail.email;
            updatedData[index].owner.nID = userDetail.nID;
            updatedData[index].owner.drivingLicense = userDetail.drivingLicense;
            setProceed(true)
            toggleModal()
        }
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
                                    value={userDetail.firstname}
                                    onChange={(e) => setUserDetail({ ...userDetail, firstname: e.target.value })}
                                /></td>
                            </tr>
                            <tr>
                                <td>Last name</td>
                                <td><input type="text"
                                    placeholder="Last name"
                                    className="form-control"
                                    value={userDetail.lastname}
                                    onChange={(e) => setUserDetail({ ...userDetail, lastname: e.target.value })}
                                /></td>
                            </tr>
                            <tr>
                                <td>national ID</td>
                                <td><input type="text"
                                    placeholder="National ID"
                                    className="form-control"
                                    value={userDetail.nID}
                                    onChange={(e) => setUserDetail({ ...userDetail, nID: e.target.value })}
                                /></td>
                            </tr>
                            <tr>
                                <td>email</td>
                                <td><input type="email"
                                    placeholder="email"
                                    className="form-control"
                                    value={userDetail.email}
                                    onChange={(e) => setUserDetail({ ...userDetail, email: e.target.value })}
                                /></td>
                            </tr>
                            <tr>
                                <td>Driving license</td>
                                <td><input type="text"
                                    placeholder="driving ID"
                                    className="form-control"
                                    value={userDetail.drivingLicense}
                                    onChange={(e) => setUserDetail({ ...userDetail, drivingLicense: e.target.value })}
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