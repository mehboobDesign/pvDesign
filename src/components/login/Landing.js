import React, { useState } from "react";
import Footer from "../Common/Footer";
//import Label from "../Common/Label";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

//import emailJs from '@emailjs/browser';
const Landing = () => {
    // const form = useRef();
    // const sendEmail = (e) => {
    //     e.preventDefault();
    //     //emailJs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'Your_PUBLIC_KEY')
    //     emailJs.sendForm('service_ebeds6e', 'template_gg4z305', form.current, 'EeD0gW7XxtfHXUvcC')
    //         .then((result) => {
    //             console.log(result.text);
    //         }, (error) => {
    //             console.log(error.text);
    //         });
    // };
    // return (
    //     <>
    //         <div className="flex h-screen items-center justify-center">
    //             <div className="w-3/4 border border-gray-100 shadow-2xl">
    //                 <div className="flex flex-wrap">
    //                     <div className="w-1/2 border-r-2 border-gray-200 p-8">
    //                         <h1 className="text-orange-400 font-black text-2xl border-b border-orange-400">Pv_Design_Solution</h1>
    //                         <div className="leading-8 text-justify text-lg mt-3">
    //                             Hi and a huge welcome from Team Pv_Design_Solution! We're thrilled to have you with us. Get ready for a memorable time and a great experience. We're just a message away if you need anything.
    //                             With the help of technology we simplify your goal. We tried to minimize your effort to achive your goal. Feel free to contact us if any query, regarding this website. Our contact details are given below.
    //                             Once again thanking you to choose us. Hope your journy with us is memorable.
    //                         </div>
    //                     </div>
    //                     <div className="w-1/2 p-8">
    //                         <form ref={form} onSubmit={sendEmail}>
    //                             <input
    //                                 className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white"
    //                                 id="verifyEmail"
    //                                 name="to_name"
    //                             />
    //                             <Label htmlFor="verifyEmail" nameOfLabel="Enter email to verify" />
    //                             <input
    //                                 className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white"
    //                                 id="verifyEmail"
    //                                 name="from_name"
    //                             />
    //                             <input
    //                                 className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white"
    //                                 id="verifyEmail"
    //                                 name="message"
    //                             />

    //                             <button className="p-2 mt-2 mb-10 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-400 hover:text-white">Submit</button>
    //                         </form>
    //                         <Label htmlFor="verifyOtp" nameOfLabel="Enter One time Password" />
    //                         <input
    //                             className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white"
    //                             id="verifyOtp"
    //                         />
    //                         <button className="p-2 mt-2 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-400 hover:text-white">Verify Email</button>
    //                         <p className="mt-20">Already have account, <Link to="/login" className="text-lime-500">Click here</Link></p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <Footer />
    //     </>
    //);
    const [toggle, setToggle] = useState(true);
    return (
        <>
            {/* <div className="relative flex min-h-screen justify-center items-center">
                 <div className="absolute inset-y-16 inset-x-0 w-16 rounded-full rotate-45 bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl mx-auto scale-y-150 opacity-75"></div> 
                <div className="absolute inset-y-16 inset-x-0 w-16 blur-3xl rounded-full rotate-45 bg-gradient-to-b from-pink-500 to-purple-600"></div>
                <div className="absolute inset-y-5 inset-x-20 blur-3xl w-16 rounded-full rotate-45 bg-gradient-to-b from-pink-500 to-purple-600"></div>
                <h1>Assam</h1>
            </div> */}
            <div className="flex h-screen items-center justify-center">
                <div className="w-3/4">
                    <div className="flex flex-wrap h-[500px]">
                        <div className="w-1/2">
                            <FontAwesomeIcon className="text-orange-400 text-7xl" icon={faCode} />
                            <h1 className="text-orange-400 font-black text-8xl leading-tight">PV Design Solution</h1>
                            <span className="text-stone-700 font-light text-lg">A simplified way of Life....</span>
                        </div>
                        <div className={`w-1/2 p-8 shadow-2xl shadow-orange-400/75 
                        ${toggle ? "h-[390px]" : "h-[540px]"}`}>
                            {toggle ? <Login /> : <Register />}
                            <p className="mt-8 text-stone-700">
                                {toggle ? <>No Account. Please, <button onClick={() => setToggle(false)} className="text-lime-500">
                                    Click here
                                </button>  to register.</> : <>Already registered! <button onClick={() => setToggle(true)} className="text-lime-500">Click here</button></>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Landing;