import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const DeleteQuestionModal = ({ modalIsOpen, toggleModal,data }) => {
    const handleDelete = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.delete(`http://localhost:8000/api/case/delete/question/${data}`, config)
            toast.success("Successfully deleted!", {
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
      <style>
        {`
          .success-icon {
            font-size: 3rem;  /* Adjust the icon size as needed */
            color: #28a745;   /* Bootstrap success color */
          }

          .status-message {
            margin-top: 10px;
            font-size: 1.2rem;  /* Adjust the message font size as needed */
            color: #333;        /* Adjust the message color as needed */
          }
        `}
      </style>
      <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <ModalBody>
          <div className="d-flex flex-column align-items-center">
            <i className={`bi bi-check-circle-fill success-icon animate}`}></i>
            <p className="font-monospace status-message">Are you sure you want to delete this question?</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleDelete}>
            Yes,delete question
          </button>
        </ModalFooter>
        <ToastContainer />
      </Modal>
      </div>
  );
};

export default DeleteQuestionModal;
