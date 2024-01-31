import { useEffect, useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from "@/helpers/ReportDateHelper";


const ReviewCaseModal = ({ modalIsOpen, toggleModal, caseid }) => {
    const [reviewScene, setReviewScene] = useState({
        file: "",
        insuranceFile: "",
        policeOfficerComment: ""
    })
    const [activateComment, setActivateComment] = useState(false)
    const [activateInsuranceDocument, setActivateInsuranceDocument] = useState(false)
    const [activateConfirm, setActivateConfirm] = useState(false)

    const handleInput = (e, field) => {
        if (field === "scene document") {
            const input = e.target.files[0]
            setReviewScene({ ...reviewScene, insuranceFile: input })
            if (input) {
                setActivateInsuranceDocument(true)
            }
            else {
                setActivateInsuranceDocument(false)
            }
        }
        else {
            if (field === "insurance document") {
                const input = e.target.files[0]
                setReviewScene({ ...reviewScene, file: input })
                if (input) {
                    setActivateComment(true)
                }
                else {
                    setActivateComment(false)
                }
            }
        }
    }
    useEffect(() => {
        if (reviewScene.policeOfficerComment !== "") {
            setActivateConfirm(true)
        }
        else {
            setActivateConfirm(false)
        }
    }, [reviewScene.policeOfficerComment])
    const confirmHandler = async () => {
        console.log(caseid);
        const config = {
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        };
        const formdata = new FormData();
        formdata.append('caseid', caseid)
        formdata.append('files', reviewScene.file);
        formdata.append('files', reviewScene.insuranceFile);
        formdata.append('policeOfficerComment', reviewScene.policeOfficerComment);
        try {
            const response = await axios.put("http://localhost:8000/api/case/police/review", formdata, config);
            toast.success("successfully answered to the question data!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
            toggleModal()
        } catch (error) {
            console.log(error);
            toast.error("Failed to update dates!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 5000
            });
        }
    }

    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
            <div>
                <ModalHeader>
                    <div className="m-2">
                        <h4 className="text-primary">Review case</h4>
                    </div>
                </ModalHeader>
                <div>
                    <div className="m-3">
                        <span className="mb-2">Upload document of the scene </span>
                        <div className="input-group">
                            <input type="file" className="form-control" id="upload" onChange={(e) => handleInput(e,"scene document")} />
                            <label className="input-group-text" htmlFor="upload">Upload</label>
                        </div>
                        {activateInsuranceDocument &&
                            <div className="mt-3">
                                <span className="mb-2">Upload police decision document to insurance </span>
                                <div className="input-group">
                                    <input type="file" className="form-control" id="upload" onChange={(e) => handleInput(e,"insurance document")} />
                                    <label className="input-group-text" htmlFor="upload">Upload</label>
                                </div>
                            </div>
                        }
                        {activateComment && <div>
                            <div className="form-floating mt-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Officer observation"
                                    id="observation"
                                    style={{ height: "100px", width: "450px" }}
                                    value={reviewScene.policeOfficerComment}
                                    required
                                    onChange={(e) => setReviewScene({ ...reviewScene, policeOfficerComment: e.target.value })}
                                ></textarea>

                                <label htmlFor="purpose">Police officer observation</label>
                            </div>
                        </div>}
                    </div>
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light mx-4" onClick={() => toggleModal()}>Cancel</button>
                        <button type="button" className={!activateConfirm ? "btn btn-light" : "btn btn-primary"} disabled={!activateConfirm} onClick={confirmHandler}>Confirm</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ReviewCaseModal;