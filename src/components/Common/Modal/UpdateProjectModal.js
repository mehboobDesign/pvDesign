import React, {useState, useEffect} from "react";
import Input from "../Input";
import Label from "../Label";
import Axios from "../../../api/Axios";
import { NOT_SPECIAL_CHAR, DIRECTION } from '../ValidationConstants';
import AlertModal from "./AlertModal";

const GET_PROJECT = 'v1/projects/';
const UPDATE_PROJECT = 'v1/projects/update/'

const UpdateProjectModal = ({modalOpen, onClose, id, setUpdating}) => {

    const [errorAlert, setErrorAlert] = useState(false);

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
        if(id) {
            const showData = async () => {  
                await Axios.get(GET_PROJECT.concat(id))
                .then(function (response) { console.log(response);
                   setProjectName(response.data.project_name);
                   setProjectLocation(response.data.project_location);
                   setLatitude(response.data.project_latitude);
                   setLongitude(response.data.project_longitude);
                }).catch(function (error) {
                    console.log(error);
                  });
            }; 
            showData(); 
        } 
},[id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validProjectName && validProjectLocation && validLatitude && validLongitude){
        const data = {
            project_name: projectName,
            project_location: projectLocation,
            project_longitude: longitude,
            project_latitude: latitude,
        }
        try {
            const response = await Axios.put(UPDATE_PROJECT.concat(id), data);
            console.log(JSON.stringify(response?.data));
            onClose(true);
            setUpdating(true);
          } catch(err) { 
           console.log(err);
          }
        } else {
        setErrorAlert(true);
        }    
    }
    return(
        <>
        <div className={`fixed inset-0 flex justify-center items-center transition-colors
        ${modalOpen ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e)=>e.stopPropagation()} 
            className={`bg-white rounded-xl shadow p-6 transition-all w-7/12
            ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-2 font-bold text-gray-400 bg-white
                hover:bg-gray-50 hover:text-red-500">X</button>
                   <h3 className='text-lg text-center font-black text-gray-800 p-2 border-b-2 border-b-gray-400'>Update Project</h3>
                    <form className="pt-2" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center items-center">
                                <button className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Update</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onClose}>Cancel</button>
                            </div>
                    </form>
            </div>
        </div>
        <AlertModal modalOpen={errorAlert} onClose={()=>setErrorAlert(false)}>
        <div className='text-center w-96'>
            <h3 className='text-lg font-black text-gray-800 p-4'>Alert Message</h3>
                <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>Opps, Please check the form before updating.</p>
                   <div className='flex'>
                     <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 w-full p-2" onClick={()=>setErrorAlert(false)}>Ok</button>
                   </div>
          </div>
      </AlertModal>
    </>
    );
}
export default UpdateProjectModal;