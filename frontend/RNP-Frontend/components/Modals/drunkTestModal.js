import { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const DrunkTestModal = ({ modalIsOpen, toggleModal, data,setData, index,names }) => {
    const handleChange = (value) => {
        const updatedData = [...data];
        updatedData[index].drunkTest = value;
        setData(updatedData);
    };
  return (
    <>
      <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center font-monospace" size='md'>
        <div>
          <ModalHeader>
            <div className="m-2">
              <h4 className="text-primary">Drunk test result</h4>
            </div>
          </ModalHeader>
          <ModalBody>
          <div className="d-flex justify-content-center font-monospace">
                <div className="mx-2">
                    <p>was the {names} drunk?</p>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col">
                    <label className="form-check-label" htmlFor="yes">
                        <div className={`card ${data[index].drunkTest === 'yes' ? 'border-2 shadow border-primary' : 'border-secondary'} m-3 form-check-label`}>
                            <div className="m-4">
                                <div className="row">
                                    <div className="col" style={{ cursor: "pointer" }}>
                                        <p style={{ whiteSpace: 'nowrap' }}>
                                            yes, the driver was drunk {/* Change the text here */}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex justify-content-end">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value="yes"
                                                id="yes"
                                                checked={data[index].drunkTest === 'yes'}
                                                onChange={() => handleChange('yes')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="col">
                    <div className='d-flex justify-content-end'>
                        <label className="form-check-label" htmlFor="no">
                            <div className={`card ${data[index].drunkTest === 'no' ? 'border-2 shadow border-primary' : 'border-secondary'} m-3 form-check-label`}>
                                <div className="m-4">
                                    <div className="row">
                                        <div className="col" style={{ cursor: "pointer" }}>
                                            <p style={{ whiteSpace: 'nowrap' }}>
                                                no, the driver was not drunk
                                            </p>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex justify-content-end">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value="no"
                                                    id="no"
                                                    checked={data[index].drunkTest === 'no'}
                                                    onChange={() => handleChange('no')}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end mx-2'>
                <button className={"btn btn-sm btn-primary"} onClick={toggleModal}>Confirm</button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};

export default DrunkTestModal;
