import React, { useState, useRef, useEffect } from "react";
import { faFileExport, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_REGEX, ONLY_NUMBER, NUMBER_DECIMAL, ALPHA_NUMERIC } from '../../Common/ValidationConstants';
import Axios from "../../../api/Axios";

const CREATE_PV_MODULE = 'pvmodules/create';

const CreatePvModule = () => {
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

    const [numberOfModules, setNumberOfModules] = useState('');
    const [validNumberOfModules, setValidNumberOfModules] = useState(false);
    const [numberOfModulesFocus, setNumberOfModulesFocus] = useState(false);

    const [nominalSTC, setNominalSTC] = useState('');
    const [validNominalSTC, setValidNominalSTC] = useState(false);
    const [nominalSTCFocus, setNominalSTCFocus] = useState(false);

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
        const result = ONLY_NUMBER.test(numberOfModules);
        setValidNumberOfModules(result);
    },[numberOfModules]);
    useEffect(()=>{
        const result = NUMBER_DECIMAL.test(nominalSTC);
        setValidNominalSTC(result);
    },[nominalSTC]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(manufacturerName);
        const v2 = ALPHA_NUMERIC.test(modelName);
        const v3 = ONLY_NUMBER.test(unitNomPower);
        const v4 = ONLY_NUMBER.test(numberOfModules);
        const v5 = NUMBER_DECIMAL.test(nominalSTC)
        if(!v1 || !v2 || !v3 || !v4 || !v5) {
            //setErrMsg("Invalid Entry");
            alert("Invalid Entry");
            return;
        }
        Axios.post(CREATE_PV_MODULE, {
            manufacturer: manufacturerName,
            model: modelName,
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
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="numberOfModules">
                    Number of Modules
                    <span className={validNumberOfModules ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validNumberOfModules || !numberOfModules ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                 </label>
                 <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    id="numberOfModules" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setNumberOfModules(e.target.value)}
                    required
                    aria-invalid={validNumberOfModules ? "false" : "true"}
                    aria-describedby="numberOfModulesnote"
                    onFocus={()=>setNumberOfModulesFocus(true)}
                    onBlur={()=>setNumberOfModulesFocus(false)}
                    />
                     <p id="manufacturerNamenote" className={numberOfModulesFocus && numberOfModules && !validNumberOfModules
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    3 to 24 numbers are allowed
                </p>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="nominal_stc">
                Nominal_STC
                    <span className={validNominalSTC ? "text-green-400" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validNominalSTC || !nominalSTC ? "hidden" : "text-red-400"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                    id="nominal_stc" 
                    type="text"
                    autoComplete="off"
                    onChange={(e)=>setNominalSTC(e.target.value)}
                    required
                    aria-invalid={validNominalSTC ? "false" : "true"}
                    aria-describedby="nominalSTCnote"
                    onFocus={()=>setNominalSTCFocus(true)}
                    onBlur={()=>setNominalSTCFocus(false)}
                />
                 <p id="manufacturerNamenote" className={nominalSTCFocus && nominalSTC && !validNominalSTC
                ? "text-red-400" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    2 to 6 numbers are allowed with decimal upto two digit
                </p>
            </div>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <FontAwesomeIcon className="p-2" icon={faFileExport} size="1x" />
                <span>Create PV Module</span>
        </button>
    </form>
        }
    </>
    );
}
export default CreatePvModule;