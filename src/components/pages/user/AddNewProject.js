import React, { useState, useEffect, useRef } from "react";
import Axios from "../../../api/Axios";
import Label from "../../Common/Label";
import Input from "../../Common/Input";
import { NOT_SPECIAL_CHAR, DIRECTION, CHAR_REGEX } from '../../Common/ValidationConstants';
import AlertModal from "../../Common/Modal/AlertModal";
import SelectSearch from "../../Common/SelectSearch";
import UseAuth from "../../Hooks/UseAuth";

import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const libraries = ['places'];

const NEW_PROJECT = 'v1/projects/create/design/';

const DESIGN_CONFIG = 'design/user/';

const AddNewProject = () => {
    const { auth } = UseAuth();
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
    //const [latitudeFocus, setLatitudeFocus] = useState(false);

    const [longitude, setLongitude] = useState('');
    const [validLongitude, setValidLongitude] = useState(false);
    //const [longitudeFocus, setLongitudeFocus] = useState(false);

    const [year, setYear] = useState('');
    // const [validYear, setValidYear] = useState(false);
    // const [yearFocus, setYearFocus] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    useEffect(() => {
        const getCurrentYear = () => {
            const currentYear = new Date().getFullYear();
            console.log(currentYear);
            setYear(currentYear);
        }
        getCurrentYear();
    }, [])

    const inputRef = useRef();
    let libRef = useRef(libraries)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDGvl0xsp0pyya9Gi3FbR-p-Ojf4zYb-Xo",
        libraries: libRef.current,
    })

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces();

        if (place) {
            //console.log(place)
            //console.log(place.formatted_address);
            setProjectLocation(place.formatted_address)
            //console.log(place.geometry.location.lat());
            setLatitude(place.geometry.location.lat());
            //console.log(place.geometry.location.lng());
            setLongitude(place.geometry.location.lng());
        }
    };

    useEffect(() => {
        if (designName === 'Search' || designName === '') {
            setValidDesignName(false)
        } else {
            setValidDesignName(true);
        }
    }, [designName]);
    useEffect(() => {
        const result = NOT_SPECIAL_CHAR.test(projectName);
        setValidProjectName(result);
    }, [projectName]);
    useEffect(() => {
        const result = CHAR_REGEX.test(projectLocation);
        setValidProjectLocation(result);
    }, [projectLocation]);
    useEffect(() => {
        const result = DIRECTION.test(latitude);
        setValidLatitude(result);
    }, [latitude]);
    useEffect(() => {
        const result = DIRECTION.test(longitude);
        setValidLongitude(result);
    }, [longitude]);
    // useEffect(() => {
    //     const result = VALID_YEAR.test(year);
    //     setValidYear(result);
    // }, [year]);

    useEffect(() => {
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
    }, [auth.userId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validDesignName && validProjectName && validProjectLocation && validLatitude && validLongitude) {
            const data = {
                project_name: projectName,
                project_location: projectLocation,
                project_longitude: longitude,
                project_latitude: latitude,
                year: year,
            }
            try {
                const response = await Axios.post(NEW_PROJECT.concat(designId).concat('/user/').concat(auth.userId), data);
                console.log(JSON.stringify(response?.data));
                setSuccessAlert(true);
            }
            catch (err) {
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
        setYear('');
        setSuccessAlert(false);
    }
    const setSelectedDesignName = (selectedName) => {
        setDesignName(selectedName);
        setDesignId(selectedName.designId);
    };



    return (
        <>
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <SelectSearch
                            id="designConfig"
                            label="Select Configuration"
                            validRule={validDesignName}
                            options={designData}
                            getOptionLabel={(op) => op.designName}
                            value={designName}
                            placeholder="Search"
                            onChange={(options) =>
                                !options ? setDesignName("") : setSelectedDesignName(options)
                            }
                            noOptionsMessage={() => "No Design Configuration found"}
                            onFocus={() => setDesignNameFocus(true)}
                            onBlur={() => setDesignNameFocus(false)}
                            focusValue={designNameFocus}
                            validValue={validDesignName}
                            errorMsg="Please select one Design from the list."
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="project_name" nameOfLabel="Project Name" validRule={validProjectName} nameOfState={projectName} />
                        <Input id="project_name" value={projectName} autoComplete="off"
                            onChange={(e) => setProjectName(e.target.value)}
                            aria_invalid={validProjectName ? "false" : "true"}
                            aria_describedby="projectNameNote"
                            onFocus={() => setProjectNameFocus(true)}
                            onBlur={() => setProjectNameFocus(false)}
                            focusValue={projectNameFocus}
                            validValue={validProjectName}
                            errorMesg="Only Alphabets are accepted with minimum of 3 character length."
                        />
                    </div>
                    <div className="">
                        <Label htmlFor="project_location" nameOfLabel="Project Location" validRule={validProjectLocation} nameOfState={projectLocation} />
                        {isLoaded &&
                            <StandaloneSearchBox
                                onLoad={ref => (inputRef.current = ref)}
                                onPlacesChanged={handlePlaceChanged}
                            >
                                <Input id="project_location"
                                    placeHolder="Enter Location" value={projectLocation}
                                    onChange={(e) => setProjectLocation(e.target.value)}
                                    aria_invalid={validProjectLocation ? "false" : "true"}
                                    aria_describedby="projectLocationNote"
                                    onFocus={() => setProjectLocationFocus(true)}
                                    onBlur={() => setProjectLocationFocus(false)}
                                    focusValue={projectLocationFocus}
                                    validValue={validProjectLocation}
                                    errorMesg="Minimum length should be 3."
                                />
                            </StandaloneSearchBox>
                        }
                    </div>
                    <div className="
                    relative 
                    before:content-[attr(data-tip)]
                    before:absolute
                    before:px-3 before:py-2
                    before:left-1/2 before:top-5
                    before:w-max before:max-w-xs
                    before:-translate-x-1/2 before:-translate-y-full
                    before:bg-gray-700 before:text-white
                    before:rounded-md before:opacity-0
                    before:transition-all
                    text-xs
                    
                    after:absolute
                    after:left-1/2 after:top-5
                    after:h-0 after:w-0 
                    after:-translate-x-1/2 after:border-8 
                    after:border-t-gray-700  
                    after:border-l-transparent
                    after:border-b-transparent 
                    after:border-r-transparent
                    after:opacity-0
                    after:transition-all

                    hover:before:opacity-100 hover:after:opacity-100
                    

                     " data-tip="Disabled filed. Please enter Project Location">
                        <Label htmlFor="latitude" nameOfLabel="Latitude" validRule={validLatitude} nameOfState={latitude} />
                        <Input id="latitude" value={latitude} disabled={true} />
                    </div>
                    <div className="">
                        <Label htmlFor="longitude" nameOfLabel="Longitude" validRule={validLongitude} nameOfState={longitude} />
                        <Input id="longitude" value={longitude} disabled={true} />
                    </div>
                    {/* <div className="">
                        <Label htmlFor="year" nameOfLabel="Year" validRule={validYear} nameOfState={year} />
                        <Input id="year" value={year} autoComplete="off"
                            onChange={(e) => setYear(e.target.value)}
                            aria_invalid={validYear ? "false" : "true"}
                            aria_describedby="yearNote"
                            onFocus={() => setYearFocus(true)}
                            onBlur={() => setYearFocus(false)}
                            focusValue={yearFocus}
                            validValue={validYear}
                            errorMesg="Year should be YYYY format, only number of 4 digits accept"
                        />
                    </div> */}
                </div>
                <div className="mt-4">
                    <button className="bg-slate-300 hover:bg-orange-400 text-sm hover:text-white text-gray-800 p-2 font-bold inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="text-md">Create Project</span>
                    </button>
                </div>
            </form>
            <AlertModal modalOpen={errorAlert || successAlert} onClose={() => setErrorAlert(false) || setSuccessAlert(false)}>
                <div className='text-center w-96'>
                    <h3 className={`text-lg font-black ${errorAlert ? "text-red-600" : "text-green-600"} p-4}`}>
                        {errorAlert ? 'Opps! Invalid Entries.' : 'Successfully entered data.'}
                    </h3>
                    <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>
                        {errorAlert ? 'Please cross verify the input fileds!' : 'Congratulations, You just create one design configuration'}
                    </p>
                    <div className='flex gap-4 justify-center items-center'>
                        {errorAlert && <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 w-1/2 p-2" onClick={() => setErrorAlert(false)}>OK</button>}
                        {successAlert && <button className="border border-green-500 bg-green-500 text-white hover:bg-green-600 w-1/2 p-2" onClick={() => resetForm()}>OK</button>}
                    </div>
                </div>
            </AlertModal>
        </>
    );
}
export default AddNewProject;