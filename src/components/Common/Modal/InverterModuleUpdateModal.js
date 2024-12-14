import React, { useState, useEffect} from "react";
import Axios from "../../../api/Axios";
import { USER_REGEX, ALPHA_NUMERIC, ONLY_INTEGER, DOUBLE_TYPE, NUMBER_DECIMAL } from '../../Common/ValidationConstants';
import {  useNavigate, useLocation } from "react-router-dom";
import Input from "../Input";
import Label from "../Label";
import AlertModal from "./AlertModal";

const GET_INVERTER_MODULE_BY_ID = 'inverter/';
const UPDATE_INVERTER_MODULE = 'inverter/update/';


const InverterModuleUpdateModal = ({modalOpen, onClose, dataId, setUpdating}) => { 

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname; 
    const [errorAlert, setErrorAlert] = useState(false);

    const [inverterType, setInverterType] = useState('');
    const [validInverterType, setValidInverterType] = useState(false);
    const [inverterTypeFocus, setInverterTypeFocus] = useState(false);
    
    const [manufacturerName, setManufacturerName] = useState('');
    const [validManufacturerName, setValidManufacturerName] = useState(false);
    const [manufacturerNameFocus, setManufacturerNameFocus] = useState(false);

    const [modelName, setModelName] = useState('');
    const [validModelName, setValidModelName] = useState(false);
    const [modelNameFocus, setModelNameFocus] = useState(false);

    const [maxPv, setMaxPv] = useState('');
    const [validMaxPv, setValidMaxPv] = useState(false);
    const [maxPvFocus, setMaxPvFocus] = useState(false);

    const [minPv, setMinPv] = useState('');
    const [validMinPv, setValidMinPv] = useState(false);
    const [minPvFocus, setMinPvFocus] = useState(false);

    const [nominalPv, setNominalPv] = useState('');
    const [validNominalPv, setValidNominalPv] = useState(false);
    const [nominalPvFocus, setNominalPvFocus] = useState(false);

    const [mppStart, setMppStart] = useState('');
    const [validMppStart, setValidMppStart] = useState(false);
    const [mppStartFocus, setMppStartFocus] = useState(false);

    const [mppEnd, setMppEnd] = useState('');
    const [validMppEnd, setValidMppEnd] = useState(false);
    const [mppEndFocus, setMppEndFocus] = useState(false);

    const [mppPowerStart, setMppPowerStart] = useState('');
    const [validMppPowerStart, setValidMppPowerStart] = useState(false);
    const [mppPowerStartFocus, setMppPowerStartFocus] = useState(false);

    const [mppPowerEnd, setMppPowerEnd] = useState('');
    const [validMppPowerEnd, setValidMppPowerEnd] = useState(false);
    const [mppPowerEndFocus, setMppPowerEndFocus] = useState(false);

    const [mppInputs, setMppInputs] = useState('');
    const [validMppInputs, setValidMppInputs] = useState(false);
    const [mppInputsFocus, setMppInputsFocus] = useState(false);

    const [maxConnector, setMaxConnector] = useState('');
    const [validMaxConnector, setValidMaxConnector] = useState(false);
    const [maxConnectorFocus, setMaxConnectorFocus] = useState(false);

    const [maxCurrent, setMaxCurrent] = useState('');
    const [validMaxCurrent, setValidMaxCurrent] = useState(false);
    const [maxCurrentFocus, setMaxCurrentFocus] = useState(false);

    const [maxIsc, setMaxIsc] = useState('');
    const [validMaxIsc, setValidMaxIsc] = useState(false);
    const [maxIscFocus, setMaxIscFocus] = useState(false);

    const [opPower, setOpPower] = useState('');
    const [validOpPower, setValidOpPower] = useState(false);
    const [opPowerFocus, setOpPowerFocus] = useState(false);

    const [opCurrent, setOpCurrent] = useState('');
    const [validOpCurrent, setValidOpCurrent] = useState(false);
    const [opCurrentFocus, setOpCurrentFocus] = useState(false);

    const [acStart, setAcStart] = useState('');
    const [validAcStart, setValidAcStart] = useState(false);
    const [acStartFocus, setAcStartFocus] = useState(false);

    const [acEnd, setAcEnd] = useState('');
    const [validAcEnd, setValidAcEnd] = useState(false);
    const [acEndFocus, setAcEndFocus] = useState(false);

    const [unitNomPower, setUnitNomPower] = useState('');
    const [validUnitNomPower, setValidUnitNomPower] = useState(false);
    const [unitNomPowerFocus, setUnitNomPowerFocus] = useState(false);

    const [numberOfInverters, setNumberOfInverters] = useState('');
    const [validNumberOfInverters, setValidNumberOfInverters] = useState(false);
    const [numberOfInvertersFocus, setNumberOfInvertersFocus] = useState(false);

    const [totalPower, setTotalPower] = useState('');
    const [validTotalPower, setValidTotalPower] = useState(false);
    const [totalPowerFocus, setTotalPowerFocus] = useState(false);

    const [maximumPower, setMaximumPower] = useState('');
    const [validMaximumPower, setValidMaximumPower] = useState(false);
    const [maximumPowerFocus, setMaximumPowerFocus] = useState(false);

    // const [success, setSuccess] = useState(false);
    // const [message, setMessage] = useState('');
    // const [alertModalOpen, setAlertModalOpen] = useState(false);

    useEffect(()=>{
        const result = USER_REGEX.test(inverterType);
        setValidInverterType(result);
    },[inverterType]);
    useEffect(()=>{
        const result = USER_REGEX.test(manufacturerName);
        setValidManufacturerName(result);
    },[manufacturerName]);
    useEffect(()=>{
        const result = ALPHA_NUMERIC.test(modelName);
        setValidModelName(result);
    },[modelName]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(maxPv);
        setValidMaxPv(result);
    },[maxPv]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(minPv);
        setValidMinPv(result);
    },[minPv]);
    useEffect(()=>{
        const result = DOUBLE_TYPE.test(nominalPv);
        setValidNominalPv(result);
    },[nominalPv]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(mppStart);
        setValidMppStart(result);
    },[mppStart]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(mppEnd);
        setValidMppEnd(result);
    },[mppEnd]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(mppPowerStart);
        setValidMppPowerStart(result);
    },[mppPowerStart]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(mppPowerEnd);
        setValidMppPowerEnd(result);
    },[mppPowerEnd]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(mppInputs);
        setValidMppInputs(result);
    },[mppInputs]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(maxConnector);
        setValidMaxConnector(result);
    },[maxConnector]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(maxCurrent);
        setValidMaxCurrent(result);
    },[maxCurrent]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(maxIsc);
        setValidMaxIsc(result);
    },[maxIsc]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(opPower);
        setValidOpPower(result);
    },[opPower]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(opCurrent);
        setValidOpCurrent(result);
    },[opCurrent]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(acStart);
        setValidAcStart(result);
    },[acStart]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(acEnd);
        setValidAcEnd(result);
    },[acEnd]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(unitNomPower);
        setValidUnitNomPower(result);
    },[unitNomPower]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(numberOfInverters);
        setValidNumberOfInverters(result);
    },[numberOfInverters]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(totalPower);
        setValidTotalPower(result);
    },[totalPower]);
    useEffect(()=>{
        const result = ONLY_INTEGER.test(maximumPower);
        setValidMaximumPower(result);
    },[maximumPower]);
    
    
    useEffect(()=>{
            const showData = async () => {  
                    await Axios.get(GET_INVERTER_MODULE_BY_ID.concat(dataId))
                    .then(function (response) {
                        setManufacturerName(response.data.manufacturer);
                        setInverterType(response.data.type);
                        setModelName(response.data.model);
                        setMaxPv(response.data.max_pv_input_voltage);
                        setMinPv(response.data.min_pv_input_voltage);
                        setNominalPv(response.data.nominal_pv_input_voltage);
                        setMppStart(response.data.mpp_voltage_range_end);
                        setMppEnd(response.data.mpp_voltage_range_end);
                        setMppPowerStart(response.data.mpp_voltage_range_nominal_power_start);
                        setMppPowerEnd(response.data.mpp_voltage_range_nominal_power_end);
                        setMppInputs(response.data.no_mpp_inputs);
                        setMaxConnector(response.data.max_no_input_connector);
                        setMaxCurrent(response.data.max_pv_input_current);
                        setMaxIsc(response.data.max_dc_isc);
                        setOpPower(response.data.ac_op_power);
                        setOpCurrent(response.data.max_ac_op_current);
                        setAcStart(response.data.ac_voltage_range_start);
                        setAcEnd(response.data.ac_voltage_range_end);
                        setUnitNomPower(response.data.unit_nom_power);
                        setNumberOfInverters(response.data.no_inverters);
                        setMaximumPower(response.data.max_power);
                        setTotalPower(response.data.total_power);
                    }).catch(function (error) {
                        console.log(error);
                      });
                  }; 
               
        showData();
    },[dataId]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(validManufacturerName && validInverterType && validModelName && validMaxPv &&
            validMinPv && validNominalPv && validMppStart && validMppEnd && validMppPowerStart &&
            validMppPowerEnd && validMppInputs && validMaxConnector && validMaxCurrent &&
            validMaxIsc && validOpPower && validOpCurrent && validAcStart && validAcEnd &&
            validUnitNomPower && validNumberOfInverters && validMaximumPower && validTotalPower){
        const data = {
            manufacturer: manufacturerName,
            model: modelName,
            type: inverterType,
            max_pv_input_voltage: maxPv,
            min_pv_input_voltage: minPv,
            nominal_pv_input_voltage: nominalPv,
            mpp_voltage_range_start: mppStart,
            mpp_voltage_range_end: mppEnd,
            mpp_voltage_range_nominal_power_start: mppPowerStart,
            mpp_voltage_range_nominal_power_end: mppPowerEnd,
            no_mpp_inputs: mppInputs,
            max_no_input_connector: maxConnector,
            max_pv_input_current: maxCurrent,
            max_dc_isc: maxIsc,
            ac_op_power: opPower,
            max_ac_op_current: opCurrent,
            ac_voltage_range_start: acStart,
            ac_voltage_range_end: acEnd,
            unit_nom_power: unitNomPower,
            no_inverters: numberOfInverters,
            max_power: maximumPower,
            total_power: totalPower
        }
        try {
            const response = await Axios.put(UPDATE_INVERTER_MODULE.concat(dataId), data);
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
            className={`bg-white rounded-xl shadow p-6 transition-all w-10/12 mt-16
            ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-2 font-bold text-gray-400 bg-white
                hover:bg-gray-50 hover:text-red-500">X</button>
                   <h3 className='text-lg text-center font-black text-gray-800 p-2 border-b-2 border-b-orange-600'>Update Inverter Module Details</h3>
                    <form className="pt-2" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="manufacturerName" nameOfLabel="Manufacturer" validRule={validManufacturerName} nameOfState={manufacturerName}/>
                                    <Input id="manufacturerName" value={manufacturerName} autoComplete="off"
                                        onChange={(e)=>setManufacturerName(e.target.value)}
                                        aria_invalid={validManufacturerName ? "false" : "true"}
                                        aria_describedby="manufacturerNameNote"
                                        onFocus={()=>setManufacturerNameFocus(true)}
                                        onBlur={()=>setManufacturerNameFocus(false)}
                                        focusValue={manufacturerNameFocus}
                                        validValue={validManufacturerName}
                                        errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="inverter_type" nameOfLabel="Inverter Type" validRule={validInverterType} nameOfState={inverterType}/>
                                    <Input id="inverter_type" value={inverterType} autoComplete="off"
                                        onChange={(e)=>setInverterType(e.target.value)}
                                        aria_invalid={validInverterType ? "false" : "true"}
                                        aria_describedby="inverterTypeNote"
                                        onFocus={()=>setInverterTypeFocus(true)}
                                        onBlur={()=>setInverterTypeFocus(false)}
                                        focusValue={inverterTypeFocus}
                                        validValue={validInverterType}
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
                                    <Label htmlFor="max_pv" nameOfLabel="Max PV Input Voltage" validRule={validMaxPv} nameOfState={maxPv}/>
                                    <Input id="max_pv" value={maxPv} autoComplete="off"
                                        onChange={(e)=>setMaxPv(e.target.value)}
                                        aria_invalid={validMaxPv ? "false" : "true"}
                                        aria_describedby="maxPvNote"
                                        onFocus={()=>setMaxPvFocus(true)}
                                        onBlur={()=>setMaxPvFocus(false)}
                                        focusValue={maxPvFocus}
                                        validValue={validMaxPv}
                                        errorMesg="Only numbers allowed with decimal or not."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="min_pv" nameOfLabel="Min PV Input Voltage" validRule={validMinPv} nameOfState={minPv}/>
                                    <Input id="min_pv" value={minPv} autoComplete="off"
                                        onChange={(e)=>setMinPv(e.target.value)}
                                        aria_invalid={validMinPv ? "false" : "true"}
                                        aria_describedby="minPvNote"
                                        onFocus={()=>setMinPvFocus(true)}
                                        onBlur={()=>setMinPvFocus(false)}
                                        focusValue={minPvFocus}
                                        validValue={validMinPv}
                                        errorMesg="Only numbers allowed with decimal upto two digit."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="nominal_pv" nameOfLabel="Nominal PV Input Voltage" validRule={validNominalPv} nameOfState={nominalPv}/>
                                    <Input id="nominal_pv" value={nominalPv} autoComplete="off"
                                        onChange={(e)=>setNominalPv(e.target.value)}
                                        aria_invalid={validNominalPv ? "false" : "true"}
                                        aria_describedby="nominalPvNote" 
                                        onFocus={()=>setNominalPvFocus(true)}
                                        onBlur={()=>setNominalPvFocus(false)}
                                        focusValue={nominalPvFocus}
                                        validValue={validNominalPv}
                                        errorMesg="Only decimal number allowed upto two decimal."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="mpp_start" nameOfLabel="MPP Voltage Range Start" validRule={validMppStart} nameOfState={mppStart}/>
                                    <Input id="mpp_start" value={mppStart} autoComplete="off"
                                        onChange={(e)=>setMppStart(e.target.value)}
                                        aria_invalid={validMppStart ? "false" : "true"}
                                        aria_describedby="mppStartNote"
                                        onFocus={()=>setMppStartFocus(true)}
                                        onBlur={()=>setMppStartFocus(false)}
                                        focusValue={mppStartFocus}
                                        validValue={validMppStart}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="mpp_end" nameOfLabel="MPP Voltage Range End" validRule={validMppEnd} nameOfState={mppEnd}/>
                                    <Input id="mpp_end" value={mppEnd} autoComplete="off"
                                        onChange={(e)=>setMppEnd(e.target.value)}
                                        aria_invalid={validMppEnd ? "false" : "true"}
                                        aria_describedby="mppEndNote"
                                        onFocus={()=>setMppEndFocus(true)}
                                        onBlur={()=>setMppEndFocus(false)}
                                        focusValue={mppEndFocus}
                                        validValue={validMppEnd}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="mpp_power_start" nameOfLabel="MPP Voltage Range Nominal Power Start" validRule={validMppPowerStart} nameOfState={mppPowerStart}/>
                                    <Input id="mpp_power_start" value={mppPowerStart} autoComplete="off"
                                        onChange={(e)=>setMppPowerStart(e.target.value)}
                                        aria_invalid={validMppPowerStart ? "false" : "true"}
                                        aria_describedby="mppPowerStartNote"
                                        onFocus={()=>setMppPowerStartFocus(true)}
                                        onBlur={()=>setMppPowerStartFocus(false)}
                                        focusValue={mppPowerStartFocus}
                                        validValue={validMppPowerStart}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="mpp_power_end" nameOfLabel="MPP Voltage Range Nominal Power End" validRule={validMppPowerEnd} nameOfState={mppPowerEnd}/>
                                    <Input id="mpp_power_end" value={mppPowerEnd} autoComplete="off"
                                        onChange={(e)=>setMppPowerEnd(e.target.value)}
                                        aria_invalid={validMppPowerEnd ? "false" : "true"}
                                        aria_describedby="mppPowerEndNote"
                                        onFocus={()=>setMppPowerEndFocus(true)}
                                        onBlur={()=>setMppPowerEndFocus(false)}
                                        focusValue={mppPowerEndFocus}
                                        validValue={validMppPowerEnd}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="mpp_inputs" nameOfLabel="Number of Mpp Inputs" validRule={validMppInputs} nameOfState={mppInputs}/>
                                    <Input id="mpp_inputs" value={mppInputs} autoComplete="off"
                                        onChange={(e)=>setMppInputs(e.target.value)}
                                        aria_invalid={validMppInputs ? "false" : "true"}
                                        aria_describedby="mppInputsNote"
                                        onFocus={()=>setMppInputsFocus(true)}
                                        onBlur={()=>setMppInputsFocus(false)}
                                        focusValue={mppInputsFocus}
                                        validValue={validMppInputs}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="max_connector" nameOfLabel="Max no input connector" validRule={validMaxConnector} nameOfState={maxConnector}/>
                                    <Input id="max_connector" value={maxConnector} autoComplete="off"
                                        onChange={(e)=>setMaxConnector(e.target.value)}
                                        aria_invalid={validMaxConnector ? "false" : "true"}
                                        aria_describedby="maxConnectorNote"
                                        onFocus={()=>setMaxConnectorFocus(true)}
                                        onBlur={()=>setMaxConnectorFocus(false)}
                                        focusValue={maxConnectorFocus}
                                        validValue={validMaxConnector}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="max_current" nameOfLabel="Max PV input current" validRule={validMaxCurrent} nameOfState={maxCurrent}/>
                                    <Input id="max_current" value={maxCurrent} autoComplete="off"
                                        onChange={(e)=>setMaxCurrent(e.target.value)}
                                        aria_invalid={validMaxCurrent ? "false" : "true"}
                                        aria_describedby="maxCurrentNote"
                                        onFocus={()=>setMaxCurrentFocus(true)}
                                        onBlur={()=>setMaxCurrentFocus(false)}
                                        focusValue={maxCurrentFocus}
                                        validValue={validMaxCurrent}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="max_isc" nameOfLabel="Max DC ISC" validRule={validMaxIsc} nameOfState={maxIsc}/>
                                    <Input id="max_isc" value={maxIsc} autoComplete="off"
                                        onChange={(e)=>setMaxIsc(e.target.value)}
                                        aria_invalid={validMaxIsc ? "false" : "true"}
                                        aria_describedby="maxIscNote"
                                        onFocus={()=>setMaxIscFocus(true)}
                                        onBlur={()=>setMaxIscFocus(false)}
                                        focusValue={maxIscFocus}
                                        validValue={validMaxIsc}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="op_power" nameOfLabel="AC OP Power" validRule={validOpPower} nameOfState={opPower}/>
                                    <Input id="op_power" value={opPower} autoComplete="off"
                                        onChange={(e)=>setOpPower(e.target.value)}
                                        aria_invalid={validOpPower ? "false" : "true"}
                                        aria_describedby="opPowerNote"
                                        onFocus={()=>setOpPowerFocus(true)}
                                        onBlur={()=>setOpPowerFocus(false)}
                                        focusValue={opPowerFocus}
                                        validValue={validOpPower}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="op_current" nameOfLabel="Max AC OP Current" validRule={validOpCurrent} nameOfState={opCurrent}/>
                                    <Input id="op_current" value={opCurrent} autoComplete="off"
                                        onChange={(e)=>setOpCurrent(e.target.value)}
                                        aria_invalid={validOpCurrent ? "false" : "true"}
                                        aria_describedby="opCurrentNote"
                                        onFocus={()=>setOpCurrentFocus(true)}
                                        onBlur={()=>setOpCurrentFocus(false)}
                                        focusValue={opCurrentFocus}
                                        validValue={validOpCurrent}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="ac_start" nameOfLabel="AC Voltage Range Start" validRule={validAcStart} nameOfState={acStart}/>
                                    <Input id="ac_start" value={acStart} autoComplete="off"
                                        onChange={(e)=>setAcStart(e.target.value)}
                                        aria_invalid={validAcStart ? "false" : "true"}
                                        aria_describedby="acStartNote"
                                        onFocus={()=>setAcStartFocus(true)}
                                        onBlur={()=>setAcStartFocus(false)}
                                        focusValue={acStartFocus}
                                        validValue={validAcStart}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="ac_end" nameOfLabel="AC Voltage Range End" validRule={validAcEnd} nameOfState={acEnd}/>
                                    <Input id="ac_end" value={acEnd} autoComplete="off"
                                        onChange={(e)=>setAcEnd(e.target.value)}
                                        aria_invalid={validAcEnd ? "false" : "true"}
                                        aria_describedby="acEndNote"
                                        onFocus={()=>setAcEndFocus(true)}
                                        onBlur={()=>setAcEndFocus(false)}
                                        focusValue={acEndFocus}
                                        validValue={validAcEnd}
                                        errorMesg="Only positive numbers are allowed."
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
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="numberOfInverters" nameOfLabel="Number of Inverters" validRule={validNumberOfInverters} nameOfState={numberOfInverters}/>
                                    <Input id="numberOfInverters" value={numberOfInverters} autoComplete="off"
                                        onChange={(e)=>setNumberOfInverters(e.target.value)}
                                        aria_invalid={validNumberOfInverters ? "false" : "true"}
                                        aria_describedby="numberOfInvertersNote"
                                        onFocus={()=>setNumberOfInvertersFocus(true)}
                                        onBlur={()=>setNumberOfInvertersFocus(false)}
                                        focusValue={numberOfInvertersFocus}
                                        validValue={validNumberOfInverters}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="total_power" nameOfLabel="Total Power" validRule={validTotalPower} nameOfState={totalPower}/>
                                    <Input id="total_power" value={totalPower} autoComplete="off"
                                        onChange={(e)=>setTotalPower(e.target.value)}
                                        aria_invalid={validTotalPower ? "false" : "true"}
                                        aria_describedby="totalPowerNote"
                                        onFocus={()=>setTotalPowerFocus(true)}
                                        onBlur={()=>setTotalPowerFocus(false)}
                                        focusValue={totalPowerFocus}
                                        validValue={validTotalPower}
                                        errorMesg="Only positive numbers are allowed."
                                    />
                                </div>
                                <div className="w-1/3 pr-2">
                                    <Label htmlFor="maximum_power" nameOfLabel="Maximum Power" validRule={validMaximumPower} nameOfState={maximumPower}/>
                                    <Input id="maximum_power" value={maximumPower} autoComplete="off"
                                        onChange={(e)=>setMaximumPower(e.target.value)}
                                        aria_invalid={validMaximumPower ? "false" : "true"}
                                        aria_describedby="maximumPowerNote"
                                        onFocus={()=>setMaximumPowerFocus(true)}
                                        onBlur={()=>setMaximumPowerFocus(false)}
                                        focusValue={maximumPowerFocus}
                                        validValue={validMaximumPower}
                                        errorMesg="Only positive numbers are allowed."
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

export default InverterModuleUpdateModal;