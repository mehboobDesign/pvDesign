import React,{useState, useEffect} from "react";
import Axios from "../../../api/Axios";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_REGEX, NUMBER_DECIMAL, ONLY_INTEGER, DOUBLE_TYPE } from '../../Common/ValidationConstants';
import Label from "../../Common/Label";
import Input from "../../Common/Input";
import AlertModal from "../../Common/Modal/AlertModal";
import SelectSearch from "../../Common/SelectSearch";
import UseAuth from "../../Hooks/UseAuth";

const GET_PVMODULES_URL = 'pvmodules/';
const GET_INVERTER_URL = 'inverter/';  
const PV = 'design/pv/';                   
const INV = '/inv/';
const USER = '/user/';
const CONFIG = '/config';

const ConfigureProject = () => {

    const { auth } = UseAuth();
    const [designName, setDesignName] = useState('');
    const [validDesignName, setValidDesignName] = useState(false);
    const [designNameFocus, setDesignNameFocus] = useState(false);

    const [tilt, setTilt] = useState('');
    const [validTilt, setValidTilt] = useState(false);
    const [tiltFocus, setTiltFocus] = useState(false); 

    const [azimuth, setAzimuth] = useState('');
    const [validAzimuth, setValidAzimuth] = useState(false);
    const [azimuthFocus, setAzimuthFocus] = useState(false);

    const [trackingAxis, setTrackingAxis] = useState('');
    const [validTrackingAxis, setValidTrackingAxis] = useState(false);
    const [trackingAxisFocus, setTrackingAxisFocus] = useState(false);

    const [shedsSpacing, setShedsSpacing] = useState('');
    const [validShedsSpacing, setValidShedsSpacing] = useState(false);
    const [shedsSpacingFocus, setShedsSpacingFocus] = useState(false);

    const [trackerSpacing, setTrackerSpacing] = useState('');
    const [validTrackerSpacing, setValidTrackerSpacing] = useState(false);
    const [trackerSpacingFocus, setTrackerSpacingFocus] = useState(false);

    const [shedsWidth, setShedsWidth] = useState('');
    const [validShedsWidth, setValidShedsWidth] = useState(false);
    const [shedsWidthFocus, setShedsWidthFocus] = useState(false);

    const [trackerWidth, setTrackerWidth] = useState('');
    const [validTrackerWidth, setValidTrackerWidth] = useState(false);
    const [trackerWidthFocus, setTrackerWidthFocus] = useState(false);

    const [limitProfileAngle, setLimitProfileAngle] = useState('');
    const [validLimitProfileAngle, setValidLimitProfileAngle] = useState(false);
    const [limitProfileAngleFocus, setLimitProfileAngleFocus] = useState(false);

    const [gcr, setGcr] = useState('');
    const [validGcr, setValidGcr] = useState(false);
    const [gcrFocus, setGcrFocus] = useState(false);

    const [heightAboveGround, setHeightAboveGround] = useState('');
    const [validHeightAboveGround, setValidHeightAboveGround] = useState(false);
    const [heightAboveGroundFocus, setHeightAboveGroundFocus] = useState(false);

    const [groundAlbido, setGroundAlbido] = useState('');
    const [validGroundAlbido, setValidGroundAlbido] = useState(false);
    const [groundAlbidoFocus, setGroundAlbidoFocus] = useState(false);

    const [biFactor, setBiFactor] = useState('');
    const [validBiFactor, setValidBiFactor] = useState(false);
    const [biFactorFocus, setBiFactorFocus] = useState(false);

    const [rearFactor, setRearFactor] = useState('');
    const [validRearFactor, setValidRearFactor] = useState(false);
    const [rearFactorFocus, setRearFactorFocus] = useState(false);

    const [rearLoss, setRearLoss] = useState('');
    const [validRearLoss, setValidRearLoss] = useState(false);
    const [rearLossFocus, setRearLossFocus] = useState(false);

    const [shedFunction, setShedFunction] = useState('');
    const [validShedFunction, setValidShedFunction] = useState(false);
    const [shedFunctionFocus, setShedFunctionFocus] = useState(false);

    const [activePower, setActivePower] = useState('');
    const [validActivePower, setValidActivePower] = useState(false);
    const [activePowerFocus, setActivePowerFocus] = useState(false);

    const [pnomRatio, setPnomRatio] = useState('');
    const [validPnomRatio, setValidPnomRatio] = useState(false);
    const [pnomRatioFocus, setPnomRatioFocus] = useState(false);

    const [inverterName, setInverterName] = useState('');
    const [validInverterName, setValidInverterName] = useState(false);
    const [inverterNameFocus, setInverterNameFocus] = useState(false);
    const [inverterData, setInverterData] = useState([]);
    const [inverterId, setInverterId] = useState('');

    const [pvModuleName, setPvModuleName] = useState('');
    const [validPvModuleName, setValidPvModuleName] = useState(false);
    const [pvModuleNameFocus, setPvModuleNameFocus] = useState(false);
    const [pvModuleData, setPvModuleData] = useState([]);
    const [pvModuleId, setPvModuleId] = useState('');

    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
   
    useEffect(()=>{
        if(inverterName === 'Search' || inverterName === '') {
            setValidInverterName(false);
        } else {
            setValidInverterName(true);
        } 
     },[inverterName]); 
    useEffect(()=>{
        if(pvModuleName === 'Search' || pvModuleName === '') {
            setValidPvModuleName(false);
        } else {
            setValidPvModuleName(true);
        } 
     },[pvModuleName]); 
    useEffect(()=>{
        const result = USER_REGEX.test(designName);
        setValidDesignName(result);
    },[designName]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(tilt);
        setValidTilt(result);
    },[tilt]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(azimuth);
        setValidAzimuth(result);
    },[azimuth]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(trackingAxis);
        setValidTrackingAxis(result);
    },[trackingAxis]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(shedsSpacing);
        setValidShedsSpacing(result);
    },[shedsSpacing]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(trackerSpacing);
        setValidTrackerSpacing(result);
    },[trackerSpacing]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(shedsWidth);
        setValidShedsWidth(result);
    },[shedsWidth]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(trackerWidth);
        setValidTrackerWidth(result);
    },[trackerWidth]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(limitProfileAngle);
        setValidLimitProfileAngle(result);
    },[limitProfileAngle]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(gcr);
        setValidGcr(result);
    },[gcr]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(heightAboveGround);
        setValidHeightAboveGround(result);
    },[heightAboveGround]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(groundAlbido);
        setValidGroundAlbido(result);
    },[groundAlbido]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(biFactor);
        setValidBiFactor(result);
    },[biFactor]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(rearFactor);
        setValidRearFactor(result);
    },[rearFactor]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(rearLoss);
        setValidRearLoss(result);
    },[rearLoss]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(shedFunction);
        setValidShedFunction(result);
    },[shedFunction]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(activePower);
        setValidActivePower(result);
    },[activePower]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(pnomRatio);
        setValidPnomRatio(result);
    },[pnomRatio]);
    

    useEffect(()=>{
        const getAllPvModules = async () => {
            try {
                await Axios.get(GET_PVMODULES_URL)
                .then(function (response) {
                    setPvModuleData(response.data); 
                })
            } catch (err) {
                console.log(err);
            }
        };
        const getAllInverter = async () => {
            try {
                await Axios.get(GET_INVERTER_URL)
                .then(function (response) {
                    setInverterData(response.data);
                })
            } catch (err) {
                console.log(err);
            }
        };
        
        getAllPvModules();
        getAllInverter();
    },[]);
      
    const resetForm = () => {
        setInverterName('');
        setPvModuleName('');
        setDesignName('');
        setTilt('');
        setAzimuth('');
        setTrackingAxis('');
        setShedsSpacing('');
        setTrackerSpacing('');
        setShedsWidth('');
        setTrackerWidth('');
        setLimitProfileAngle('');
        setGcr('');
        setHeightAboveGround('');
        setGroundAlbido('');
        setBiFactor('');
        setRearFactor('');
        setRearLoss('');
        setShedFunction('');
        setActivePower('');
        setPnomRatio('');
        setSuccessAlert(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( validInverterName && validPvModuleName && validDesignName && validTilt && validAzimuth && validTrackingAxis && validShedsSpacing &&
            validTrackerSpacing && validShedsWidth && validTrackerWidth && validLimitProfileAngle 
            && validGcr && validHeightAboveGround && validGroundAlbido && validBiFactor && 
            validRearFactor && validRearLoss && validShedFunction && validActivePower && validPnomRatio) {
                const data = {
                    designName: designName,
                    tilt: tilt,
                    azimuth: azimuth,
                    tracking_axis_horizontal: trackingAxis,
                    sheds_spacing: shedsSpacing,
                    tracker_spacing: trackerSpacing,
                    sheds_width: shedsWidth,
                    tracker_width: trackerWidth,
                    limit_profile_angle: limitProfileAngle,
                    gcr: gcr,
                    height_above_ground: heightAboveGround,
                    ground_albido: groundAlbido,
                    bifaciality_factor: biFactor,
                    rear_shading_factor: rearFactor,
                    rear_mismatch_loss: rearLoss,
                    shed_transparent_fraction: shedFunction,
                    active_power: activePower,
                    pnom_ratio: pnomRatio,
                }
                try {
                    const response = await Axios.post(PV.concat(pvModuleId).concat(INV).concat(inverterId).concat(USER).concat(auth.userId).concat(CONFIG), data);
                    console.log(JSON.stringify(response?.data));
                    setSuccessAlert(true);
                  } catch(err) { 
                   console.log(err);
                  }
            } else {
                setErrorAlert(true);
            }     
    };
    const setSelectedPvModuleName = (selectedName) => {
        setPvModuleName(selectedName);
        setPvModuleId(selectedName.pvmodule_id);
    };

   const setSelectedInverterName = (inverterName) => { 
    setInverterName(inverterName);
    setInverterId(inverterName.inverter_id);
   }
   
    return( 
    <>
        <form className="w-full" onSubmit={handleSubmit}>
                 <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/3 mb-4">
                        <SelectSearch 
                            id="inverterName"
                            label="Select Inverter Module"
                            validRule={validInverterName}
                            options={inverterData}
                            getOptionLabel={(op)=>op.manufacturer}
                            value={inverterName}
                            placeholder="Search"
                            onChange={(options) =>
                                !options ? setInverterName("") : setSelectedInverterName(options)
                              }
                            noOptionsMessage={()=>"No Inverter Module found"}
                            onFocus={()=>setInverterNameFocus(true)}
                            onBlur={()=>setInverterNameFocus(false)}
                            focusValue={inverterNameFocus}
                            validValue={validInverterName}
                            errorMsg="Please select one inverter module from the list."
                        />
                        {/* <Label htmlFor="inverterName" nameOfLabel="Select Inverter Module"/>
                        <Select
                            id="inverterName"
                            options={inverterData}
                            getOptionLabel={(op)=>op.manufacturer}
                            value={inverterName}
                            placeholder="Search"
                            onChange={(options) =>
                                !options ? setInverterName("") : setSelectedInverterName(options)
                              }
                            isClearable={true}
                            isSearchable={true}
                            noOptionsMessage={()=>"No inverter module found"}
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    border:"none",
                                    boxShadow: "none",
                                    padding:"2px",
                                    backgroundColor:"rgb(241 245 249)",
                                    cursor:"pointer",
                                    ":hover":{
                                        backgroundColor:"rgb(226 232 240)"
                                    },
                                    
                                }),
                                option: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "rgb(241 245 249)",
                                    color:"rgb(51 65 85)",
                                    cursor:"pointer",
                                    ":hover":{
                                        backgroundColor:"rgb(226 232 240)"
                                    }
                                })
                            }}
                        /> */}
                       
                        
                        {/* <Input id="inverterName" value={inverterName} autoComplete="off" 
                            placeHolder="Search"
                            onChange={(e)=>setInverterName(e.target.value)}
                            onFocus={()=>setInverterSuggestionFlag(true)}
                        />
                        {inverterSuggestionFlag && <div className="absolute top-[160px] bg-slate-600 w-64 left-[305px]">
                        {inverterData.filter(item => {
                            const searchTerm = inverterName.toLowerCase();
                            const manufac_name = item.manufacturer.toLowerCase();
                            return searchTerm === '' ?
                            item
                             :
                            searchTerm && manufac_name.startsWith(searchTerm) && manufac_name !== searchTerm;
                        })
                        .map((data,index) => ( 
                        <div key={index} className='shadow-xl text-white hover:bg-slate-700 cursor-pointer'>
                             <p onClick={()=>setSelectedInverterName(data.manufacturer,data.inverter_id)} className='text-md font-bold p-4'>{data.inverter_id} {data.manufacturer}</p>
                        </div> 
                         ))} 
                     </div>} */}
                    </div>
                     <div className="w-full md:w-1/3 px-3 mb-4">
                        <SelectSearch 
                            id="pvModuleName"
                            label="Select Pv Module"
                            validRule={validPvModuleName}
                            options={pvModuleData}
                            getOptionLabel={(op)=>op.manufacturer}
                            value={pvModuleName}
                            placeholder="Search"
                            onChange={(options) =>
                                !options ? setPvModuleName("") : setSelectedPvModuleName(options)
                              }
                            noOptionsMessage={()=>"No Pv Module found"}
                            onFocus={()=>setPvModuleNameFocus(true)}
                            onBlur={()=>setPvModuleNameFocus(false)}
                            focusValue={pvModuleNameFocus}
                            validValue={validPvModuleName}
                            errorMsg="Please select one PV module from the list."
                        />


                        {/* <Label htmlFor="pvModuleName" nameOfLabel="Select Pv Module" validRule={validPvModuleName} nameOfState={pvModuleName} />
                        <label className="block tracking-wide text-gray-700 text-md font-bold mb-1" htmlFor="pvModuleName">
                Assam
                <span className={validPvModuleName ? "text-green-400" : "hidden"}>
                   Right
                </span>
                <span className={validPvModuleName ? "hidden" : "text-red-400"}>
                    Wrong
                </span>
            </label>
                        <Select
                            id="pvModuleName"
                            options={pvModuleData}
                            getOptionLabel={(op)=>op.manufacturer}
                            value={pvModuleName}
                            placeholder="Search"
                            onChange={(options) =>
                                !options ? setPvModuleName("") : setSelectedPvModuleName(options)
                              }
                            isClearable={true}
                            isSearchable={true}
                            noOptionsMessage={()=>"No Pv Module found"}
                            onFocus={()=>setPvModuleNameFocus(true)}
                            onBlur={()=>setPvModuleNameFocus(false)}
                            styles={{
                                control: (baseStyles) => ({
                                    ...baseStyles,
                                    border:"none",
                                    boxShadow: "none",
                                    padding:"2px",
                                    backgroundColor:"rgb(241 245 249)",
                                    cursor:"pointer",
                                    ":hover":{
                                        backgroundColor:"rgb(226 232 240)"
                                    },
                                    
                                }),
                                option: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: "rgb(241 245 249)",
                                    color:"rgb(51 65 85)",
                                    cursor:"pointer",
                                    ":hover":{
                                        backgroundColor:"rgb(226 232 240)"
                                    }
                                })
                            }}
                        />
                        <p className={`${pvModuleNameFocus && !validPvModuleName
                    ? "text-red-400" : "hidden"}`}>
                    Assam
                </p> */}
                        {/* <Input id="pvModuleName" value={pvModuleName} autoComplete="off" 
                            placeHolder="Search"
                            onChange={(e)=>setPvModuleName(e.target.value)}
                            onFocus={()=>setPvModuleSuggestionFlag(true)}
                        />
                        {pvModuleSuggestionFlag && <div className="absolute top-[160px] left-[680px] bg-slate-600 w-64 ml-2">
                        {pvModuleData.filter(item => {
                            const searchTerm = pvModuleName.toLowerCase();
                            const manufac_name = item.manufacturer.toLowerCase();
                            return searchTerm === '' ?
                            item
                             :
                            searchTerm && manufac_name.startsWith(searchTerm) && manufac_name !== searchTerm;
                        })
                        .map((data,index) => ( 
                        <div key={index} className='shadow-xl text-white hover:bg-slate-700 cursor-pointer'>
                             <p onClick={()=>setSelectedPvModuleName(data.manufacturer,data.pvmodule_id)} className='text-md font-bold p-4'>{data.pvmodule_id} {data.manufacturer}</p>
                        </div> 
                         ))} 
                     </div>} */}
                     </div>
                    <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="design_name" nameOfLabel="Design Name" validRule={validDesignName} nameOfState={designName}/>
                        <Input id="design_name" value={designName} autoComplete="off" 
                            onChange={(e)=>setDesignName(e.target.value)}
                            aria_invalid={validDesignName ? "false" : "true"}
                            aria_describedby="designNameNote"
                            onFocus={()=>setDesignNameFocus(true)}
                            onBlur={()=>setDesignNameFocus(false)}
                            focusValue={designNameFocus}
                            validValue={validDesignName}
                            errorMesg="Only Alphabets are accepted with minimum of 3 character length."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="tilt" nameOfLabel="Tilt" validRule={validTilt} nameOfState={tilt}/>
                        <Input id="tilt" value={tilt} autoComplete="off" 
                            onChange={(e)=>setTilt(e.target.value)}
                            aria_invalid={validTilt ? "false" : "true"}
                            aria_describedby="tiltNote"
                            onFocus={()=>setTiltFocus(true)}
                            onBlur={()=>setTiltFocus(false)}
                            focusValue={tiltFocus}
                            validValue={validTilt}
                            errorMesg="Only positive numbers allowed upto 4 digit."
                        />
                     </div>
                     <div className="w-full md:w-1/3 px-3 mb-4">
                        <Label htmlFor="azimuth" nameOfLabel="Azimuth" validRule={validAzimuth} nameOfState={azimuth}/>
                        <Input id="azimuth" value={azimuth} autoComplete="off" 
                            onChange={(e)=>setAzimuth(e.target.value)}
                            aria_invalid={validAzimuth ? "false" : "true"}
                            aria_describedby="azimuthNote"
                            onFocus={()=>setAzimuthFocus(true)}
                            onBlur={()=>setAzimuthFocus(false)}
                            focusValue={azimuthFocus}
                            validValue={validAzimuth}
                            errorMesg="Only positive numbers allowed upto 4 digit."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="tracking_axis_horizontal" nameOfLabel="Tracking Axis Horizontal" validRule={validTrackingAxis} nameOfState={trackingAxis}/>
                        <Input id="tracking_axis_horizontal" value={trackingAxis} autoComplete="off" 
                            onChange={(e)=>setTrackingAxis(e.target.value)}
                            aria_invalid={validTrackingAxis ? "false" : "true"}
                            aria_describedby="trackingAxisNote"
                            onFocus={()=>setTrackingAxisFocus(true)}
                            onBlur={()=>setTrackingAxisFocus(false)}
                            focusValue={trackingAxisFocus}
                            validValue={validTrackingAxis}
                            errorMesg="Only positive numbers allowed upto 4 digit."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="sheds_spacing" nameOfLabel="Sheds Spacing" validRule={validShedsSpacing} nameOfState={shedsSpacing}/>
                        <Input id="sheds_spacing" value={shedsSpacing} autoComplete="off" 
                            onChange={(e)=>setShedsSpacing(e.target.value)}
                            aria_invalid={validShedsSpacing ? "false" : "true"}
                            aria_describedby="shedsSpacingNote"
                            onFocus={()=>setShedsSpacingFocus(true)}
                            onBlur={()=>setShedsSpacingFocus(false)}
                            focusValue={shedsSpacingFocus}
                            validValue={validShedsSpacing}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 px-3 mb-4">
                        <Label htmlFor="tracker_spacing" nameOfLabel="Tracker Spacing" validRule={validTrackerSpacing} nameOfState={trackerSpacing}/>
                        <Input id="tracker_spacing" value={trackerSpacing} autoComplete="off" 
                            onChange={(e)=>setTrackerSpacing(e.target.value)}
                            aria_invalid={validTrackerSpacing ? "false" : "true"}
                            aria_describedby="trackerSpacingNote"
                            onFocus={()=>setTrackerSpacingFocus(true)}
                            onBlur={()=>setTrackerSpacingFocus(false)}
                            focusValue={trackerSpacingFocus}
                            validValue={validTrackerSpacing}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="sheds_width" nameOfLabel="Sheds Spacing" validRule={validShedsWidth} nameOfState={shedsWidth}/>
                        <Input id="sheds_width" value={shedsWidth} autoComplete="off" 
                            onChange={(e)=>setShedsWidth(e.target.value)}
                            aria_invalid={validShedsWidth ? "false" : "true"}
                            aria_describedby="shedsWidthNote"
                            onFocus={()=>setShedsWidthFocus(true)}
                            onBlur={()=>setShedsWidthFocus(false)}
                            focusValue={shedsWidthFocus}
                            validValue={validShedsWidth}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="tracker_width" nameOfLabel="Tracker Width" validRule={validTrackerWidth} nameOfState={trackerWidth}/>
                        <Input id="tracker_width" value={trackerWidth} autoComplete="off" 
                            onChange={(e)=>setTrackerWidth(e.target.value)}
                            aria_invalid={validTrackerWidth ? "false" : "true"}
                            aria_describedby="trackerWidthNote"
                            onFocus={()=>setTrackerWidthFocus(true)}
                            onBlur={()=>setTrackerWidthFocus(false)}
                            focusValue={trackerWidthFocus}
                            validValue={validTrackerWidth}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 px-3 mb-4">
                        <Label htmlFor="limit_profile_angle" nameOfLabel="Limit Profile Angle" validRule={validLimitProfileAngle} nameOfState={limitProfileAngle}/>
                        <Input id="limit_profile_angle" value={limitProfileAngle} autoComplete="off" 
                            onChange={(e)=>setLimitProfileAngle(e.target.value)}
                            aria_invalid={validLimitProfileAngle ? "false" : "true"}
                            aria_describedby="limitProfileAngleNote"
                            onFocus={()=>setLimitProfileAngleFocus(true)}
                            onBlur={()=>setLimitProfileAngleFocus(false)}
                            focusValue={limitProfileAngleFocus}
                            validValue={validLimitProfileAngle}
                            errorMesg="Only positive numbers allowed upto 4 digit."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="gcr" nameOfLabel="GCR" validRule={validGcr} nameOfState={gcr}/>
                        <Input id="gcr" value={gcr} autoComplete="off" 
                            onChange={(e)=>setGcr(e.target.value)}
                            aria_invalid={validGcr ? "false" : "true"}
                            aria_describedby="trackerWidthNote"
                            onFocus={()=>setGcrFocus(true)}
                            onBlur={()=>setGcrFocus(false)}
                            focusValue={gcrFocus}
                            validValue={validGcr}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="height_above_ground" nameOfLabel="Height Above Ground" validRule={validHeightAboveGround} nameOfState={heightAboveGround}/>
                        <Input id="height_above_ground" value={heightAboveGround} autoComplete="off" 
                            onChange={(e)=>setHeightAboveGround(e.target.value)}
                            aria_invalid={validHeightAboveGround ? "false" : "true"}
                            aria_describedby="heightAboveGroundNote"
                            onFocus={()=>setHeightAboveGroundFocus(true)}
                            onBlur={()=>setHeightAboveGroundFocus(false)}
                            focusValue={heightAboveGroundFocus}
                            validValue={validHeightAboveGround}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 px-3 mb-4">
                        <Label htmlFor="ground_albido" nameOfLabel="Ground Albido" validRule={validGroundAlbido} nameOfState={groundAlbido}/>
                        <Input id="ground_albido" value={groundAlbido} autoComplete="off" 
                            onChange={(e)=>setGroundAlbido(e.target.value)}
                            aria_invalid={validGroundAlbido ? "false" : "true"}
                            aria_describedby="groundAlbdioNote"
                            onFocus={()=>setGroundAlbidoFocus(true)}
                            onBlur={()=>setGroundAlbidoFocus(false)}
                            focusValue={groundAlbidoFocus}
                            validValue={validGroundAlbido}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="bi_factor" nameOfLabel="Bifaciality Factor" validRule={validBiFactor} nameOfState={biFactor}/>
                        <Input id="bi_factor" value={biFactor} autoComplete="off" 
                            onChange={(e)=>setBiFactor(e.target.value)}
                            aria_invalid={validBiFactor ? "false" : "true"}
                            aria_describedby="biFactorNote"
                            onFocus={()=>setBiFactorFocus(true)}
                            onBlur={()=>setBiFactorFocus(false)}
                            focusValue={biFactorFocus}
                            validValue={validBiFactor}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="rear_factor" nameOfLabel="Rear Shading Factor" validRule={validRearFactor} nameOfState={rearFactor}/>
                        <Input id="rear_factor" value={rearFactor} autoComplete="off" 
                            onChange={(e)=>setRearFactor(e.target.value)}
                            aria_invalid={validRearFactor ? "false" : "true"}
                            aria_describedby="rearFactorNote"
                            onFocus={()=>setRearFactorFocus(true)}
                            onBlur={()=>setRearFactorFocus(false)}
                            focusValue={rearFactorFocus}
                            validValue={validRearFactor}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 px-3 mb-4">
                        <Label htmlFor="rear_loss" nameOfLabel="Rear Mismatch Loss" validRule={validRearLoss} nameOfState={rearLoss}/>
                        <Input id="rear_loss" value={rearLoss} autoComplete="off" 
                            onChange={(e)=>setRearLoss(e.target.value)}
                            aria_invalid={validRearLoss ? "false" : "true"}
                            aria_describedby="rearLossNote"
                            onFocus={()=>setRearLossFocus(true)}
                            onBlur={()=>setRearLossFocus(false)}
                            focusValue={rearLossFocus}
                            validValue={validRearLoss}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="shed_function" nameOfLabel="Shed Transparent Function" validRule={validShedFunction} nameOfState={shedFunction}/>
                        <Input id="shed_function" value={shedFunction} autoComplete="off" 
                            onChange={(e)=>setShedFunction(e.target.value)}
                            aria_invalid={validShedFunction ? "false" : "true"}
                            aria_describedby="shedFunctionNote"
                            onFocus={()=>setShedFunctionFocus(true)}
                            onBlur={()=>setShedFunctionFocus(false)}
                            focusValue={shedFunctionFocus}
                            validValue={validShedFunction}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 mb-4">
                        <Label htmlFor="active_power" nameOfLabel="Active Power" validRule={validActivePower} nameOfState={activePower}/>
                        <Input id="active_power" value={activePower} autoComplete="off" 
                            onChange={(e)=>setActivePower(e.target.value)}
                            aria_invalid={validActivePower ? "false" : "true"}
                            aria_describedby="activePowerNote"
                            onFocus={()=>setActivePowerFocus(true)}
                            onBlur={()=>setActivePowerFocus(false)}
                            focusValue={activePowerFocus}
                            validValue={validActivePower}
                            errorMesg="Only numbers allowed with decimal or not."
                        />
                     </div>
                     <div className="w-full md:w-1/3 px-3 mb-4">
                        <Label htmlFor="pnomRatio" nameOfLabel="PNOM Ratio(DC:AC)" validRule={validPnomRatio} nameOfState={pnomRatio}/>
                        <Input id="pnomRatio" value={pnomRatio} autoComplete="off" 
                            onChange={(e)=>setPnomRatio(e.target.value)}
                            aria_invalid={validPnomRatio ? "false" : "true"}
                            aria_describedby="pnomRatioNote"
                            onFocus={()=>setPnomRatioFocus(true)}
                            onBlur={()=>setPnomRatioFocus(false)}
                            focusValue={pnomRatioFocus}
                            validValue={validPnomRatio}
                            errorMesg="Allowed only decimal number with two decimial digits."
                        />
                     </div>   
                     <div className="w-full">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 font-bold rounded inline-flex items-center">
                            <FontAwesomeIcon className="p-2" icon={faFileExport} size="1x" />
                            <span>SAVE CONFIGURATION</span>
                        </button>
                     </div>  
                 </div>    
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
export default ConfigureProject;