import React, { useState, useEffect} from "react";
import Axios from "../../../api/Axios";
import { USER_REGEX, ALPHA_NUMERIC, ONLY_NUMBER, NUMBER_DECIMAL } from '../../Common/ValidationConstants';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useNavigate, useLocation } from "react-router-dom";

const GET_INVERTER_MODULE_BY_ID = 'inverter/';
const UPDATE_INVERTER_MODULE = 'inverter/update/';


const InverterModuleUpdateModal = ({closeModal, dataId, setUpdating}) => { console.log(dataId);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.form?.pathname; 

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
    
    useEffect(()=>{
            const showData = async () => {  
                    await Axios.get(GET_INVERTER_MODULE_BY_ID.concat(dataId))
                    .then(function (response) {
                        setManufacturerName(response.data.manufacturer);
                       setModelName(response.data.model);
                       setUnitNomPower(response.data.unit_nom_power);
                       setNumberOfInverters(response.data.no_inverters);
                       setMaximumPower(response.data.max_power);
                       setOperatingVoltageRange(response.data.operating_voltage_range);
                       setTotalPower(response.data.total_power);
                    }).catch(function (error) {
                        console.log(error);
                      });
                  }; 
               
        showData();
    },[dataId]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if(validManufacturerName && validModelName && validUnitNomPower && 
            validNumberOfInverters && validMaximumPower 
            && validOperatingVoltageRange && validTotalPower){
        const data = {
            manufacturer: manufacturerName,
            model: modelName,
            unit_nom_power: unitNomPower,
            no_inverters: numberOfInverters,
            max_power: maximumPower,
            operating_voltage_range: operatingVoltageRange,
            total_power: totalPower
        }
        try {
            const response = await Axios.put(UPDATE_INVERTER_MODULE.concat(dataId), data);
            console.log(JSON.stringify(response?.data));
            navigate( from, { replace: true});
            closeModal();
            setUpdating(true);
          } catch(err) { 
           console.log(err);
          }
    } else {
        // Swal.fire({
        //     title: "Please fill up the fields!",
        //     icon: "warning",
        //     confirmButtonColor:"#3085d6",
        //     confirmButtonText:"OK"
        // })
        alert('Eneke Nohobo');
    }    
      }
    
    return(
        <>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start pt-2">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-slate-700 sm:mx-0 sm:h-10 sm:w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-none dark:fill-slate-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="font-semibold text-xl leading-6 text-gray-900 dark:text-slate-300 pb-4" id="modal-title">Update Inverter Module Details</h3>
                                <hr/>
                                
                            <form className="pt-3" onSubmit={handleSubmit}>
                                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="manufacturer">
                                    Manufacturer
                                        <span className={validManufacturerName ? "text-green-400" : "hidden"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validManufacturerName || !manufacturerName ? "hidden" : "text-red-400"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                </label>
                                <input
                                    className="bg-slate-100 w-96 dark:bg-slate-700 p-2 rounded-lg text-gray-400 focus:outline-none"
                                    type="text"
                                    id="manufacturer"
                                    value={manufacturerName}
                                    autoComplete="off"
                                    onChange={(e)=>setManufacturerName(e.target.value)}
                                    required
                                    aria-invalid={validManufacturerName ? "false" : "true"}
                                    aria-describedby="manufacturerNote"
                                    onFocus={()=>setManufacturerNameFocus(true)}
                                    onBlur={()=>setManufacturerNameFocus(false)}
                                />
                                <p id="manufacturerNote" className={manufacturerNameFocus && !validManufacturerName
                                    ? "text-red-400" : "hidden"}>
                                      4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                                </p>
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
                                className="bg-slate-100 w-96 dark:bg-slate-700 p-2 rounded-lg text-gray-400 focus:outline-none" 
                                id="maximum_power" 
                                type="text"
                                value={maximumPower}
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
                                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2 mt-2" htmlFor="modelName">
                                    Model Name
                                        <span className={validModelName ? "text-green-400" : "hidden"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validModelName || !modelName ? "hidden" : "text-red-400"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                </label>
                                <input
                                    className="bg-slate-100 w-96 dark:bg-slate-700 p-2 rounded-lg text-gray-400 focus:outline-none"
                                    type="text"
                                    id="modelName"
                                    value={modelName}
                                    autoComplete="off"
                                    onChange={(e)=>setModelName(e.target.value)}
                                    required
                                    aria-invalid={validModelName ? "false" : "true"}
                                    aria-describedby="modelNameNote"
                                    onFocus={()=>setModelNameFocus(true)}
                                    onBlur={()=>setModelNameFocus(false)}
                                />
                                <p id="modelNameNote" className={modelNameFocus && !validModelName
                                    ? "text-red-400" : "hidden"}>
                                     Atleast 3 characters to input.
                                </p>
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
                                    className="bg-slate-100 w-96 dark:bg-slate-700 p-2 rounded-lg text-gray-400 focus:outline-none" 
                                    id="numberOfInverters" 
                                    type="text"
                                    value={numberOfInverters}
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
                                    className="bg-slate-100 w-96 dark:bg-slate-700 p-2 rounded-lg text-gray-400 focus:outline-none" 
                                    id="operating_voltage_range" 
                                    type="text"
                                    value={operatingVoltageRange}
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
                                    className="bg-slate-100 w-96 dark:bg-slate-700 p-2 rounded-lg text-gray-400 focus:outline-none" 
                                    id="total_power" 
                                    type="text"
                                    autoComplete="off"
                                    value={totalPower}
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
                                <label className="block tracking-wide text-gray-700 text-md font-bold mb-2 mt-2" htmlFor="unitNomPower">
                                    Unit Nom Power
                                        <span className={validUnitNomPower ? "text-green-400" : "hidden"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validUnitNomPower || !unitNomPower ? "hidden" : "text-red-400"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                </label>
                                <input
                                    className="bg-slate-100 w-96 dark:bg-slate-700 p-2 rounded-lg text-gray-400 focus:outline-none"
                                    type="text"
                                    id="unitNomPower"
                                    value={unitNomPower}
                                    autoComplete="off"
                                    onChange={(e)=>setUnitNomPower(e.target.value)}
                                    required
                                    aria-invalid={validUnitNomPower ? "false" : "true"}
                                    aria-describedby="unitNomPowerNote"
                                    onFocus={()=>setUnitNomPowerFocus(true)}
                                    onBlur={()=>setUnitNomPowerFocus(false)}
                                />
                                <p id="unitNomPowerNote" className={unitNomPowerFocus && !validUnitNomPower
                                    ? "text-red-400" : "hidden"}>
                                     Only numbers accept with length of 3 to 24.
                                </p>
                                <hr/>  
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Update</button>
                                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeModal}>Cancel</button>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>
        </>
    );
}

export default InverterModuleUpdateModal;