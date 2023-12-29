import { useState, useRef } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const UpdateQuestionModal = ({ modalIsOpen, toggleModal, modifyData }) => {
    const [newQuestion, setNewQuestion] = useState();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        const updateQuestion={
            text:newQuestion
        }
        try {
            const response = await axios.post(`http://localhost:8000/api/case/update/question/${modifyData._id}`, updateQuestion, config)
            toast.success("Successfully updated!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 10000
            });
            toggleModal();
        } catch (error) {
            toast.warning("Failed to update!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 10000
            });
            console.log(error)
        }
    }
    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <ModalHeader toggle={toggleModal}>
                    <div className="m-3">
                        <div className="d-flex flex-row">
                        <h3 className="text-primary">Edit question</h3>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex flex-column">
                        <p className="font-monospace status-message">Previous question</p>
                        <div>
                            <input type="text" value={modifyData.text} className='form-control' disabled="true" />
                        </div>
                        <p className="font-monospace status-message">Newer question</p>
                        <div>
                            <input type="text" className='form-control' value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Update
                    </button>
                </ModalFooter>
                <ToastContainer />
            </Modal>
        </div>
    );
};

export default UpdateQuestionModal;
