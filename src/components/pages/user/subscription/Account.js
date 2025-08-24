import React, { useState, useEffect } from "react";
//import { StepperContext } from "../../../../context/StepperProvider";
import Axios from "../../../../api/Axios";
import UseAuth from "../../../Hooks/UseAuth";

const USER_DETAILS = '/users/';

const Account = () => {
    const [userDetails, setUserDetails] = useState(['']);
    const { auth } = UseAuth();
    // const { userData, setUserData } = useContext(StepperContext);
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData({ ...userData, [name]: value });
    // };
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                await Axios.get(USER_DETAILS.concat(auth.userEmail))
                    .then(function (response) {
                        setUserDetails(response.data);
                    })
            } catch (err) {
                console.log(err);
            }
        };
        getUserDetails();
    }, [auth.userEmail])
    return (
        <div className="flex flex-col">
            <table className="w-full">
                <tbody className="[&>*]:[&>*]:p-4 [&>*]:[&>*:nth-child(odd)]:bg-zinc-100 [&>*]:[&>*:nth-child(even)]:bg-zinc-50">
                    <tr className="[&>*:nth-child(odd)]:border-r-2">
                        <td className="">User ID:</td>
                        <td className="">{userDetails['userId']}</td>
                    </tr>
                    <tr className="[&>*:nth-child(odd)]:border-r-2">
                        <td className="">Name:</td>
                        <td className="">{userDetails['name']}</td>
                    </tr>
                    <tr className="[&>*:nth-child(odd)]:border-r-2">
                        <td className="">Email:</td>
                        <td className="">{userDetails['email']}</td>
                    </tr>
                    <tr className="[&>*:nth-child(odd)]:border-r-2">
                        <td>Mobile No:</td>
                        <td>999999999</td>
                    </tr>
                    <tr className="[&>*:nth-child(odd)]:border-r-2">
                        <td>Register since:</td>
                        <td>{userDetails['start_date']}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
export default Account;