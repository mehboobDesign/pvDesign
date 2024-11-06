import React, {useState} from "react";
import { faArrowLeftLong, faCirclePlus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatePvModule from "./CreatePvModule";
import CreateInverterModule from "./CreateInverterModule";
import ShowPvModule from "./ShowPvModule";
import ShowInverterModule from "./ShowInverterModule";


const MasterHome = () => {
    const [open , setOpen] = useState(true);
    const [content, setContent] = useState(1);

    return (
        <div className="flex">
            <div className={`${open ? "w-72" : "w-20"} 
            duration-300 h-screen bg-gray-200 relative`}>
               <FontAwesomeIcon className={`absolute cursor-pointer rounded-full 
                -right-3 top-2 w-7 border-2 border-slate-800 ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)}
                icon={faArrowLeftLong} />
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600  p-2 cursor-pointer ${content === 1 && "bg-slate-300"}`} onClick={()=>setContent(1)}>
                   <FontAwesomeIcon className={`cursor-pointer pl-4 duration-500 text-slate-800 hover:text-white`} size="2x" icon={faCirclePlus} />
                    <p className={`text-slate-800 origin-left font-medium
                     text-md duration-300 ${!open && "hidden"} hover:text-white`}>Create_PV_Module</p>
                </div>
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600  p-2 cursor-pointer ${content === 2 && "bg-slate-300"}`} onClick={()=>setContent(2)}>
                   <FontAwesomeIcon className={`cursor-pointer pl-4 duration-500 text-slate-800 hover:text-white`} size="2x" icon={faCirclePlus} />
                    <p className={`text-slate-800 origin-left font-medium
                     text-md duration-300 ${!open && "hidden"} hover:text-white`}>Show_PV_Module</p>
                </div>
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600 p-2 cursor-pointer ${content === 3 && "bg-slate-300"}`} onClick={()=>setContent(3)}>
                   <FontAwesomeIcon className={`cursor-pointer pl-4 duration-500 text-slate-800 hover:text-white`} size="2x" icon={faSquarePlus} />
                    <p className={`text-slate-800 origin-left font-medium
                     text-md duration-300 ${!open && "hidden"} hover:text-white`}>Create_Inverter_Module</p>
                </div>
                <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600  p-2 cursor-pointer ${content === 4 && "bg-slate-300"}`} onClick={()=>setContent(4)}>
                   <FontAwesomeIcon className={`cursor-pointer pl-4 duration-500 text-slate-800 hover:text-white`} size="2x" icon={faCirclePlus} />
                    <p className={`text-slate-800 origin-left font-medium
                     text-md duration-300 ${!open && "hidden"} hover:text-white`}>Show_Inverter_Module</p>
                </div>
                {/* <div className={`flex gap-x-4 items-center duration-500 hover:bg-slate-600 p-2 cursor-pointer ${content === 3 && "bg-slate-300"}`} onClick={()=>setContent(3)}>
                   <FontAwesomeIcon className={`cursor-pointer pl-4 duration-500 text-slate-800 hover:text-white`} size="2x" icon={faGear} />
                    <p className={`text-slate-800 origin-left font-medium
                     text-md duration-300 ${!open && "hidden"} hover:text-white`}>Configure_Projects</p>
                </div> */}
            </div>
            
            <div className="p-7 flex-1 h-screen">
                {content === 1 && <CreatePvModule/>}
                {content === 2 && <ShowPvModule/>}
                {content === 3 && <CreateInverterModule/>}
                {content === 4 && <ShowInverterModule/>}
            </div>
        </div>
    );
}
export default MasterHome;
