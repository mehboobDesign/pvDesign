import React, {useEffect, useState} from "react";
import UseAuth from "../Hooks/UseAuth";
import Axios from "../../api/Axios";
//import axios from "axios";
import AdminHome from './admin/AdminHome';
import UserHome from './user/UserHome';
import MasterHome from './master/MasterHome';

//const GET_ROLE_URL = 'http://pvbackend-app-env.eba-mzabmx8q.ap-south-1.elasticbeanstalk.com/api/users/role/';
const GET_ROLE_URL = 'users/role/';


const Home = () => {
    const { auth } = UseAuth();
    const [role, setRole] = useState();
    
    useEffect(()=>{
        const getRole = async () => {
            try {
                await Axios.get(GET_ROLE_URL.concat(auth.email))
                .then(function (response) {
                    setRole(response.data.role);
                })
            } catch (err) {
                console.log(err);
            }
        };
        getRole();
    },[auth.email]);

    return (
        <>
            {role === 'ADMIN' && <AdminHome/>}
            {role === 'USER' && <UserHome/>}
            {role === 'MASTER' && <MasterHome/>}
        </>
    );
}
export default Home;