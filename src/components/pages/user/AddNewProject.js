import React, {useState, useEffect} from "react";
//import SelectComponent from "../../Common/SelectComponent";
import Axios from "../../../api/Axios";
import Label from "../../Common/Label";
import Input from "../../Common/Input";
import { NOT_SPECIAL_CHAR,DIRECTION } from '../../Common/ValidationConstants';
import AlertModal from "../../Common/Modal/AlertModal";
import SelectSearch from "../../Common/SelectSearch";
import UseAuth from "../../Hooks/UseAuth";

const NEW_PROJECT = 'v1/projects/new/';

const DESIGN_CONFIG = 'design/user/';

const AddNewProject = () => {
    const {auth}=UseAuth();
    const [designData, setDesignData] = useState([]);
    const [designId, setDesignId] = useState('');
    const [designName, setDesignName] = useState('');
    const [validDesignName, setValidDesignName] = useState(false);
    const [designNameFocus, setDesignNameFocus] = useState(false);

    const [projectName, setProjectName] = useState('');
    const [validProjectName, setValidProjectName] = useState(false);
    const [projectNameFocus, setProjectNameFocus] = useState(false);

    const [projectLocation, setProjectLocation] = useState('');
    const [validProjectLocation, setValidProjectLocation] = useState(false);
    const [projectLocationFocus, setProjectLocationFocus] = useState(false);

    const [latitude, setLatitude] = useState('');
    const [validLatitude, setValidLatitude] = useState(false);
    const [latitudeFocus, setLatitudeFocus] = useState(false);

    const [longitude, setLongitude] = useState('');
    const [validLongitude, setValidLongitude] = useState(false);
    const [longitudeFocus, setLongitudeFocus] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    useEffect(()=>{
       if(designName === 'Search' || designName === '') {
            setValidDesignName(false)
       } else {
            setValidDesignName(true);
       } 
    },[designName]);
    useEffect(()=>{
        const result = NOT_SPECIAL_CHAR.test(projectName);
        setValidProjectName(result);
    },[projectName]);
    useEffect(()=>{
        const result = NOT_SPECIAL_CHAR.test(projectLocation);
        setValidProjectLocation(result);
    },[projectLocation]);
    useEffect(()=>{
        const result = DIRECTION.test(latitude);
        setValidLatitude(result);
    },[latitude]);
    useEffect(()=>{
        const result = DIRECTION.test(longitude);
        setValidLongitude(result);
    },[longitude]);

    useEffect(()=>{
        const getAllDesignConfigById = async () => {
            try {
                await Axios.get(DESIGN_CONFIG.concat(auth.userId))
                .then(function (response) {
                    setDesignData(response.data); 
                })
            } catch (err) {
                console.log(err);
            }
        };
        getAllDesignConfigById();
    },[auth.userId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validDesignName && validProjectName && validProjectLocation && validLatitude && validLongitude) {
                const data = {
                    project_name:projectName,
                    project_location:projectLocation,
                    project_longitude:longitude,
                    project_latitude:latitude,
                }
                try {
                    const response = await Axios.post(NEW_PROJECT.concat(designId).concat('/').concat(auth.userId), data);
                    console.log(JSON.stringify(response?.data));
                    setSuccessAlert(true);
                  } catch(err) { 
                   console.log(err);
                  }
            } else {
                setErrorAlert(true);
            }    
    };
    const resetForm = () => {
        setDesignName('');
        setProjectName('');
        setProjectLocation('');
        setLatitude('');
        setLongitude('');
        setSuccessAlert(false);
    }
    const setSelectedDesignName = (selectedName) => { 
        setDesignName(selectedName);
        setDesignId(selectedName.designId);
    };

    return(
        <>
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                {/* <div className="text-center col-span-2 font-bold p-4 bg-slate-100 mb-4">Add New Project</div> */}
                    {/* <div className="">
                        <Label htmlFor="designConfig" nameOfLabel="Select Configuration" validRule={validDesignConfig} nameOfState={designData}/>
                        <SelectComponent 
                            id="designConfig" 
                            values={designData}
                            defaultValue="Select Configuration" 
                            onChange={event => setDesignConfig(event.target.value)}
                            ariaInvalid={validDesignConfig ? "false" : "true"}
                            ariaDescribedby="designConfigNote"
                            onFocus={()=>setDesignConfigFocus(true)}
                            onBlur={()=>setDesignConfigFocus(false)}
                            focusValue={designConfigFocus}
                            validValue={validDesignConfig}
                            errorMesg="Please select from the drop down list"
                        />
                    </div> */}
                    <div>
                        <SelectSearch 
                            id="designConfig"
                            label="Select Configuration"
                            validRule={validDesignName}
                            options={designData}
                            getOptionLabel={(op)=>op.designName}
                            value={designName}
                            placeholder="Search"
                            onChange={(options) =>
                                !options ? setDesignName("") : setSelectedDesignName(options)
                              }
                            noOptionsMessage={()=>"No Design Configuration found"}
                            onFocus={()=>setDesignNameFocus(true)}
                            onBlur={()=>setDesignNameFocus(false)}
                            focusValue={designNameFocus}
                            validValue={validDesignName}
                            errorMsg="Please select one Design from the list."
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="project_name" nameOfLabel="Project Name" validRule={validProjectName} nameOfState={projectName}/>
                        <Input id="project_name" value={projectName} autoComplete="off" 
                            onChange={(e)=>setProjectName(e.target.value)}
                            aria_invalid={validProjectName ? "false" : "true"}
                            aria_describedby="projectNameNote"
                            onFocus={()=>setProjectNameFocus(true)}
                            onBlur={()=>setProjectNameFocus(false)}
                            focusValue={projectNameFocus}
                            validValue={validProjectName}
                            errorMesg="Only Alphabets are accepted with minimum of 3 character length."
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="project_location" nameOfLabel="Project Location" validRule={validProjectLocation} nameOfState={projectLocation}/>
                        <Input id="project_location" value={projectLocation} autoComplete="off" 
                            onChange={(e)=>setProjectLocation(e.target.value)}
                            aria_invalid={validProjectLocation ? "false" : "true"}
                            aria_describedby="projectLocationNote"
                            onFocus={()=>setProjectLocationFocus(true)}
                            onBlur={()=>setProjectLocationFocus(false)}
                            focusValue={projectLocationFocus}
                            validValue={validProjectLocation}
                            errorMesg="Special characters are not allowed and minimum length should be 3."
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="latitude" nameOfLabel="Latitude" validRule={validLatitude} nameOfState={latitude}/>
                        <Input id="latitude" value={latitude} autoComplete="off" 
                            onChange={(e)=>setLatitude(e.target.value)}
                            aria_invalid={validLatitude ? "false" : "true"}
                            aria_describedby="latitudeNote"
                            onFocus={()=>setLatitudeFocus(true)}
                            onBlur={()=>setLatitudeFocus(false)}
                            focusValue={latitudeFocus}
                            validValue={validLatitude}
                            errorMesg="Special characters are not allowed and minimum length should be 3."
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="longitude" nameOfLabel="Longitude" validRule={validLongitude} nameOfState={longitude}/>
                        <Input id="longitude" value={longitude} autoComplete="off" 
                            onChange={(e)=>setLongitude(e.target.value)}
                            aria_invalid={validLongitude ? "false" : "true"}
                            aria_describedby="longitudeNote"
                            onFocus={()=>setLongitudeFocus(true)}
                            onBlur={()=>setLongitudeFocus(false)}
                            focusValue={longitudeFocus}
                            validValue={validLongitude}
                            errorMesg="Special characters are not allowed and minimum length should be 3."
                        />
                    </div>
                </div> 
                <button className="bg-slate-300 mt-4 p-4 hover:bg-amber-500">CREATE PROJECT</button>
            </form>
             <AlertModal modalOpen={errorAlert || successAlert} onClose={()=>setErrorAlert(false) || setSuccessAlert(false)}>
             <div className='text-center w-96'>
               <h3 className={`text-lg font-black ${errorAlert ? "text-red-600" : "text-green-600"} p-4}`}>
                 {errorAlert ? 'Opps! Invalid Entries.' : 'Successfully entered data.'}
              </h3>
               <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>
                 {errorAlert ? 'Please cross verify the input fileds!' : 'Congratulations, You just create one design configuration'}
              </p>
               <div className='flex gap-4 justify-center items-center'>
                 {errorAlert && <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 w-1/2 p-2" onClick={()=>setErrorAlert(false)}>OK</button>}
                 {successAlert && <button className="border border-green-500 bg-green-500 text-white hover:bg-green-600 w-1/2 p-2" onClick={()=>resetForm()}>OK</button>}
               </div>
             </div>
     </AlertModal>
     </>
    );
}
export default AddNewProject;