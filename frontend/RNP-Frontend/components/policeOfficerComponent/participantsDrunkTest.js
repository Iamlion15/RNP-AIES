import { useState, useEffect } from "react";
import DrunkTestModal from "../Modals/drunkTestModal";

const ParticipantDrunkTest = ({ data, setData, setSelectedOption, selectedOption }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [startCase, setStartCase] = useState(false)
    const [names, setNames] = useState();
    const [index, setIndex] = useState()
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen)
    }
    const showDrunkTestModal = (i, testData) => {
        const name = testData.owner.firstname + " " + testData.owner.lastname
        setIndex(i);
        setNames(name)
        setModalIsOpen(true)
    }
    useEffect(() => {
        let count = 0
        console.log(data);
        data.forEach((participant,i) => {
            console.log("index",i);
            if (participant.drunkTest === "") {
                console.log("counted",);
                count=count+1;
            }
        });
        console.log(count);
        if (count === 0) {
            setStartCase(false)
        }
        else {
            setStartCase(true)
        }
    }, [data,modalIsOpen])
    return (
        <>
            <div>
                <table className="table">
                    <thead>
                        <tr className="table-primary">
                            <td>Drunk Test</td>
                        </tr>
                    </thead>
                </table>
                <table className="table table-borderless my-2">
                    <tbody>
                        {data.map((participant, index) => {
                            return (
                                <tr key={participant.id}>
                                    <td>{participant.owner.firstname} {participant.owner.lastname} :</td>
                                    <td><button className="btn btn-sm btn-outline-primary" onClick={() => showDrunkTestModal(index, participant)}>Result</button> </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-sm btn-primary my-2 mx-2" disabled={startCase}>Start case</button>
                </div>
                {modalIsOpen && <DrunkTestModal selectedOption={selectedOption} setSelectedOption={setSelectedOption} modalIsOpen={modalIsOpen} toggleModal={toggleModal} data={data} setData={setData} names={names} index={index} />}
            </div>
        </>
    )
}


export default ParticipantDrunkTest