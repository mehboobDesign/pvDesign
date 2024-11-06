import React,{useState, useEffect} from "react";
import SelectComponent from '../../Common/SelectComponent';
import InputComponent from '../../Common/InputComponent';
import Axios from "../../../api/Axios";

const ConfigureProject = () => {
    const [pvModuleType, setPvModuleType] = useState();
    const [pvModuleTypeFocus, setPvModuleTypeFocus] = useState(false);

    const GET_PVMODULES_URL = 'pvmodules/';
    const pv_module_type = ['ABC','XYZ','UVW'];
    useEffect(()=>{
        const getAllPvModules = async () => {
            try {
                await Axios.get(GET_PVMODULES_URL)
                .then(function (response) {
                    //setRole(response.data.role);
                    console.log(response);
                })
            } catch (err) {
                console.log(err);
            }
        };
        getAllPvModules();
    },[]);
    return( 
    <>
        <div className="text-center font-bold p-4 bg-slate-100 mb-4">Configure Your Project</div>
                <div className="grid grid-cols-2 gap-1">
                    <div className="border-[1px] p-2 mb-4">PV Module Type</div>
                    <div className="border-[1px] mb-4">
                    <SelectComponent 
                        id="pvModuleType" 
                        defaultValue = "Select PV Module Type"
                        values={pv_module_type} 
                        onChange={event => setPvModuleType(event.target.value)}
                        ariaInvalid="test"
                        ariaDescribedby="courtNameNote"
                        onFocus={()=>setPvModuleTypeFocus(true)}
                    />
                    </div>
                    <div className="border-[1px] p-2 mb-4">Inverter Type</div>
                    <div className="border-[1px] mb-4">
                    <SelectComponent 
                        id="pvModuleType" 
                        defaultValue = "Select Inverter Type"
                        values={pv_module_type} 
                        onChange={event => setPvModuleType(event.target.value)}
                        ariaInvalid="test"
                        ariaDescribedby="courtNameNote"
                        onFocus={()=>setPvModuleTypeFocus(true)}
                    />
                    </div>
                    <div className="border-[1px] p-2 mb-4">MMS</div>
                    <div className="border-[1px] mb-4">
                    <SelectComponent 
                        id="mms" 
                        defaultValue = "Select MMS"
                        values={pv_module_type} 
                        onChange={event => setPvModuleType(event.target.value)}
                        ariaInvalid="test"
                        ariaDescribedby="courtNameNote"
                        onFocus={()=>setPvModuleTypeFocus(true)}
                    />
                    </div>
                    <div className="border-[1px] p-2 mb-4">PNOM Ratio(DC:AC)</div>
                    <div className="border-[1px] mb-4">
                    <InputComponent 
                        id="mms" 
                    />
                    </div>
                    <div className="text-center font-bold p-4 col-span-2 bg-slate-100 mb-4">PV Array Characteristics</div>
                    <div className="border-[1px] p-2 mb-4">Select Inverter</div>
                    <div className="border-[1px] mb-4">
                    <SelectComponent 
                        id="mms" 
                        defaultValue = "Select Inverter"
                        values={pv_module_type} 
                        onChange={event => setPvModuleType(event.target.value)}
                        ariaInvalid="test"
                        ariaDescribedby="courtNameNote"
                        onFocus={()=>setPvModuleTypeFocus(true)}
                    />
                    </div>
                    <div className="border-[1px] p-2 mb-4">Select PV Module</div>
                    <div className="border-[1px] mb-4">
                    <SelectComponent 
                        id="mms" 
                        defaultValue = "Select PV Module"
                        values={pv_module_type} 
                        onChange={event => setPvModuleType(event.target.value)}
                        ariaInvalid="test"
                        ariaDescribedby="courtNameNote"
                        onFocus={()=>setPvModuleTypeFocus(true)}
                    />
                    </div>
                    <div className="border-[1px] p-2 mb-4">Give a name to your Design Configuration</div>
                    <div className="border-[1px] mb-4">
                        <InputComponent
                        />
                    </div>
                    <button className="col-span-2 border-[1px] p-2 hover:bg-amber-500">SAVE CONFIGURATION</button>
                </div>
                </>
    );
}
export default ConfigureProject;