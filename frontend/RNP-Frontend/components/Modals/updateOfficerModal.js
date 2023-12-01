import { useState, } from "react";
import { Modal,ModalHeader } from "reactstrap";



const UpdateOfficerModal = ({ modalIsOpen, toggleModal, data, setData, updateHandler }) => {
    console.log(data);
    const [showUpload, setShowUpload] = useState(false);
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='lg'>
            <div>
                <ModalHeader className="bg-primary">
                <div className="m-3">
                    <div className="d-flex flex-row">
                <i class="bi bi-pencil-square mx-2" style={{color:"white",fontSize: '1.5em', fontWeight: 'bold'}}></i><h3 className="text-white">Edit officer</h3>
                </div>
                </div>
                </ModalHeader>
                <form className="m-4">
                    <div className="row">
                        <div className="col">
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    id="fname"
                                    value={data.firstname}
                                    onChange={(e) => setData({
                                        ...data,
                                        firstname: e.target.value

                                    })}
                                />
                                <label htmlFor="cname">FIRST NAME</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    id="fname"
                                    value={data.lastname}
                                    onChange={(e) => setData({
                                        ...data,
                                        lastname: e.target.value

                                    })}
                                />
                                <label htmlFor="cname">LAST NAME</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col">
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData({
                                        ...data,
                                        email: e.target.value
                                    })}
                                />
                                <label htmlFor="qty">Email</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating">
                                <input type="text"
                                    className="form-control"
                                    id="nid"
                                    value={data.nID}
                                    onChange={(e) => setData({
                                        ...data,
                                        nID: e.target.value
                                    })}
                                />
                                <label htmlFor="qty">National identification</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                    <div className="col-6">
                            <div className="form-floating">
                                <input type="phone"
                                    className="form-control"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData({
                                        ...data,
                                        phone: e.target.value
                                    })}
                                />
                                <label htmlFor="qty">Phone number</label>
                            </div>
                        </div>
                       
                    </div>
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" class="btn btn-outline-danger mx-3" onClick={() => toggleModal()}><span className="mx-2">Cancel </span><i class="bi bi-x-square"></i></button>
                        <button type="button" class="btn btn-primary" onClick={updateHandler}>
                            <span className="mx-2">Update item </span><i class="bi bi-check-square"></i></button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}



export default UpdateOfficerModal;