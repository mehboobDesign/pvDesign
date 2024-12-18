import React, { useState, useEffect} from "react";
import Label from "../Label";
import Input from "../Input";
import AlertModal from "./AlertModal";
import { DOUBLE_TYPE, USER_REGEX, ONLY_INTEGER, NUMBER_DECIMAL } from "../ValidationConstants";
import Axios from "../../../api/Axios";

const GET_DESIGN_BY_ID = "design/";
const UPDATE_DESIGN = 'design/update/';

const UpdateDesignModal = ({modalOpen, onClose, id, setUpdating}) => {

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

    const [errorAlert, setErrorAlert] = useState(false);
    //const [successAlert, setSuccessAlert] = useState(false);

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
        if(id) {
            const getDesignById = async () => {  
                await Axios.get(GET_DESIGN_BY_ID.concat(id))
                .then(function (response) { console.log(response);
                    setDesignName(response.data.designName);
                    setTilt(response.data.tilt);
                    setAzimuth(response.data.azimuth);
                    setTrackingAxis(response.data.tracking_axis_horizontal);
                    setShedsSpacing(response.data.sheds_spacing);
                    setTrackerSpacing(response.data.tracker_spacing);
                    setShedsWidth(response.data.sheds_width);
                    setTrackerWidth(response.data.tracker_width);
                    setLimitProfileAngle(response.data.limit_profile_angle);
                    setGcr(response.data.gcr);
                    setHeightAboveGround(response.data.height_above_ground);
                    setGroundAlbido(response.data.ground_albido);
                    setBiFactor(response.data.bifaciality_factor);
                    setRearFactor(response.data.rear_shading_factor);
                    setRearLoss(response.data.rear_mismatch_loss);
                    setShedFunction(response.data.shed_transparent_fraction);
                    setActivePower(response.data.active_power);
                    setPnomRatio(response.data.pnom_ratio);
                }).catch(function (error) {
                    console.log(error);
                  });
            }; 
            getDesignById(); 
        } 
    },[id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( validDesignName && validTilt && validAzimuth && validTrackingAxis && validShedsSpacing &&
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
                    const response = await Axios.put(UPDATE_DESIGN.concat(id), data);
                    console.log(JSON.stringify(response?.data));
                    onClose(true);
                    setUpdating(true);   
                  } catch(err) { 
                   console.log(err);
                  }
            } else { console.log('error');
                setErrorAlert(true);
            }     
    };

    

    return (
        <>
        <div className={`fixed inset-0 flex justify-center items-center transition-colors
        ${modalOpen ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e)=>e.stopPropagation()} 
            className={`bg-white rounded-xl shadow p-6 transition-all w-7/12
            ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-2 font-bold text-gray-400 bg-white
                hover:bg-gray-50 hover:text-red-500">X</button>
                   <h3 className='text-lg text-center font-black text-gray-800 p-2 border-b-2 border-b-gray-400'>Update Design Configuration</h3>
                    <form className="pt-2" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
                                <div className="w-1/2 pr-2">
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
export default UpdateDesignModal;