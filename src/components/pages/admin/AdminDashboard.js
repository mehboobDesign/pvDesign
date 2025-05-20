import React, { useState, useEffect } from "react";
import Axios from "../../../api/Axios";
import AlertModal from "../../Common/Modal/AlertModal";

const GET_ALL_USER = 'users/';
const UPDATE_ROLE = 'users/updaterole/';

const AdminDashboard = () => {
    const [allUser, setAllUser] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [updatedRoleModal, setUpdatedRoleModal] = useState(false);
    const [selectedRoleValue, setSelectedRoleValue] = useState('');
    const [previousRole, setPreviousRole] = useState('');
    const [requiredEmail, setRequiredEmail] = useState('');
    useEffect(() => {
        const getAllUser = async () => {
            try {
                await Axios.get(GET_ALL_USER)
                    .then(function (response) {
                        //console.log(response.data);
                        setAllUser(response.data);
                        setUpdating(false);
                    })
            } catch (err) {
                console.log(err);
            }
        }
        getAllUser();
    }, [updating]);
    const wantToUpdateRole = (email, role) => {
        setUpdatedRoleModal(true);
        setRequiredEmail(email);
        setPreviousRole(role);
        setSelectedRoleValue('');
    }
    const finalUpdateRole = async (roleValue) => {
        try {
            const response = await Axios.put(UPDATE_ROLE.concat(roleValue), {
                email: requiredEmail
            })
            console.log(JSON.stringify(response?.data));
            setUpdating(true);
            setUpdatedRoleModal(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th className="border p-4 text-center">User Id</th>
                        <th className="border p-4 text-center">Name</th>
                        <th className="border p-4 text-center">Email</th>
                        <th className="border p-4 text-center">Role</th>
                        <th className="border p-4 text-center">Session Status</th>
                        <th className="border p-4 text-center">Start Date</th>
                        <th className="border p-4 text-center">Action(s)</th>
                    </tr>
                    {allUser.map((data, index) => (
                        <tr key={index}>
                            <td className="border p-4 text-center">{data.userId}</td>
                            <td className="border p-4 text-center">{data.name}</td>
                            <td className="border p-4 text-center">{data.email}</td>
                            <td className="border p-4 text-center">{data.role}</td>
                            <td className="border p-4 text-center">{data.session_status ? "Active" : "Not Active"}</td>
                            <td className="border p-4 text-center">{data.start_date}</td>
                            <td className="border p-4 text-center">
                                <button className="border p-2 hover:bg-slate-500 hover:text-white" onClick={() => wantToUpdateRole(data.email, data.role)}>
                                    Update Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AlertModal modalOpen={updatedRoleModal} onClose={() => setUpdatedRoleModal(false)}>
                <div className='text-center w-96'>
                    {previousRole === "ADMIN" ?
                        <h3 className="p-2">You are Admin, not eligible to change your role.</h3>
                        :
                        <>
                            <select className="border border-slate-200 p-2 outline-none" value={selectedRoleValue} onChange={(e) => setSelectedRoleValue(e.target.value)}>
                                <option value="">Please Select Role</option>
                                <option value={previousRole === 'MASTER' ? 'USER' : 'MASTER'}>{previousRole === 'MASTER' ? 'USER' : 'MASTER'}</option>
                            </select>
                            <div className='flex gap-4 mt-3'>
                                <button className="border border-slate-200 text-slate-700 hover:bg-green-500 hover:text-white w-full p-2" onClick={() => finalUpdateRole(selectedRoleValue)}>Update</button>
                                <button className="border border-slate-200 text-slate-700 hover:bg-red-500 hover:text-white w-full p-2" onClick={() => setUpdatedRoleModal(false)}>Cancel</button>
                            </div>
                        </>
                    }
                </div>
            </AlertModal>
        </>
    )
}
export default AdminDashboard;