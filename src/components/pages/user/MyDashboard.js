import React, { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import Axios from "../../../api/Axios";
import UpdateProjectModal from "../../Common/Modal/UpdateProjectModal";
//import UpdateDesignModal from '../../Common/Modal/UpdateDesignModal';
import MyGraph from "./MyGraph";
import AlertModal from "../../Common/Modal/AlertModal";
const MY_PROJECT = 'v1/projects/byuser/';
const CREATE_IRRIDATION = 'irr/create/';
const CREATE_GLOBAL_IRRADIATION = 'globirr/create/';
const CAL_GRAPH = '/results/create/';

const MyDashboard = () => {
    const { auth } = UseAuth();
    const [projectData, setProjectData] = useState([]);
    const [projectId, setProjectId] = useState('');
    //const [designId, setDesignId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    //const [designModal, setDesignModal] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [irrMesg, setIrrMesg] = useState('');

    useEffect(() => {
        if (updating || auth.userId) {
            const getAllProjectById = async () => {
                try {
                    await Axios.get(MY_PROJECT.concat(auth.userId))
                        .then(function (response) {
                            setProjectData(response.data);
                            console.log(response.data);
                            setUpdating(false);
                        })
                } catch (err) {
                    console.log(err);
                }
            };
            getAllProjectById();
        }
    }, [auth.userId, updating]);
    const editProject = (p_id) => {
        //console.log(p_id);
        setProjectId(p_id);
        setModalOpen(true);
    };
    // const editDesign = (des_id) => {
    //     setDesignId(des_id);
    //     setDesignModal(true);
    // };
    const calculateIrridationData = async (project_id) => {
        const data = [
            {
                "year": 2024,
                "month": "January",
                "glob_hor": 110.4,
                "glob_inc": 141.2,
            },
            {
                "year": 2024,
                "month": "February",
                "glob_hor": 112,
                "glob_inc": 132.2,
            },
            {
                "year": 2024,
                "month": "March",
                "glob_hor": 149.9,
                "glob_inc": 162.6,
            },
            {
                "year": 2024,
                "month": "April",
                "glob_hor": 142.1,
                "glob_inc": 144.4,
            },
            {
                "year": 2024,
                "month": "May",
                "glob_hor": 142.7,
                "glob_inc": 137.5,
            },
            {
                "year": 2024,
                "month": "June",
                "glob_hor": 136.3,
                "glob_inc": 128.4,
            },
            {
                "year": 2024,
                "month": "July",
                "glob_hor": 129.4,
                "glob_inc": 122.8,
            },
            {
                "year": 2024,
                "month": "August",
                "glob_hor": 142.4,
                "glob_inc": 140.4,
            },
            {
                "year": 2024,
                "month": "September",
                "glob_hor": 129.8,
                "glob_inc": 136.3,
            },
            {
                "year": 2024,
                "month": "October",
                "glob_hor": 124.8,
                "glob_inc": 140.7,
            },
            {
                "year": 2024,
                "month": "November",
                "glob_hor": 123.1,
                "glob_inc": 156.6,
            },
            {
                "year": 2024,
                "month": "December",
                "glob_hor": 111.2,
                "glob_inc": 148.1,
            }
        ]
        try {
            const response = await Axios.post(CREATE_IRRIDATION.concat(project_id), data);
            console.log(JSON.stringify(response?.data));
            //alert(JSON.stringify(response.data.message));
            setSuccessAlert(true);
            setIrrMesg(response?.data.message);
            //setSuccessAlert
        } catch (err) {
            console.log(err);
        }
    };
    const calculateGlobalIrridationData = async (project_id) => {
        const data = {
            "year": 2024,
            "globalIncident": 108.82,
            "irradianceLoss": 98.39,
            "iam_factor": 99.75,
            "soilingLoss": 97.66,
            "groundReflection": 100.00
        }
        try {
            const response = await Axios.post(CREATE_GLOBAL_IRRADIATION.concat(project_id), data);
            console.log(response.data);
            //alert(JSON.stringify(response.data.message));
            setSuccessAlert(true);
            setIrrMesg(response?.data.message);
            //setSuccessAlert
        } catch (err) {
            console.log(err);
        }
    };
    const generateGraph = (p_id) => {
        setProjectId(p_id);
        setShowGraph(true);
    };
    const calculateGraph = async (project_id) => {
        try {
            const response = await Axios.post(CAL_GRAPH.concat(project_id));
            console.log(response.data);
            //setSuccessAlert(true);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {!showGraph &&
                <div>
                    {projectData.length === 0 ?
                        <div className='dark:text-slate-700 text-slate-700 text-2xl'>
                            No project has created.
                        </div> :
                        <div className='grid'>
                            <div className="grid grid-cols-2 gap-6">
                                {projectData.map((data, index) => (
                                    <div key={index} className='shadow-xl'>
                                        <div className="flex border-b bg-gray-50  border-gray-300 font-bold text-slate-800 ">
                                            <div className="basis-10/12">
                                                <h1 className='text-md p-4'>Project Name: <span className="underline">{data.project_name}</span></h1>
                                            </div>
                                            <div className="basis-2/12 p-3">
                                                <div className="flex">
                                                    <div className="text-center">
                                                        <button className='border border-gray-200 bg-gray-300 text-slate-700 hover:text-white hover:bg-green-700 p-1' onClick={() => editProject(data.projectId)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="text-center">
                                                        <button className='border border-gray-200 bg-gray-400 text-slate-700 hover:text-white hover:bg-red-500 p-1'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-6 fill-none">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="basis-12/12 text-sm pl-4">
                                                <div className="flex flex-wrap [&>*:nth-child(odd)]:md:w-[53%] [&>*:nth-child(even)]:md:w-[47%] [&>*]:pt-3">
                                                    <div className="">Project Location: <span className="underline">{data.project_location}</span></div>
                                                    <div className="">Project Latitude: <span className="underline">{data.project_latitude}</span></div>
                                                    <div className="">Project Longitude: <span className="underline">{data.project_longitude}</span></div>
                                                    <div className="">Year: <span className="underline">{data.year}</span></div>
                                                    <div className="">Configuration Name: <span className="underline">{data.designConfig.designName}</span></div>
                                                    <div className="">PvModule Name: <span className="underline">{data.designConfig.pvModule.manufacturer}</span></div>
                                                    <div className="">Inverter Name: <span className="underline">{data.designConfig.inverter.manufacturer}</span></div>
                                                    <div className="">Active Power: <span className="underline">{data.designConfig.active_power}</span></div>
                                                    <div className="">Azimuth: <span className="underline">{data.designConfig.azimuth}</span></div>
                                                    <div className="">Bifaciality Factor: <span className="underline">{data.designConfig.bifaciality_factor}</span></div>
                                                    <div className="">GCR: <span className="underline">{data.designConfig.gcr}</span></div>
                                                    <div className="">Ground Albido: <span className="underline">{data.designConfig.ground_albido}</span></div>
                                                    <div className="">Height above Ground: <span className="underline">{data.designConfig.height_above_ground}</span></div>
                                                    <div className="">Limit Profile Angle: <span className="underline">{data.designConfig.limit_profile_angle}</span></div>
                                                    <div className="">PNOM Ratio: <span className="underline">{data.designConfig.pnom_ratio}</span></div>
                                                    <div className="">Rear Mismatch Loss: <span className="underline">{data.designConfig.rear_mismatch_loss}</span></div>
                                                    <div className="">Rear shading Factor: <span className="underline">{data.designConfig.rear_shading_factor}</span></div>
                                                    <div className="">Shed Transparent Fraction: <span className="underline">{data.designConfig.shed_transparent_fraction}</span></div>
                                                    <div className="">Sheds Spacing: <span className="underline">{data.designConfig.sheds_spacing}</span></div>
                                                    <div className="">Sheds Width: <span className="underline">{data.designConfig.sheds_width}</span></div>
                                                    <div className="">Tilt: <span className="underline">{data.designConfig.tilt}</span></div>
                                                    <div className="">Tracker Spacing: <span className="underline">{data.designConfig.tracker_spacing}</span></div>
                                                    <div className="">Tracker Width: <span className="underline">{data.designConfig.tracker_width}</span></div>
                                                    <div className="pb-3">Tracking Axis Horizontal: <span className="underline">{data.designConfig.tracking_axis_horizontal}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex pl-4">
                                            <button className="border text-sm border-gray-200 px-1 py-2 hover:bg-slate-400 duration-100" onClick={() => calculateIrridationData(data.projectId)}>Load Irradiation Data</button>
                                            <button className="border text-sm border-gray-200 px-1 py-2 hover:bg-slate-400 duration-100" onClick={() => calculateGlobalIrridationData(data.projectId)}>Load Global Irradiation Data</button>
                                        </div>
                                        <div className="flex  bg-gray-50 pl-4">
                                            <button className="border text-sm border-gray-200 px-1 py-2 hover:bg-slate-400 duration-100" onClick={() => calculateGraph(data.projectId)}>Create Graph</button>
                                            <button className="border text-sm border-gray-200 px-1 py-2 hover:bg-slate-400 duration-100" onClick={() => generateGraph(data.projectId)}>Show Graph</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    <UpdateProjectModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} id={projectId} setUpdating={setUpdating} />
                    {/* <UpdateDesignModal modalOpen={designModal} onClose={() => setDesignModal(false)} id={designId} setUpdating={setUpdating} /> */}
                </div>
            }
            {showGraph && <MyGraph id={projectId} onClose={() => setShowGraph(false)} />}


            <AlertModal modalOpen={errorAlert || successAlert} onClose={() => setErrorAlert(false) || setSuccessAlert(false)}>
                <div className='text-center w-96'>
                    <h3 className={`text-lg font-black ${errorAlert ? "text-red-600" : "text-green-600"} p-4}`}>
                        {errorAlert ? 'Opps! Invalid Entries.' : ''}
                    </h3>
                    <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>
                        {errorAlert ? 'Please cross verify the input fileds!' : irrMesg}
                    </p>
                    <div className='flex gap-4 justify-center items-center'>
                        {errorAlert && <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 w-1/2 p-2" onClick={() => setErrorAlert(false)}>OK</button>}
                        {successAlert && <button className="border border-green-500 bg-green-500 text-white hover:bg-green-600 w-1/2 p-2" onClick={() => setSuccessAlert(false)}>OK</button>}
                    </div>
                </div>
            </AlertModal>
        </>
    );

}
export default MyDashboard;