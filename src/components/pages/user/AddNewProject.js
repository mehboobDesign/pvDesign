import React, {useState} from "react";
import SelectComponent from "../../Common/SelectComponent";
import InputComponent from "../../Common/InputComponent";

const AddNewProject = () => {
    const [existingConfiguration, setExistingConfiguration] = useState();
    const existingConfigurationArray = ['A','B','C'];
    return(
        <div>
            <div className="grid grid-cols-2 gap-1">
                <div className="text-center col-span-2 font-bold p-4 bg-slate-100 mb-4">Add New Project</div>
                    <div className="border-[1px] p-2 mb-4">Select Existing Configuration</div>
                    <div className="border-[1px] mb-4">
                        <SelectComponent 
                            id="pvModuleType" 
                            defaultValue = "Select Existing Configuration"
                            values={existingConfigurationArray} 
                            onChange={event => setExistingConfiguration(event.target.value)}
                            ariaInvalid="test"
                            ariaDescribedby="courtNameNote"
                            onFocus={()=>setExistingConfiguration(true)}
                        />
                    </div>
                    <div className="border-[1px] p-2 mb-4">Project Name</div>
                    <div className="border-[1px] mb-4">
                        <InputComponent 
                            id="pvModuleType" 
                        />
                    </div>
                    <div className="border-[1px] p-2 mb-4">Project Location</div>
                    <div className="border-[1px] mb-4">
                        <InputComponent 
                            id="pvModuleType" 
                        />
                    </div>
                    <div className="border-[1px] p-2 mb-4">Latitude</div>
                    <div className="border-[1px] mb-4">
                        <InputComponent 
                            id="pvModuleType" 
                        />
                    </div>
                    <div className="border-[1px] p-2 mb-4">Longitude</div>
                    <div className="border-[1px] mb-4">
                        <InputComponent 
                            id="pvModuleType" 
                        />
                    </div> <button className="col-span-2 border-[1px] p-2 hover:bg-amber-500">CREATE PROJECT</button>

                </div>
        </div>
    );
}
export default AddNewProject;