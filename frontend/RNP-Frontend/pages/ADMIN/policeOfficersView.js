import { useState, useEffect, useRef } from "react";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import axios from "axios";
import DeleteModal from "@/components/Modals/deleteModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UpdateOfficerModal from "@/components/Modals/updateOfficerModal";


const PoliceOfficersView = () => {
    const [data, setData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [sendMessageModal, setSendMessageModal] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [viewOfficerUpdate, setViewOfficerUpdate] = useState(false)
    const [updateData, setUpdateData] = useState({
        id: "",
        firstname: "",
        lastname: "",
        nID: "",
        phone: "",
        email: "",
        password: ""
    })
    const [messageData,setMessageData]=useState({
        receiver:"",
        firstname:"",
        lastname:"",
        ItemName:""
    })
    const toggleMessageModal = () => {
        setSendMessageModal(!sendMessageModal)
    }
    const toastId = useRef(null)
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    const toggleUpdateOfficerModal = () => {
        setViewOfficerUpdate(!viewOfficerUpdate)
    }
    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }
    const showMessageModal = (officer) => {
        setMessageData({
            receiver:officer._id,
            firstname:officer.firstname,
            lastname:officer.lastname,
        })
        setSendMessageModal(true)
    }
    useEffect(async () => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.get("http://localhost:8000/api/user/getofficers", config)
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }, [viewOfficerUpdate, deleteModal])

    const showDeleteModal = (id) => {
        setDeleteId(id)
        setDeleteModal(true)
    }
    const showUpdateOfficer = (currentOfficer) => {
        setUpdateData({
            id: currentOfficer._id,
            firstname: currentOfficer.firstname,
            lastname: currentOfficer.lastname,
            email: currentOfficer.email,
            phone: currentOfficer.phone,
            email: currentOfficer.email,
            nID: currentOfficer.nID
        })
        setViewOfficerUpdate(true)
    }
    const updateHandler = async (e) => {
        e.preventDefault();
        toastId.current = toast.info("Loading............", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false
        })
        const config = {
            headers: {
                'Content-Type': "application/json",
                'Authorization': JSON.parse(localStorage.getItem("token"))
            }
        }
        try {
            const response = await axios.post("http://localhost:8000/api/user/updateofficer", updateData, config)
            toast.update(toastId.current, { render: "Successfully Updated officer", type: toast.TYPE.SUCCESS, autoClose: 2000 })
            toggleUpdateOfficerModal()

        } catch (error) {
            console.log(error)
            toast.update(toastId.current, { render: "Failure to update", type: toast.TYPE.ERROR, autoClose: 2000 })
        }
    }

    return (
        <>
            <div className="mx-4 font-monospace">
                <p><strong> All officers</strong></p>
                <div className="card rounded-3 shadow-sm">
                    <div className="mx-4 mt-2">
                        <div className="d-flex justify-content-end">
                            <div className="mx-2 mt-2 mb-2">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search..." />
                                </div>
                            </div>
                        </div>
                        <table className="table mt-5 ">
                            <thead>
                                <tr className="table-primary">
                                    <th>NO.</th>
                                    <th>OFFICER NAMES</th>
                                    <th>NATIONAL ID</th>
                                    <th>EMAIL</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((officer, index) => {
                                    return (
                                        <tr key={officer._id}>
                                            <td>{index + 1}</td> {/* Display a row number */}
                                            <td>{officer.firstname} {officer.lastname}</td>
                                            <td>{officer.nID}</td>
                                            <td>{officer.email}</td>
                                            <td className="d-flex justify-content-center">
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
                                                            onClick={() => showUpdateOfficer(officer)}
                                                        >
                                                            <div className='d-flex flex-row'>
                                                                <i class="bi bi-pencil-square"></i>
                                                                <p className='mx-3 my-0 py-0'>Update</p>
                                                            </div>
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => showDeleteModal(officer._id)}
                                                        >
                                                            <div className='d-flex flex-row'>
                                                                <i class="bi bi-trash-fill"></i>
                                                                <p className='mx-3 my-0 py-0'>Delete</p>
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
                    {viewOfficerUpdate && <UpdateOfficerModal
                        modalIsOpen={viewOfficerUpdate}
                        toggleModal={toggleUpdateOfficerModal}
                        data={updateData}
                        setData={setUpdateData}
                        updateHandler={updateHandler}

                    />}
                </div>
                {deleteModal && (
                    <DeleteModal
                        toggleModal={setDeleteModal}
                        modalIsOpen={deleteModal}
                        data={deleteId}
                    />
                )}
                <div>
                    <ToastContainer />
                </div>
            </div>

        </>
    )
}

export default PoliceOfficersView;
