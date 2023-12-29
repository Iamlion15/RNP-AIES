import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const StartCase = ({locationDetails,setLocationDetails,nextStep,startCaseScenario}) => {
    const gotoNextStep=(e)=>{
        e.preventDefault()
        if (locationDetails.province.trim() === "" && locationDetails.district.trim() === "" && locationDetails.sector.trim() === "" && locationDetails.cell.trim() === "" ) {
            toast.warning("Please fill in all data!", {
                position: toast.POSITION.TOP_LEFT, autoClose: 10000
            });}
            else{
                nextStep()
            }
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <p className="display-4">Location of the incident</p>
            </div>
            <div className="d-flex justify-content-center font-monospace">
                <div className="mx-2">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>Province</td>
                                <td><input type="text"
                                    placeholder="enter province"
                                    className="form-control"
                                    value={locationDetails.province}
                                    onChange={(e)=>setLocationDetails({...locationDetails,province:e.target.value})}
                                /></td>
                            </tr>
                            <tr>
                                <td>District</td>
                                <td><input type="text"
                                    placeholder="enter district"
                                    className="form-control"
                                    value={locationDetails.district}
                                    onChange={(e)=>setLocationDetails({...locationDetails,district:e.target.value})}
                                /></td>
                            </tr>
                            <tr>
                                <td>Sector</td>
                                <td><input type="text"
                                    placeholder="enter sector"
                                    className="form-control"
                                    value={locationDetails.sector}
                                    onChange={(e)=>setLocationDetails({...locationDetails,sector:e.target.value})}
                                /></td>
                            </tr>
                            <tr>
                                <td>Cell</td>
                                <td><input type="text"
                                    placeholder="enter cell"
                                    className="form-control"
                                    value={locationDetails.cell}
                                    onChange={(e)=>setLocationDetails({...locationDetails,cell:e.target.value})}
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary mb-3" style={{ paddingLeft: "150px", paddingRight: "150px" }} onClick={gotoNextStep}>NEXT</button>
                </div></div>
        </>
    )
}

export default StartCase;