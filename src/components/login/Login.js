import React, {useRef, useState, useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Axios from "../../api/Axios";
import useAuth from '../Hooks/UseAuth';
// import ClipLoader from "react-spinners/ClipLoader";
import { CircleLoader } from "react-spinners";

const LOGIN_URL = 'users/login';

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname || '/'; 

    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[]);
    
    useEffect(()=>{
        setErrMsg('');
    },[email,pwd]);

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
            //console.log(response?.data?.message);
            console.log(response?.status);
            if(response?.status === 200) { 
                setAuth({email,pwd});
                setEmail('');
                setPwd('');
                navigate( from, { replace: true});
            }
           
           
            
            
            //console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            //const jwtToken = response?.data?.token;
           

          } catch(err) {
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
            if(err?.status === 401) {
                setErrMsg("Unauthorize access, please check your email and password");
                setIsLoading(false);
            }
            //errorRef.current.focus();
          }

       
            }

    return (
        <>
            
    {isLoading?<div className="flex items-center justify-center mt-44"><CircleLoader color={'#D0021B'} loading={isLoading} size={100}/></div>:
        <div className="flex h-screen items-center justify-center">
        <form className="w-96 p-8 shadow-2xl" onSubmit={handleSubmit}>
        <p className={errMsg ? "text-red-500" : "hidden"} ref={errorRef} aria-live="assertive">{errMsg}</p>
            <h1 className="text-4xl font-bold dark:text-gray-800 text-orange-600">Login</h1>
            <div className="grid pt-2">
                <label htmlFor="username" className="mb-2">
                    <span className="dark:text-slate-800 text-stone-700">Email:</span>
                </label>
                <input
                    className="bg-slate-100 dark:bg-gray-100 p-2 rounded-lg text-slate-700 focus:outline-none"
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    required
                />
            </div>
            <div className="grid pt-2">
                <label htmlFor="password" className="mb-2">
                    <span className="dark:text-slate-800 text-stone-700">Password:</span>
                </label>
                <input
                    className="bg-slate-100 dark:bg-gary-100 p-2 rounded-lg text-slate-700 focus:outline-none"
                    type="password"
                    id="password"
                    onChange={(e)=> setPwd(e.target.value)}
                    value={pwd}
                    required
                />
            </div>
            <div className="grid mt-6">
                <button className="border bg-white text-stone-700 hover:bg-amber-500 hover:border-amber-500 rounded-lg p-2 disabled:cursor-not-allowed">Sign In</button>
            </div>
            <p className="mt-8 text-stone-700">Plz, <Link to="/register" className="text-lime-500">Click here</Link> to register.</p>
        </form>
    </div> 
    }
   
        </>
    );
}
export default Login;