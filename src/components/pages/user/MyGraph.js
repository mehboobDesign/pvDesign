// import React, { useState, useEffect } from "react";
// import { Chart as ChartJS, registerables } from "chart.js/auto";
// import { Bar } from "react-chartjs-2";
// import { jsPDF } from 'jspdf';
// import html2canvas from "html2canvas";
// import Axios from "../../../api/Axios";
// const PERFORMANCE_RATIO = 'graphdata/performance/project/';
// const PRODUCED_ENERGY = 'graphdata/producedenergy/project/';
// const COLLECTION_LOSS = 'graphdata/collectionloss/project/';
// const SYSTEM_LOSS = 'graphdata/systemloss/project/';
// const YEAR = '/year/';
// ChartJS.register(...registerables);
// const MyGraph = ({ id, onClose }) => {
//     const [performanceRatio, setPerformanceRatio] = useState([]);
//     const [producedEnergy, setProducedEnergy] = useState([]);
//     const [collectionLossData, setCollectionLossData] = useState([]);
//     const [systemLoss, setSystemLoss] = useState([]);

//     useEffect(() => {
//         if (id) {
//             const getPerformanceRatio = async () => {
//                 try {
//                     await Axios.get(PERFORMANCE_RATIO.concat(id).concat(YEAR).concat(2024))
//                         .then(function (response) {
//                             //console.log(response.data);
//                             setPerformanceRatio(response.data)
//                         })
//                 } catch (err) {
//                     console.log(err);
//                 }
//             };
//             const getProducedEnergy = async () => {
//                 try {
//                     await Axios.get(PRODUCED_ENERGY.concat(id).concat(YEAR).concat(2024))
//                         .then(function (response) {
//                             //console.log(response.data);
//                             setProducedEnergy(response.data)
//                         })
//                 } catch (err) {
//                     console.log(err);
//                 }
//             };
//             const getCollectionLossDatas = async () => {
//                 try {
//                     await Axios.get(COLLECTION_LOSS.concat(id).concat(YEAR).concat(2024))
//                         .then(function (response) {
//                             //console.log(response.data);
//                             setCollectionLossData(response.data)
//                         })
//                 } catch (err) {
//                     console.log(err);
//                 }
//             };
//             const getSystemLoss = async () => {
//                 try {
//                     await Axios.get(SYSTEM_LOSS.concat(id).concat(YEAR).concat(2024))
//                         .then(function (response) {
//                             //console.log(response.data);
//                             setSystemLoss(response.data)
//                         })
//                 } catch (err) {
//                     console.log(err);
//                 }
//             };
//             getPerformanceRatio();
//             getProducedEnergy();
//             getCollectionLossDatas();
//             getSystemLoss();
//         }
//     }, [id]);
//     const generatePDF = () => {
//         const input = document.getElementById("graphSummary");
//         const doc = new jsPDF("p", "mm", "a4");
//         //const width = doc.internal.pageSize.getWidth();
//         const height = doc.internal.pageSize.getHeight();
//         html2canvas(input).then(canvas => {
//             const img = canvas.toDataURL("image/png");
//             doc.addImage(img, 'JPEG', 5, 0, 200, height);
//             doc.save("chart.pdf");
//         });
//     };
//     return (
//         <>
//             <div className="grid grid-cols-7 border-b-2 border-b-gray-100 p-2">
//                 <div className="col-span-5">
//                     <p className='text-3xl text-center font-black text-gray-800'></p>
//                 </div>
//                 <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={onClose}>To Dashboard</button>
//                 <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={() => generatePDF()}>Download</button>
//             </div>
//             <div className="grid md:grid-cols-2 md:gap-4" id="graphSummary">
//                 <div className="col-span-2 p-4 text-center text-3xl font-black text-gray-800 border-b-2 border-b-gray-100">Summary Report</div>
//                 <div className="p-2 shadow-xl text-slate-700 leading-7">
//                     <p className="text-xl font-bold">Performance Ratio:</p>
//                     <p>Graph display the performance ratio of the selected configuration.</p>
//                 </div>
//                 <div className="shadow-xl p-2">
//                     <Bar
//                         data={{
//                             labels: performanceRatio.map((data) => data.month),
//                             datasets: [
//                                 {
//                                     label: "Performance Ratio",
//                                     data: performanceRatio.map((data) => data.value),
//                                     backgroundColor: [
//                                         "rgba(238, 10, 53, 0.8)",
//                                     ]
//                                 },
//                             ]
//                         }}
//                     />
//                 </div>
//                 <div className="shadow-xl p-2">
//                     <Bar
//                         data={{
//                             labels: producedEnergy.map((data) => data.month),
//                             datasets: [
//                                 {
//                                     label: "Produced Energy",
//                                     data: producedEnergy.map((data) => data.value),
//                                     backgroundColor: [
//                                         "rgba(39, 69, 245, 0.8)",
//                                     ]
//                                 },
//                             ]
//                         }}
//                     />
//                 </div>
//                 <div className="p-2 shadow-xl text-slate-700 leading-7">
//                     <p className="text-xl font-bold">Produced Energy:</p>
//                     <p>Graph display the Produced Energy of the selected configuration.</p>
//                 </div>
//                 <div className="p-2 shadow-xl text-slate-700 leading-7">
//                     <p className="text-xl font-bold">Collection Loss:</p>
//                     <p>Graph display the Collection Loss of the selected configuration.</p>
//                 </div>
//                 <div className="shadow-xl p-2">
//                     <Bar
//                         data={{
//                             labels: collectionLossData.map((data) => data.month),
//                             datasets: [
//                                 {
//                                     label: "Collection Loss",
//                                     data: collectionLossData.map((data) => data.value),
//                                     backgroundColor: [
//                                         "rgba(99, 245, 39, 0.8)",
//                                     ]
//                                 },
//                             ]
//                         }}
//                     />
//                 </div>
//                 <div className="shadow-xl p-2">
//                     <Bar
//                         data={{
//                             labels: systemLoss.map((data) => data.month),
//                             datasets: [
//                                 {
//                                     label: "System Loss",
//                                     data: systemLoss.map((data) => data.value),
//                                     backgroundColor: [
//                                         "rgba(245, 129, 39, 0.8)",
//                                     ]
//                                 },
//                             ]
//                         }}
//                     />
//                 </div>
//                 <div className="p-2 shadow-xl text-slate-700 leading-7">
//                     <p className="text-xl font-bold">System Loss:</p>
//                     <p>Graph display the System Loss of the selected configuration.</p>
//                 </div>
//             </div>
//         </>
//     );
// }
// export default MyGraph;

import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";
import Axios from "../../../api/Axios";
ChartJS.register(...registerables);

const RESULT = '/results/project/';
const MyGraph = ({ id, onClose }) => {
    const [summaryData, setSummaryData] = useState(['']);
    const [projectData, setProjectData] = useState(['']);
    const [designConfigData, setDesignConfigData] = useState(['']);
    const [userData, setUserData] = useState(['']);
    const [pvModuleData, setPvModuleData] = useState(['']);
    const [inverterData, setInverterData] = useState(['']);
    useEffect(() => {
        const getResult = async () => {
            try {
                await Axios.get(RESULT.concat(id))
                    .then(function (response) {
                        console.log(response.data);
                        setSummaryData(response.data);
                        setProjectData(response.data[0].project);
                        setDesignConfigData(response.data[0].project.designConfig);
                        setUserData(response.data[0].project.user);
                        setPvModuleData(response.data[0].project.designConfig.pvModule);
                        setInverterData(response.data[0].project.designConfig.inverter);
                    })
            } catch (err) {
                console.log(err);
            }
        };
        getResult()
    }, [id]); console.log(projectData);
    // const generatePDF = () => {
    //     const input = document.getElementById("graphSummary");
    //     const doc = new jsPDF("p", "mm", "a4");
    //     //const width = doc.internal.pageSize.getWidth();
    //     const height = doc.internal.pageSize.getHeight();
    //     html2canvas(input).then(canvas => {
    //         const img = canvas.toDataURL("image/png");
    //         doc.addImage(img, 'JPEG', 5, 0, 200, height);
    //         doc.save("chart.pdf");
    //     });

    // };
    const generatePDF = () => {
        const input = document.getElementById("graphSummary");
        const doc = new jsPDF("p", "mm", "a4");

        html2canvas(input).then(canvas => {
            var imgData = canvas.toDataURL('image/jpeg', 0.5);
            doc.setFontSize(25);
            var pageHeight = doc.internal.pageSize.getHeight();
            var imgHeight = canvas.height * 200 / canvas.width;
            var heightLeft = imgHeight;
            var position = 0;
            doc.addImage(imgData, 'JPEG', 10, position, 190, imgHeight);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'JPEG', 10, position, 190, imgHeight);
                heightLeft -= pageHeight;
            }

            doc.save('test.pdf');
        });

    }



    /** Convert PDF into base64 */
    //const base64PDF = await base.output('datauristring')
    // const generatePDF = () => {
    //     const input = document.getElementById("graphSummary");
    //     html2canvas(input).then(canvas => {
    //         var contentWidth = canvas.width;
    //         var contentHeight = canvas.height;
    //         var pageHeight = contentWidth / 592.28 * 841.89;
    //         var leftHeight = contentHeight;
    //         var position = 10;
    //         var imgWidth = 595.28;
    //         var imgHeight = 592.28 / contentWidth * contentHeight;
    //         var pageData = canvas.toDataURL('image/jpeg', 0.5);
    //         var pdf = new jsPDF('', 'pt', 'a4');
    //         pdf.setFontSize(20);
    //         if (leftHeight < pageHeight) {
    //             pdf.addImage(pageData, 'JPEG', 10, 0, imgWidth, imgHeight);
    //         } else {
    //             while (leftHeight > 0) {
    //                 pdf.addImage(pageData, 'JPEG', 10, position, imgWidth, imgHeight)
    //                 leftHeight -= pageHeight;
    //                 position -= 841.89;
    //                 if (leftHeight > 0) {
    //                     pdf.addPage();
    //                 }
    //             }
    //         }
    //         pdf.save('stone.pdf');
    //     })
    // }
    return (
        <>
            <div className="grid grid-cols-7 border-b-2 border-b-gray-100">
                <div className="col-span-5">
                    <p className='text-3xl text-center font-black text-gray-800'></p>
                </div>
                <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={onClose}>To Dashboard</button>
                <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={() => generatePDF()}>Download</button>
            </div>
            <div className="grid md:grid-cols-2 md:gap-1" id="graphSummary">
                <div className="col-span-2 p-2 text-center text-xl font-black text-slate-800">
                    PV Design Solutions
                </div>
                <div className="col-span-2 text-sm">
                    <div className="p-2 bg-gray-50">Summary Report of {projectData.project_name}</div>
                    <div className="p-2 bg-gray-100">User Name: {userData.name}</div>
                </div>
                <div className="col-span-2">
                    <div className="grid md:grid-cols-4 text-sm">
                        <div className="col-span-4 bg-gray-50 p-2 text-orange-500"> Project Description</div>
                        <div className="col-span-4 bg-gray-100 p-2">Name: <span >{projectData.project_name}</span></div>
                        <div className="bg-gray-50 hover:bg-slate-200 p-2">Location: <span >{projectData.project_location}</span></div>
                        <div className="bg-gray-50 hover:bg-slate-200 p-2">Longitude: <span >{projectData.project_longitude}</span></div>
                        <div className="bg-gray-50 hover:bg-slate-200 p-2">Latitude: <span >{projectData.project_latitude}</span></div>
                        <div className="bg-gray-50 hover:bg-slate-200 p-2">Year: <span>{projectData.year}</span></div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid md:grid-cols-4 text-sm">
                        <div className="col-span-4 bg-gray-50 p-2 text-orange-500">Design Configuration Description</div>
                        <div className="col-span-4 bg-gray-100 p-2">Configuration Name: {designConfigData.designName}</div>
                        <div className="bg-gray-50 p-2">Active Power: {designConfigData.active_power}</div>
                        <div className="bg-gray-100 p-2">Azimuth: {designConfigData.azimuth}</div>
                        <div className="bg-gray-50 p-2">Bifaciality Factor: {designConfigData.bifaciality_factor}</div>
                        <div className="bg-gray-100 p-2">GCR: {designConfigData.gcr}</div>
                        <div className="bg-gray-50 p-2">Ground Albido: {designConfigData.ground_albido}</div>
                        <div className="bg-gray-100 p-2">Height Above Ground: {designConfigData.height_above_ground}</div>
                        <div className="bg-gray-50 p-2">Limit Profile Angle: {designConfigData.limit_profile_angle}</div>
                        <div className="bg-gray-100 p-2">PNOM Ratio: {designConfigData.pnom_ratio}</div>
                        <div className="bg-gray-50 p-2">Rear Mismatch Loss: {designConfigData.rear_mismatch_loss}</div>
                        <div className="bg-gray-100 p-2">Rear Shading Factor: {designConfigData.rear_shading_factor}</div>
                        <div className="bg-gray-50 p-2">Shed Transparent Fraction: {designConfigData.shed_transparent_fraction}</div>
                        <div className="bg-gray-100 p-2">Sheds Spacing: {designConfigData.sheds_spacing}</div>
                        <div className="bg-gray-50 p-2">Sheds Width: {designConfigData.sheds_width}</div>
                        <div className="bg-gray-100 p-2">Tilt: {designConfigData.tilt}</div>
                        <div className="bg-gray-50 p-2">Tracker Spacing: {designConfigData.tracker_spacing}</div>
                        <div className="bg-gray-100 p-2">Tracker Width: {designConfigData.tracker_width}</div>
                        <div className="bg-gray-50 p-2">Tracking Axis Horizontal: {designConfigData.tracking_axis_horizontal}</div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid md:grid-cols-3 text-sm">
                        <div className="col-span-3 p-2 bg-gray-50 text-orange-500">PV Module Description</div>
                        <div className="p-2 col-span-3 bg-gray-100">Manufacturer Name: {pvModuleData.manufacturer}</div>
                        <div className="p-2 bg-gray-50">Model Name: {pvModuleData.model}</div>
                        <div className="p-2 bg-gray-100">Type: {pvModuleData.type}</div>
                        <div className="p-2 bg-gray-50">Current Short Circuit ISC:{pvModuleData.current_short_circuit_isc}</div>
                        <div className="p-2 bg-gray-100">Light Induced Degradation: {pvModuleData.lightInducedDegradation}</div>
                        <div className="p-2 bg-gray-50">Max Power Voltage VMPP:{pvModuleData.max_power_voltage_vmpp}</div>
                        <div className="p-2 bg-gray-100">Max Power Current IMPP:{pvModuleData.max_power_current_impp}</div>
                        <div className="p-2 bg-gray-50">Mismatch For back Irradiance:{pvModuleData.mismatchForBackIrradiance}</div>
                        <div className="p-2 bg-gray-100">Mismatch Loss: {pvModuleData.mismatchLoss}</div>
                        <div className="p-2 bg-gray-50">Module Degradation Loss: {pvModuleData.moduleDegradationLoss}</div>
                        <div className="p-2 bg-gray-100">Module Quality Loss: {pvModuleData.moduleQualityLoss}</div>
                        <div className="p-2 bg-gray-50">Module Breadth: {pvModuleData.module_breadth}</div>
                        <div className="p-2 bg-gray-100">Module Length: {pvModuleData.module_length}</div>
                        <div className="p-2 bg-gray-50">Module Thickness: {pvModuleData.module_thickness}</div>
                        <div className="p-2 bg-gray-100">Module Area: {pvModuleData.modulearea}</div>
                        <div className="p-2 bg-gray-50">Modules in Series: {pvModuleData.modules_in_series}</div>
                        <div className="p-2 bg-gray-100">Modules in Strings: {pvModuleData.modules_in_strings}</div>
                        <div className="p-2 bg-gray-50">No. of Modules: {pvModuleData.no_modules}</div>
                        <div className="p-2 bg-gray-100">Nominal STC: {pvModuleData.nominal_STC}</div>
                        <div className="p-2 bg-gray-50">Ohmic Wiring Loss: {pvModuleData.ohmicWiringLoss}</div>
                        <div className="p-2 bg-gray-100">Panel Wattage: {pvModuleData.panel_wattage}</div>
                        <div className="p-2 bg-gray-50">PV Loss due to Irrandiance: {pvModuleData.pvLossDueToIrradiance}</div>
                        <div className="p-2 bg-gray-100">PV Loss due to Temparature: {pvModuleData.pvLossDueToTemperature}</div>
                        <div className="p-2 bg-gray-50">Temp Coecient of ISC: {pvModuleData.temp_coecient_of_isc}</div>
                        <div className="p-2 bg-gray-100">Temp Coecient of PMAX:{pvModuleData.temp_coecient_of_pmax}</div>
                        <div className="p-2 bg-gray-50">Temp Coecient of VOC: {pvModuleData.temp_coecient_of_voc}</div>
                        <div className="p-2 bg-gray-100">Unit NOM Power: {pvModuleData.unitNomPower}</div>
                        <div className="p-2 bg-gray-50">Voltage Open Circuit VOC: {pvModuleData.voltage_open_circuit_voc}</div>
                        <div className="p-2 bg-gray-100">Module Efficiency at STC: {pvModuleData.module_efficiency_at_stc}</div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="grid md:grid-cols-3 text-sm">
                        <div className="col-span-3 p-2 bg-gray-50 text-orange-500">Inverter Description</div>
                        <div className="col-span-3 p-2 bg-gray-100">Manufacturer Name: {inverterData.manufacturer}</div>
                        <div className="p-2 bg-gray-50">Model: {inverterData.model}</div>
                        <div className="p-2 bg-gray-100">Type: {inverterData.type}</div>
                        <div className="p-2 bg-gray-50">AC Ohmic Loss: {inverterData.acOhmicLoss}</div>
                        <div className="p-2 bg-gray-100">AC OP Power: {inverterData.ac_op_power}</div>
                        <div className="p-2 bg-gray-50">AC Voltage Range: {inverterData.ac_voltage_range_start} - {inverterData.ac_voltage_range_end}</div>
                        <div className="p-2 bg-gray-100">Auxiliaries: {inverterData.auxiliaries}</div>
                        <div className="p-2 bg-gray-50">High Voltage Transformation Loss: {inverterData.highVoltageTransfoLoss}</div>
                        <div className="p-2 bg-gray-100">HV Line Ohmic Loss: {inverterData.hvLineOhmicLoss}</div>
                        <div className="p-2 bg-gray-50">Inverter Loss due to Max Input Current: {inverterData.inverterLossDueToMaxInputCurrent}</div>
                        <div className="p-2 bg-gray-100">Inverter Loss due to Power Threshold: {inverterData.inverterLossDueToPowerThreshold}</div>
                        <div className="p-2 bg-gray-50">Inverter Loss due to Voltage Threshold: {inverterData.inverterLossDueToVoltageThreshold}</div>
                        <div className="p-2 bg-gray-100">Inverter Loss during Operation: {inverterData.inverterLossDuringOperation}</div>
                        <div className="p-2 bg-gray-50">Max AC OP Current: {inverterData.max_ac_op_current}</div>
                        <div className="p-2 bg-gray-100">Max DC ISC: {inverterData.max_dc_isc}</div>
                        <div className="p-2 bg-gray-50">Max no inupt Connector: {inverterData.max_no_input_connector}</div>
                        <div className="p-2 bg-gray-100">Max Power at given Temprature: {inverterData.max_powerAtGivenTemp}</div>
                        <div className="p-2 bg-gray-50">Max PV input Current: {inverterData.max_pv_input_current}</div>
                        <div className="p-2 bg-gray-100">Max PV input Voltage: {inverterData.max_pv_input_voltage}</div>
                        <div className="p-2 bg-gray-50">Maximum Power: {inverterData.maximumPower}</div>
                        <div className="p-2 bg-gray-100">Medium Voltage Transformation Loss: {inverterData.mediumVoltageTransfoLoss}</div>
                        <div className="p-2 bg-gray-50">Min PV input Voltage: {inverterData.min_pv_input_voltage}</div>
                        <div className="p-2 bg-gray-100">MPP Voltage range: {inverterData.mpp_volatge_range_start} - {inverterData.mpp_volatge_range_end}</div>
                        <div className="p-2 bg-gray-50">MPP Voltage Nominal Power range: {inverterData.mpp_volatge_range_nominal_power_start} - {inverterData.mpp_volatge_range_nominal_power_end}</div>
                        <div className="p-2 bg-gray-100">MV Line Ohmic Loss: {inverterData.mvLineOhmicLoss}</div>
                        <div className="p-2 bg-gray-50">Night Consumption: {inverterData.nightConsumption}</div>
                        <div className="p-2 bg-gray-100">No. of Inverters: {inverterData.no_inverters}</div>
                        <div className="p-2 bg-gray-50">No. MPP Inputs: {inverterData.no_mpp_inputs}</div>
                        <div className="p-2 bg-gray-100">Nominal PV Input Voltage: {inverterData.nominal_pv_input_voltage}</div>
                        <div className="p-2 bg-gray-50">PNOM Ratio: {inverterData.pnomRatio}</div>
                        <div className="p-2 bg-gray-100">System Unavailability: {inverterData.systemUnavailability}</div>
                        <div className="p-2 bg-gray-50">Total Power: {inverterData.total_power}</div>
                        <div className="p-2 bg-gray-100">Unit NOM Power: {inverterData.unit_nom_power}</div>
                        <div className="p-2 bg-gray-50">Unused Energy: {inverterData.unusedEnergy}</div>
                        <div className="col-span-2 p-2 bg-gray-100">Inverter Loss over Nominal Inverter Power: {inverterData.inverterLossOverNominalInverterPower}</div>
                        <div className="col-span-2 p-2 bg-gray-50">Inverter Loss over Nominal Inverter Voltage: {inverterData.inverterLossOverNominalInverterVoltage}</div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="text-sm p-2 bg-gray-50 text-orange-500">Calculated Values of the year</div>
                    {summaryData.map((data, index) => (
                        <table key={index} className="text-left text-sm w-[100%] mb-2 border border-gray-100">
                            <tbody>
                                <tr>
                                    <th className="p-2">Month of {data.month}, {data.year}</th>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">Array NOM Energy MWH:</td>
                                    <td className="bg-gray-100 p-2">{data.arrNomEnrgy_MWh}</td>
                                    <td className="bg-gray-50 p-2">Array NOM Energy KWH KWP per day:</td>
                                    <td className="bg-gray-100 p-2">{data.arrNomEnrgy_kWh_kWp_perDay}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">Array NOM Energy KWH KWP per month:</td>
                                    <td className="bg-gray-100 p-2">{data.arrNomEnrgy_kWh_kWp_perMonth}</td>
                                    <td className="bg-gray-50 p-2">Available Energy at Inverter Output MWH:</td>
                                    <td className="bg-gray-100 p-2">{data.availableEnergyAtInverterOutputMWh}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">Available Energy at Inverter Output per day:</td>
                                    <td className="bg-gray-100 p-2">{data.availableEnergyAtInverterOutputPerDay}</td>
                                    <td className="bg-gray-50 p-2">Available Energy at Inverter Output per month:</td>
                                    <td className="bg-gray-100 p-2">{data.availableEnergyAtInverterOutputPerMonth}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">Collection Loss:</td>
                                    <td className="bg-gray-100 p-2">{data.collectionLoss}</td>
                                    <td className="bg-gray-50 p-2">EGrid MWH:</td>
                                    <td className="bg-gray-100 p-2">{data.egridMWh}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">EGrid per day:</td>
                                    <td className="bg-gray-100 p-2">{data.egridPerDay}</td>
                                    <td className="bg-gray-50 p-2">EGrid per month:</td>
                                    <td className="bg-gray-100 p-2">{data.egridPerMonth}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">Energy at MPPT MWH:</td>
                                    <td className="bg-gray-100 p-2">{data.energyAtMPPTMWh}</td>
                                    <td className="bg-gray-50 p-2">Energy at MPPT per day: </td>
                                    <td className="bg-gray-100 p-2">{data.energyAtMPPTPerDay}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">Energy at MPPT per month:</td>
                                    <td className="bg-gray-100 p-2">{data.energyAtMPPTPerMonth}</td>
                                    <td className="bg-gray-50 p-2">Global Effective Irradiance:</td>
                                    <td className="bg-gray-100 p-2">{data.globalEffIrradiance}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">Perfoemance Ratio:</td>
                                    <td className="bg-gray-100 p-2">{data.performanceRatio}</td>
                                    <td className="bg-gray-50 p-2">Produced Useful Energy:</td>
                                    <td className="bg-gray-100 p-2">{data.producedUsefulEnergy}</td>
                                </tr>
                                <tr>
                                    <td className="bg-gray-50 p-2">System Loss:</td>
                                    <td className="bg-gray-100 p-2"> {data.systemLoss}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
                <div className="p-2 shadow-xl text-slate-700 leading-7">
                    <p className="text-xl font-bold">Performance Ratio:</p>
                    <p>Graph display the performance ratio of the selected configuration.</p>
                </div>
                <div className="shadow-xl p-2">
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
                </div>
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
                            ]
                        }}
                    />
                </div>
                <div className="p-2 shadow-xl text-slate-700 leading-7">
                    <p className="text-xl font-bold">Produced Useful Energy:</p>
                    <p>Graph display the Produced Energy of the selected configuration.</p>
                </div>
                <div className="p-2 shadow-xl text-slate-700 leading-7">
                    <p className="text-xl font-bold">Collection Loss:</p>
                    <p>Graph display the Collection Loss of the selected configuration.</p>
                </div>
                <div className="shadow-xl p-2">
                    <Bar
                        data={{
                            labels: summaryData.map((data) => data.month),
                            datasets: [
                                {
                                    label: "Collection Loss",
                                    data: summaryData.map((data) => data && JSON.stringify(data.collectionLoss).substring(0, 5)),
                                    backgroundColor: [
                                        "rgba(99, 245, 39, 0.8)",
                                    ]
                                },
                            ]
                        }}
                    />
                </div>
                <div className="shadow-xl p-2">
                    <Bar
                        data={{
                            labels: summaryData.map((data) => data.month),
                            datasets: [
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
                </div>
                <div className="p-2 shadow-xl text-slate-700 leading-7">
                    <p className="text-xl font-bold">System Loss:</p>
                    <p>Graph display the System Loss of the selected configuration.</p>
                </div>
            </div>
        </>
    );
}
export default MyGraph;