import React, { useState, useEffect } from "react";
import Axios from "../../../api/Axios";
import { USER_REGEX, ALPHA_NUMERIC, ONLY_NUMBER, NUMBER_DECIMAL, ONLY_INTEGER } from '../../Common/ValidationConstants';
//import { useNavigate, useLocation } from "react-router-dom";
import Label from "../Label";
import Input from "../Input";
import AlertModal from "./AlertModal";

const GET_PV_MODULE_BY_ID = 'pvmodules/';
const UPDATE_PV_MODULE = 'pvmodules/';


const PvModuleUpdateModal = ({ modalOpen, onClose, dataId, setUpdating }) => {

    //const navigate = useNavigate();
    //const location = useLocation();
    //const from = location.state?.form?.pathname;

    const [manufacturer, setManufacturer] = useState('');
    const [validManufacturer, setValidManufacturer] = useState(false);
    const [manufacturerFocus, setManufacturerFocus] = useState(false);

    const [modelName, setModelName] = useState('');
    const [validModelName, setValidModelName] = useState(false);
    const [modelNameFocus, setModelNameFocus] = useState(false);

    const [pvType, setPvType] = useState('');
    const [validPvType, setValidPvType] = useState(false);
    const [pvTypeFocus, setPvTypeFocus] = useState(false);

    const [lightInDeg, setLightInDeg] = useState('');
    const [validLightInDeg, setValidLightInDeg] = useState(false);
    const [lightInDegFocus, setLightInDegFocus] = useState(false);

    const [pw, setPw] = useState('');
    const [validPw, setValidPw] = useState(false);
    const [pwFocus, setPwFocus] = useState(false);

    const [voc, setVoc] = useState('');
    const [validVoc, setValidVoc] = useState(false);
    const [vocFocus, setVocFocus] = useState(false);

    const [currentShort, setCurrentShort] = useState('');
    const [validCurrentShort, setValidCurrentShort] = useState(false);
    const [currentShortFocus, setCurrentShortFocus] = useState(false);

    const [backIrr, setBackIrr] = useState('');
    const [validBackIrr, setValidBackIrr] = useState(false);
    const [backIrrFocus, setBackIrrFocus] = useState(false);

    const [mismatchLoss, setMismatchLoss] = useState('');
    const [validMismatchLoss, setValidMismatchLoss] = useState(false);
    const [mismatchLossFocus, setMismatchLossFocus] = useState(false);

    const [degradationLoss, setDegradationLoss] = useState('');
    const [validDegradationLoss, setValidDegradationLoss] = useState(false);
    const [degradationLossFocus, setDegradationLossFocus] = useState(false);

    const [qualityLoss, setQualityLoss] = useState('');
    const [validQualityLoss, setValidQualityLoss] = useState(false);
    const [qualityLossFocus, setQualityLossFocus] = useState(false);

    const [modulesSeries, setModulesSeries] = useState('');
    const [validModulesSeries, setValidModulesSeries] = useState(false);
    const [modulesSeriesFocus, setModulesSeriesFocus] = useState(false);

    const [modulesStrings, setModulesStrings] = useState('');
    const [validModulesStrings, setValidModulesStrings] = useState(false);
    const [modulesStringsFocus, setModulesStringsFocus] = useState(false);

    const [ohmicWiLoss, setOhmicWiLoss] = useState('');
    const [validOhmicWiLoss, setValidOhmicWiLoss] = useState(false);
    const [ohmicWiLossFocus, setOhmicWiLossFocus] = useState(false);

    const [pvLossIrr, setPvLossIrr] = useState('');
    const [validPvLossIrr, setValidPvLossIrr] = useState(false);
    const [pvLossIrrFocus, setPvLossIrrFocus] = useState(false);

    const [pvLossTemp, setPvLossTemp] = useState('');
    const [validPvLossTemp, setValidPvLossTemp] = useState(false);
    const [pvLossTempFocus, setPvLossTempFocus] = useState(false);

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

    const [maxPowerVoltage, setMaxPowerVoltage] = useState('');
    const [validMaxPowerVoltage, setValidMaxPowerVoltage] = useState(false);
    const [maxPowerVoltageFocus, setMaxPowerVoltageFocus] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    useEffect(() => {
        const result = USER_REGEX.test(manufacturer);
        setValidManufacturer(result);
    }, [manufacturer]);

    useEffect(() => {
        const result = ALPHA_NUMERIC.test(modelName);
        setValidModelName(result);
    }, [modelName]);

    useEffect(() => {
        const result = USER_REGEX.test(pvType);
        setValidPvType(result);
    }, [pvType]);

    useEffect(() => {
        const result = ONLY_INTEGER.test(lightInDeg);
        setValidLightInDeg(result);
    }, [lightInDeg]);

    useEffect(() => {
        const result = ONLY_INTEGER.test(pw);
        setValidPw(result);
    }, [pw]);

    useEffect(() => {
        const result = NUMBER_DECIMAL.test(voc);
        setValidVoc(result);
    }, [voc]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(currentShort);
        setValidCurrentShort(result);
    }, [currentShort]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(backIrr);
        setValidBackIrr(result);
    }, [backIrr]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(mismatchLoss);
        setValidMismatchLoss(result);
    }, [mismatchLoss]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(degradationLoss);
        setValidDegradationLoss(result);
    }, [degradationLoss]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(qualityLoss);
        setValidQualityLoss(result);
    }, [qualityLoss]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(modulesSeries);
        setValidModulesSeries(result);
    }, [modulesSeries]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(modulesStrings);
        setValidModulesStrings(result);
    }, [modulesStrings]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(ohmicWiLoss)
        setValidOhmicWiLoss(result);
    }, [ohmicWiLoss]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(pvLossIrr);
        setValidPvLossIrr(result);
    }, [pvLossIrr]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(pvLossTemp);
        setValidPvLossTemp(result);
    }, [pvLossTemp]);

    useEffect(() => {
        const result = NUMBER_DECIMAL.test(maxPowerCurrent);
        setValidMaxPowerCurrent(result);
    }, [maxPowerCurrent]);

    useEffect(() => {
        const result = NUMBER_DECIMAL.test(tempPmax);
        setValidTempPmax(result);
    }, [tempPmax]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(tempVoc);
        setValidTempVoc(result);
    }, [tempVoc]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(tempIsc);
        setValidTempIsc(result);
    }, [tempIsc]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(moduleLength);
        setValidModuleLength(result);
    }, [moduleLength]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(moduleBreadth);
        setValidModuleBreadth(result);
    }, [moduleBreadth]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(moduleThickness);
        setValidModuleThickness(result);
    }, [moduleThickness]);

    useEffect(() => {
        const result = ONLY_NUMBER.test(unitNomPower);
        setValidUnitNomPower(result);
    }, [unitNomPower]);

    useEffect(() => {
        const result = NUMBER_DECIMAL.test(maxPowerVoltage);
        setValidMaxPowerVoltage(result);
    }, [maxPowerVoltage]);

    useEffect(() => {
        const showData = async () => {
            await Axios.get(GET_PV_MODULE_BY_ID.concat(dataId))
                .then(function (response) {
                    setManufacturer(response.data.manufacturer);
                    setModelName(response.data.model);
                    setPvType(response.data.type);
                    setLightInDeg(response.data.lightInducedDegradation);
                    setPw(response.data.panel_wattage);
                    setVoc(response.data.voltage_open_circuit_voc);
                    setCurrentShort(response.data.current_short_circuit_isc);
                    setBackIrr(response.data.mismatchForBackIrradiance);
                    setMismatchLoss(response.data.mismatchLoss);
                    setDegradationLoss(response.data.moduleDegradationLoss);
                    setQualityLoss(response.data.moduleQualityLoss);
                    setModulesSeries(response.data.modules_in_series);
                    setModulesStrings(response.data.modules_in_strings);
                    setOhmicWiLoss(response.data.ohmicWiringLoss);
                    setPvLossIrr(response.data.pvLossDueToIrradiance);
                    setPvLossTemp(response.data.pvLossDueToTemperature);
                    setMaxPowerCurrent(response.data.max_power_current_impp);
                    setTempPmax(response.data.temp_coecient_of_pmax);
                    setTempVoc(response.data.temp_coecient_of_voc);
                    setTempIsc(response.data.temp_coecient_of_isc);
                    setModuleLength(response.data.module_length);
                    setModuleBreadth(response.data.module_breadth);
                    setModuleThickness(response.data.module_thickness);
                    setUnitNomPower(response.data.unitNomPower);
                    setMaxPowerVoltage(response.data.max_power_voltage_vmpp);
                }).catch(function (error) {
                    console.log(error);
                });
        };
        showData();
    }, [dataId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validManufacturer && validModelName && validPvType && validPw && validVoc &&
            validCurrentShort && validMaxPowerCurrent && validTempPmax && validTempVoc &&
            validTempIsc && validModuleLength && validModuleBreadth && validModuleThickness &&
            validUnitNomPower && validMaxPowerVoltage && validLightInDeg && validBackIrr
            && validMismatchLoss && validDegradationLoss && validQualityLoss && validModulesSeries
            && validModulesStrings && validOhmicWiLoss && validPvLossIrr && validPvLossTemp) {
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
                max_power_voltage_vmpp: maxPowerVoltage,
                lightInducedDegradation: lightInDeg,
                mismatchForBackIrradiance: backIrr,
                mismatchLoss: mismatchLoss,
                moduleDegradationLoss: degradationLoss,
                moduleQualityLoss: qualityLoss,
                modules_in_series: modulesSeries,
                modules_in_strings: modulesStrings,
                ohmicWiringLoss: ohmicWiLoss,
                pvLossDueToIrradiance: pvLossIrr,
                pvLossDueToTemperature: pvLossTemp,
            }
            try {
                const response = await Axios.put(UPDATE_PV_MODULE.concat(dataId), data);
                console.log(JSON.stringify(response?.data));
                //navigate(from, { replace: true });
                setSuccessAlert(true);
                onClose(true);
                //setUpdating(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            setErrorAlert(true);
        }
    };
    const resetForm = () => {
        setUpdating(true);
        setSuccessAlert(false);
    }

    return (
        <>
            <div className={`fixed inset-0 flex justify-center items-center transition-colors
                ${modalOpen ? "visible bg-black/50" : "invisible"}`}>
                <div onClick={(e) => e.stopPropagation()}
                    className={`bg-white shadow transition-all w-9/12
                ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"} mt-11`}>
                    {/* <button onClick={onClose} className="absolute top-2 right-2 p-2 font-bold text-gray-400 bg-white
                hover:bg-gray-50 hover:text-red-500">X</button> */}
                    <h3 className='text-lg text-center font-black text-gray-800 p-4 bg-slate-200'>Update PV Module Details</h3>
                    <form className="pt-2" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap p-3">
                            <div className="w-1/4 pr-2">
                                <Label htmlFor="manufacturer" nameOfLabel="Manufacturer" validRule={validManufacturer} nameOfState={manufacturer} />
                                <Input id="manufacturer" value={manufacturer} autoComplete="off"
                                    onChange={(e) => setManufacturer(e.target.value)}
                                    aria_invalid={validManufacturer ? "false" : "true"}
                                    aria_describedby="manufacturerNote"
                                    onFocus={() => setManufacturerFocus(true)}
                                    onBlur={() => setManufacturerFocus(false)}
                                    focusValue={manufacturerFocus}
                                    validValue={validManufacturer}
                                    errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2">
                                <Label htmlFor="pv_type" nameOfLabel="Pv Module Type" validRule={validPvType} nameOfState={pvType} />
                                <Input id="pv_type" value={pvType} autoComplete="off"
                                    onChange={(e) => setPvType(e.target.value)}
                                    aria_invalid={validPvType ? "false" : "true"}
                                    aria_describedby="pvTypeNote"
                                    onFocus={() => setPvTypeFocus(true)}
                                    onBlur={() => setPvTypeFocus(false)}
                                    focusValue={pvTypeFocus}
                                    validValue={validPvType}
                                    errorMesg="Atleast three character accepted."
                                />
                            </div>
                            <div className="w-1/4 pr-2">
                                <Label htmlFor="modelName" nameOfLabel="Model Name" validRule={validModelName} nameOfState={modelName} />
                                <Input id="modelName" value={modelName} autoComplete="off"
                                    onChange={(e) => setModelName(e.target.value)}
                                    aria_invalid={validModelName ? "false" : "true"}
                                    aria_describedby="modelNameNote"
                                    onFocus={() => setModelNameFocus(true)}
                                    onBlur={() => setModelNameFocus(false)}
                                    focusValue={modelNameFocus}
                                    validValue={validModelName}
                                    errorMesg="Atleast 3 characters to input."
                                />
                            </div>
                            <div className="w-1/4">
                                <Label htmlFor="lightInDeg" nameOfLabel="Light Induced Degradation" validRule={validLightInDeg} nameOfState={lightInDeg} />
                                <Input id="lightInDeg" value={lightInDeg} autoComplete="off"
                                    onChange={(e) => setLightInDeg(e.target.value)}
                                    aria_invalid={validLightInDeg ? "false" : "true"}
                                    aria_describedby="lightInDegNote"
                                    onFocus={() => setLightInDegFocus(true)}
                                    onBlur={() => setLightInDegFocus(false)}
                                    focusValue={lightInDegFocus}
                                    validValue={validLightInDeg}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="pw" nameOfLabel="Panel Wattage" validRule={validPw} nameOfState={pw} />
                                <Input id="pw" value={pw} autoComplete="off"
                                    onChange={(e) => setPw(e.target.value)}
                                    aria_invalid={validPw ? "false" : "true"}
                                    aria_describedby="pwNote"
                                    onFocus={() => setPwFocus(true)}
                                    onBlur={() => setPwFocus(false)}
                                    focusValue={pwFocus}
                                    validValue={validPw}
                                    errorMesg="Only integer number is accepted."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="voc" nameOfLabel="Voltage Open Circuit" validRule={validVoc} nameOfState={voc} />
                                <Input id="voc" value={voc} autoComplete="off"
                                    onChange={(e) => setVoc(e.target.value)}
                                    aria_invalid={validVoc ? "false" : "true"}
                                    aria_describedby="vocNote"
                                    onFocus={() => setVocFocus(true)}
                                    onBlur={() => setVocFocus(false)}
                                    focusValue={vocFocus}
                                    validValue={validVoc}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="current_short_circuit_isc" nameOfLabel="Current Short Circuit isc" validRule={validCurrentShort} nameOfState={currentShort} />
                                <Input id="current_short_circuit_isc" value={currentShort} autoComplete="off"
                                    onChange={(e) => setCurrentShort(e.target.value)}
                                    aria_invalid={validCurrentShort ? "false" : "true"}
                                    aria_describedby="currentShortNote"
                                    onFocus={() => setCurrentShortFocus(true)}
                                    onBlur={() => setCurrentShortFocus(false)}
                                    focusValue={currentShortFocus}
                                    validValue={validCurrentShort}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 mt-3">
                                <Label htmlFor="back_irradiance" nameOfLabel="Mismatch for back Irradiance" validRule={validBackIrr} nameOfState={backIrr} />
                                <Input id="back_irradiance" value={backIrr} autoComplete="off"
                                    onChange={(e) => setBackIrr(e.target.value)}
                                    aria_invalid={validBackIrr ? "false" : "true"}
                                    aria_describedby="backIrrNote"
                                    onFocus={() => setBackIrrFocus(true)}
                                    onBlur={() => setBackIrrFocus(false)}
                                    focusValue={backIrrFocus}
                                    validValue={validBackIrr}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="mismatch_loss" nameOfLabel="Mismatch Loss" validRule={validMismatchLoss} nameOfState={mismatchLoss} />
                                <Input id="mismatch_loss" value={mismatchLoss} autoComplete="off"
                                    onChange={(e) => setMismatchLoss(e.target.value)}
                                    aria_invalid={validMismatchLoss ? "false" : "true"}
                                    aria_describedby="mismatchLossNote"
                                    onFocus={() => setMismatchLossFocus(true)}
                                    onBlur={() => setMismatchLossFocus(false)}
                                    focusValue={mismatchLossFocus}
                                    validValue={validMismatchLoss}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="degradation_loss" nameOfLabel="Module Degradation Loss" validRule={validDegradationLoss} nameOfState={degradationLoss} />
                                <Input id="degradation_loss" value={degradationLoss} autoComplete="off"
                                    onChange={(e) => setDegradationLoss(e.target.value)}
                                    aria_invalid={validDegradationLoss ? "false" : "true"}
                                    aria_describedby="degradationLossNote"
                                    onFocus={() => setDegradationLossFocus(true)}
                                    onBlur={() => setDegradationLossFocus(false)}
                                    focusValue={degradationLossFocus}
                                    validValue={validDegradationLoss}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="quality_loss" nameOfLabel="Module Quality Loss" validRule={validQualityLoss} nameOfState={qualityLoss} />
                                <Input id="quality_loss" value={qualityLoss} autoComplete="off"
                                    onChange={(e) => setQualityLoss(e.target.value)}
                                    aria_invalid={validQualityLoss ? "false" : "true"}
                                    aria_describedby="qualityLossNote"
                                    onFocus={() => setQualityLossFocus(true)}
                                    onBlur={() => setQualityLossFocus(false)}
                                    focusValue={qualityLossFocus}
                                    validValue={validQualityLoss}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 mt-3">
                                <Label htmlFor="modules_series" nameOfLabel="Modules in Series" validRule={validModulesSeries} nameOfState={modulesSeries} />
                                <Input id="modules_series" value={modulesSeries} autoComplete="off"
                                    onChange={(e) => setModulesSeries(e.target.value)}
                                    aria_invalid={validModulesSeries ? "false" : "true"}
                                    aria_describedby="modulesSeriesNote"
                                    onFocus={() => setModulesSeriesFocus(true)}
                                    onBlur={() => setModulesSeriesFocus(false)}
                                    focusValue={modulesSeriesFocus}
                                    validValue={validModulesSeries}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="modules_strings" nameOfLabel="Modules in Strings" validRule={validModulesStrings} nameOfState={modulesStrings} />
                                <Input id="modules_strings" value={modulesStrings} autoComplete="off"
                                    onChange={(e) => setModulesStrings(e.target.value)}
                                    aria_invalid={validModulesStrings ? "false" : "true"}
                                    aria_describedby="modulesStringsNote"
                                    onFocus={() => setModulesStringsFocus(true)}
                                    onBlur={() => setModulesStringsFocus(false)}
                                    focusValue={modulesStringsFocus}
                                    validValue={validModulesStrings}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="ohmic_wi_loss" nameOfLabel="Ohmic Wiring Loss" validRule={validOhmicWiLoss} nameOfState={ohmicWiLoss} />
                                <Input id="ohmic_wi_loss" value={ohmicWiLoss} autoComplete="off"
                                    onChange={(e) => setOhmicWiLoss(e.target.value)}
                                    aria_invalid={validOhmicWiLoss ? "false" : "true"}
                                    aria_describedby="ohmicWiLossNote"
                                    onFocus={() => setOhmicWiLossFocus(true)}
                                    onBlur={() => setOhmicWiLossFocus(false)}
                                    focusValue={ohmicWiLossFocus}
                                    validValue={validOhmicWiLoss}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="pv_loss_irr" nameOfLabel="PV loss due to Irradiance" validRule={validPvLossIrr} nameOfState={pvLossIrr} />
                                <Input id="pv_loss_irr" value={pvLossIrr} autoComplete="off"
                                    onChange={(e) => setPvLossIrr(e.target.value)}
                                    aria_invalid={validPvLossIrr ? "false" : "true"}
                                    aria_describedby="pvLossIrrNote"
                                    onFocus={() => setPvLossIrrFocus(true)}
                                    onBlur={() => setPvLossIrrFocus(false)}
                                    focusValue={pvLossIrrFocus}
                                    validValue={validPvLossIrr}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 mt-3">
                                <Label htmlFor="pv_loss_temp" nameOfLabel="PV loss due to Temperature" validRule={validPvLossTemp} nameOfState={pvLossTemp} />
                                <Input id="pv_loss_temp" value={pvLossTemp} autoComplete="off"
                                    onChange={(e) => setPvLossTemp(e.target.value)}
                                    aria_invalid={validPvLossTemp ? "false" : "true"}
                                    aria_describedby="pvLossTempNote"
                                    onFocus={() => setPvLossTempFocus(true)}
                                    onBlur={() => setPvLossTempFocus(false)}
                                    focusValue={pvLossTempFocus}
                                    validValue={validPvLossTemp}
                                    errorMesg="Only positive integer number allowed."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="max_power_current" nameOfLabel="Max Power Current impp" validRule={validMaxPowerCurrent} nameOfState={maxPowerCurrent} />
                                <Input id="max_power_current" value={maxPowerCurrent} autoComplete="off"
                                    onChange={(e) => setMaxPowerCurrent(e.target.value)}
                                    aria_invalid={validMaxPowerCurrent ? "false" : "true"}
                                    aria_describedby="maxPowerCurrentNote"
                                    onFocus={() => setMaxPowerCurrentFocus(true)}
                                    onBlur={() => setMaxPowerCurrentFocus(false)}
                                    focusValue={maxPowerCurrentFocus}
                                    validValue={validMaxPowerCurrent}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="temp_pmax" nameOfLabel="Temp Coecient of PMAX" validRule={validTempPmax} nameOfState={tempPmax} />
                                <Input id="temp_pmax" value={tempPmax} autoComplete="off"
                                    onChange={(e) => setTempPmax(e.target.value)}
                                    aria_invalid={validTempPmax ? "false" : "true"}
                                    aria_describedby="tempPmaxNote"
                                    onFocus={() => setTempPmaxFocus(true)}
                                    onBlur={() => setTempPmaxFocus(false)}
                                    focusValue={tempPmaxFocus}
                                    validValue={validTempPmax}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="temp_voc" nameOfLabel="Temp Coecient of VOC" validRule={validTempVoc} nameOfState={tempVoc} />
                                <Input id="temp_voc" value={tempVoc} autoComplete="off"
                                    onChange={(e) => setTempVoc(e.target.value)}
                                    aria_invalid={validTempVoc ? "false" : "true"}
                                    aria_describedby="tempVocNote"
                                    onFocus={() => setTempVocFocus(true)}
                                    onBlur={() => setTempVocFocus(false)}
                                    focusValue={tempVocFocus}
                                    validValue={validTempVoc}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 mt-3">
                                <Label htmlFor="temp_isc" nameOfLabel="Temp Coecient of ISC" validRule={validTempIsc} nameOfState={tempIsc} />
                                <Input id="temp_isc" value={tempIsc} autoComplete="off"
                                    onChange={(e) => setTempIsc(e.target.value)}
                                    aria_invalid={validTempIsc ? "false" : "true"}
                                    aria_describedby="tempIscNote"
                                    onFocus={() => setTempIscFocus(true)}
                                    onBlur={() => setTempIscFocus(false)}
                                    focusValue={tempIscFocus}
                                    validValue={validTempIsc}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="module_length" nameOfLabel="Module Length" validRule={validModuleLength} nameOfState={moduleLength} />
                                <Input id="module_length" value={moduleLength} autoComplete="off"
                                    onChange={(e) => setModuleLength(e.target.value)}
                                    aria_invalid={validModuleLength ? "false" : "true"}
                                    aria_describedby="moduleLengthNote"
                                    onFocus={() => setModuleLengthFocus(true)}
                                    onBlur={() => setModuleLengthFocus(false)}
                                    focusValue={moduleLengthFocus}
                                    validValue={validModuleLength}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="module_breadth" nameOfLabel="Module Breadth" validRule={validModuleBreadth} nameOfState={moduleBreadth} />
                                <Input id="module_breadth" value={moduleBreadth} autoComplete="off"
                                    onChange={(e) => setModuleBreadth(e.target.value)}
                                    aria_invalid={validModuleBreadth ? "false" : "true"}
                                    aria_describedby="moduleBreadthNote"
                                    onFocus={() => setModuleBreadthFocus(true)}
                                    onBlur={() => setModuleBreadthFocus(false)}
                                    focusValue={moduleBreadthFocus}
                                    validValue={validModuleBreadth}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="module_thickness" nameOfLabel="Module Thickness" validRule={validModuleThickness} nameOfState={moduleThickness} />
                                <Input id="module_thickness" value={moduleThickness} autoComplete="off"
                                    onChange={(e) => setModuleThickness(e.target.value)}
                                    aria_invalid={validModuleThickness ? "false" : "true"}
                                    aria_describedby="moduleThicknessNote"
                                    onFocus={() => setModuleThicknessFocus(true)}
                                    onBlur={() => setModuleThicknessFocus(false)}
                                    focusValue={moduleThicknessFocus}
                                    validValue={validModuleThickness}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="w-1/4 mt-3">
                                <Label htmlFor="unitNomPower" nameOfLabel="Unit Nom Power" validRule={validUnitNomPower} nameOfState={unitNomPower} />
                                <Input id="unitNomPower" value={unitNomPower} autoComplete="off"
                                    onChange={(e) => setUnitNomPower(e.target.value)}
                                    aria_invalid={validUnitNomPower ? "false" : "true"}
                                    aria_describedby="unitNomPowerNote"
                                    onFocus={() => setUnitNomPowerFocus(true)}
                                    onBlur={() => setUnitNomPowerFocus(false)}
                                    focusValue={unitNomPowerFocus}
                                    validValue={validUnitNomPower}
                                    errorMesg="Only numbers accept with length of 3 to 24."
                                />
                            </div>
                            <div className="w-1/4 pr-2 mt-3">
                                <Label htmlFor="max_power_voltage_vmpp" nameOfLabel="Max Power Voltage vmpp" validRule={validMaxPowerVoltage} nameOfState={maxPowerVoltage} />
                                <Input id="max_power_voltage_vmpp" value={maxPowerVoltage} autoComplete="off"
                                    onChange={(e) => setMaxPowerVoltage(e.target.value)}
                                    aria_invalid={validMaxPowerVoltage ? "false" : "true"}
                                    aria_describedby="maxPowerVoltageNote"
                                    onFocus={() => setMaxPowerVoltageFocus(true)}
                                    onBlur={() => setMaxPowerVoltageFocus(false)}
                                    focusValue={maxPowerVoltageFocus}
                                    validValue={validMaxPowerVoltage}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                        </div>
                        <div className="p-4 sm:flex sm:flex-row-reverse sm:px-6 justify-center items-center border-t-2 border-slate-200 mt-2">
                            <button type="button" className="inline-flex w-full justify-center bg-gray-300 px-4 py-1 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto" onClick={onClose}>Cancel</button>
                            <button className="inline-flex w-full justify-center bg-green-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto">Update</button>
                        </div>
                    </form>
                </div>
            </div>
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

export default PvModuleUpdateModal;