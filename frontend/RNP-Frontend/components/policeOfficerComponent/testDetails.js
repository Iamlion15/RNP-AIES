import { useState } from 'react';

const TestDetailCase = ({ selectedOption, setSelectedOption, prevStep }) => {
    const [showGenerateToke, setshowGenerateToken] = useState(false)
    const handleCheckboxChange = (value) => {
        setSelectedOption(value);
        setshowGenerateToken(true)
    };

    return (
        <>
            <div className="d-flex justify-content-center font-monospace">
                <p className="display-6">Metrics at the scene</p>
            </div>
            <div className="d-flex justify-content-center font-monospace">
                <div className="mx-2">
                    <p>was the user drunk?</p>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col">
                    <label className="form-check-label" htmlFor="yes">
                        <div className={`card ${selectedOption === 'yes' ? 'border-2 shadow border-primary' : 'border-secondary'} m-3 form-check-label`}>
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
                                                checked={selectedOption === 'yes'}
                                                onChange={() => handleCheckboxChange('yes')}
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
                            <div className={`card ${selectedOption === 'no' ? 'border-2 shadow border-primary' : 'border-secondary'} m-3 form-check-label`}>
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
                                                    checked={selectedOption === 'no'}
                                                    onChange={() => handleCheckboxChange('no')}
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
            <div className="row mx-2">
                <div className='col'>
                    <button className="btn btn-outline-primary mb-3" style={{ paddingLeft: "150px", paddingRight: "150px" }} onClick={prevStep}>Back</button>
                </div>
                <div className='col'>
                    {showGenerateToke &&
                        <div className='d-flex justify-content-end'>
                            <button className="btn btn-primary mb-3" style={{ paddingLeft: "100px", paddingRight: "150px" }}>Generate token</button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default TestDetailCase;
