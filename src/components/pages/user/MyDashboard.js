import React, { useEffect, useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import Axios from "../../../api/Axios";
import UpdateProjectModal from "../../Common/Modal/UpdateProjectModal";
import UpdateDesignModal from '../../Common/Modal/UpdateDesignModal';

const MY_PROJECT = 'v1/projects/byuser/';

const MyDashboard = () => {
    const {auth} = UseAuth();
    const [projectData, setProjectData] = useState([]);
    const [projectId, setProjectId] = useState('');
    const [designId, setDesignId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [dModalOpen, setDModalOpen] = useState(false);
    
    useEffect(()=>{ 
        if(updating || auth.userId) {
            const getAllProjectById = async () => {
                try {
                    await Axios.get(MY_PROJECT.concat(auth.userId))
                    .then(function (response) {
                        setProjectData(response.data); console.log(response.data);
                        setUpdating(false);
                    })
                } catch (err) {
                    console.log(err);
                }
            };
            getAllProjectById();
        }
            
        
    },[auth.userId, updating]);
    const editProject = (p_id) => {
        //console.log(p_id);
        setProjectId(p_id);
        setModalOpen(true);
    };
    const editDesign = (des_id) => {
        setDesignId(des_id);
        setDModalOpen(true);
    }
    return(
        <div>
            {projectData.length === 0 ? 
                <div className='dark:text-slate-700 text-slate-700 text-2xl'>
                    No project has created.
                </div> : 
            <div className='grid'>
                <div className="grid grid-cols-2 gap-6">
                    {projectData.map((data,index) => ( 
                    <div key={index} className='shadow-xl'>
                        <h1 className='text-xl border-b bg-gray-50  border-gray-300 font-bold p-4 text-slate-800'>Project Name: <span className="underline">{data.project_name}</span></h1> 
                        <div className="flex flex-row"> 
                            <div className="basis-11/12">
                                <div className="px-4 py-2 ">Project Location: <span className="underline">{data.project_location}</span></div>
                                <div className="px-4 py-2 ">Project Latitude: <span className="underline">{data.project_latitude}</span></div>
                                <div className="px-4 py-2 ">Project Longitude: <span className="underline">{data.project_longitude}</span></div>
                            </div> 
                            <div className="basis-1/12 p-2">
                                <div className="text-center mt-4"><button className=' p-2 border border-gray-200 hover:bg-slate-200 rounded-2xl' onClick={()=>editProject(data.projectId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    </button>
                                </div>
                                <div className="text-center"><button className='border border-gray-200 hover:bg-slate-200 rounded-2xl p-2 mt-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-none">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    </button> 
                                </div>
                            </div>
                        </div>
                        <h1 className='p-4 text-md font-bold border-b border-gray-300 bg-gray-50 text-slate-800'>Design Configuration</h1>
                        <div className="flex flex-row">
                            <div className="basis-11/12">
                                <div className="px-4 py-2">Configuration Name: <span className="underline">{data.designConfig.designName}</span></div>
                                <div className="px-4 py-2">PvModule Name: <span className="underline">{data.designConfig.pvModule.manufacturer}</span></div>
                                <div className="px-4 py-2">Inverter Name: <span className="underline">{data.designConfig.inverter.manufacturer}</span></div>
                            </div> 
                            <div className="basis-1/12 p-2">
                                <div className="text-center mt-4"><button className=' p-2 border border-gray-200 hover:bg-slate-200 rounded-2xl' onClick={()=>editDesign(data.designConfig.designId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    </button>
                                </div>
                                <div className="text-center"><button className='border border-gray-200 hover:bg-slate-200 rounded-2xl p-2 mt-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-none">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    </button> 
                                </div>
                            </div>
                        </div>
                            
                            <h1 className='px-4 py-4 text-md font-bold border-b border-gray-300 bg-gray-50 text-slate-800'>Report</h1>
                            <div className="px-4 py-2">No report found. <button className="border border-gray-200 bg-white p-2 hover:bg-amber-600 hover:text-white">Generate Report</button></div>
                            <div className="text-center mt-4 mb-4"></div>

                        
                  </div> 
                    
            ))} 
            </div> 
          </div>
}
<UpdateProjectModal modalOpen={modalOpen} onClose={()=>setModalOpen(false)} id={projectId} setUpdating={setUpdating} />
<UpdateDesignModal modalOpen={dModalOpen} onClose={()=>setDModalOpen(false)} id={designId} setUpdating={setUpdating}/>
</div>
    );
    
}
export default MyDashboard;