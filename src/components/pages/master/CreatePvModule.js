import React, { useState, useRef, useEffect } from "react";
import { faInfoCircle, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    USER_REGEX, ONLY_NUMBER, NUMBER_DECIMAL, ALPHA_NUMERIC
    , ONLY_INTEGER
} from '../../Common/ValidationConstants';
import Axios from "../../../api/Axios";
import AlertModal from "../../Common/Modal/AlertModal";
import Label from "../../Common/Label";
import Input from "../../Common/Input";
import Footer from "../../Common/Footer";

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

    const [lightInDeg, setLightInDeg] = useState('');
    const [validLightInDeg, setValidLightInDeg] = useState(false);
    const [lightInDegFocus, setLightInDegFocus] = useState(false);

    const [panelWattage, setPanelWattage] = useState('');
    const [validPanelWattage, setValidPanelWattage] = useState(false);
    const [panelWattageFocus, setPanelWattageFocus] = useState(false);

    const [voltageOpen, setVoltageOpen] = useState('');
    const [validVoltageOpen, setValidVoltageOpen] = useState(false);
    const [voltageOpenFocus, setVoltageOpenFocus] = useState(false);

    const [currentShort, setCurrentShort] = useState('');
    const [validCurrentShort, setValidCurrentShort] = useState(false);
    const [currentShortFocus, setCurrentShortFocus] = useState(false);

    const [backIrr, setBackIrr] = useState('');
    const [validBackIrr, setValidBackIrr] = useState(false);
    const [backIrrFocus, setBackIrrFocus] = useState(false);

    const [mismatchLoss, setMismatchLoss] = useState('');
    const [validMismatchLoss, setValidMismatchLoss] = useState(false);
    const [mismatchLossFocus, setMismatchLossFocus] = useState(false);

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

    const [moduleDeLoss, setModuleDeLoss] = useState('');
    const [validModuleDeLoss, setValidModuleDeLoss] = useState(false);
    const [moduleDeLossFocus, setModuleDeLossFocus] = useState(false);

    const [moduleQualityLoss, setModuleQualityLoss] = useState('');
    const [validModuleQualityLoss, setValidModuleQualityLoss] = useState(false);
    const [moduleQualityLossFocus, setModuleQualityLossFocus] = useState(false);

    const [moduleBreadth, setModuleBreadth] = useState('');
    const [validModuleBreadth, setValidModuleBreadth] = useState(false);
    const [moduleBreadthFocus, setModuleBreadthFocus] = useState(false);

    const [moduleThickness, setModuleThickness] = useState('');
    const [validModuleThickness, setValidModuleThickness] = useState(false);
    const [moduleThicknessFocus, setModuleThicknessFocus] = useState(false);

    const [unitNomPower, setUnitNomPower] = useState('');
    const [validUnitNomPower, setValidUnitNomPower] = useState(false);
    const [unitNomPowerFocus, setUnitNomPowerFocus] = useState(false);

    const [moduleSeries, setModuleSeries] = useState('');
    const [validModuleSeries, setValidModuleSeries] = useState(false);
    const [moduleSeriesFocus, setModuleSeriesFocus] = useState(false);

    const [moduleStrings, setModuleStrings] = useState('');
    const [validModuleStrings, setValidModuleStrings] = useState(false);
    const [moduleStringsFocus, setModuleStringsFocus] = useState(false);

    const [ohmicWiLoss, setOhmicWiLoss] = useState('');
    const [validOhmicWiLoss, setValidOhmicWiLoss] = useState(false);
    const [ohmicWiLossFocus, setOhmicWiLossFocus] = useState(false);

    const [pvLossIrr, setPvLossIrr] = useState('');
    const [validPvLossIrr, setValidPvLossIrr] = useState(false);
    const [pvLossIrrFocus, setPvLossIrrFocus] = useState(false);

    const [pvLossTemp, setPvLossTemp] = useState('');
    const [validPvLossTemp, setValidPvLossTemp] = useState(false);
    const [pvLossTempFocus, setPvLossTempFocus] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        const result = USER_REGEX.test(manufacturerName);
        setValidManufacturerName(result);
    }, [manufacturerName]);
    useEffect(() => {
        const result = ALPHA_NUMERIC.test(modelName);
        setValidModelName(result);
    }, [modelName]);
    useEffect(() => {
        const result = USER_REGEX.test(type);
        setValidType(result);
    }, [type]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(lightInDeg);
        setValidLightInDeg(result);
    }, [lightInDeg]);
    useEffect(() => {
        const result = ALPHA_NUMERIC.test(panelWattage);
        setValidPanelWattage(result);
    }, [panelWattage]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(voltageOpen);
        setValidVoltageOpen(result);
    }, [voltageOpen]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(currentShort);
        setValidCurrentShort(result);
    }, [currentShort]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(backIrr);
        setValidBackIrr(result);
    }, [backIrr]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(mismatchLoss);
        setValidMismatchLoss(result);
    }, [mismatchLoss]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(maxPowerVoltage);
        setValidMaxPowerVoltage(result);
    }, [maxPowerVoltage]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(maxPowerCurrent);
        setValidMaxPowerCurrent(result);
    }, [maxPowerCurrent]);
    useEffect(() => {
        const result = ALPHA_NUMERIC.test(tempPmax);
        setValidTempPmax(result);
    }, [tempPmax]);
    useEffect(() => {
        const result = ALPHA_NUMERIC.test(tempVoc);
        setValidTempVoc(result);
    }, [tempVoc]);
    useEffect(() => {
        const result = ALPHA_NUMERIC.test(tempIsc);
        setValidTempIsc(result);
    }, [tempIsc]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(moduleLength);
        setValidModuleLength(result);
    }, [moduleLength]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(moduleDeLoss);
        setValidModuleDeLoss(result);
    }, [moduleDeLoss]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(moduleQualityLoss);
        setValidModuleQualityLoss(result);
    }, [moduleQualityLoss]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(moduleBreadth);
        setValidModuleBreadth(result);
    }, [moduleBreadth]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(moduleThickness);
        setValidModuleThickness(result);
    }, [moduleThickness]);
    useEffect(() => {
        const result = ONLY_NUMBER.test(unitNomPower);
        setValidUnitNomPower(result);
    }, [unitNomPower]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(moduleSeries);
        setValidModuleSeries(result);
    }, [moduleSeries]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(moduleStrings);
        setValidModuleStrings(result);
    }, [moduleStrings]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(ohmicWiLoss);
        setValidOhmicWiLoss(result);
    }, [ohmicWiLoss]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(pvLossIrr);
        setValidPvLossIrr(result);
    }, [pvLossIrr]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(pvLossTemp);
        setValidPvLossTemp(result);
    }, [pvLossTemp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validManufacturerName && validModelName && validType && validLightInDeg && validPanelWattage
            && validVoltageOpen && validCurrentShort && validBackIrr && validMismatchLoss
            && validMaxPowerVoltage && validMaxPowerCurrent && validTempPmax
            && validTempVoc && validTempIsc && validModuleLength && validModuleDeLoss
            && validModuleQualityLoss && validModuleBreadth && validModuleThickness
            && validUnitNomPower
            && validModuleSeries && validModuleStrings
            && validOhmicWiLoss && validPvLossIrr && validPvLossTemp) {
            const data = {
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
                lightInducedDegradation: lightInDeg,
                mismatchForBackIrradiance: backIrr,
                mismatchLoss: mismatchLoss,
                moduleDegradationLoss: moduleDeLoss,
                moduleQualityLoss: moduleQualityLoss,
                modules_in_series: moduleSeries,
                modules_in_strings: moduleStrings,
                ohmicWiringLoss: ohmicWiLoss,
                pvLossDueToIrradiance: pvLossIrr,
                pvLossDueToTemperature: pvLossTemp
            }
            try {
                const response = await Axios.post(CREATE_PV_MODULE, data);
                console.log(JSON.stringify(response?.data));
                setSuccessAlert(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            setErrorAlert(true);
        }
    }
    const resetForm = () => {
        setSuccessAlert(false);
    }

    return (
        <>
            <form className="w-full" onSubmit={handleSubmit} id="create_pv_module">
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="manufacturerName" nameOfLabel="Manufacturer Name" validRule={validManufacturerName} nameOfState={manufacturerName} />
                        <input
                            className="bg-gray-100 w-full dark:bg-gray-100 p-2 text-sm text-stone-800 focus:outline-none"
                            id="manufacturerName"
                            type="text"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setManufacturerName(e.target.value)}
                            required
                            aria-invalid={validManufacturerName ? "false" : "true"}
                            aria-describedby="manufacturerNamenote"
                            onFocus={() => setManufacturerNameFocus(true)}
                            onBlur={() => setManufacturerNameFocus(false)}
                        />
                        <p id="manufacturerNamenote" className={manufacturerNameFocus && manufacturerName && !validManufacturerName
                            ? "text-red-400" : "hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.
                            Must begin with a letter.
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="modelName" nameOfLabel="Model Name" validRule={validModelName} nameOfState={modelName} />
                        <Input id="modelName" value={modelName} autoComplete="off"
                            onChange={(e) => setModelName(e.target.value)}
                            aria_invalid={validModelName ? "false" : "true"}
                            aria_describedby="modelNameNote"
                            onFocus={() => setModelNameFocus(true)}
                            onBlur={() => setModelNameFocus(false)}
                            focusValue={modelNameFocus}
                            validValue={validModelName}
                            errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="type" nameOfLabel="Type" validRule={validType} nameOfState={type} />
                        <Input id="type" value={type} autoComplete="off"
                            onChange={(e) => setType(e.target.value)}
                            aria_invalid={validType ? "false" : "true"}
                            aria_describedby="typeNote"
                            onFocus={() => setTypeFocus(true)}
                            onBlur={() => setTypeFocus(false)}
                            focusValue={typeFocus}
                            validValue={validType}
                            errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="lightInducedDegradation" nameOfLabel="Light Induced Degradation" validRule={validLightInDeg} nameOfState={lightInDeg} />
                        <Input id="lightInducedDegradation" value={lightInDeg} autoComplete="off"
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
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="panel_wattage" nameOfLabel="Panel Wattage" validRule={validPanelWattage} nameOfState={panelWattage} />
                        <Input id="panel_wattage" value={panelWattage} autoComplete="off"
                            onChange={(e) => setPanelWattage(e.target.value)}
                            aria_invalid={validPanelWattage ? "false" : "true"}
                            aria_describedby="panelWattageNote"
                            onFocus={() => setPanelWattageFocus(true)}
                            onBlur={() => setPanelWattageFocus(false)}
                            focusValue={panelWattageFocus}
                            validValue={validPanelWattage}
                            errorMesg="Only positive numbers allowed upto 4 digit."
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="voltage_open_circuit_voc" nameOfLabel="Voltage Open Circuit VOC" validRule={validVoltageOpen} nameOfState={voltageOpen} />
                        <Input id="voltage_open_circuit_voc" value={voltageOpen} autoComplete="off"
                            onChange={(e) => setVoltageOpen(e.target.value)}
                            aria_invalid={validVoltageOpen ? "false" : "true"}
                            aria_describedby="voltageOpenNote"
                            onFocus={() => setVoltageOpenFocus(true)}
                            onBlur={() => setVoltageOpenFocus(false)}
                            focusValue={voltageOpenFocus}
                            validValue={validVoltageOpen}
                            errorMesg="Only decimal number allowed upto two decimal."
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="current_short_circuit_isc" nameOfLabel="Current Short Circuit ISC" validRule={validCurrentShort} nameOfState={currentShort} />
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="pv_loss_temp" nameOfLabel="PV Loss due to temperature" validRule={validPvLossTemp} nameOfState={pvLossTemp} />
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
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/4 px-3">
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="max_power_voltage_vmpp" nameOfLabel="Max Power Voltage VMPP" validRule={validMaxPowerVoltage} nameOfState={maxPowerVoltage} />
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="max_power_current_impp" nameOfLabel="Max Power Current IMPP" validRule={validMaxPowerCurrent} nameOfState={maxPowerCurrent} />
                        <Input id="max_power_current_impp" value={maxPowerCurrent} autoComplete="off"
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="temp_coecient_of_pmax" nameOfLabel="Temp Coecient of PMAX" validRule={validTempPmax} nameOfState={tempPmax} />
                        <Input id="temp_coecient_of_pmax" value={tempPmax} autoComplete="off"
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
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="temp_coecient_of_voc" nameOfLabel=" Temp Coecient of VOC" validRule={validTempVoc} nameOfState={tempVoc} />
                        <Input id="temp_coecient_of_voc" value={tempVoc} autoComplete="off"
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="temp_coecient_of_isc" nameOfLabel="Temp Coecient of ISC" validRule={validTempIsc} nameOfState={tempIsc} />
                        <Input id="temp_coecient_of_isc" value={tempIsc} autoComplete="off"
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
                    <div className="w-full md:w-1/4 px-3">
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="module_degradation_loss" nameOfLabel="Module Degradation Loss" validRule={validModuleDeLoss} nameOfState={moduleDeLoss} />
                        <Input id="module_degradation_loss" value={moduleDeLoss} autoComplete="off"
                            onChange={(e) => setModuleDeLoss(e.target.value)}
                            aria_invalid={validModuleDeLoss ? "false" : "true"}
                            aria_describedby="moduleDeLossNote"
                            onFocus={() => setModuleDeLossFocus(true)}
                            onBlur={() => setModuleDeLossFocus(false)}
                            focusValue={moduleDeLossFocus}
                            validValue={validModuleDeLoss}
                            errorMesg="Only integer number allowed."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="module_quality_loss" nameOfLabel="Module Quality Loss" validRule={validModuleQualityLoss} nameOfState={moduleQualityLoss} />
                        <Input id="module_quality_loss" value={moduleQualityLoss} autoComplete="off"
                            onChange={(e) => setModuleQualityLoss(e.target.value)}
                            aria_invalid={validModuleQualityLoss ? "false" : "true"}
                            aria_describedby="moduleQualityLossNote"
                            onFocus={() => setModuleQualityLossFocus(true)}
                            onBlur={() => setModuleQualityLossFocus(false)}
                            focusValue={moduleQualityLossFocus}
                            validValue={validModuleQualityLoss}
                            errorMesg="Only integer number allowed."
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
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
                    <div className="w-full md:w-1/4 px-3">
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="unitNomPower" nameOfLabel="Unit Nom Power" validRule={validUnitNomPower} nameOfState={unitNomPower} />
                        <Input id="unitNomPower" value={unitNomPower} autoComplete="off"
                            onChange={(e) => setUnitNomPower(e.target.value)}
                            aria_invalid={validUnitNomPower ? "false" : "true"}
                            aria_describedby="unitNomPowerNote"
                            onFocus={() => setUnitNomPowerFocus(true)}
                            onBlur={() => setUnitNomPowerFocus(false)}
                            focusValue={unitNomPowerFocus}
                            validValue={validUnitNomPower}
                            errorMesg="Minimum 1 digit and maximum 4 digit positive numbers are allowed."
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="module_series" nameOfLabel="Modules in Series" validRule={validModuleSeries} nameOfState={moduleSeries} />
                        <Input id="module_series" value={moduleSeries} autoComplete="off"
                            onChange={(e) => setModuleSeries(e.target.value)}
                            aria_invalid={validModuleSeries ? "false" : "true"}
                            aria_describedby="moduleSeriesNote"
                            onFocus={() => setModuleSeriesFocus(true)}
                            onBlur={() => setModuleSeriesFocus(false)}
                            focusValue={moduleSeriesFocus}
                            validValue={validModuleSeries}
                            errorMesg="Only positive integer number allowed."
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="module_strings" nameOfLabel="Modules in Strings" validRule={validModuleStrings} nameOfState={moduleStrings} />
                        <Input id="module_strings" value={moduleStrings} autoComplete="off"
                            onChange={(e) => setModuleStrings(e.target.value)}
                            aria_invalid={validModuleStrings ? "false" : "true"}
                            aria_describedby="moduleStringsNote"
                            onFocus={() => setModuleStringsFocus(true)}
                            onBlur={() => setModuleStringsFocus(false)}
                            focusValue={moduleStringsFocus}
                            validValue={validModuleStrings}
                            errorMesg="Only positive integer number allowed."
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-3">
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
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="pv_loss_irr" nameOfLabel="PV Loss due to Irradiance" validRule={validPvLossIrr} nameOfState={pvLossIrr} />
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
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/4 px-3">
                        <Label htmlFor="back_irradiance" nameOfLabel="Mismatch for Back Irradiance" validRule={validBackIrr} nameOfState={backIrr} />
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
                </div>
                <button className="bg-slate-300 hover:bg-orange-400 hover:text-white text-sm font-bold py-1 px-4 inline-flex items-center">
                    <FontAwesomeIcon className="p-2" icon={faFileExport} size="1x" />
                    <span>Create PV Module</span>
                </button>
            </form>
            <AlertModal modalOpen={errorAlert || successAlert} onClose={() => setErrorAlert(false) || setSuccessAlert(false)}>
                <div className='text-center w-96'>
                    <h3 className={`text-lg font-black ${errorAlert ? "text-red-600" : "text-green-600"} p-4}`}>
                        {errorAlert ? 'Opps! Invalid Entries.' : 'Successfully entered data.'}
                    </h3>
                    <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>
                        {errorAlert ? 'Please cross verify the input fileds!' : 'Congratulations, You just create one PV Module'}
                    </p>
                    <div className='flex gap-4 justify-center items-center'>
                        {errorAlert && <button className="border border-red-500 bg-red-500 text-white hover:bg-red-600 w-1/2 p-2" onClick={() => setErrorAlert(false)}>OK</button>}
                        {successAlert && <button className="border border-green-500 bg-green-500 text-white hover:bg-green-600 w-1/2 p-2" onClick={() => resetForm()}>OK</button>}
                    </div>
                </div>
            </AlertModal>
            <Footer />
        </>
    );
}
export default CreatePvModule;