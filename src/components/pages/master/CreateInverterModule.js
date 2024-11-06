import React, { useState, useRef, useEffect } from "react";
import { faFileExport, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_REGEX, ONLY_NUMBER, NUMBER_DECIMAL, ALPHA_NUMERIC } from '../../Common/ValidationConstants';
import Axios from "../../../api/Axios";

const CREATE_INVERTER_MODULE = 'inverter/create';

const CreateInverterModule = () => {
    const userRef = useRef();

    const [manufacturerName, setManufacturerName] = useState('');
    const [validManufacturerName, setValidManufacturerName] = useState(false);
    const [manufacturerNameFocus, setManufacturerNameFocus] = useState(false);

    const [modelName, setModelName] = useState('');
    const [validModelName, setValidModelName] = useState(false);
    const [modelNameFocus, setModelNameFocus] = useState(false);

    const [unitNomPower, setUnitNomPower] = useState('');
    const [validUnitNomPower, setValidUnitNomPower] = useState(false);
    const [unitNomPowerFocus, setUnitNomPowerFocus] = useState(false);

    const [numberOfInverters, setNumberOfInverters] = useState('');
    const [validNumberOfInverters, setValidNumberOfInverters] = useState(false);
    const [numberOfInvertersFocus, setNumberOfInvertersFocus] = useState(false);

    const [maximumPower, setMaximumPower] = useState('');
    const [validMaximumPower, setValidMaximumPower] = useState(false);
    const [maximumPowerFocus, setMaximumPowerFocus] = useState(false);

    const [operatingVoltageRange, setOperatingVoltageRange] = useState('');
    const [validOperatingVoltageRange, setValidOperatingVoltageRange] = useState(false);
    const [operatingVoltageRangeFocus, setOperatingVoltageRangeFocus] = useState(false);

    const [totalPower, setTotalPower] = useState('');
    const [validTotalPower, setValidTotalPower] = useState(false);
    const [totalPowerFocus, setTotalPowerFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

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
        const result = ONLY_NUMBER.test(unitNomPower);
        setValidUnitNomPower(result);
    },[unitNomPower]);
    useEffect(()=>{
        const result = ONLY_NUMBER.test(numberOfInverters);
        setValidNumberOfInverters(result);
    },[numberOfInverters]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(maximumPower);
        setValidMaximumPower(result);
    },[maximumPower]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(operatingVoltageRange);
        setValidOperatingVoltageRange(result);
    },[operatingVoltageRange]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(totalPower);
        setValidTotalPower(result);
    },[totalPower]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(manufacturerName);
        const v2 = ALPHA_NUMERIC.test(modelName);
        const v3 = ONLY_NUMBER.test(unitNomPower);
        const v4 = ONLY_NUMBER.test(numberOfInverters);
        const v5 = NUMBER_DECIMAL.test(maximumPower);
        const v6 = NUMBER_DECIMAL.test(operatingVoltageRange);
        const v7 = NUMBER_DECIMAL.test(totalPower);
        if(!v1 || !v2 || !v3 || !v4 || !v5 || !v6 || !v7) {
            //setErrMsg("Invalid Entry");
            alert("Invalid Entry");
            return;
        }
        Axios.post(CREATE_INVERTER_MODULE, {
            manufacturer: manufacturerName,
            model: modelName,
            unit_nom_power: unitNomPower,
            no_inverters: numberOfInverters,
            max_power: maximumPower,
            operating_voltage_range: operatingVoltageRange,
            total_power: totalPower
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
                setOperatingVoltageRange();
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
        <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="manufacturerName">
                Manufacturer Name
                    <span className={validManufacturerName ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validManufacturerName || !manufacturerName ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
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
            <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="modelName">
                    Model Name
                    <span className={validModelName ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validModelName || !modelName ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                 </label>
                 <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="modelName" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setModelName(e.target.value)}
                    required
                    aria-invalid={validModelName ? "false" : "true"}
                    aria-describedby="modelNamenote"
                    onFocus={()=>setModelNameFocus(true)}
                    onBlur={()=>setModelNameFocus(false)}
                 />
                 <p id="manufacturerNamenote" className={modelNameFocus && modelName && !validModelName
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. 
                        Must begin with a letter. 
                        Letters, numbers, underscores, hyphens allowed.
                </p>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="unitNomPower">
                Unit Nom Power
                    <span className={validUnitNomPower ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validUnitNomPower || !unitNomPower ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label> 
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="unitNomPower" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setUnitNomPower(e.target.value)}
                    required
                    aria-invalid={validUnitNomPower ? "false" : "true"}
                    aria-describedby="unitNomPowernote"
                    onFocus={()=>setUnitNomPowerFocus(true)}
                    onBlur={()=>setUnitNomPowerFocus(false)}
                    />
                 <p id="manufacturerNamenote" className={unitNomPowerFocus && unitNomPower && !validUnitNomPower
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    3 to 24 numbers are allowed
                </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="numberOfInverters">
                    Number of Inverters
                    <span className={validNumberOfInverters ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validNumberOfInverters || !numberOfInverters ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                 </label>
                 <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="numberOfInverters" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setNumberOfInverters(e.target.value)}
                    required
                    aria-invalid={validNumberOfInverters ? "false" : "true"}
                    aria-describedby="numberOfInvertersnote"
                    onFocus={()=>setNumberOfInvertersFocus(true)}
                    onBlur={()=>setNumberOfInvertersFocus(false)}
                    />
                     <p id="numberOfInvertersnote" className={numberOfInvertersFocus && numberOfInverters && !validNumberOfInverters
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    3 to 24 numbers are allowed
                </p>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="maximum_power">
                Maximum Power
                    <span className={validMaximumPower ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMaximumPower || !maximumPower ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="maximum_power" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setMaximumPower(e.target.value)}
                    required
                    aria-invalid={validMaximumPower ? "false" : "true"}
                    aria-describedby="maximumPowernote"
                    onFocus={()=>setMaximumPowerFocus(true)}
                    onBlur={()=>setMaximumPowerFocus(false)}
                />
                 <p id="maximumPowernote" className={maximumPowerFocus && maximumPower && !validMaximumPower
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    2 to 6 numbers are allowed with decimal upto two digit
                </p>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="operating_voltage_range">
                Operating Voltage Range
                    <span className={validOperatingVoltageRange ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validOperatingVoltageRange || !operatingVoltageRange ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="operating_voltage_range" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setOperatingVoltageRange(e.target.value)}
                    required
                    aria-invalid={validOperatingVoltageRange ? "false" : "true"}
                    aria-describedby="operatingVoltageRangenote"
                    onFocus={()=>setOperatingVoltageRangeFocus(true)}
                    onBlur={()=>setOperatingVoltageRangeFocus(false)}
                />
                 <p id="operatingVoltageRangenote" className={operatingVoltageRangeFocus && operatingVoltageRange && !validOperatingVoltageRange
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    2 to 6 numbers are allowed with decimal upto two digit
                </p>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="total_power">
                Total Power
                    <span className={validTotalPower ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validTotalPower || !totalPower ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="total_power" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setTotalPower(e.target.value)}
                    required
                    aria-invalid={validTotalPower ? "false" : "true"}
                    aria-describedby="totalPowernote"
                    onFocus={()=>setTotalPowerFocus(true)}
                    onBlur={()=>setTotalPowerFocus(false)}
                />
                 <p id="maximumPowernote" className={totalPowerFocus && totalPower && !validTotalPower
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    2 to 6 numbers are allowed with decimal upto two digit
                </p>
            </div>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <FontAwesomeIcon className="p-2" icon={faFileExport} size="1x" />
                <span>Create Inverter Module</span>
        </button>
    </form>
        }
    </>
    );
}
export default CreateInverterModule;