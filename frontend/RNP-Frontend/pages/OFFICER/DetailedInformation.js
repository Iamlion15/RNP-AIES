import { useState } from "react";
import { formatTextDateInput } from "@/helpers/dateHelper";

const DetailedInformation = ({ data,caseDetails }) => {
const [moreInformation,setMoreInformation]=useState();
    return (
        <>
            <div>
                <table className="table mt-3">
                    <thead>
                        <tr className="table-primary">
                            <th>DETAILED INFORMATION OF THE case</th>
                        </tr>
                    </thead>
                </table>
                <table className="table table-borderless font-monospace">
                    <tbody>
                        <tr>
                            <td>Participant names :</td>
                            <td>{data.driver.firstname} {data.driver.firstname}</td>
                        </tr>
                        <tr>
                            <td>Car plate number:</td>
                            <td>{data.vehicleInfo.plateNo} </td>
                        </tr>
                        <tr>
                            <td>Car insurance provider:</td>
                            <td>{data.vehicleInfo.insuranceNumber} </td>
                        </tr>
                        {/* <tr>
                            <td>Drunk test :</td>
                            <td>{data.item.itemType} </td>
                        </tr> */}
                        <tr>
                            <td>Time of occurence :</td>
                            <td>{formatTextDateInput(caseDetails.createdAt)}</td>
                        </tr>
                        <tr>
                            <td>Whats the primarily cause of this accident :</td>
                            <td>
                                <div className="form-group">
                                    <select className="form-select" value={moreInformation}>
                                        <option value="drunkdness">Drunk</option>
                                        <option value="overspeeding">Overspeeding</option>
                                        <option value="car mantanaince issue">Car maintanaince problem</option>
                                        <option value="uburangare">Uburangare</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default DetailedInformation;
