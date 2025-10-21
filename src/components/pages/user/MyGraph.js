import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";
import Axios from "../../../api/Axios";
import { IRRADIATION_DATAS } from "../../Common/ValidationConstants";
ChartJS.register(...registerables);

const RESULT = '/finalresults/project/';
const MyGraph = ({ id, onClose }) => {
    const [summaryData, setSummaryData] = useState(['']);
    const [projectData, setProjectData] = useState(['']);
    const [designConfigData, setDesignConfigData] = useState(['']);
    //const [userData, setUserData] = useState(['']);
    const [pvModuleData, setPvModuleData] = useState(['']);
    const [inverterData, setInverterData] = useState(['']);

    const [avgArrayNomEnergy, setAvgArrayNomEnergy] = useState(0);
    const [avgArrayNomEngPerDay, setAvgArrayNomEngPerDay] = useState(0);
    const [avgArrayNomEngPerMonth, setAvgArrayNomEngPerMonth] = useState(0);
    const [avgEngInverterOutput, setAvgEngInverterOutput] = useState(0);
    const [avgEngInverterOutputPerDay, setAvgEngInverterOutputPerDay] = useState(0);
    const [avgEngInverterOutputPerMonth, setAvgEngInverterOutputPerMonth] = useState(0);
    const [avgCollectionLoss, setAvgCollectionLoss] = useState(0);
    const [avgEGrid, setAvgEGrid] = useState(0);
    const [avgEGridPerDay, setAvgEGridPerDay] = useState(0);
    const [avgEGridPerMonth, setAvgEGridPerMonth] = useState(0);
    const [avgMppt, setAvgMppt] = useState(0);
    const [avgMpptPerDay, setAvgMpptPerDay] = useState(0);
    const [avgMpptPerMonth, setAvgMpptPerMonth] = useState(0);
    const [avgGlobalEffectiveIrr, setAvgGlobalEffectiveIrr] = useState(0);
    const [avgPerRatio, setAvgPerRatio] = useState(0);
    const [avgProUsefulEng, setAvgProUsefulEng] = useState(0);
    const [avgSystemLoss, setAvgSystemLoss] = useState(0);

    useEffect(() => {
        const getResult = async () => {
            try {
                await Axios.get(RESULT.concat(id))
                    .then(function (response) {
                        //console.log(response.data);
                        setSummaryData(response.data);
                        setProjectData(response.data[0].project);
                        setDesignConfigData(response.data[0].project.designConfig);
                        //setUserData(response.data[0].project.user);
                        //console.log(response.data[0].project.designConfig);
                        setPvModuleData(response.data[0].project.designConfig.pvModule);
                        setInverterData(response.data[0].project.designConfig.inverter);

                        let avgArrEng = 0;
                        let avgArrPerDayEng = 0;
                        let avgArrPerMonthEng = 0;
                        let avgInverterOutputEng = 0;
                        let avgInverterOutputEngPerDay = 0;
                        let avgInverterOutputEngPerMonth = 0;
                        let avgCollLoss = 0;
                        let avgEGr = 0;
                        let avgEGrPD = 0;
                        let avgEGrPM = 0;
                        let avgEngMppt = 0;
                        let avgEngMpptPD = 0;
                        let avgEngMpptPM = 0;
                        let avgAvgGloEffIrr = 0;
                        let avgPR = 0;
                        let avgPUE = 0;
                        let avgSL = 0;
                        response.data.map((data) => {
                            avgArrEng += data.arrNomEnrgy_MWh;
                            avgArrPerDayEng += data.arrNomEnrgy_kWh_kWp_perDay;
                            avgArrPerMonthEng += data.arrNomEnrgy_kWh_kWp_perMonth;
                            avgInverterOutputEng += data.availableEnergyAtInverterOutputMWh;
                            avgInverterOutputEngPerDay += data.availableEnergyAtInverterOutputPerDay;
                            avgInverterOutputEngPerMonth += data.availableEnergyAtInverterOutputPerMonth;
                            avgCollLoss += data.collectionLoss;
                            avgEGr += data.egridMWh;
                            avgEGrPD += data.egridPerDay;
                            avgEGrPM += data.egridPerMonth;
                            avgEngMppt += data.energyAtMPPTMWh;
                            avgEngMpptPD += data.energyAtMPPTPerDay;
                            avgEngMpptPM += data.energyAtMPPTPerMonth;
                            avgAvgGloEffIrr += data.globalEffIrradiance;
                            avgPR += data.performanceRatio;
                            avgPUE += data.producedUsefulEnergy;
                            avgSL += data.systemLoss;
                            return 0;
                        })
                        //console.log(avgInverterOutputEng.toString().substring(0, 7));
                        setAvgArrayNomEnergy((avgArrEng / 12).toFixed(2));
                        setAvgArrayNomEngPerDay((avgArrPerDayEng / 12).toFixed(2));
                        setAvgArrayNomEngPerMonth((avgArrPerMonthEng / 12).toFixed(2));
                        setAvgEngInverterOutput((Number(avgInverterOutputEng.toString().substring(0, 7)) / 12).toFixed(2));
                        setAvgEngInverterOutputPerDay(avgInverterOutputEngPerDay / 12);
                        setAvgEngInverterOutputPerMonth(avgInverterOutputEngPerMonth / 12);
                        setAvgCollectionLoss((avgCollLoss / 12).toFixed(2));
                        setAvgEGrid((Number(avgEGr.toString().substring(0, 7)) / 12).toFixed(2));
                        setAvgEGridPerDay(avgEGrPD / 12);
                        setAvgEGridPerMonth(avgEGrPM / 12);
                        setAvgMppt((avgEngMppt / 12).toFixed(2));
                        setAvgMpptPerDay((avgEngMpptPD / 12).toFixed(2));
                        setAvgMpptPerMonth((avgEngMpptPM / 12).toFixed(2));
                        setAvgGlobalEffectiveIrr((avgAvgGloEffIrr / 12).toFixed(2));
                        setAvgPerRatio(avgPR / 12);
                        setAvgProUsefulEng(avgPUE / 12);
                        setAvgSystemLoss(avgSL / 12);
                        // console.log(avgPUE);
                    })
            } catch (err) {
                console.log(err);
            }
        };
        getResult();
    }, [id]);

    //console.log(dataTest);

    // const generatePDF = () => {
    //     const input = document.getElementById("graphSummary");
    //     const doc = new jsPDF("p", "mm", "a4");

    //     html2canvas(input).then(canvas => {
    //         var imgData = canvas.toDataURL('image/jpeg', 0.5);
    //         doc.setFontSize(25);
    //         var pageHeight = doc.internal.pageSize.getHeight();
    //         var imgHeight = canvas.height * 200 / canvas.width;
    //         var heightLeft = imgHeight;
    //         var position = 0;
    //         doc.addImage(imgData, 'JPEG', 10, position, 190, imgHeight);
    //         heightLeft -= pageHeight;
    //         while (heightLeft >= 0) {
    //             position = heightLeft - imgHeight;
    //             doc.addPage();
    //             doc.addImage(imgData, 'JPEG', 10, position, 190, imgHeight);
    //             heightLeft -= pageHeight;
    //         }

    //         doc.save('test.pdf');
    //     });

    // }

    const generatePDF = async () => {
        var projectReport = document.getElementById("projectReport");
        var resultGraph = document.getElementById("resultGraph");
        const doc = new jsPDF("p", "pt", "a4", true);
        doc.setFontSize(30);
        await doc.html(projectReport, {
            callback: function (doc) {
                return doc;
            },
            width: 500,
            windowWidth: 900,
            margin: [50, 40, 40, 50],
            autoPaging: 'text',

        });

        doc.addPage();

        doc.setFontSize(30);
        html2canvas(resultGraph).then(canvas => {
            const img = canvas.toDataURL("image/png");
            doc.addImage(img, 'JPEG', 40, 20, 520, 800);
            window.open(doc.output('bloburi'));
        });



    }
    return (
        <>
            <div className="grid grid-cols-7 border-b-2 border-b-gray-100">
                <div className="col-span-5">
                    <p className='text-3xl text-center font-black text-gray-800'></p>
                </div>
                <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={onClose}>To Dashboard</button>
                <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={() => generatePDF()}>Download</button>
            </div>
            <div className="grid" id="projectReport">
                <div className="md:grid-cols-2 md:gap-1 border-slate-300 border-[1px]">
                    <div className="col-span-2 text-center">
                        <div className="text-xl font-extrabold">Simulation Report</div>
                        <div className="underline">Grid Connected System</div>
                        <div>Project: {projectData.project_name}</div>
                        <div>System Power: ----- MWp</div>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 md:gap-1 text-sm border-[1px] border-slate-300 mt-4">
                    <div className="col-span-4 text-center text-lg font-black p-2">Project Summary</div>
                    <table className="col-span-4 [&_td]:border [&_td]:p-2">
                        <tbody>
                            <tr>
                                <td>Geoghaphical Site</td>
                                <td>Situation</td>
                                <td>Project Settings</td>
                            </tr>
                            <tr>
                                <td>{projectData.project_location}</td>
                                <td>Longitude: {projectData.project_longitude}</td>
                                <td>Ground Albido: {designConfigData.ground_albido}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Latitude: {projectData.project_latitude}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Altitude</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Time Zone</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid md:grid-cols-4 md:gap-1 text-sm border-[1px] border-slate-300 mt-4">
                    <div className="col-span-4 text-center text-lg font-black p-2">System Summary</div>
                    <table className="col-span-4 [&_td]:p-2 [&_td]:border">
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center">PV Module</td>
                            </tr>
                            <tr>
                                <td>Manufacturer:</td>
                                <td>{pvModuleData.manufacturer}</td>
                                <td>Model:</td>
                                <td>{pvModuleData.model}</td>
                                <td>Type:</td>
                                <td>{pvModuleData.type}</td>
                            </tr>
                            <tr>
                                <td>Current Short Circuit ISC:</td>
                                <td>{pvModuleData.current_short_circuit_isc}</td>
                                <td>Light Induced Degradation:</td>
                                <td>{pvModuleData.lightInducedDegradation}</td>
                                <td>Max Power Voltage VMPP:</td>
                                <td>{pvModuleData.max_power_voltage_vmpp}</td>
                            </tr>
                            <tr>
                                <td>Max Power Current IMPP:</td>
                                <td>{pvModuleData.max_power_current_impp}</td>
                                <td>Mismatch For back Irradiance:</td>
                                <td>{pvModuleData.mismatchForBackIrradiance}</td>
                                <td>Mismatch Loss:</td>
                                <td>{pvModuleData.mismatchLoss}</td>
                            </tr>
                            <tr>
                                <td>Module Degradation Loss:</td>
                                <td> {pvModuleData.moduleDegradationLoss}</td>
                                <td>Module Quality Loss:</td>
                                <td>{pvModuleData.moduleQualityLoss}</td>
                                <td>Module Breadth:</td>
                                <td>{pvModuleData.module_breadth}</td>
                            </tr>
                            <tr>
                                <td>Module Length:</td>
                                <td>{pvModuleData.module_length}</td>
                                <td>Module Thickness:</td>
                                <td>{pvModuleData.module_thickness}</td>
                                <td>Module Area:</td>
                                <td>{pvModuleData.modulearea}</td>
                            </tr>
                            <tr>
                                <td>Modules in Series:</td>
                                <td>{pvModuleData.modules_in_series}</td>
                                <td>Modules in Strings:</td>
                                <td>{pvModuleData.modules_in_strings}</td>
                                <td>No. of Modules:</td>
                                <td>{pvModuleData.no_modules}</td>
                            </tr>
                            <tr>
                                <td>Nominal STC:</td>
                                <td>{pvModuleData.nominal_STC}</td>
                                <td>Ohmic Wiring Loss:</td>
                                <td>{pvModuleData.ohmicWiringLoss}</td>
                                <td>Panel Wattage:</td>
                                <td>{pvModuleData.panel_wattage}</td>
                            </tr>
                            <tr>
                                <td>PV Loss due to Irrandiance:</td>
                                <td>{pvModuleData.pvLossDueToIrradiance}</td>
                                <td>PV Loss due to Temparature:</td>
                                <td>{pvModuleData.pvLossDueToTemperature}</td>
                                <td>Temp Coecient of ISC:</td>
                                <td>{pvModuleData.temp_coecient_of_isc}</td>
                            </tr>
                            <tr>
                                <td>Temp Coecient of PMAX:</td>
                                <td>{pvModuleData.temp_coecient_of_pmax}</td>
                                <td>Temp Coecient of VOC:</td>
                                <td>{pvModuleData.temp_coecient_of_voc}</td>
                                <td>Unit NOM Power:</td>
                                <td>{pvModuleData.unitNomPower}</td>
                            </tr>
                            <tr>
                                <td>Voltage Open Circuit VOC:</td>
                                <td>{pvModuleData.voltage_open_circuit_voc}</td>
                                <td>Module Efficiency at STC:</td>
                                <td>{pvModuleData.module_efficiency_at_stc}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="col-span-4 [&_td]:border [&_td]:p-2">
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center">Inverter</td>
                            </tr>
                            <tr>
                                <td>Manufacturer:</td>
                                <td>{inverterData.manufacturer}</td>
                                <td>Model:</td>
                                <td>{inverterData.model}</td>
                                <td>Type:</td>
                                <td>{inverterData.type}</td>
                            </tr>

                            <tr>
                                <td>AC Ohmic Loss:</td>
                                <td>{inverterData.acOhmicLoss}</td>
                                <td>AC OP Power:</td>
                                <td>{inverterData.ac_op_power}</td>
                                <td>AC Voltage Range:</td>
                                <td>{inverterData.ac_voltage_range_start} - {inverterData.ac_voltage_range_end}</td>
                            </tr>
                            <tr>
                                <td>Auxiliaries:</td>
                                <td>{inverterData.auxiliaries}</td>
                                <td>High Voltage Transformation Loss:</td>
                                <td>{inverterData.highVoltageTransfoLoss}</td>
                                <td>HV Line Ohmic Loss:</td>
                                <td>{inverterData.hvLineOhmicLoss}</td>
                            </tr>
                            <tr>
                                <td>Inverter Loss due to Max Input Current:</td>
                                <td>{inverterData.inverterLossDueToMaxInputCurrent}</td>
                                <td>Inverter Loss due to Power Threshold:</td>
                                <td>{inverterData.inverterLossDueToPowerThreshold}</td>
                                <td>Inverter Loss due to Voltage Threshold:</td>
                                <td>{inverterData.inverterLossDueToVoltageThreshold}</td>
                            </tr>

                            <tr>
                                <td>Inverter Loss during Operation:</td>
                                <td>{inverterData.inverterLossDuringOperation}</td>
                                <td>Max AC OP Current:</td>
                                <td>{inverterData.max_ac_op_current}</td>
                                <td>Max DC ISC:</td>
                                <td>{inverterData.max_dc_isc}</td>
                            </tr>

                            <tr>
                                <td>Max no inupt Connector:</td>
                                <td>{inverterData.max_no_input_connector}</td>
                                <td>Max Power at given Temprature:</td>
                                <td>{inverterData.max_powerAtGivenTemp}</td>
                                <td>Max PV input Current:</td>
                                <td>{inverterData.max_pv_input_current}</td>
                            </tr>

                            <tr>
                                <td>Max PV input Voltage:</td>
                                <td>{inverterData.max_pv_input_voltage}</td>
                                <td>Maximum Power:</td>
                                <td>{inverterData.maximumPower}</td>
                                <td>Medium Voltage Transformation Loss:</td>
                                <td>{inverterData.mediumVoltageTransfoLoss}</td>
                            </tr>

                            <tr>
                                <td>Min PV input Voltage:</td>
                                <td>{inverterData.min_pv_input_voltage}</td>
                                <td>MPP Voltage range:</td>
                                <td>{inverterData.mpp_volatge_range_start} - {inverterData.mpp_volatge_range_end}</td>
                                <td>MPP Voltage Nominal Power range:</td>
                                <td>{inverterData.mpp_volatge_range_nominal_power_start} - {inverterData.mpp_volatge_range_nominal_power_end}</td>
                            </tr>
                            <tr>
                                <td>MV Line Ohmic Loss:</td>
                                <td>{inverterData.mvLineOhmicLoss}</td>
                                <td>Night Consumption:</td>
                                <td>{inverterData.nightConsumption}</td>
                                <td>No. of Inverters:</td>
                                <td>{inverterData.no_inverters}</td>
                            </tr>
                            <tr>
                                <td>No. MPP Inputs:</td>
                                <td>{inverterData.no_mpp_inputs}</td>
                                <td>Nominal PV Input Voltage: </td>
                                <td>{inverterData.nominal_pv_input_voltage}</td>
                                <td>PNOM Ratio:</td>
                                <td>{inverterData.pnomRatio}</td>
                            </tr>
                            <tr>
                                <td>System Unavailability:</td>
                                <td>{inverterData.systemUnavailability}</td>
                                <td>Total Power:</td>
                                <td>{inverterData.total_power}</td>
                                <td>Unit NOM Power:</td>
                                <td>{inverterData.unit_nom_power}</td>
                            </tr>
                            <tr>
                                <td>Unused Energy:</td>
                                <td>{inverterData.unusedEnergy}</td>
                                <td>Inverter Loss over Nominal Inverter Power:</td>
                                <td>{inverterData.inverterLossOverNominalInverterPower}</td>
                                <td>Inverter Loss over Nominal Inverter Voltage:</td>
                                <td>{inverterData.inverterLossOverNominalInverterVoltage}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="col-span-4 [&_td]:border [&_td]:p-2">
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center">Design Configuration Description</td>
                            </tr>
                            <tr>
                                <td>Configuration Name:</td>
                                <td>{designConfigData.designName}</td>
                                <td>Active Power:</td>
                                <td>{designConfigData.active_power}</td>
                                <td>Azimuth:</td>
                                <td>{designConfigData.azimuth}</td>
                            </tr>
                            <tr>
                                <td>Bifaciality Factor:</td>
                                <td>{designConfigData.bifaciality_factor}</td>
                                <td>GCR:</td>
                                <td>{designConfigData.gcr}</td>
                                <td>Ground Albido:</td>
                                <td>{designConfigData.ground_albido}</td>
                            </tr>
                            <tr>
                                <td>Height Above Ground:</td>
                                <td>{designConfigData.height_above_ground}</td>
                                <td>Limit Profile Angle:</td>
                                <td>{designConfigData.limit_profile_angle}</td>
                                <td>PNOM Ratio:</td>
                                <td>{designConfigData.pnom_ratio}</td>
                            </tr>
                            <tr>
                                <td>Rear Mismatch Loss:</td>
                                <td>{designConfigData.rear_mismatch_loss}</td>
                                <td>Rear Shading Factor:</td>
                                <td>{designConfigData.rear_shading_factor}</td>
                                <td>Shed Transparent Fraction:</td>
                                <td>{designConfigData.shed_transparent_fraction}</td>
                            </tr>
                            <tr>
                                <td>Sheds Spacing:</td>
                                <td>{designConfigData.sheds_spacing}</td>
                                <td>Sheds Width:</td>
                                <td>{designConfigData.sheds_width}</td>
                                <td>Tilt:</td>
                                <td>{designConfigData.tilt}</td>
                            </tr>
                            <tr>
                                <td>Tracker Spacing:</td>
                                <td>{designConfigData.tracker_spacing}</td>
                                <td>Tracker Width:</td>
                                <td>{designConfigData.tracker_width}</td>
                                <td>Tracking Axis Horizontal:</td>
                                <td>{designConfigData.tracking_axis_horizontal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid md:grid-cols-4 md:gap-1 text-sm border-[1px] border-slate-300 mt-4">
                    <div className="col-span-4 text-lg font-black text-center p-2">Result Summary</div>
                    <table className="col-span-4 [&_td]:border [&_td]:p-2">
                        <tbody>
                            <tr>
                                <td>Avarage Array NOM Energy MWH</td>
                                <td>{avgArrayNomEnergy}</td>
                                <td>Avarage Array NOM Energy KWH KWP per day</td>
                                <td>{avgArrayNomEngPerDay}</td>
                            </tr>
                            <tr>
                                <td>Avarage Array NOM Energy KWH KWP per month</td>
                                <td>{avgArrayNomEngPerMonth}</td>
                                <td>Avarage Available Energy at Inverter Output MWH</td>
                                <td>{avgEngInverterOutput}</td>
                            </tr>
                            <tr>
                                <td>Avarage Available Energy at Inverter Output per day</td>
                                <td>{avgEngInverterOutputPerDay}</td>
                                <td>Avarage Available Energy at Inverter Output per month</td>
                                <td>{avgEngInverterOutputPerMonth}</td>
                            </tr>
                            <tr>
                                <td>Avarage Collection Loss</td>
                                <td>{avgCollectionLoss}</td>
                                <td>Avarage EGrid MWH</td>
                                <td>{avgEGrid}</td>
                            </tr>
                            <tr>
                                <td>Avarage EGrid per day</td>
                                <td>{avgEGridPerDay}</td>
                                <td>Avarage EGrid per month</td>
                                <td>{avgEGridPerMonth}</td>
                            </tr>
                            <tr>
                                <td>Avarage Energy at MPPT MWH</td>
                                <td>{avgMppt}</td>
                                <td>Avarage Energy at MPPT per day</td>
                                <td>{avgMpptPerDay}</td>
                            </tr>
                            <tr>
                                <td>Avarage Energy at MPPT per month</td>
                                <td>{avgMpptPerMonth}</td>
                                <td>Avarage Global Effective Irradiance</td>
                                <td>{avgGlobalEffectiveIrr}</td>
                            </tr>
                            <tr>
                                <td>Avarage Performance Ratio</td>
                                <td>{avgPerRatio}</td>
                                <td>Avarage Produced Useful Energy</td>
                                <td>{avgProUsefulEng}</td>
                            </tr>
                            <tr>
                                <td>Avarage System Loss</td>
                                <td>{avgSystemLoss}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div className="grid text-sm">
                    <div className="text-sm p-4 bg-gray-50 font-bold">Calculated Values of the year</div>
                    {summaryData.map((data, index) => (
                        <table key={index} className="text-left text-sm w-[100%] mb-2 border border-gray-100">
                            <tbody>
                                <tr>
                                    <th className="p-3">Month of {data.month}, {data.year}</th>
                                </tr>
                                <tr>
                                    <td className="p-3">Array NOM Energy MWH:</td>
                                    <td className="p-3">{data.arrNomEnrgy_MWh}</td>
                                    <td className="p-3">Array NOM Energy KWH KWP per day:</td>
                                    <td className="p-3">{data.arrNomEnrgy_kWh_kWp_perDay}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Array NOM Energy KWH KWP per month:</td>
                                    <td className="p-3">{data.arrNomEnrgy_kWh_kWp_perMonth}</td>
                                    <td className="p-3">Available Energy at Inverter Output MWH:</td>
                                    <td className="p-3">{data.availableEnergyAtInverterOutputMWh}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Available Energy at Inverter Output per day:</td>
                                    <td className="p-3">{data.availableEnergyAtInverterOutputPerDay}</td>
                                    <td className="p-3">Available Energy at Inverter Output per month:</td>
                                    <td className="p-3">{data.availableEnergyAtInverterOutputPerMonth}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Collection Loss:</td>
                                    <td className="p-3">{data.collectionLoss}</td>
                                    <td className="p-3">EGrid MWH:</td>
                                    <td className="p-3">{data.egridMWh}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">EGrid per day:</td>
                                    <td className="p-3">{data.egridPerDay}</td>
                                    <td className="p-3">EGrid per month:</td>
                                    <td className="p-3">{data.egridPerMonth}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Energy at MPPT MWH:</td>
                                    <td className="p-3">{data.energyAtMPPTMWh}</td>
                                    <td className="p-3">Energy at MPPT per day: </td>
                                    <td className="p-3">{data.energyAtMPPTPerDay}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Energy at MPPT per month:</td>
                                    <td className="p-3">{data.energyAtMPPTPerMonth}</td>
                                    <td className="p-3">Global Effective Irradiance:</td>
                                    <td className="p-3">{data.globalEffIrradiance}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">Performance Ratio:</td>
                                    <td className="p-3">{data.performanceRatio}</td>
                                    <td className="p-3">Produced Useful Energy:</td>
                                    <td className="p-3">{data.producedUsefulEnergy}</td>
                                </tr>
                                <tr>
                                    <td className="p-3">System Loss:</td>
                                    <td className="p-3"> {data.systemLoss}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div> */}
            </div>
            <div className="grid md:grid-cols-12 text-sm border-[1px] border-slate-300 mt-4" id="resultGraph">
                <div className="col-span-12 text-center text-lg font-black p-2">Comparision Table and Graphs</div>

                <table className="col-span-10 [&_td]:border [&_td]:p-2">
                    <tbody>
                        <tr>
                            <td colSpan="8">For the Year {projectData.year}</td>
                        </tr>
                        <tr>
                            <td>Month</td>
                            <td>Ambient Temperature</td>
                            <td>Global Effective Irradiance</td>
                            <td>Effective Energy at the output of the Array</td>
                            <td>E Grid</td>
                            <td>Performance Ration</td>
                        </tr>
                        {summaryData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.month}</td>
                                <td>not known</td>
                                <td>{data.globalEffIrradiance}</td>
                                <td>{data.availableEnergyAtInverterOutputPerMonth}</td>
                                <td>{data.egridPerMonth}</td>
                                <td>{data.performanceRatio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="col-span-2 [&_td]:border [&_td]:p-2">
                    <tbody>
                        <tr>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td>Global Horizontal Irradiation</td>
                            <td>Global Incident</td>
                        </tr>
                        {IRRADIATION_DATAS.map((data, index) => (
                            <tr key={index}>
                                <td>{data['glob_hor']}</td>
                                <td>{data['glob_inc']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="col-span-12">
                    <Bar
                        data={{
                            labels: summaryData.map((data) => data.month),
                            datasets: [
                                {
                                    label: "Performance Ratio",
                                    data: summaryData.map((data) => data && JSON.stringify(data.performanceRatio).substring(0, 5)),
                                    backgroundColor: [
                                        "rgba(238, 10, 53, 0.8)",
                                    ]
                                },
                            ]
                        }}
                    />
                    <div className="text-center text-sm mt-4 text-cyan-950">
                        <p className="font-bold">Graph 1: Performance Ratio</p>
                        <p className="">Comparison datas of Performance Ratio for the year {projectData.year} of {projectData.project_name}</p>
                    </div>

                </div>
                <div className="col-span-12">
                    <div className="shadow-xl p-2">
                        <Bar
                            data={{
                                labels: summaryData.map((data) => data.month),
                                datasets: [
                                    {
                                        label: "Produced Useful Energy",
                                        data: summaryData.map((data) => data && JSON.stringify(data.producedUsefulEnergy).substring(0, 5)),
                                        backgroundColor: [
                                            "rgba(39, 69, 245, 0.8)",
                                        ]
                                    },
                                    {
                                        label: "Collection Loss",
                                        data: summaryData.map((data) => data && JSON.stringify(data.collectionLoss).substring(0, 5)),
                                        backgroundColor: [
                                            "rgba(99, 245, 39, 0.8)",
                                        ]
                                    },
                                    {
                                        label: "System Loss",
                                        data: summaryData.map((data) => data && JSON.stringify(data.systemLoss).substring(0, 5)),
                                        backgroundColor: [
                                            "rgba(245, 129, 39, 0.8)",
                                        ]
                                    },
                                ]
                            }}
                        />
                        <div className="text-center text-sm mt-4 text-cyan-950">
                            <p className="font-bold">Graph 2: Produced Useful Energy</p>
                            <p className="">Comparison datas of Produced Useful Energy for the year {projectData.year} of {projectData.project_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyGraph;