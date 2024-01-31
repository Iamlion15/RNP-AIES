import { Modal, ModalHeader } from "reactstrap";

const CompletedCaseDetailsModal = ({ modalIsOpen, toggleModal, data }) => {
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='lg'>
            <div>
                <ModalHeader toggle={() => toggleModal()}>
                    <div className="m-2">
                        <h4 className="text-primary">Case details</h4>
                    </div>
                </ModalHeader>
                <div>
                    <table className="table table-borderless">
                        <thead>
                            <tr className="table-primary">
                                <td>Description of the participants</td>
                            </tr>
                        </thead>
                        <div className="mx-3">
                            <tbody style={{ lineHeight: 2 }}>
                                {data.map((participant, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>No :</td>
                                                <td style={{ padding: '10px 150px' }}></td>
                                                <td style={{ fontWeight: "bold" }}>{index + 1}</td>
                                            </tr>
                                            <tr>
                                                <td>Names :</td>
                                                <td></td>
                                                <td style={{ fontWeight: "bold" }}>{participant.driver.firstname} {participant.driver.lastname}</td>
                                            </tr>
                                            <tr>
                                                <td>Driving license :</td>
                                                <td></td>
                                                <td style={{ fontWeight: "bold" }}>{participant.driver.drivingLicense}</td>
                                            </tr>
                                            <tr>
                                                <td>Vehicle plate number :</td>
                                                <td></td>
                                                <td style={{ fontWeight: "bold" }}>{participant.vehicleInfo.plateNo}</td>
                                            </tr>
                                            <tr>
                                                <td>Vehicle insurance provider :</td>
                                                <td></td>
                                                <td style={{ fontWeight: "bold" }}>{participant.vehicleInfo.insuranceProvider}</td>
                                            </tr>
                                            <tr>
                                                <td>Vehicle insurance provider :</td>
                                                <td></td>
                                                <td style={{ fontWeight: "bold" }}><button className="btn btn-primary btn-sm" onClick={() => toggleShowAnswers()}>Answers to questions</button> </td>
                                            </tr>
                                            <tr style={{borderBottom:"solid 1px black"}}>
                                                <td>Cause of the accident :</td>
                                                <td></td>
                                                <td style={{ fontWeight: "bold" }}>{participant.conclusion}</td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </div>
                    </table>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-end m-4">
                        <button type="button" className="btn btn-light btn-sm mx-4" onClick={() => toggleModal()}>Cancel</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CompletedCaseDetailsModal;