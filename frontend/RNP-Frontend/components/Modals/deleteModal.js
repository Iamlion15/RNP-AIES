import { useState, useRef } from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({ modalIsOpen, toggleModal, id, ToastContainer }) => {
    const toastId = useRef(null)
    const deleteDocumentHandler = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        try {
            const config = {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': JSON.parse(localStorage.getItem("token"))
                }
            }
            const response = await axios.delete(`http://localhost:4000/api/item/delete/${id}`, config)
            toast.update(toastId.current, { render: "Successfully deleted data", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            toggleModal()
        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
        <div>
            <ModalHeader>
                <div className="m-2">
                    <h4 className="text-primary">Approve item?</h4>
                </div>
            </ModalHeader>
            <div>
                <div className="m-3">
                    <span className="mb-2">If u need more information on : <strong> {data.firstname} {data.lastname}</strong> 's document,</span>
                    <span className="mb-2">there is a portal for asking more details,Thank You.</span>
                    <div className="mt-2">
                        <p className="text-sucess"><small>Type in item name<span className="text-primary"> "{data.ItemName}" </span>to approve request of this item </small></p>
                        <input type="text" className="form-control" onChange={handleInput} />
                    </div>
                </div>
                <div className="d-flex justify-content-end m-4">
                    <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                    <button type="button" className={!activateConfrim ?"btn btn-light":"btn btn-primary"} disabled={!activateConfrim} onClick={confirmHandler}>Confirm</button>
                </div>
            </div>
        </div>
    </Modal>
    );
}

export default DeleteModal;
