import React, { useState, useEffect } from "react";
import Axios from "../../../api/Axios";
import { USER_REGEX, ALPHA_NUMERIC, ONLY_INTEGER, DOUBLE_TYPE, NUMBER_DECIMAL } from '../../Common/ValidationConstants';
import Input from "../Input";
import Label from "../Label";
import AlertModal from "./AlertModal";

const GET_INVERTER_MODULE_BY_ID = 'inverter/';
const UPDATE_INVERTER_MODULE = 'inverter/update/inverter/';


const InverterModuleUpdateModal = ({ modalOpen, onClose, dataId, setUpdating }) => {


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

    const [maxPowerGivenTemp, setMaxPowerGivenTemp] = useState('');
    const [validMaxPowerGivenTemp, setValidMaxPowerGivenTemp] = useState(false);
    const [maxPowerGivenTempFocus, setMaxPowerGivenTempFocus] = useState(false);

    const [pnomRatio, setPnomRatio] = useState('');
    const [validPnomRatio, setValidPnomRatio] = useState(false);
    const [pnomRatioFocus, setPnomRatioFocus] = useState(false);

    const [inverterLossDuringOperation, setInverterLossDuringOperation] = useState('');
    const [validInverterLossDuringOperation, setValidInverterLossDuringOperation] = useState(false);
    const [inverterLossDuringOperationFocus, setInverterLossDuringOperationFocus] = useState(false);

    const [inverterLossNominalInverterPower, setInverterLossNominalInverterPower] = useState('');
    const [validInverterLossNominalInverterPower, setValidInverterLossNominalInverterPower] = useState(false);
    const [inverterLossNominalInverterPowerFocus, setInverterLossNominalInverterPowerFocus] = useState(false);

    const [inverterLossMaxInputCurrent, setInverterLossMaxInputCurrent] = useState('');
    const [validInverterLossMaxInputCurrent, setValidInverterLossMaxInputCurrent] = useState(false);
    const [inverterLossMaxInputCurrentFocus, setInverterLossMaxInputCurrentFocus] = useState(false);

    const [inverterLossNominalInverterVoltage, setInverterLossNominalInverterVoltage] = useState('');
    const [validInverterLossNominalInverterVoltage, setValidInverterLossNominalInverterVoltage] = useState(false);
    const [inverterLossNominalInverterVoltageFocus, setInverterLossNominalInverterVoltageFocus] = useState(false);

    const [inverterLossPowerThreshold, setInverterLossPowerThreshold] = useState('');
    const [validInverterLossPowerThreshold, setValidInverterLossPowerThreshold] = useState(false);
    const [inverterLossPowerThresholdFocus, setInverterLossPowerThresholdFocus] = useState(false);

    const [inverterLossVoltageThreshold, setInverterLossVoltageThreshold] = useState('');
    const [validInverterLossVoltageThreshold, setValidInverterLossVoltageThreshold] = useState(false);
    const [inverterLossVoltageThresholdFocus, setInverterLossVoltageThresholdFocus] = useState(false);

    const [nightConsumption, setNightConsumption] = useState('');
    const [validNightConsumption, setValidNightConsumption] = useState(false);
    const [nightConsumptionFocus, setNightConsumptionFocus] = useState(false);

    const [auxiliaries, setAuxiliaries] = useState('');
    const [validAuxiliaries, setValidAuxiliaries] = useState(false);
    const [auxiliariesFocus, setAuxiliariesFocus] = useState(false);

    const [acOhmicLoss, setAcOhmicLoss] = useState('');
    const [validAcOhmicLoss, setValidAcOhmicLoss] = useState(false);
    const [acOhmicLossFocus, setAcOhmicLossFocus] = useState(false);

    const [mediumVoltageTransfoLoss, setMediumVoltageTransfoLoss] = useState('');
    const [validMediumVoltageTransfoLoss, setValidMediumVoltageTransfoLoss] = useState(false);
    const [mediumVoltageTransfoLossFocus, setMediumVoltageTransfoLossFocus] = useState(false);

    const [mvLineOhmicLoss, setMvLineOhmicLoss] = useState('');
    const [validMvLineOhmicLoss, setValidMvLineOhmicLoss] = useState(false);
    const [mvLineOhmicLossFocus, setMvLineOhmicLossFocus] = useState(false);

    const [highVoltageTransfoLoss, setHighVoltageTransfoLoss] = useState('');
    const [validHighVoltageTransfoLoss, setValidHighVoltageTransfoLoss] = useState(false);
    const [highVoltageTransfoLossFocus, setHighVoltageTransfoLossFocus] = useState(false);

    const [hvLineOhmicLoss, setHvLineOhmicLoss] = useState('');
    const [validHvLineOhmicLoss, setValidHvLineOhmicLoss] = useState(false);
    const [hvLineOhmicLossFocus, setHvLineOhmicLossFocus] = useState(false);

    const [systemUnavailability, setSystemUnavailability] = useState('');
    const [validSystemUnavailability, setValidSystemUnavailability] = useState(false);
    const [systemUnavailabilityFocus, setSystemUnavailabilityFocus] = useState(false);

    const [unusedEnergy, setUnusedEnergy] = useState('');
    const [validUnusedEnergy, setValidUnusedEnergy] = useState(false);
    const [unusedEnergyFocus, setUnusedEnergyFocus] = useState(false);

    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    useEffect(() => {
        const result = USER_REGEX.test(inverterType);
        setValidInverterType(result);
    }, [inverterType]);
    useEffect(() => {
        const result = USER_REGEX.test(manufacturerName);
        setValidManufacturerName(result);
    }, [manufacturerName]);
    useEffect(() => {
        const result = ALPHA_NUMERIC.test(modelName);
        setValidModelName(result);
    }, [modelName]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(maxPv);
        setValidMaxPv(result);
    }, [maxPv]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(minPv);
        setValidMinPv(result);
    }, [minPv]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(nominalPv);
        setValidNominalPv(result);
    }, [nominalPv]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(mppStart);
        setValidMppStart(result);
    }, [mppStart]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(mppEnd);
        setValidMppEnd(result);
    }, [mppEnd]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(mppPowerStart);
        setValidMppPowerStart(result);
    }, [mppPowerStart]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(mppPowerEnd);
        setValidMppPowerEnd(result);
    }, [mppPowerEnd]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(mppInputs);
        setValidMppInputs(result);
    }, [mppInputs]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(maxConnector);
        setValidMaxConnector(result);
    }, [maxConnector]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(maxCurrent);
        setValidMaxCurrent(result);
    }, [maxCurrent]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(maxIsc);
        setValidMaxIsc(result);
    }, [maxIsc]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(opPower);
        setValidOpPower(result);
    }, [opPower]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(opCurrent);
        setValidOpCurrent(result);
    }, [opCurrent]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(acStart);
        setValidAcStart(result);
    }, [acStart]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(acEnd);
        setValidAcEnd(result);
    }, [acEnd]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(unitNomPower);
        setValidUnitNomPower(result);
    }, [unitNomPower]);
    useEffect(() => {
        const result = ONLY_INTEGER.test(maxPowerGivenTemp);
        setValidMaxPowerGivenTemp(result);
    }, [maxPowerGivenTemp]);
    useEffect(() => {
        const result = NUMBER_DECIMAL.test(pnomRatio);
        setValidPnomRatio(result);
    }, [pnomRatio]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(inverterLossDuringOperation);
        setValidInverterLossDuringOperation(result);
    }, [inverterLossDuringOperation]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(inverterLossNominalInverterPower);
        setValidInverterLossNominalInverterPower(result);
    }, [inverterLossNominalInverterPower]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(inverterLossMaxInputCurrent);
        setValidInverterLossMaxInputCurrent(result);
    }, [inverterLossMaxInputCurrent]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(inverterLossNominalInverterVoltage);
        setValidInverterLossNominalInverterVoltage(result);
    }, [inverterLossNominalInverterVoltage]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(inverterLossPowerThreshold);
        setValidInverterLossPowerThreshold(result);
    }, [inverterLossPowerThreshold]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(inverterLossVoltageThreshold);
        setValidInverterLossVoltageThreshold(result);
    }, [inverterLossVoltageThreshold]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(nightConsumption);
        setValidNightConsumption(result);
    }, [nightConsumption]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(auxiliaries);
        setValidAuxiliaries(result);
    }, [auxiliaries]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(acOhmicLoss);
        setValidAcOhmicLoss(result);
    }, [acOhmicLoss]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(mediumVoltageTransfoLoss);
        setValidMediumVoltageTransfoLoss(result);
    }, [mediumVoltageTransfoLoss]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(mvLineOhmicLoss);
        setValidMvLineOhmicLoss(result);
    }, [mvLineOhmicLoss]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(highVoltageTransfoLoss);
        setValidHighVoltageTransfoLoss(result);
    }, [highVoltageTransfoLoss]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(hvLineOhmicLoss);
        setValidHvLineOhmicLoss(result);
    }, [hvLineOhmicLoss]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(systemUnavailability);
        setValidSystemUnavailability(result);
    }, [systemUnavailability]);
    useEffect(() => {
        const result = DOUBLE_TYPE.test(unusedEnergy);
        setValidUnusedEnergy(result);
    }, [unusedEnergy]);


    useEffect(() => {
        const showData = async () => {
            await Axios.get(GET_INVERTER_MODULE_BY_ID.concat(dataId))
                .then(function (response) {
                    setManufacturerName(response.data.manufacturer);
                    setInverterType(response.data.type);
                    setModelName(response.data.model);
                    setMaxPv(response.data.max_pv_input_voltage);
                    setMinPv(response.data.min_pv_input_voltage);
                    setNominalPv(response.data.nominal_pv_input_voltage);
                    setMppStart(response.data.mpp_volatge_range_end);
                    setMppEnd(response.data.mpp_volatge_range_end);
                    setMppPowerStart(response.data.mpp_volatge_range_nominal_power_start);
                    setMppPowerEnd(response.data.mpp_volatge_range_nominal_power_end);
                    setMppInputs(response.data.no_mpp_inputs);
                    setMaxConnector(response.data.max_no_input_connector);
                    setMaxCurrent(response.data.max_pv_input_current);
                    setMaxIsc(response.data.max_dc_isc);
                    setOpPower(response.data.ac_op_power);
                    setOpCurrent(response.data.max_ac_op_current);
                    setAcStart(response.data.ac_voltage_range_start);
                    setAcEnd(response.data.ac_voltage_range_end);
                    setUnitNomPower(response.data.unit_nom_power);
                    setMaxPowerGivenTemp(response.data.max_powerAtGivenTemp);
                    setPnomRatio(response.data.pnomRatio);
                    setInverterLossDuringOperation(response.data.inverterLossDuringOperation);
                    setInverterLossNominalInverterPower(response.data.inverterLossOverNominalInverterPower);
                    setInverterLossMaxInputCurrent(response.data.inverterLossDueToMaxInputCurrent);
                    setInverterLossNominalInverterVoltage(response.data.inverterLossOverNominalInverterVoltage);
                    setInverterLossPowerThreshold(response.data.inverterLossDueToPowerThreshold);
                    setInverterLossVoltageThreshold(response.data.inverterLossDueToVoltageThreshold);
                    setNightConsumption(response.data.nightConsumption);
                    setAuxiliaries(response.data.auxiliaries);
                    setAcOhmicLoss(response.data.acOhmicLoss);
                    setMediumVoltageTransfoLoss(response.data.mediumVoltageTransfoLoss);
                    setMvLineOhmicLoss(response.data.mvLineOhmicLoss);
                    setHighVoltageTransfoLoss(response.data.highVoltageTransfoLoss);
                    setHvLineOhmicLoss(response.data.hvLineOhmicLoss);
                    setSystemUnavailability(response.data.systemUnavailability);
                    setUnusedEnergy(response.data.unusedEnergy);
                }).catch(function (error) {
                    console.log(error);
                });
        };

        showData();
    }, [dataId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validManufacturerName && validInverterType && validModelName && validMaxPv &&
            validMinPv && validNominalPv && validMppStart && validMppEnd && validMppPowerStart &&
            validMppPowerEnd && validMppInputs && validMaxConnector && validMaxCurrent &&
            validMaxIsc && validOpPower && validOpCurrent && validAcStart && validAcEnd &&
            validUnitNomPower && validMaxPowerGivenTemp && validPnomRatio && validInverterLossDuringOperation
            && validInverterLossNominalInverterPower && validInverterLossMaxInputCurrent
            && validInverterLossMaxInputCurrent && validInverterLossNominalInverterVoltage &&
            validInverterLossPowerThreshold && validInverterLossVoltageThreshold && validNightConsumption
            && validAuxiliaries && validAcOhmicLoss && validMediumVoltageTransfoLoss &&
            validMvLineOhmicLoss && validHighVoltageTransfoLoss && validHvLineOhmicLoss &&
            validSystemUnavailability && validUnusedEnergy) {
            const data = {
                manufacturer: manufacturerName,
                model: modelName,
                type: inverterType,
                max_pv_input_voltage: maxPv,
                min_pv_input_voltage: minPv,
                nominal_pv_input_voltage: nominalPv,
                mpp_volatge_range_start: mppStart,
                mpp_volatge_range_end: mppEnd,
                mpp_volatge_range_nominal_power_start: mppPowerStart,
                mpp_volatge_range_nominal_power_end: mppPowerEnd,
                no_mpp_inputs: mppInputs,
                max_no_input_connector: maxConnector,
                max_pv_input_current: maxCurrent,
                max_dc_isc: maxIsc,
                ac_op_power: opPower,
                max_ac_op_current: opCurrent,
                ac_voltage_range_start: acStart,
                ac_voltage_range_end: acEnd,
                unit_nom_power: unitNomPower,
                max_powerAtGivenTemp: maxPowerGivenTemp,
                pnomRatio: pnomRatio,
                inverterLossDuringOperation: inverterLossDuringOperation,
                inverterLossOverNominalInverterPower: inverterLossNominalInverterPower,
                inverterLossDueToMaxInputCurrent: inverterLossMaxInputCurrent,
                inverterLossOverNominalInverterVoltage: inverterLossNominalInverterVoltage,
                inverterLossDueToPowerThreshold: inverterLossPowerThreshold,
                inverterLossDueToVoltageThreshold: inverterLossVoltageThreshold,
                nightConsumption: nightConsumption,
                auxiliaries: auxiliaries,
                acOhmicLoss: acOhmicLoss,
                mediumVoltageTransfoLoss: mediumVoltageTransfoLoss,
                mvLineOhmicLoss: mvLineOhmicLoss,
                highVoltageTransfoLoss: highVoltageTransfoLoss,
                hvLineOhmicLoss: hvLineOhmicLoss,
                systemUnavailability: systemUnavailability,
                unusedEnergy: unusedEnergy
            }
            try {
                const response = await Axios.put(UPDATE_INVERTER_MODULE.concat(dataId), data);
                console.log(JSON.stringify(response?.data));
                // navigate(from, { replace: true });
                // onClose(true);
                // setUpdating(true);
                setSuccessAlert(true);
                onClose(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            setErrorAlert(true);
        }
    }

    const resetForm = () => {
        setUpdating(true);
        setSuccessAlert(false);
    }

    return (
        <>
            <div className={`fixed inset-0 flex justify-center items-center transition-colors
        ${modalOpen ? "visible bg-black/50" : "invisible"}`}>
                <div onClick={(e) => e.stopPropagation()}
                    className={`bg-white shadow transition-all w-10/12 mt-16
            ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                    {/* <button onClick={onClose} className="absolute top-2 right-2 p-2 font-bold text-gray-400 bg-white
                hover:bg-gray-50 hover:text-red-500">X</button> */}
                    <h3 className='text-lg text-center font-black text-gray-800 p-3 bg-slate-200'>Update Inverter Module Details</h3>
                    <form className="pt-2" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap p-2">
                            <div className="w-1/4 pr-2 mb-4">
                                <Label htmlFor="inverter_type" nameOfLabel="Inverter Type" validRule={validInverterType} nameOfState={inverterType} />
                                <Input id="inverter_type" value={inverterType} autoComplete="off"
                                    onChange={(e) => setInverterType(e.target.value)}
                                    aria_invalid={validInverterType ? "false" : "true"}
                                    aria_describedby="inverterTypeNote"
                                    onFocus={() => setInverterTypeFocus(true)}
                                    onBlur={() => setInverterTypeFocus(false)}
                                    focusValue={inverterTypeFocus}
                                    validValue={validInverterType}
                                    errorMesg="Atleast three character accepted."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="manufacturerName" nameOfLabel="Manufacturer" validRule={validManufacturerName} nameOfState={manufacturerName} />
                                <Input id="manufacturerName" value={manufacturerName} autoComplete="off"
                                    onChange={(e) => setManufacturerName(e.target.value)}
                                    aria_invalid={validManufacturerName ? "false" : "true"}
                                    aria_describedby="manufacturerNameNote"
                                    onFocus={() => setManufacturerNameFocus(true)}
                                    onBlur={() => setManufacturerNameFocus(false)}
                                    focusValue={manufacturerNameFocus}
                                    validValue={validManufacturerName}
                                    errorMesg="4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
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
                            <div className="md:w-1/4 mb-4">
                                <Label htmlFor="max_pv" nameOfLabel="Max PV Input Voltage" validRule={validMaxPv} nameOfState={maxPv} />
                                <Input id="max_pv" value={maxPv} autoComplete="off"
                                    onChange={(e) => setMaxPv(e.target.value)}
                                    aria_invalid={validMaxPv ? "false" : "true"}
                                    aria_describedby="maxPvNote"
                                    onFocus={() => setMaxPvFocus(true)}
                                    onBlur={() => setMaxPvFocus(false)}
                                    focusValue={maxPvFocus}
                                    validValue={validMaxPv}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="min_pv" nameOfLabel="Min PV Input Voltage" validRule={validMinPv} nameOfState={minPv} />
                                <Input id="min_pv" value={minPv} autoComplete="off"
                                    onChange={(e) => setMinPv(e.target.value)}
                                    aria_invalid={validMinPv ? "false" : "true"}
                                    aria_describedby="minPvNote"
                                    onFocus={() => setMinPvFocus(true)}
                                    onBlur={() => setMinPvFocus(false)}
                                    focusValue={minPvFocus}
                                    validValue={validMinPv}
                                    errorMesg="Only numbers allowed with decimal upto two digit."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="nominal_pv" nameOfLabel="Nominal PV Input Voltage" validRule={validNominalPv} nameOfState={nominalPv} />
                                <Input id="nominal_pv" value={nominalPv} autoComplete="off"
                                    onChange={(e) => setNominalPv(e.target.value)}
                                    aria_invalid={validNominalPv ? "false" : "true"}
                                    aria_describedby="nominalPvNote"
                                    onFocus={() => setNominalPvFocus(true)}
                                    onBlur={() => setNominalPvFocus(false)}
                                    focusValue={nominalPvFocus}
                                    validValue={validNominalPv}
                                    errorMesg="Only decimal number allowed upto two decimal."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="mpp_start" nameOfLabel="MPP Voltage Range Start" validRule={validMppStart} nameOfState={mppStart} />
                                <Input id="mpp_start" value={mppStart} autoComplete="off"
                                    onChange={(e) => setMppStart(e.target.value)}
                                    aria_invalid={validMppStart ? "false" : "true"}
                                    aria_describedby="mppStartNote"
                                    onFocus={() => setMppStartFocus(true)}
                                    onBlur={() => setMppStartFocus(false)}
                                    focusValue={mppStartFocus}
                                    validValue={validMppStart}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 mb-4">
                                <Label htmlFor="mpp_end" nameOfLabel="MPP Voltage Range End" validRule={validMppEnd} nameOfState={mppEnd} />
                                <Input id="mpp_end" value={mppEnd} autoComplete="off"
                                    onChange={(e) => setMppEnd(e.target.value)}
                                    aria_invalid={validMppEnd ? "false" : "true"}
                                    aria_describedby="mppEndNote"
                                    onFocus={() => setMppEndFocus(true)}
                                    onBlur={() => setMppEndFocus(false)}
                                    focusValue={mppEndFocus}
                                    validValue={validMppEnd}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="mpp_power_start" nameOfLabel="MPP Voltage Range Nominal Power Start" validRule={validMppPowerStart} nameOfState={mppPowerStart} />
                                <Input id="mpp_power_start" value={mppPowerStart} autoComplete="off"
                                    onChange={(e) => setMppPowerStart(e.target.value)}
                                    aria_invalid={validMppPowerStart ? "false" : "true"}
                                    aria_describedby="mppPowerStartNote"
                                    onFocus={() => setMppPowerStartFocus(true)}
                                    onBlur={() => setMppPowerStartFocus(false)}
                                    focusValue={mppPowerStartFocus}
                                    validValue={validMppPowerStart}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="mpp_power_end" nameOfLabel="MPP Voltage Range Nominal Power End" validRule={validMppPowerEnd} nameOfState={mppPowerEnd} />
                                <Input id="mpp_power_end" value={mppPowerEnd} autoComplete="off"
                                    onChange={(e) => setMppPowerEnd(e.target.value)}
                                    aria_invalid={validMppPowerEnd ? "false" : "true"}
                                    aria_describedby="mppPowerEndNote"
                                    onFocus={() => setMppPowerEndFocus(true)}
                                    onBlur={() => setMppPowerEndFocus(false)}
                                    focusValue={mppPowerEndFocus}
                                    validValue={validMppPowerEnd}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="mpp_inputs" nameOfLabel="Number of MPP Inputs" validRule={validMppInputs} nameOfState={mppInputs} />
                                <Input id="mpp_inputs" value={mppInputs} autoComplete="off"
                                    onChange={(e) => setMppInputs(e.target.value)}
                                    aria_invalid={validMppInputs ? "false" : "true"}
                                    aria_describedby="mppInputsNote"
                                    onFocus={() => setMppInputsFocus(true)}
                                    onBlur={() => setMppInputsFocus(false)}
                                    focusValue={mppInputsFocus}
                                    validValue={validMppInputs}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 mb-4">
                                <Label htmlFor="max_connector" nameOfLabel="Maximum no Input Connector" validRule={validMaxConnector} nameOfState={maxConnector} />
                                <Input id="max_connector" value={maxConnector} autoComplete="off"
                                    onChange={(e) => setMaxConnector(e.target.value)}
                                    aria_invalid={validMaxConnector ? "false" : "true"}
                                    aria_describedby="maxConnectorNote"
                                    onFocus={() => setMaxConnectorFocus(true)}
                                    onBlur={() => setMaxConnectorFocus(false)}
                                    focusValue={maxConnectorFocus}
                                    validValue={validMaxConnector}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="max_current" nameOfLabel="Maximum PV Input Current" validRule={validMaxCurrent} nameOfState={maxCurrent} />
                                <Input id="max_current" value={maxCurrent} autoComplete="off"
                                    onChange={(e) => setMaxCurrent(e.target.value)}
                                    aria_invalid={validMaxCurrent ? "false" : "true"}
                                    aria_describedby="maxCurrentNote"
                                    onFocus={() => setMaxCurrentFocus(true)}
                                    onBlur={() => setMaxCurrentFocus(false)}
                                    focusValue={maxCurrentFocus}
                                    validValue={validMaxCurrent}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="max_isc" nameOfLabel="Max DC ISC" validRule={validMaxIsc} nameOfState={maxIsc} />
                                <Input id="max_isc" value={maxIsc} autoComplete="off"
                                    onChange={(e) => setMaxIsc(e.target.value)}
                                    aria_invalid={validMaxIsc ? "false" : "true"}
                                    aria_describedby="maxIscNote"
                                    onFocus={() => setMaxIscFocus(true)}
                                    onBlur={() => setMaxIscFocus(false)}
                                    focusValue={maxIscFocus}
                                    validValue={validMaxIsc}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="op_power" nameOfLabel="AC OP Power" validRule={validOpPower} nameOfState={opPower} />
                                <Input id="op_power" value={opPower} autoComplete="off"
                                    onChange={(e) => setOpPower(e.target.value)}
                                    aria_invalid={validOpPower ? "false" : "true"}
                                    aria_describedby="opPowerNote"
                                    onFocus={() => setOpPowerFocus(true)}
                                    onBlur={() => setOpPowerFocus(false)}
                                    focusValue={opPowerFocus}
                                    validValue={validOpPower}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 mb-4">
                                <Label htmlFor="op_current" nameOfLabel="Max AC OP Current" validRule={validOpCurrent} nameOfState={opCurrent} />
                                <Input id="op_current" value={opCurrent} autoComplete="off"
                                    onChange={(e) => setOpCurrent(e.target.value)}
                                    aria_invalid={validOpCurrent ? "false" : "true"}
                                    aria_describedby="opCurrentNote"
                                    onFocus={() => setOpCurrentFocus(true)}
                                    onBlur={() => setOpCurrentFocus(false)}
                                    focusValue={opCurrentFocus}
                                    validValue={validOpCurrent}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="ac_start" nameOfLabel="AC Voltage Range Start" validRule={validAcStart} nameOfState={acStart} />
                                <Input id="ac_start" value={acStart} autoComplete="off"
                                    onChange={(e) => setAcStart(e.target.value)}
                                    aria_invalid={validAcStart ? "false" : "true"}
                                    aria_describedby="acStartNote"
                                    onFocus={() => setAcStartFocus(true)}
                                    onBlur={() => setAcStartFocus(false)}
                                    focusValue={acStartFocus}
                                    validValue={validAcStart}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="ac_end" nameOfLabel="AC Voltage Range End" validRule={validAcEnd} nameOfState={acEnd} />
                                <Input id="ac_end" value={acEnd} autoComplete="off"
                                    onChange={(e) => setAcEnd(e.target.value)}
                                    aria_invalid={validAcEnd ? "false" : "true"}
                                    aria_describedby="acEndNote"
                                    onFocus={() => setAcEndFocus(true)}
                                    onBlur={() => setAcEndFocus(false)}
                                    focusValue={acEndFocus}
                                    validValue={validAcEnd}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="unitNomPower" nameOfLabel="Unit NOM Power" validRule={validUnitNomPower} nameOfState={unitNomPower} />
                                <Input id="unitNomPower" value={unitNomPower} autoComplete="off"
                                    onChange={(e) => setUnitNomPower(e.target.value)}
                                    aria_invalid={validUnitNomPower ? "false" : "true"}
                                    aria_describedby="unitNomPowerNote"
                                    onFocus={() => setUnitNomPowerFocus(true)}
                                    onBlur={() => setUnitNomPowerFocus(false)}
                                    focusValue={unitNomPowerFocus}
                                    validValue={validUnitNomPower}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 mb-4">
                                <Label htmlFor="max_powerAtGivenTemp" nameOfLabel="Maximum Power at Given Temperatue" validRule={validMaxPowerGivenTemp} nameOfState={maxPowerGivenTemp} />
                                <Input id="max_powerAtGivenTemp" value={maxPowerGivenTemp} autoComplete="off"
                                    onChange={(e) => setMaxPowerGivenTemp(e.target.value)}
                                    aria_invalid={validMaxPowerGivenTemp ? "false" : "true"}
                                    aria_describedby="maxPowerGivenTempNote"
                                    onFocus={() => setMaxPowerGivenTempFocus(true)}
                                    onBlur={() => setMaxPowerGivenTempFocus(false)}
                                    focusValue={maxPowerGivenTempFocus}
                                    validValue={validMaxPowerGivenTemp}
                                    errorMesg="Only positive numbers are allowed."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="pnom_ratio" nameOfLabel="PNOM Ratio" validRule={validPnomRatio} nameOfState={pnomRatio} />
                                <Input id="pnom_ratio" value={pnomRatio} autoComplete="off"
                                    onChange={(e) => setPnomRatio(e.target.value)}
                                    aria_invalid={validPnomRatio ? "false" : "true"}
                                    aria_describedby="pnomRatioNote"
                                    onFocus={() => setPnomRatioFocus(true)}
                                    onBlur={() => setPnomRatioFocus(false)}
                                    focusValue={pnomRatioFocus}
                                    validValue={validPnomRatio}
                                    errorMesg="Only numbers allowed with decimal upto two."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="inverter_loss_during_operation" nameOfLabel="Inverter Loss during Operation" validRule={validInverterLossDuringOperation} nameOfState={inverterLossDuringOperation} />
                                <Input id="inverter_loss_during_operation" value={inverterLossDuringOperation} autoComplete="off"
                                    onChange={(e) => setInverterLossDuringOperation(e.target.value)}
                                    aria_invalid={validInverterLossDuringOperation ? "false" : "true"}
                                    aria_describedby="inverterLossDuringOperationNote"
                                    onFocus={() => setInverterLossDuringOperationFocus(true)}
                                    onBlur={() => setInverterLossDuringOperationFocus(false)}
                                    focusValue={inverterLossDuringOperationFocus}
                                    validValue={validInverterLossDuringOperation}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="inverter_loss_nominal_inverter" nameOfLabel="Inverter Loss Over Nominal Inverter Power" validRule={validInverterLossNominalInverterPower} nameOfState={inverterLossNominalInverterPower} />
                                <Input id="inverter_loss_nominal_inverter" value={inverterLossNominalInverterPower} autoComplete="off"
                                    onChange={(e) => setInverterLossNominalInverterPower(e.target.value)}
                                    aria_invalid={validInverterLossNominalInverterPower ? "false" : "true"}
                                    aria_describedby="inverterLossNominalInverterNote"
                                    onFocus={() => setInverterLossNominalInverterPowerFocus(true)}
                                    onBlur={() => setInverterLossNominalInverterPowerFocus(false)}
                                    focusValue={inverterLossNominalInverterPowerFocus}
                                    validValue={validInverterLossNominalInverterPower}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 mb-4">
                                <Label htmlFor="inverter_loss_max_current" nameOfLabel="Inverter Loss Due to Maximum Input Current" validRule={validInverterLossMaxInputCurrent} nameOfState={inverterLossMaxInputCurrent} />
                                <Input id="inverter_loss_max_current" value={inverterLossMaxInputCurrent} autoComplete="off"
                                    onChange={(e) => setInverterLossMaxInputCurrent(e.target.value)}
                                    aria_invalid={validInverterLossMaxInputCurrent ? "false" : "true"}
                                    aria_describedby="inverterLossMaxInputCurrentNote"
                                    onFocus={() => setInverterLossMaxInputCurrentFocus(true)}
                                    onBlur={() => setInverterLossMaxInputCurrentFocus(false)}
                                    focusValue={inverterLossMaxInputCurrentFocus}
                                    validValue={validInverterLossMaxInputCurrent}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>

                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="inverter_loss_nominal_inverter_voltage" nameOfLabel="Inverter Loss Over Nominal Inverter Voltage" validRule={validInverterLossNominalInverterVoltage} nameOfState={inverterLossNominalInverterVoltage} />
                                <Input id="inverter_loss_nominal_inverter_voltage" value={inverterLossNominalInverterVoltage} autoComplete="off"
                                    onChange={(e) => setInverterLossNominalInverterVoltage(e.target.value)}
                                    aria_invalid={validInverterLossNominalInverterVoltage ? "false" : "true"}
                                    aria_describedby="inverterLossNominalInverterVoltageNote"
                                    onFocus={() => setInverterLossNominalInverterVoltageFocus(true)}
                                    onBlur={() => setInverterLossNominalInverterVoltageFocus(false)}
                                    focusValue={inverterLossNominalInverterVoltageFocus}
                                    validValue={validInverterLossNominalInverterVoltage}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="inverter_loss_power_threshold" nameOfLabel="Inverter Loss due to Power Threshold" validRule={validInverterLossPowerThreshold} nameOfState={inverterLossPowerThreshold} />
                                <Input id="inverter_loss_power_threshold" value={inverterLossPowerThreshold} autoComplete="off"
                                    onChange={(e) => setInverterLossPowerThreshold(e.target.value)}
                                    aria_invalid={validInverterLossPowerThreshold ? "false" : "true"}
                                    aria_describedby="inverterLossPowerThresholdNote"
                                    onFocus={() => setInverterLossPowerThresholdFocus(true)}
                                    onBlur={() => setInverterLossPowerThresholdFocus(false)}
                                    focusValue={inverterLossPowerThresholdFocus}
                                    validValue={validInverterLossPowerThreshold}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2 mb-4">
                                <Label htmlFor="inverter_loss_voltage_threshold" nameOfLabel="Inverter Loss due to Voltage Threshold" validRule={validInverterLossVoltageThreshold} nameOfState={inverterLossVoltageThreshold} />
                                <Input id="inverter_loss_voltage_threshold" value={inverterLossVoltageThreshold} autoComplete="off"
                                    onChange={(e) => setInverterLossVoltageThreshold(e.target.value)}
                                    aria_invalid={validInverterLossVoltageThreshold ? "false" : "true"}
                                    aria_describedby="inverterLossVoltageThresholdNote"
                                    onFocus={() => setInverterLossVoltageThresholdFocus(true)}
                                    onBlur={() => setInverterLossVoltageThresholdFocus(false)}
                                    focusValue={inverterLossVoltageThresholdFocus}
                                    validValue={validInverterLossVoltageThreshold}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 mb-4">
                                <Label htmlFor="night_consumption" nameOfLabel="Night Consumption" validRule={validNightConsumption} nameOfState={nightConsumption} />
                                <Input id="night_consumption" value={nightConsumption} autoComplete="off"
                                    onChange={(e) => setNightConsumption(e.target.value)}
                                    aria_invalid={validNightConsumption ? "false" : "true"}
                                    aria_describedby="nightConsumptionNote"
                                    onFocus={() => setNightConsumptionFocus(true)}
                                    onBlur={() => setNightConsumptionFocus(false)}
                                    focusValue={nightConsumptionFocus}
                                    validValue={validNightConsumption}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2">
                                <Label htmlFor="auxiliaries" nameOfLabel="Auxiliaries" validRule={validAuxiliaries} nameOfState={auxiliaries} />
                                <Input id="auxiliaries" value={auxiliaries} autoComplete="off"
                                    onChange={(e) => setAuxiliaries(e.target.value)}
                                    aria_invalid={validAuxiliaries ? "false" : "true"}
                                    aria_describedby="auxiliariesNote"
                                    onFocus={() => setAuxiliariesFocus(true)}
                                    onBlur={() => setAuxiliariesFocus(false)}
                                    focusValue={auxiliariesFocus}
                                    validValue={validAuxiliaries}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2">
                                <Label htmlFor="acOhmicLoss" nameOfLabel="AC Ohmic Loss" validRule={validAcOhmicLoss} nameOfState={acOhmicLoss} />
                                <Input id="acOhmicLoss" value={acOhmicLoss} autoComplete="off"
                                    onChange={(e) => setAcOhmicLoss(e.target.value)}
                                    aria_invalid={validAcOhmicLoss ? "false" : "true"}
                                    aria_describedby="acOhmicLossNote"
                                    onFocus={() => setAcOhmicLossFocus(true)}
                                    onBlur={() => setAcOhmicLossFocus(false)}
                                    focusValue={acOhmicLossFocus}
                                    validValue={validAcOhmicLoss}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2">
                                <Label htmlFor="medium_vol_transfo_loss" nameOfLabel="Medium Voltage Transformation Loss" validRule={validMediumVoltageTransfoLoss} nameOfState={mediumVoltageTransfoLoss} />
                                <Input id="medium_vol_transfo_loss" value={mediumVoltageTransfoLoss} autoComplete="off"
                                    onChange={(e) => setMediumVoltageTransfoLoss(e.target.value)}
                                    aria_invalid={validMediumVoltageTransfoLoss ? "false" : "true"}
                                    aria_describedby="mediumVolTransfoLossNote"
                                    onFocus={() => setMediumVoltageTransfoLossFocus(true)}
                                    onBlur={() => setMediumVoltageTransfoLossFocus(false)}
                                    focusValue={mediumVoltageTransfoLossFocus}
                                    validValue={validMediumVoltageTransfoLoss}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4">
                                <Label htmlFor="mv_line_ohmic_loss" nameOfLabel="MV Line Ohmic Loss" validRule={validMvLineOhmicLoss} nameOfState={mvLineOhmicLoss} />
                                <Input id="mv_line_ohmic_loss" value={mvLineOhmicLoss} autoComplete="off"
                                    onChange={(e) => setMvLineOhmicLoss(e.target.value)}
                                    aria_invalid={validMvLineOhmicLoss ? "false" : "true"}
                                    aria_describedby="mvLineOhmicLossNote"
                                    onFocus={() => setMvLineOhmicLossFocus(true)}
                                    onBlur={() => setMvLineOhmicLossFocus(false)}
                                    focusValue={mvLineOhmicLossFocus}
                                    validValue={validMvLineOhmicLoss}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2">
                                <Label htmlFor="high_vol_transfo_loss" nameOfLabel="High Voltage Transformation Loss" validRule={validHighVoltageTransfoLoss} nameOfState={highVoltageTransfoLoss} />
                                <Input id="high_vol_transfo_loss" value={highVoltageTransfoLoss} autoComplete="off"
                                    onChange={(e) => setHighVoltageTransfoLoss(e.target.value)}
                                    aria_invalid={validHighVoltageTransfoLoss ? "false" : "true"}
                                    aria_describedby="highVolTransfoLossNote"
                                    onFocus={() => setHighVoltageTransfoLossFocus(true)}
                                    onBlur={() => setHighVoltageTransfoLossFocus(false)}
                                    focusValue={highVoltageTransfoLossFocus}
                                    validValue={validHighVoltageTransfoLoss}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2">
                                <Label htmlFor="hv_line_ohmic_loss" nameOfLabel="HV Line Ohmic Loss" validRule={validHvLineOhmicLoss} nameOfState={hvLineOhmicLoss} />
                                <Input id="hv_line_ohmic_loss" value={hvLineOhmicLoss} autoComplete="off"
                                    onChange={(e) => setHvLineOhmicLoss(e.target.value)}
                                    aria_invalid={validHvLineOhmicLoss ? "false" : "true"}
                                    aria_describedby="hvLineOhmicLossNote"
                                    onFocus={() => setHvLineOhmicLossFocus(true)}
                                    onBlur={() => setHvLineOhmicLossFocus(false)}
                                    focusValue={hvLineOhmicLossFocus}
                                    validValue={validHvLineOhmicLoss}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4 pr-2">
                                <Label htmlFor="systemUnavailability" nameOfLabel="System Unavailability" validRule={validSystemUnavailability} nameOfState={systemUnavailability} />
                                <Input id="systemUnavailability" value={systemUnavailability} autoComplete="off"
                                    onChange={(e) => setSystemUnavailability(e.target.value)}
                                    aria_invalid={validSystemUnavailability ? "false" : "true"}
                                    aria_describedby="systemUnavailabilityNote"
                                    onFocus={() => setSystemUnavailabilityFocus(true)}
                                    onBlur={() => setSystemUnavailabilityFocus(false)}
                                    focusValue={systemUnavailabilityFocus}
                                    validValue={validSystemUnavailability}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                            <div className="md:w-1/4">
                                <Label htmlFor="unusedEnergy" nameOfLabel="Unused Energy" validRule={validUnusedEnergy} nameOfState={unusedEnergy} />
                                <Input id="unusedEnergy" value={unusedEnergy} autoComplete="off"
                                    onChange={(e) => setUnusedEnergy(e.target.value)}
                                    aria_invalid={validUnusedEnergy ? "false" : "true"}
                                    aria_describedby="unusedEnergyNote"
                                    onFocus={() => setUnusedEnergyFocus(true)}
                                    onBlur={() => setUnusedEnergyFocus(false)}
                                    focusValue={unusedEnergyFocus}
                                    validValue={validUnusedEnergy}
                                    errorMesg="Only numbers allowed with decimal or not."
                                />
                            </div>
                        </div>
                        <div className="p-2 sm:flex sm:flex-row-reverse sm:px-6 justify-center items-center border-t-2 border-slate-200">
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
                        {errorAlert ? 'Please cross verify the input fileds!' : 'Congratulations, You succeccfully updated Inverter module'}
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

export default InverterModuleUpdateModal;