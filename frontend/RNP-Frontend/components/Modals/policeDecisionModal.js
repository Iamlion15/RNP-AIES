import { useEffect, useState } from "react";
import { Modal, ModalHeader } from "reactstrap";

const PoliceDecisionViewModal = ({ modalIsOpen, toggleModal, data }) => {
    console.log(data);
    return (
        <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
            <div>
                <ModalHeader toggle={() => toggleModal()}>
                    <div className="m-2">
                        <h4 className="text-primary">Summary</h4>
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
                                <tr>
                                    <td>Names :</td>
                                    <td></td>
                                    <td style={{ fontWeight: "bold" }}>{data.names}</td>
                                </tr>
                                <tr>
                                    <td>Driving license :</td>
                                    <td></td>
                                    <td style={{ fontWeight: "bold" }}>{data.drivingLicense}</td>
                                </tr>
                                <tr>
                                    <td>Vehicle plate number :</td>
                                    <td></td>
                                    <td style={{ fontWeight: "bold" }}>{data.plateNo}</td>
                                </tr>
                                <tr>
                                    <td>Vehicle insurance provider :</td>
                                    <td></td>
                                    <td style={{ fontWeight: "bold" }}>{data.insuranceProvider}</td>
                                </tr>
                                <tr style={{ borderBottom: "solid 1px black" }}>
                                    <td>Cause of the accident :</td>
                                    <td></td>
                                    <td style={{ fontWeight: "bold" }}>{data.cause}</td>
                                </tr>
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

export default PoliceDecisionViewModal;