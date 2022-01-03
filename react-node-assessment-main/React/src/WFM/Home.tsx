import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSoftlockRequests } from "../Redux/Actions/action";
import WfmManagerModal from "../Utils/WfmManagerModal";


const WFMHome = () => {
debugger;
    const dispatch  = useDispatch();
    const softlocks = useSelector((state: any) => {
        return state.wfmManagerReducer.softlocks;
    })
    const wfm_manager = localStorage.getItem("username");
    const [employee_id, setEmployeeID] = useState("NA")
    const [requestee, setRequestee] = useState("NA")
    const [emp_manager, setEmpManager] = useState(wfm_manager)
    const [req_desc, setRequestDesc] = useState("NA")
    
    dispatch(getSoftlockRequests(wfm_manager))
    
    return (
        <div>
            <div className="bg-theme col-md-12 p-2">
                <h1>WFM Home</h1>
            </div>
            <div className="col-md-12 container pt-5">
                <h3>Softlock Request List</h3>
                <table className="table table-bordered">
                    <thead className="bg-theme">
                        <tr>
                            <th>Employee ID</th>
                            <th>Requestee</th>
                            <th>Request Date</th>
                            <th>Employee Manager</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            softlocks.map((softlock: any) => 
                                <tr>
                                    <td>{softlock.employee_id}</td>
                                    <td>{softlock.manager}</td>
                                    <td>{softlock.reqdate}</td>
                                    <td>{wfm_manager}</td>
                                    <td>
                                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateLock"
                                            onClick={()=>{
                                                setEmployeeID(softlock.employee_id);
                                                setRequestee(softlock.manager);
                                                setEmpManager(wfm_manager);
                                                setRequestDesc(softlock.requestmessage)
                                                }}>
                                            <i className="bi-eye-fill"></i> &ensp;
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <WfmManagerModal employee_id={employee_id} requestee={requestee} emp_manager={emp_manager} req_desc={req_desc}></WfmManagerModal>
        </div> 
    )
        
}

export default WFMHome