import React, { useState, useRef, useEffect } from "react";
import { faFileExport, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_REGEX, ONLY_NUMBER, NUMBER_DECIMAL, ALPHA_NUMERIC
,ONLY_INTEGER } from '../../Common/ValidationConstants';
import Axios from "../../../api/Axios";
import AlertModal from "../../Common/Modal/AlertModal";
import Label from "../../Common/Label";
import Input from "../../Common/Input";

const CREATE_PV_MODULE = 'pvmodules/create';

const CreatePvModule = () => {
    const userRef = useRef();

    const [manufacturerName, setManufacturerName] = useState('');
    const [validManufacturerName, setValidManufacturerName] = useState(false);
    const [manufacturerNameFocus, setManufacturerNameFocus] = useState(false);

    const [modelName, setModelName] = useState('');
    const [validModelName, setValidModelName] = useState(false);
    const [modelNameFocus, setModelNameFocus] = useState(false);

    const [type, setType] = useState('');
    const [validType, setValidType] = useState(false);
    const [typeFocus, setTypeFocus] = useState(false);

    const [panelWattage, setPanelWattage] = useState('');
    const [validPanelWattage, setValidPanelWattage] = useState(false);
    const [panelWattageFocus, setPanelWattageFocus] = useState(false);

    const [voltageOpen, setVoltageOpen] = useState('');
    const [validVoltageOpen, setValidVoltageOpen] = useState(false);
    const [voltageOpenFocus, setVoltageOpenFocus] = useState(false);

    const [currentShort, setCurrentShort] = useState('');
    const [validCurrentShort, setValidCurrentShort] = useState(false);
    const [currentShortFocus, setCurrentShortFocus] = useState(false);

    const [maxPowerVoltage, setMaxPowerVoltage] = useState('');
    const [validMaxPowerVoltage, setValidMaxPowerVoltage] = useState(false);
    const [maxPowerVoltageFocus, setMaxPowerVoltageFocus] = useState(false);

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

    const [numberOfModules, setNumberOfModules] = useState('');
    const [validNumberOfModules, setValidNumberOfModules] = useState(false);
    const [numberOfModulesFocus, setNumberOfModulesFocus] = useState(false);

    const [nominalSTC, setNominalSTC] = useState('');
    const [validNominalSTC, setValidNominalSTC] = useState(false);
    const [nominalSTCFocus, setNominalSTCFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    
    useEffect(()=>{
        userRef.current.focus();
    },[]);
    useEffect(()=>{
        const result = USER_REGEX.test(manufacturerName);
        setValidManufacturerName(result);
    },[manufacturerName]);
    useEffect(()=>{
        const result = ALPHA_NUMERIC.test(modelName);
        setValidModelName(result);
    },[modelName]);
    useEffect(()=>{
        const result = ALPHA_NUMERIC.test(type);
        setValidType(result);
    },[type]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(panelWattage);
        setValidPanelWattage(result);
    },[panelWattage]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(voltageOpen);
        setValidVoltageOpen(result);
    },[voltageOpen]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(currentShort);
        setValidCurrentShort(result);
    },[currentShort]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(maxPowerVoltage);
        setValidMaxPowerVoltage(result);
    },[maxPowerVoltage]);
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
        const result = ONLY_NUMBER.test(numberOfModules);
        setValidNumberOfModules(result);
    },[numberOfModules]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(nominalSTC);
        setValidNominalSTC(result);
    },[nominalSTC]);
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const v1 = USER_REGEX.test(manufacturerName);
        const v2 = ALPHA_NUMERIC.test(modelName);
        const v3 = ALPHA_NUMERIC.test(type);
        const v4 = ONLY_INTEGER.test(panelWattage);
        const v5 = NUMBER_DECIMAL.test(voltageOpen);
        const v6 = NUMBER_DECIMAL.test(currentShort);
        const v7 = NUMBER_DECIMAL.test(maxPowerVoltage);
        const v8 = NUMBER_DECIMAL.test(maxPowerCurrent);
        const v9 = NUMBER_DECIMAL.test(tempPmax);
        const v10 = NUMBER_DECIMAL.test(tempVoc);
        const v11 = NUMBER_DECIMAL.test(tempIsc);
        const v12 = NUMBER_DECIMAL.test(moduleLength);
        const v13 = NUMBER_DECIMAL.test(moduleBreadth);
        const v14 = NUMBER_DECIMAL.test(moduleThickness);
        const v15 = ONLY_NUMBER.test(unitNomPower);
        const v16 = ONLY_NUMBER.test(numberOfModules);
        const v17 = ONLY_INTEGER.test(nominalSTC)
        if(!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7
            || !v8 || !v9 || !v10 || !v11 || !v12 || !v13 || !v14 || !v15
            || !v16 || !v17) {
            setAlertModalOpen(true);
            return;
        }
        Axios.post(CREATE_PV_MODULE, {
            manufacturer: manufacturerName,
            model: modelName,
            type: type,
            panel_wattage: panelWattage,
            voltage_open_circuit_voc: voltageOpen,
            current_short_circuit_isc: currentShort,
            max_power_voltage_vmpp: maxPowerVoltage,
            max_power_current_impp: maxPowerCurrent,
            temp_coecient_of_pmax: tempPmax,
            temp_coecient_of_voc: tempVoc,
            temp_coecient_of_isc: tempIsc,
            module_length: moduleLength,
            module_breadth: moduleBreadth,
            module_thickness: moduleThickness,
            unitNomPower: unitNomPower,
            no_modules: numberOfModules,
            nominal_STC: nominalSTC
          })
          .then(function (response) {
            setMessage(response.data.message);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setManufacturerName('');
                setModelName('');
                setType('');
                setUnitNomPower('');
                setNumberOfModules('');
                setNominalSTC('');
            }, 3000);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    return(
        <> 
        {success ? <>{message}</>
        :
        <form className="w-full" onSubmit={handleSubmit} id="create_pv_module">
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="manufacturerName" nameOfLabel="Manufacturer Name" validRule={validManufacturerName} nameOfState={manufacturerName}/>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-2 leading-tight focus:outline-none focus:bg-white" 
                    id="manufacturerName" 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=>setManufacturerName(e.target.value)}
                    required
                    aria-invalid={validManufacturerName ? "false" : "true"}
                    aria-describedby="manufacturerNamenote"
                    onFocus={()=>setManufacturerNameFocus(true)}
                    onBlur={()=>setManufacturerNameFocus(false)}
                />
                <p id="manufacturerNamenote" className={manufacturerNameFocus && manufacturerName && !validManufacturerName
                ? "text-red-400" : "hidden"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. 
                    Must begin with a letter. 
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </div>
            <div className="w-full md:w-1/3 px-3">
                 <Label htmlFor="modelName" nameOfLabel="Model Name" validRule={validModelName} nameOfState={modelName}/>
                 <Input id="modelName" value={modelName} autoComplete="off" 
                    onChange={(e)=>setModelName(e.target.value)}
                    aria_invalid={validModelName ? "false" : "true"}
                    aria_describedby="modelNameNote"
                    onFocus={()=>setModelNameFocus(true)}
                    onBlur={()=>setModelNameFocus(false)}
                    focusValue={modelNameFocus}
                    validValue={validModelName}
                    errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                 />
            </div>
            <div className="w-full md:w-1/3 px-3">
                 <Label htmlFor="type" nameOfLabel="Type" validRule={validType} nameOfState={type}/>
                 <Input id="type" value={type} autoComplete="off" 
                    onChange={(e)=>setType(e.target.value)}
                    aria_invalid={validType ? "false" : "true"}
                    aria_describedby="typeNote"
                    onFocus={()=>setTypeFocus(true)}
                    onBlur={()=>setTypeFocus(false)}
                    focusValue={typeFocus}
                    validValue={validType}
                    errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="panel_wattage" nameOfLabel="Panel Wattage" validRule={validPanelWattage} nameOfState={panelWattage}/>
                <Input id="panel_wattage" value={panelWattage} autoComplete="off" 
                    onChange={(e)=>setPanelWattage(e.target.value)}
                    aria_invalid={validPanelWattage ? "false" : "true"}
                    aria_describedby="panelWattageNote"
                    onFocus={()=>setPanelWattageFocus(true)}
                    onBlur={()=>setPanelWattageFocus(false)}
                    focusValue={panelWattageFocus}
                    validValue={validPanelWattage}
                    errorMesg="Only positive numbers allowed upto 4 digit."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="voltage_open_circuit_voc" nameOfLabel="Voltage Open Circuit VOC" validRule={validVoltageOpen} nameOfState={voltageOpen}/>
                <Input id="voltage_open_circuit_voc" value={voltageOpen} autoComplete="off" 
                    onChange={(e)=>setVoltageOpen(e.target.value)}
                    aria_invalid={validVoltageOpen ? "false" : "true"}
                    aria_describedby="voltageOpenNote"
                    onFocus={()=>setVoltageOpenFocus(true)}
                    onBlur={()=>setVoltageOpenFocus(false)}
                    focusValue={voltageOpenFocus}
                    validValue={validVoltageOpen}
                    errorMesg="Only decimal number allowed upto two decimal."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="current_short_circuit_isc" nameOfLabel="Current Short Circuit ISC" validRule={validCurrentShort} nameOfState={currentShort}/>
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
        </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/3 px-3">
                    <Label htmlFor="max_power_voltage_vmpp" nameOfLabel="Max Power Voltage VMPP" validRule={validMaxPowerVoltage} nameOfState={maxPowerVoltage}/>
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
                <div className="w-full md:w-1/3 px-3">
                    <Label htmlFor="max_power_current_impp" nameOfLabel="Max Power Current IMPP" validRule={validMaxPowerCurrent} nameOfState={maxPowerCurrent}/>
                    <Input id="max_power_current_impp" value={maxPowerCurrent} autoComplete="off" 
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
                <div className="w-full md:w-1/3 px-3">
                    <Label htmlFor="temp_coecient_of_pmax" nameOfLabel="Temp Coecient of PMAX" validRule={validTempPmax} nameOfState={tempPmax}/>
                    <Input id="temp_coecient_of_pmax" value={tempPmax} autoComplete="off" 
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
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/3 px-3">
                    <Label htmlFor="temp_coecient_of_voc" nameOfLabel=" Temp Coecient of VOC" validRule={validTempVoc} nameOfState={tempVoc}/>
                    <Input id="temp_coecient_of_voc" value={tempVoc} autoComplete="off" 
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
                <div className="w-full md:w-1/3 px-3">
                    <Label htmlFor="temp_coecient_of_isc" nameOfLabel="Temp Coecient of ISC" validRule={validTempIsc} nameOfState={tempIsc}/>
                    <Input id="temp_coecient_of_isc" value={tempIsc} autoComplete="off" 
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
                <div className="w-full md:w-1/3 px-3">
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
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/3 px-3">
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
                <div className="w-full md:w-1/3 px-3">
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
                <div className="w-full md:w-1/3 px-3">
                    <Label htmlFor="unitNomPower" nameOfLabel="Unit Nom Power" validRule={validUnitNomPower} nameOfState={unitNomPower}/>
                    <Input id="unitNomPower" value={unitNomPower} autoComplete="off" 
                        onChange={(e)=>setUnitNomPower(e.target.value)}
                        aria_invalid={validUnitNomPower ? "false" : "true"}
                        aria_describedby="unitNomPowerNote"
                        onFocus={()=>setUnitNomPowerFocus(true)}
                        onBlur={()=>setUnitNomPowerFocus(false)}
                        focusValue={unitNomPowerFocus}
                        validValue={validUnitNomPower}
                        errorMesg="Minimum 1 digit and maximum 4 digit positive numbers are allowed."
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="numberOfModules" nameOfLabel="Number of Modules" validRule={validNumberOfModules} nameOfState={numberOfModules}/>
                <Input id="numberOfModules" value={numberOfModules} autoComplete="off" 
                    onChange={(e)=>setNumberOfModules(e.target.value)}
                    aria_invalid={validNumberOfModules ? "false" : "true"}
                    aria_describedby="numberOfModulesNote"
                    onFocus={()=>setNumberOfModulesFocus(true)}
                    onBlur={()=>setNumberOfModulesFocus(false)}
                    focusValue={numberOfModulesFocus}
                    validValue={validNumberOfModules}
                    errorMesg="Minimum 1 digit and maximum 4 digit positive numbers are allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="nominal_stc" nameOfLabel="Nominal STC" validRule={validNominalSTC} nameOfState={nominalSTC}/>
                <Input id="nominal_stc" value={nominalSTC} autoComplete="off" 
                    onChange={(e)=>setNominalSTC(e.target.value)}
                    aria_invalid={validNominalSTC ? "false" : "true"}
                    aria_describedby="nominalStcNote"
                    onFocus={()=>setNominalSTCFocus(true)}
                    onBlur={()=>setNominalSTCFocus(false)}
                    focusValue={nominalSTCFocus}
                    validValue={validNominalSTC}
                    errorMesg="Only positive integer number allowed."
                />
            </div>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <FontAwesomeIcon className="p-2" icon={faFileExport} size="1x" />
                <span>Create PV Module</span>
        </button>
    </form>
        }
        <AlertModal modalOpen={alertModalOpen} onClose={()=>setAlertModalOpen(false)}>
                <div className='text-center w-96'>
                  <h3 className='text-lg font-black text-red-600 p-4'>Opps! Invalid Entries</h3>
                  <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>Please cross verify the input fileds!</p>
                  <div className='flex gap-4 justify-center items-center'>
                    <button className="border border-green-500 bg-green-500 text-white hover:bg-green-600 w-1/2 p-2" onClick={()=>setAlertModalOpen(false)}>OK</button>
                  </div>
                </div>
        </AlertModal>
    </>
    );
}
export default CreatePvModule;