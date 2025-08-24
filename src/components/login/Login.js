import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "../../api/Axios";
import useAuth from '../Hooks/UseAuth';
// import ClipLoader from "react-spinners/ClipLoader";
import { CircleLoader } from "react-spinners";
import AlertModal from "../Common/Modal/AlertModal";

const LOGIN_URL = 'users/login';

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname || '/';

    const userRef = useRef();
    //const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await Axios.post(LOGIN_URL,
                {
                    email: email,
                    password: pwd
                }
            );
            //console.log(response);
            const userEmail = response.data.email;
            const userId = response.data.userId;
            if (response?.status === 200) {
                setAuth({ userEmail, userId });
                //setAuth({ email });
                setEmail('');
                setPwd('');
                navigate(from, { replace: true });
            }




            //console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            //const jwtToken = response?.data?.token;


        } catch (err) {
            console.log(err?.status);
            setIsLoading(false);
            // if(!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err?.response?.status === 403) {
            //     setErrMsg('Bad Credientials');
            // } else if(err?.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            //errorRef.current.focus();
            if (err?.status === 401) {
                setErrMsg("Unauthorize access, please check your email and password");
                setErrorAlert(true);
                setIsLoading(false);
            } else if (err?.status === 500) {
                setErrMsg("Server Error");
                setErrorAlert(true);
                setIsLoading(false);
            } else if (err?.status === undefined) {
                setErrMsg("Database connection refused. Please check your internet connectivity.");
                setErrorAlert(true);
                setIsLoading(false);
            }
            //errorRef.current.focus();
        }


    }

    return (
        <>

            {isLoading ? <div className="flex items-center justify-center"><CircleLoader color={'#D0021B'} loading={isLoading} size={100} /></div> :
                // <div className="flex h-screen items-center justify-center">
                <form className="" onSubmit={handleSubmit}>
                    {/* <p className={errMsg ? "text-orange-500" : "hidden"} ref={errorRef} aria-live="assertive">{errMsg}</p> */}
                    <h1 className="text-4xl font-black text-stone-700">Login</h1>
                    <div className="grid pt-2">
                        <label htmlFor="email" className="mb-2">
                            <span className="text-stone-700">Email:</span>
                        </label>
                        <input
                            className="bg-gray-100 p-2 rounded-lg text-stone-700 outline-stone-200"
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="grid pt-2">
                        <label htmlFor="password" className="mb-2">
                            <span className="text-stone-700">Password:</span>
                        </label>
                        <input
                            className="bg-gray-100 p-2 rounded-lg text-stone-700 outline-stone-200"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>
                    <div className="grid mt-6">
                        <button className="border bg-orange-400 text-white hover:bg-stone-700 hover:border-stone-700 rounded-lg p-2">Sign In</button>
                    </div>
                </form>
                // </div>
            }

            <AlertModal modalOpen={errorAlert} onClose={() => setErrorAlert(false)}>
                <div className='text-center w-96'>
                    <h3 className={`text-lg font-black text-red-600 p-4}`}>
                        Opps.....!
                    </h3>
                    <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>
                        {errMsg}
                    </p>
                    <div className='flex gap-4 justify-center items-center'>
                        {errorAlert && <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 w-1/2 pt-1 pl-2 pr-2 pb-1" onClick={() => setErrorAlert(false)}>OK</button>}
                    </div>
                </div>
            </AlertModal>

        </>
    );
}
export default Login;