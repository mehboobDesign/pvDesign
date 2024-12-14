import React, { useState, useRef, useEffect } from "react";
import { faFileExport, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_REGEX, NUMBER_DECIMAL, ALPHA_NUMERIC, DOUBLE_TYPE
,ONLY_INTEGER } from '../../Common/ValidationConstants';
import Axios from "../../../api/Axios";
import AlertModal from "../../Common/Modal/AlertModal";
import Label from "../../Common/Label";
import Input from "../../Common/Input";

const CREATE_INVERTER_MODULE = 'inverter/create';

const CreateInverterModule = () => {
    const userRef = useRef();

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

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [alertModalOpen, setAlertModalOpen] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[]);
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
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(inverterType);
        const v2 = USER_REGEX.test(manufacturerName);
        const v3 = ALPHA_NUMERIC.test(modelName);
        const v4 = DOUBLE_TYPE.test(maxPv);
        const v5 = NUMBER_DECIMAL.test(minPv);
        const v6 = DOUBLE_TYPE.test(nominalPv);
        const v7 = ONLY_INTEGER.test(mppStart);
        const v8 = ONLY_INTEGER.test(mppEnd);
        const v9 = ONLY_INTEGER.test(mppPowerStart);
        const v10 = ONLY_INTEGER.test(mppPowerEnd);
        const v11 = ONLY_INTEGER.test(mppInputs);
        const v12 = ONLY_INTEGER.test(maxConnector);
        const v13 = ONLY_INTEGER.test(maxCurrent);
        const v14 = ONLY_INTEGER.test(maxIsc);
        const v15 = ONLY_INTEGER.test(opPower);
        const v16 = ONLY_INTEGER.test(opCurrent);
        const v17 = ONLY_INTEGER.test(acStart);
        const v18 = ONLY_INTEGER.test(acEnd);
        const v19 = ONLY_INTEGER.test(unitNomPower);
        const v20 = ONLY_INTEGER.test(numberOfInverters);
        const v21 = ONLY_INTEGER.test(totalPower);
        const v22 = ONLY_INTEGER.test(maximumPower);
        
        if(!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7 || 
            !v8 || !v9 || !v10 || !v11 || !v12 || !v13 || !v14 ||
             !v15 || !v16 || !v17 || !v18 || !v19 || !v20 || 
             !v21 || !v22) {
                setAlertModalOpen(true);
                return;
        }
        Axios.post(CREATE_INVERTER_MODULE, {
            type: inverterType,
            manufacturer: manufacturerName,
            model: modelName,
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
            total_power: totalPower,
            max_power: maximumPower,
          })
          .then(function (response) {
            setMessage(response.data.message);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setManufacturerName('');
                setModelName('');
                setUnitNomPower('');
                setNumberOfInverters('');
                setMaximumPower('');
                setTotalPower('');
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
        <form className="w-full" onSubmit={handleSubmit} id="create_inverter_module">
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="inverter_type" nameOfLabel="Inverter Type" validRule={validInverterType} nameOfState={inverterType}/>
                <input 
                    className="bg-slate-100 w-full dark:bg-slate-200 p-2 rounded-lg text-slate-800 focus:outline-none" 
                    id="inverter_type" 
                    type="text"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=>setInverterType(e.target.value)}
                    required
                    aria-invalid={validInverterType ? "false" : "true"}
                    aria-describedby="inverterTypeNote"
                    onFocus={()=>setInverterTypeFocus(true)}
                    onBlur={()=>setInverterTypeFocus(false)}
                />
                <p id="inverterTypeNote" className={inverterTypeFocus && inverterType && !validInverterType
                ? "text-red-400" : "hidden"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters. 
                    Must begin with a letter. 
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="manufacturerName" nameOfLabel="Manufacturer Name" validRule={validManufacturerName} nameOfState={manufacturerName}/>
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
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="max_pv" nameOfLabel="Max PV input Voltage" validRule={validMaxPv} nameOfState={maxPv}/>
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
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="min_pv" nameOfLabel="Min PV input Voltage" validRule={validMinPv} nameOfState={minPv}/>
                <Input id="min_pv" value={minPv} autoComplete="off" 
                    onChange={(e)=>setMinPv(e.target.value)}
                    aria_invalid={validMinPv ? "false" : "true"}
                    aria_describedby="minPvNote"
                    onFocus={()=>setMinPvFocus(true)}
                    onBlur={()=>setMinPvFocus(false)}
                    focusValue={minPvFocus}
                    validValue={validMinPv}
                    errorMesg="Only numbers allowed with decimal upto two."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="nominal_pv" nameOfLabel="Nominal Pv Input Voltage" validRule={validNominalPv} nameOfState={nominalPv}/>
                <Input id="nominal_pv" value={nominalPv} autoComplete="off" 
                    onChange={(e)=>setNominalPv(e.target.value)}
                    aria_invalid={validNominalPv ? "false" : "true"}
                    aria_describedby="nominalPvNote"
                    onFocus={()=>setNominalPvFocus(true)}
                    onBlur={()=>setNominalPvFocus(false)}
                    focusValue={nominalPvFocus}
                    validValue={validNominalPv}
                    errorMesg="Only numbers allowed with decimal or not."
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="mpp_start" nameOfLabel="MPP Voltage Range Start" validRule={validMppStart} nameOfState={mppStart}/>
                <Input id="mpp_start" value={mppStart} autoComplete="off" 
                    onChange={(e)=>setMppStart(e.target.value)}
                    aria_invalid={validMppStart ? "false" : "true"}
                    aria_describedby="mppStartNote"
                    onFocus={()=>setMppStartFocus(true)}
                    onBlur={()=>setMppStartFocus(false)}
                    focusValue={mppStartFocus}
                    validValue={validMppStart}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="mpp_end" nameOfLabel="MPP Voltage Range End" validRule={validMppEnd} nameOfState={mppEnd}/>
                <Input id="mpp_end" value={mppEnd} autoComplete="off" 
                    onChange={(e)=>setMppEnd(e.target.value)}
                    aria_invalid={validMppEnd ? "false" : "true"}
                    aria_describedby="mppEndNote"
                    onFocus={()=>setMppEndFocus(true)}
                    onBlur={()=>setMppEndFocus(false)}
                    focusValue={mppEndFocus}
                    validValue={validMppEnd}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="mpp_power_start" nameOfLabel="MPP Voltage Range Nominal Power Start" validRule={validMppPowerStart} nameOfState={mppPowerStart}/>
                <Input id="mpp_power_start" value={mppPowerStart} autoComplete="off" 
                    onChange={(e)=>setMppPowerStart(e.target.value)}
                    aria_invalid={validMppPowerStart ? "false" : "true"}
                    aria_describedby="mppPowerStartNote"
                    onFocus={()=>setMppPowerStartFocus(true)}
                    onBlur={()=>setMppPowerStartFocus(false)}
                    focusValue={mppPowerStartFocus}
                    validValue={validMppPowerStart}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="mpp_power_end" nameOfLabel="MPP Voltage Range Nominal Power End" validRule={validMppPowerEnd} nameOfState={mppPowerEnd}/>
                <Input id="mpp_power_end" value={mppPowerEnd} autoComplete="off" 
                    onChange={(e)=>setMppPowerEnd(e.target.value)}
                    aria_invalid={validMppPowerEnd ? "false" : "true"}
                    aria_describedby="mppPowerEndNote"
                    onFocus={()=>setMppPowerEndFocus(true)}
                    onBlur={()=>setMppPowerEndFocus(false)}
                    focusValue={mppPowerEndFocus}
                    validValue={validMppPowerEnd}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="mpp_inputs" nameOfLabel="Number of MPP Inputs" validRule={validMppInputs} nameOfState={mppInputs}/>
                <Input id="mpp_inputs" value={mppInputs} autoComplete="off" 
                    onChange={(e)=>setMppInputs(e.target.value)}
                    aria_invalid={validMppInputs ? "false" : "true"}
                    aria_describedby="mppInputsNote"
                    onFocus={()=>setMppInputsFocus(true)}
                    onBlur={()=>setMppInputsFocus(false)}
                    focusValue={mppInputsFocus}
                    validValue={validMppInputs}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="max_connector" nameOfLabel="Max no input connector" validRule={validMaxConnector} nameOfState={maxConnector}/>
                <Input id="max_connector" value={maxConnector} autoComplete="off" 
                    onChange={(e)=>setMaxConnector(e.target.value)}
                    aria_invalid={validMaxConnector ? "false" : "true"}
                    aria_describedby="mppConnectorNote"
                    onFocus={()=>setMaxConnectorFocus(true)}
                    onBlur={()=>setMaxConnectorFocus(false)}
                    focusValue={maxConnectorFocus}
                    validValue={validMaxConnector}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="max_current" nameOfLabel="Max PV input current" validRule={validMaxCurrent} nameOfState={maxCurrent}/>
                <Input id="max_current" value={maxCurrent} autoComplete="off" 
                    onChange={(e)=>setMaxCurrent(e.target.value)}
                    aria_invalid={validMaxCurrent ? "false" : "true"}
                    aria_describedby="mppCurrentNote"
                    onFocus={()=>setMaxCurrentFocus(true)}
                    onBlur={()=>setMaxCurrentFocus(false)}
                    focusValue={maxCurrentFocus}
                    validValue={validMaxCurrent}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="max_isc" nameOfLabel="Max DC ISC" validRule={validMaxIsc} nameOfState={maxIsc}/>
                <Input id="max_isc" value={maxIsc} autoComplete="off" 
                    onChange={(e)=>setMaxIsc(e.target.value)}
                    aria_invalid={validMaxIsc ? "false" : "true"}
                    aria_describedby="maxIscNote"
                    onFocus={()=>setMaxIscFocus(true)}
                    onBlur={()=>setMaxIscFocus(false)}
                    focusValue={maxIscFocus}
                    validValue={validMaxIsc}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="op_power" nameOfLabel="AC OP Power" validRule={validOpPower} nameOfState={opPower}/>
                <Input id="op_power" value={opPower} autoComplete="off" 
                    onChange={(e)=>setOpPower(e.target.value)}
                    aria_invalid={validOpPower ? "false" : "true"}
                    aria_describedby="opPowerNote"
                    onFocus={()=>setOpPowerFocus(true)}
                    onBlur={()=>setOpPowerFocus(false)}
                    focusValue={opPowerFocus}
                    validValue={validOpPower}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="op_current" nameOfLabel="Max AC OP Current" validRule={validOpCurrent} nameOfState={opCurrent}/>
                <Input id="op_current" value={opCurrent} autoComplete="off" 
                    onChange={(e)=>setOpCurrent(e.target.value)}
                    aria_invalid={validOpCurrent ? "false" : "true"}
                    aria_describedby="opCurrentNote"
                    onFocus={()=>setOpCurrentFocus(true)}
                    onBlur={()=>setOpCurrentFocus(false)}
                    focusValue={opCurrentFocus}
                    validValue={validOpCurrent}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="ac_start" nameOfLabel="AC Voltage Range Start" validRule={validAcStart} nameOfState={acStart}/>
                <Input id="ac_start" value={acStart} autoComplete="off" 
                    onChange={(e)=>setAcStart(e.target.value)}
                    aria_invalid={validAcStart ? "false" : "true"}
                    aria_describedby="acStartNote"
                    onFocus={()=>setAcStartFocus(true)}
                    onBlur={()=>setAcStartFocus(false)}
                    focusValue={acStartFocus}
                    validValue={validAcStart}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="ac_end" nameOfLabel="AC Voltage Range End" validRule={validAcEnd} nameOfState={acEnd}/>
                <Input id="ac_end" value={acEnd} autoComplete="off" 
                    onChange={(e)=>setAcEnd(e.target.value)}
                    aria_invalid={validAcEnd ? "false" : "true"}
                    aria_describedby="acEndNote"
                    onFocus={()=>setAcEndFocus(true)}
                    onBlur={()=>setAcEndFocus(false)}
                    focusValue={acEndFocus}
                    validValue={validAcEnd}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
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
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="numberOfInverters" nameOfLabel="Number of Inverters" validRule={validNumberOfInverters} nameOfState={numberOfInverters}/>
                <Input id="numberOfInverters" value={numberOfInverters} autoComplete="off" 
                    onChange={(e)=>setNumberOfInverters(e.target.value)}
                    aria_invalid={validNumberOfInverters ? "false" : "true"}
                    aria_describedby="numberOfInvertersNote"
                    onFocus={()=>setNumberOfInvertersFocus(true)}
                    onBlur={()=>setNumberOfInvertersFocus(false)}
                    focusValue={numberOfInvertersFocus}
                    validValue={validNumberOfInverters}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="total_power" nameOfLabel="Total Power" validRule={validTotalPower} nameOfState={totalPower}/>
                <Input id="total_power" value={totalPower} autoComplete="off" 
                    onChange={(e)=>setTotalPower(e.target.value)}
                    aria_invalid={validTotalPower ? "false" : "true"}
                    aria_describedby="totalPowerNote"
                    onFocus={()=>setTotalPowerFocus(true)}
                    onBlur={()=>setTotalPowerFocus(false)}
                    focusValue={totalPowerFocus}
                    validValue={validTotalPower}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
                <Label htmlFor="maximum_power" nameOfLabel="Maximum Power" validRule={validMaximumPower} nameOfState={maximumPower}/>
                <Input id="maximum_power" value={maximumPower} autoComplete="off" 
                    onChange={(e)=>setMaximumPower(e.target.value)}
                    aria_invalid={validMaximumPower ? "false" : "true"}
                    aria_describedby="maximumPowerNote"
                    onFocus={()=>setMaximumPowerFocus(true)}
                    onBlur={()=>setMaximumPowerFocus(false)}
                    focusValue={maximumPowerFocus}
                    validValue={validMaximumPower}
                    errorMesg="Only positive numbers allowed."
                />
            </div>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <FontAwesomeIcon className="p-2" icon={faFileExport} size="1x" />
                <span>Create Inverter Module</span>
        </button>
    </form>
        }
         <AlertModal modalOpen={alertModalOpen} onClose={()=>setAlertModalOpen(false)}>
                <div className='text-center w-96'>
                  <h3 className='text-lg font-black text-red-600 p-4'>Opps! Invalid Entries</h3>
                  <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>Please cross verify the input fileds!</p>
                  <div className='flex gap-4 justify-center items-center'>
                    <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 w-1/2 p-2" onClick={()=>setAlertModalOpen(false)}>OK</button>
                  </div>
                </div>
        </AlertModal>
    </>
    );
}
export default CreateInverterModule;