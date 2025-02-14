import React, { useState } from "react";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatePvModule from "./CreatePvModule";
import CreateInverterModule from "./CreateInverterModule";
import ShowPvModule from "./ShowPvModule";
import ShowInverterModule from "./ShowInverterModule";


const MasterHome = () => {
    const [open, setOpen] = useState(true);
    const [content, setContent] = useState(1);

    return (
        <div className="flex min-h-screen">
            <div className={`${open ? "w-64" : "w-20"} 
            duration-300 bg-gray-50 relative`}>
                <FontAwesomeIcon className={`absolute cursor-pointer rounded-full 
                -right-3 top-2 w-7 border-2 border-slate-800 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}
                    icon={faArrowLeftLong} />
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600 hover:text-white p-2 cursor-pointer ${content === 1 && "bg-slate-300"}`} onClick={() => setContent(1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <p className={`origin-left font-medium text-md ${!open && "hidden"}`}>Create_PV_Module</p>
                </div>
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600 hover:text-white p-2 cursor-pointer ${content === 2 && "bg-slate-300"}`} onClick={() => setContent(2)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                    </svg>
                    <p className={`origin-left font-medium text-md ${!open && "hidden"} hover:text-white`}>Show_PV_Module</p>
                </div>
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600 hover:text-white p-2 cursor-pointer ${content === 3 && "bg-slate-300"}`} onClick={() => setContent(3)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                    </svg>
                    <p className={`origin-left font-medium text-md ${!open && "hidden"} hover:text-white`}>Create_Inverter_Module</p>
                </div>
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600 hover:text-white  p-2 cursor-pointer ${content === 4 && "bg-slate-300"}`} onClick={() => setContent(4)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                    </svg>
                    <p className={`origin-left font-medium text-md ${!open && "hidden"} hover:text-white`}>Show_Inverter_Module</p>
                </div>
            </div>

            <div className="p-7 flex-1 h-screen">
                {content === 1 && <CreatePvModule />}
                {content === 2 && <ShowPvModule />}
                {content === 3 && <CreateInverterModule />}
                {content === 4 && <ShowInverterModule />}
            </div>
        </div>
    );
}
export default MasterHome;
