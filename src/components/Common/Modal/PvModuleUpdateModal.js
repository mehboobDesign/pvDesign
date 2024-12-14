import React, { useState, useEffect} from "react";
import Axios from "../../../api/Axios";
import { USER_REGEX, ALPHA_NUMERIC, ONLY_NUMBER, NUMBER_DECIMAL, ONLY_INTEGER } from '../../Common/ValidationConstants';
import { useNavigate, useLocation } from "react-router-dom";
import Label from "../Label";
import Input from "../Input";
import AlertModal from "./AlertModal";

const GET_PV_MODULE_BY_ID = 'pvmodules/';
const UPDATE_PV_MODULE = 'pvmodules/update/';


const PvModuleUpdateModal = ({modalOpen, onClose, dataId, setUpdating}) => { 

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname; 
    const [errorAlert, setErrorAlert] = useState(false);

    const [manufacturer, setManufacturer] = useState('');
    const [validManufacturer, setValidManufacturer] = useState(false);
    const [manufacturerFocus, setManufacturerFocus] = useState(false);

    const [modelName, setModelName] = useState('');
    const [validModelName, setValidModelName] = useState(false);
    const [modelNameFocus, setModelNameFocus] = useState(false);

    const [pvType, setPvType] = useState('');
    const [validPvType, setValidPvType] = useState(false);
    const [pvTypeFocus, setPvTypeFocus] = useState(false);

    const [pw, setPw] = useState('');
    const [validPw, setValidPw] = useState(false);
    const [pwFocus, setPwFocus] = useState(false);

    const [voc, setVoc] = useState('');
    const [validVoc, setValidVoc] = useState(false);
    const [vocFocus, setVocFocus] = useState(false);

    const [currentShort, setCurrentShort] = useState('');
    const [validCurrentShort, setValidCurrentShort] = useState(false);
    const [currentShortFocus, setCurrentShortFocus] = useState(false);

    const [maxPowerCurrent, setMaxPowerCurrent] = useState('');
    const [validMaxPowerCurrent, setValidMaxPowerCurrent] = useState(false);
    const [maxPowerCurrentFocus, setMaxPowerCurrentFocus] = useState(false);

    const [tempPmax, setTempPmax] = useState('');
    const [validTempPmax, setValidTempPmax] = useState(false);
    const [tempPmaxFocus, setTempPmaxFocus] = useState(false);

    const [tempVoc, setTempVoc] = useState('');
    const [validTempVoc, setValidTempVoc] = useState(false);
    const [tempVocFocus, setTempVocFocus] = useState(false);

    const [tempIsc, setTempIsc] = useState('');
    const [validTempIsc, setValidTempIsc] = useState(false);
    const [tempIscFocus, setTempIscFocus] = useState(false);

    const [moduleLength, setModuleLength] = useState('');
    const [validModuleLength, setValidModuleLength] = useState(false);
    const [moduleLengthFocus, setModuleLengthFocus] = useState(false);

    const [moduleBreadth, setModuleBreadth] = useState('');
    const [validModuleBreadth, setValidModuleBreadth] = useState(false);
    const [moduleBreadthFocus, setModuleBreadthFocus] = useState(false);

    const [moduleThickness, setModuleThickness] = useState('');
    const [validModuleThickness, setValidModuleThickness] = useState(false);
    const [moduleThicknessFocus, setModuleThicknessFocus] = useState(false);

    const [unitNomPower, setUnitNomPower] = useState('');
    const [validUnitNomPower, setValidUnitNomPower] = useState(false);
    const [unitNomPowerFocus, setUnitNomPowerFocus] = useState(false);

    const [noOfModules, setNoOfModules] = useState('');
    const [validNoOfModules, setValidNoOfModules] = useState(false);
    const [noOfModulesFocus, setNoOfModulesFocus] = useState(false);

    const [nominalSTC, setNominalSTC] = useState('');
    const [validNominalSTC, setValidNominalSTC] = useState(false);
    const [nominalSTCFocus, setNominalSTCFocus] = useState(false);

    const [maxPowerVoltage, setMaxPowerVoltage] = useState('');
    const [validMaxPowerVoltage, setValidMaxPowerVoltage] = useState(false);
    const [maxPowerVoltageFocus, setMaxPowerVoltageFocus] = useState(false);

    useEffect(()=> {
        const result = USER_REGEX.test(manufacturer);
        setValidManufacturer(result);
    }, [manufacturer]);

    useEffect(()=> {
        const result = ALPHA_NUMERIC.test(modelName);
        setValidModelName(result);
    }, [modelName]);

    useEffect(()=>{
        const result = USER_REGEX.test(pvType);
        setValidPvType(result);
    },[pvType]);

    useEffect(()=>{
        const result = ONLY_INTEGER.test(pw);
        setValidPw(result);
    },[pw]);

    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(voc);
        setValidVoc(result);
    },[voc]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(currentShort);
        setValidCurrentShort(result);
    },[currentShort]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(maxPowerCurrent);
        setValidMaxPowerCurrent(result);
    },[maxPowerCurrent]);

    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(tempPmax);
        setValidTempPmax(result);
    },[tempPmax]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(tempVoc);
        setValidTempVoc(result);
    },[tempVoc]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(tempIsc);
        setValidTempIsc(result);
    },[tempIsc]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(moduleLength);
        setValidModuleLength(result);
    },[moduleLength]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(moduleBreadth);
        setValidModuleBreadth(result);
    },[moduleBreadth]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(moduleThickness);
        setValidModuleThickness(result);
    },[moduleThickness]);
    

    useEffect(()=>{
        const result = ONLY_NUMBER.test(unitNomPower);
        setValidUnitNomPower(result);
    },[unitNomPower]);

    useEffect(()=>{
        const result = ONLY_NUMBER.test(noOfModules);
        setValidNoOfModules(result);
    },[noOfModules]);

    useEffect(()=>{
        const result = ONLY_INTEGER.test(nominalSTC);
        setValidNominalSTC(result);
    },[nominalSTC]);

    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(maxPowerVoltage);
        setValidMaxPowerVoltage(result);
    },[maxPowerVoltage]);
    
    useEffect(()=>{
            const showData = async () => {  
                    await Axios.get(GET_PV_MODULE_BY_ID.concat(dataId))
                    .then(function (response) {
                       setManufacturer(response.data.manufacturer);
                       setModelName(response.data.model);
                       setPvType(response.data.type);
                       setPw(response.data.panel_wattage);
                       setVoc(response.data.voltage_open_circuit_voc);
                       setCurrentShort(response.data.current_short_circuit_isc);
                       setMaxPowerCurrent(response.data.max_power_current_impp);
                       setTempPmax(response.data.temp_coecient_of_pmax);
                       setTempVoc(response.data.temp_coecient_of_voc);
                       setTempIsc(response.data.temp_coecient_of_isc);
                       setModuleLength(response.data.module_length);
                       setModuleBreadth(response.data.module_breadth);
                       setModuleThickness(response.data.module_thickness);
                       setUnitNomPower(response.data.unitNomPower);
                       setNoOfModules(response.data.no_modules);
                       setNominalSTC(response.data.nominal_STC);
                       setMaxPowerVoltage(response.data.max_power_voltage_vmpp);
                    }).catch(function (error) {
                        console.log(error);
                      });
                  };   
        showData();
    },[dataId]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(validManufacturer && validModelName && validPvType && validPw && validVoc &&
            validCurrentShort && validMaxPowerCurrent && validTempPmax && validTempVoc &&
            validTempIsc && validModuleLength && validModuleBreadth && validModuleThickness &&
            validUnitNomPower && validNoOfModules && validNominalSTC && validMaxPowerVoltage){
        const data = {
            manufacturer: manufacturer,
            model: modelName,
            type: pvType,
            panel_wattage: pw,
            voltage_open_circuit_voc: voc,
            current_short_circuit_isc: currentShort,
            max_power_current_impp: maxPowerCurrent,
            temp_coecient_of_pmax: tempPmax,
            temp_coecient_of_voc: tempVoc,
            temp_coecient_of_isc: tempIsc,
            module_length: moduleLength,
            module_breadth: moduleBreadth,
            module_thickness: moduleThickness,
            unitNomPower: unitNomPower,
            no_modules: noOfModules,
            nominal_STC: nominalSTC,
            max_power_voltage_vmpp: maxPowerVoltage,
        }
        try {
            const response = await Axios.put(UPDATE_PV_MODULE.concat(dataId), data);
            console.log(JSON.stringify(response?.data));
            navigate( from, { replace: true});
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
                   <h3 className='text-lg text-center font-black text-gray-800 p-2 border-b-2 border-b-orange-600'>Update PV Module Details</h3>
                    <form className="pt-2" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="manufacturer" nameOfLabel="Manufacturer" validRule={validManufacturer} nameOfState={manufacturer}/>
                                    <Input id="manufacturer" value={manufacturer} autoComplete="off"
                                        onChange={(e)=>setManufacturer(e.target.value)}
                                        aria_invalid={validManufacturer ? "false" : "true"}
                                        aria_describedby="manufacturerNote"
                                        onFocus={()=>setManufacturerFocus(true)}
                                        onBlur={()=>setManufacturerFocus(false)}
                                        focusValue={manufacturerFocus}
                                        validValue={validManufacturer}
                                        errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="pv_type" nameOfLabel="Pv Module Type" validRule={validPvType} nameOfState={pvType}/>
                                    <Input id="pv_type" value={pvType} autoComplete="off"
                                        onChange={(e)=>setPvType(e.target.value)}
                                        aria_invalid={validPvType ? "false" : "true"}
                                        aria_describedby="pvTypeNote"
                                        onFocus={()=>setPvTypeFocus(true)}
                                        onBlur={()=>setPvTypeFocus(false)}
                                        focusValue={pvTypeFocus}
                                        validValue={validPvType}
                                        errorMesg="Atleast three character accepted."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="modelName" nameOfLabel="Model Name" validRule={validModelName} nameOfState={modelName}/>
                                    <Input id="modelName" value={modelName} autoComplete="off"
                                        onChange={(e)=>setModelName(e.target.value)}
                                        aria_invalid={validModelName ? "false" : "true"}
                                        aria_describedby="modelNameNote"
                                        onFocus={()=>setModelNameFocus(true)}
                                        onBlur={()=>setModelNameFocus(false)}
                                        focusValue={modelNameFocus}
                                        validValue={validModelName}
                                        errorMesg="Atleast 3 characters to input."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="pw" nameOfLabel="Panel Wattage" validRule={validPw} nameOfState={pw}/>
                                    <Input id="pw" value={pw} autoComplete="off"
                                        onChange={(e)=>setPw(e.target.value)}
                                        aria_invalid={validPw ? "false" : "true"}
                                        aria_describedby="pwNote"
                                        onFocus={()=>setPwFocus(true)}
                                        onBlur={()=>setPwFocus(false)}
                                        focusValue={pwFocus}
                                        validValue={validPw}
                                        errorMesg="Only integer number is accepted."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="voc" nameOfLabel="Voltage Open Circuit" validRule={validVoc} nameOfState={voc}/>
                                    <Input id="voc" value={voc} autoComplete="off"
                                        onChange={(e)=>setVoc(e.target.value)}
                                        aria_invalid={validVoc ? "false" : "true"}
                                        aria_describedby="vocNote"
                                        onFocus={()=>setVocFocus(true)}
                                        onBlur={()=>setVocFocus(false)}
                                        focusValue={vocFocus}
                                        validValue={validVoc}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="current_short_circuit_isc" nameOfLabel="Current Short Circuit isc" validRule={validCurrentShort} nameOfState={currentShort}/>
                                    <Input id="current_short_circuit_isc" value={currentShort} autoComplete="off"
                                        onChange={(e)=>setCurrentShort(e.target.value)}
                                        aria_invalid={validCurrentShort ? "false" : "true"}
                                        aria_describedby="currentShortNote" 
                                        onFocus={()=>setCurrentShortFocus(true)}
                                        onBlur={()=>setCurrentShortFocus(false)}
                                        focusValue={currentShortFocus}
                                        validValue={validCurrentShort}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="max_power_current" nameOfLabel="Max Power Current vmpp" validRule={validMaxPowerCurrent} nameOfState={maxPowerCurrent}/>
                                    <Input id="max_power_current" value={maxPowerCurrent} autoComplete="off"
                                        onChange={(e)=>setMaxPowerCurrent(e.target.value)}
                                        aria_invalid={validMaxPowerCurrent ? "false" : "true"}
                                        aria_describedby="maxPowerCurrentNote"
                                        onFocus={()=>setMaxPowerCurrentFocus(true)}
                                        onBlur={()=>setMaxPowerCurrentFocus(false)}
                                        focusValue={maxPowerCurrentFocus}
                                        validValue={validMaxPowerCurrent}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="temp_pmax" nameOfLabel="Temp Coecient of PMAX" validRule={validTempPmax} nameOfState={tempPmax}/>
                                    <Input id="temp_pmax" value={tempPmax} autoComplete="off"
                                        onChange={(e)=>setTempPmax(e.target.value)}
                                        aria_invalid={validTempPmax ? "false" : "true"}
                                        aria_describedby="tempPmaxNote"
                                        onFocus={()=>setTempPmaxFocus(true)}
                                        onBlur={()=>setTempPmaxFocus(false)}
                                        focusValue={tempPmaxFocus}
                                        validValue={validTempPmax}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="temp_voc" nameOfLabel="Temp Coecient of VOC" validRule={validTempVoc} nameOfState={tempVoc}/>
                                    <Input id="temp_voc" value={tempVoc} autoComplete="off"
                                        onChange={(e)=>setTempVoc(e.target.value)}
                                        aria_invalid={validTempVoc ? "false" : "true"}
                                        aria_describedby="tempVocNote"
                                        onFocus={()=>setTempVocFocus(true)}
                                        onBlur={()=>setTempVocFocus(false)}
                                        focusValue={tempVocFocus}
                                        validValue={validTempVoc}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="temp_isc" nameOfLabel="Temp Coecient of ISC" validRule={validTempIsc} nameOfState={tempIsc}/>
                                    <Input id="temp_isc" value={tempIsc} autoComplete="off"
                                        onChange={(e)=>setTempIsc(e.target.value)}
                                        aria_invalid={validTempIsc ? "false" : "true"}
                                        aria_describedby="tempIscNote"
                                        onFocus={()=>setTempIscFocus(true)}
                                        onBlur={()=>setTempIscFocus(false)}
                                        focusValue={tempIscFocus}
                                        validValue={validTempIsc}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="module_length" nameOfLabel="Module Length" validRule={validModuleLength} nameOfState={moduleLength}/>
                                    <Input id="module_length" value={moduleLength} autoComplete="off"
                                        onChange={(e)=>setModuleLength(e.target.value)}
                                        aria_invalid={validModuleLength ? "false" : "true"}
                                        aria_describedby="moduleLengthNote"
                                        onFocus={()=>setModuleLengthFocus(true)}
                                        onBlur={()=>setModuleLengthFocus(false)}
                                        focusValue={moduleLengthFocus}
                                        validValue={validModuleLength}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="module_breadth" nameOfLabel="Module Breadth" validRule={validModuleBreadth} nameOfState={moduleBreadth}/>
                                    <Input id="module_breadth" value={moduleBreadth} autoComplete="off"
                                        onChange={(e)=>setModuleBreadth(e.target.value)}
                                        aria_invalid={validModuleBreadth ? "false" : "true"}
                                        aria_describedby="moduleBreadthNote"
                                        onFocus={()=>setModuleBreadthFocus(true)}
                                        onBlur={()=>setModuleBreadthFocus(false)}
                                        focusValue={moduleBreadthFocus}
                                        validValue={validModuleBreadth}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="module_thickness" nameOfLabel="Module Thickness" validRule={validModuleThickness} nameOfState={moduleThickness}/>
                                    <Input id="module_thickness" value={moduleThickness} autoComplete="off"
                                        onChange={(e)=>setModuleThickness(e.target.value)}
                                        aria_invalid={validModuleThickness ? "false" : "true"}
                                        aria_describedby="moduleThicknessNote"
                                        onFocus={()=>setModuleThicknessFocus(true)}
                                        onBlur={()=>setModuleThicknessFocus(false)}
                                        focusValue={moduleThicknessFocus}
                                        validValue={validModuleThickness}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="unitNomPower" nameOfLabel="Unit Nom Power" validRule={validUnitNomPower} nameOfState={unitNomPower}/>
                                    <Input id="unitNomPower" value={unitNomPower} autoComplete="off"
                                        onChange={(e)=>setUnitNomPower(e.target.value)}
                                        aria_invalid={validUnitNomPower ? "false" : "true"}
                                        aria_describedby="unitNomPowerNote"
                                        onFocus={()=>setUnitNomPowerFocus(true)}
                                        onBlur={()=>setUnitNomPowerFocus(false)}
                                        focusValue={unitNomPowerFocus}
                                        validValue={validUnitNomPower}
                                        errorMesg="Only numbers accept with length of 3 to 24."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="noOfModules" nameOfLabel="Number of Modules" validRule={validNoOfModules} nameOfState={noOfModules}/>
                                    <Input id="noOfModules" value={noOfModules} autoComplete="off"
                                        onChange={(e)=>setNoOfModules(e.target.value)}
                                        aria_invalid={validNoOfModules ? "false" : "true"}
                                        aria_describedby="noOfModulesNote"
                                        onFocus={()=>setNoOfModulesFocus(true)}
                                        onBlur={()=>setNoOfModulesFocus(false)}
                                        focusValue={noOfModulesFocus}
                                        validValue={validNoOfModules}
                                        errorMesg="Only numbers accept with length of 3 to 24."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="nominalSTC" nameOfLabel=" Nominal STC" validRule={validNominalSTC} nameOfState={nominalSTC}/>
                                    <Input id="nominalSTC" value={nominalSTC} autoComplete="off"
                                        onChange={(e)=>setNominalSTC(e.target.value)}
                                        aria_invalid={validNominalSTC ? "false" : "true"}
                                        aria_describedby="nominalSTCNote"
                                        onFocus={()=>setNominalSTCFocus(true)}
                                        onBlur={()=>setNominalSTCFocus(false)}
                                        focusValue={nominalSTCFocus}
                                        validValue={validNominalSTC}
                                        errorMesg="Only integer number accepted."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="max_power_voltage_vmpp" nameOfLabel="Max Power Voltage vmpp" validRule={validMaxPowerVoltage} nameOfState={maxPowerVoltage}/>
                                    <Input id="max_power_voltage_vmpp" value={maxPowerVoltage} autoComplete="off"
                                        onChange={(e)=>setMaxPowerVoltage(e.target.value)}
                                        aria_invalid={validMaxPowerVoltage ? "false" : "true"}
                                        aria_describedby="maxPowerVoltageNote"
                                        onFocus={()=>setMaxPowerVoltageFocus(true)}
                                        onBlur={()=>setMaxPowerVoltageFocus(false)}
                                        focusValue={maxPowerVoltageFocus}
                                        validValue={validMaxPowerVoltage}
                                        errorMesg="Only decimal number allowed upto two decimal."
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

export default PvModuleUpdateModal;