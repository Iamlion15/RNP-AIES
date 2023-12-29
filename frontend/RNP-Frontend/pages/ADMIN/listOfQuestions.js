import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import formatDateToCustomFormat from "@/helpers/dateFormatter";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UpdateQuestionModal from "@/components/Modals/updateQuestionModal";
import DeleteQuestionModal from "@/components/Modals/deleteQuestionModal";

const ListOfQuestions = () => {
    const [data, setData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [showUpdateModal,setShowUpdateModal]=useState(false)
    const [modifyData,setModifyData]=useState()
    const [questionId,setQuestionId]=useState("")
    const toastId = useRef(null)
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    const toggleUpdateQuestionModal=()=>{
        setShowUpdateModal(!showUpdateModal)
    }
    const showModifyData=(qstn)=>{
        setModifyData(qstn)
        setShowUpdateModal(true)
    }
    const showDeleteData=(id)=>{
        setQuestionId(id)
        setModalIsOpen(true)
    }
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:8000/api/case/get/questions", config)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [showUpdateModal,modalIsOpen])

    return (
        <>
                <div className="mx-4 font-monospace">
                    <p><strong> List of questions</strong></p>
                    <div className="card rounded-3 shadow-sm">
                        <div className="mx-4 mt-2">
                            <div className="d-flex justify-content-end">
                                <div className="mx-2 mt-2 mb-2">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="bi bi-search" style={{fontWeight:"bolder"}}></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Search....." />
                                    </div>
                                </div>
                            </div>
                            <table className="table mt-5">
                                <thead className="table-primary">
                                    <tr>
                                        <th>NO.</th>
                                        <th>QUESTION</th>
                                        <th>CREATED ON</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((question, index) => {
                                        return (
                                            <tr key={question._id}>
                                                <td>{index + 1}</td>
                                                <td>{question.text}</td>
                                                <td>{formatDateToCustomFormat(question.createdAt)}</td>
                                                <td className="">
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle
                                                            role="button"
                                                            size="sm"
                                                            color=""
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            <i class="bi bi-three-dots-vertical"></i>
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-menu-arrow" right>
                                                            <DropdownItem
                                                                onClick={() => showModifyData(question)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                    <i className="bi bi-box-seam" style={{fontWeight:"bold"}}></i>
                                                                    <strong><p className='mx-3 my-0 py-0 text-muted'>Update</p></strong>
                                                                </div>
                                                            </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => showDeleteData(question._id)}
                                                            >
                                                                <div className='d-flex flex-row'>
                                                                <i className="bi bi-trash" style={{fontWeight:"bold"}}></i>
                                                                    <strong><p className='mx-3 my-0 py-0 text-muted'>Delete</p></strong>
                                                                </div>
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <ToastContainer />
                        {showUpdateModal&&<UpdateQuestionModal modalIsOpen={showUpdateModal} toggleModal={toggleUpdateQuestionModal} modifyData={modifyData}/>}
                        {modalIsOpen&&<DeleteQuestionModal modalIsOpen={modalIsOpen} toggleModal={toggleModal} data={questionId}/>}
                    </div>
                </div>
        </>
    )
}

export default ListOfQuestions;
