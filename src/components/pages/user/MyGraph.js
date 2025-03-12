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
        const doc = new jsPDF("p", "pt", "a4");
        doc.setFontSize(20);
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
                <div className="md:grid-cols-2 md:gap-1">
                    <div className="col-span-2 text-center">
                        <div className="pl-3 text-xl font-extrabold">Summary Report of Project Name: {projectData.project_name}</div>
                        <div className="pl-3 pb-2 text-sm">User Name: {userData.name}</div>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 md:gap-1 text-sm">
                    <div className="col-span-4 p-3 font-bold"> Project Description</div>
                    <div className="p-3">Location: <span>{projectData.project_location}</span></div>
                    <div className="p-3">Longitude: <span >{projectData.project_longitude}</span></div>
                    <div className="p-3">Latitude: <span >{projectData.project_latitude}</span></div>
                    <div className="p-3">Year: <span>{projectData.year}</span></div>
                </div>
                <div className="grid md:grid-cols-4 text-sm">
                    <div className="col-span-4 p-3 font-bold">Design Configuration Description</div>
                    <div className="col-span-4 p-3">Configuration Name: {designConfigData.designName}</div>
                    <div className="p-3">Active Power: {designConfigData.active_power}</div>
                    <div className="p-3">Azimuth: {designConfigData.azimuth}</div>
                    <div className="p-3">Bifaciality Factor: {designConfigData.bifaciality_factor}</div>
                    <div className="p-3">GCR: {designConfigData.gcr}</div>
                    <div className="p-3">Ground Albido: {designConfigData.ground_albido}</div>
                    <div className="p-3">Height Above Ground: {designConfigData.height_above_ground}</div>
                    <div className="p-3">Limit Profile Angle: {designConfigData.limit_profile_angle}</div>
                    <div className="p-3">PNOM Ratio: {designConfigData.pnom_ratio}</div>
                    <div className="p-3">Rear Mismatch Loss: {designConfigData.rear_mismatch_loss}</div>
                    <div className="p-3">Rear Shading Factor: {designConfigData.rear_shading_factor}</div>
                    <div className="p-3">Shed Transparent Fraction: {designConfigData.shed_transparent_fraction}</div>
                    <div className="p-3">Sheds Spacing: {designConfigData.sheds_spacing}</div>
                    <div className="p-3">Sheds Width: {designConfigData.sheds_width}</div>
                    <div className="p-3">Tilt: {designConfigData.tilt}</div>
                    <div className="p-3">Tracker Spacing: {designConfigData.tracker_spacing}</div>
                    <div className="p-3">Tracker Width: {designConfigData.tracker_width}</div>
                    <div className="p-3">Tracking Axis Horizontal: {designConfigData.tracking_axis_horizontal}</div>
                </div>
                <div className="grid md:grid-cols-3 text-sm">
                    <div className="col-span-3 p-3 font-bold">PV Module Description</div>
                    <div className="p-3 col-span-3">Manufacturer Name: {pvModuleData.manufacturer}</div>
                    <div className="p-3">Model Name: {pvModuleData.model}</div>
                    <div className="p-3">Type: {pvModuleData.type}</div>
                    <div className="p-3">Current Short Circuit ISC:{pvModuleData.current_short_circuit_isc}</div>
                    <div className="p-3">Light Induced Degradation: {pvModuleData.lightInducedDegradation}</div>
                    <div className="p-3">Max Power Voltage VMPP:{pvModuleData.max_power_voltage_vmpp}</div>
                    <div className="p-3">Max Power Current IMPP:{pvModuleData.max_power_current_impp}</div>
                    <div className="p-3">Mismatch For back Irradiance:{pvModuleData.mismatchForBackIrradiance}</div>
                    <div className="p-3">Mismatch Loss: {pvModuleData.mismatchLoss}</div>
                    <div className="p-3">Module Degradation Loss: {pvModuleData.moduleDegradationLoss}</div>
                    <div className="p-3">Module Quality Loss: {pvModuleData.moduleQualityLoss}</div>
                    <div className="p-3">Module Breadth: {pvModuleData.module_breadth}</div>
                    <div className="p-3">Module Length: {pvModuleData.module_length}</div>
                    <div className="p-3">Module Thickness: {pvModuleData.module_thickness}</div>
                    <div className="p-3">Module Area: {pvModuleData.modulearea}</div>
                    <div className="p-3">Modules in Series: {pvModuleData.modules_in_series}</div>
                    <div className="p-3">Modules in Strings: {pvModuleData.modules_in_strings}</div>
                    <div className="p-3">No. of Modules: {pvModuleData.no_modules}</div>
                    <div className="p-3">Nominal STC: {pvModuleData.nominal_STC}</div>
                    <div className="p-3">Ohmic Wiring Loss: {pvModuleData.ohmicWiringLoss}</div>
                    <div className="p-3">Panel Wattage: {pvModuleData.panel_wattage}</div>
                    <div className="p-3">PV Loss due to Irrandiance: {pvModuleData.pvLossDueToIrradiance}</div>
                    <div className="p-3">PV Loss due to Temparature: {pvModuleData.pvLossDueToTemperature}</div>
                    <div className="p-3">Temp Coecient of ISC: {pvModuleData.temp_coecient_of_isc}</div>
                    <div className="p-3">Temp Coecient of PMAX:{pvModuleData.temp_coecient_of_pmax}</div>
                    <div className="p-3">Temp Coecient of VOC: {pvModuleData.temp_coecient_of_voc}</div>
                    <div className="p-3">Unit NOM Power: {pvModuleData.unitNomPower}</div>
                    <div className="p-3">Voltage Open Circuit VOC: {pvModuleData.voltage_open_circuit_voc}</div>
                    <div className="p-3">Module Efficiency at STC: {pvModuleData.module_efficiency_at_stc}</div>
                </div>
                <div className="grid md:grid-cols-3 text-sm">
                    <div className="col-span-3 p-3 font-bold">Inverter Description</div>
                    <div className="col-span-3 p-3">Manufacturer Name: {inverterData.manufacturer}</div>
                    <div className="p-3">Model: {inverterData.model}</div>
                    <div className="p-3">Type: {inverterData.type}</div>
                    <div className="p-3">AC Ohmic Loss: {inverterData.acOhmicLoss}</div>
                    <div className="p-3">AC OP Power: {inverterData.ac_op_power}</div>
                    <div className="p-3">AC Voltage Range: {inverterData.ac_voltage_range_start} - {inverterData.ac_voltage_range_end}</div>
                    <div className="p-3">Auxiliaries: {inverterData.auxiliaries}</div>
                    <div className="p-3">High Voltage Transformation Loss: {inverterData.highVoltageTransfoLoss}</div>
                    <div className="p-3">HV Line Ohmic Loss: {inverterData.hvLineOhmicLoss}</div>
                    <div className="p-3">Inverter Loss due to Max Input Current: {inverterData.inverterLossDueToMaxInputCurrent}</div>
                    <div className="p-3">Inverter Loss due to Power Threshold: {inverterData.inverterLossDueToPowerThreshold}</div>
                    <div className="p-3">Inverter Loss due to Voltage Threshold: {inverterData.inverterLossDueToVoltageThreshold}</div>
                    <div className="p-3">Inverter Loss during Operation: {inverterData.inverterLossDuringOperation}</div>
                    <div className="p-3">Max AC OP Current: {inverterData.max_ac_op_current}</div>
                    <div className="p-3">Max DC ISC: {inverterData.max_dc_isc}</div>
                    <div className="p-3">Max no inupt Connector: {inverterData.max_no_input_connector}</div>
                    <div className="p-3">Max Power at given Temprature: {inverterData.max_powerAtGivenTemp}</div>
                    <div className="p-3">Max PV input Current: {inverterData.max_pv_input_current}</div>
                    <div className="p-3">Max PV input Voltage: {inverterData.max_pv_input_voltage}</div>
                    <div className="p-3">Maximum Power: {inverterData.maximumPower}</div>
                    <div className="p-3">Medium Voltage Transformation Loss: {inverterData.mediumVoltageTransfoLoss}</div>
                    <div className="p-3">Min PV input Voltage: {inverterData.min_pv_input_voltage}</div>
                    <div className="p-3">MPP Voltage range: {inverterData.mpp_volatge_range_start} - {inverterData.mpp_volatge_range_end}</div>
                    <div className="p-3">MPP Voltage Nominal Power range: {inverterData.mpp_volatge_range_nominal_power_start} - {inverterData.mpp_volatge_range_nominal_power_end}</div>
                    <div className="p-3">MV Line Ohmic Loss: {inverterData.mvLineOhmicLoss}</div>
                    <div className="p-3">Night Consumption: {inverterData.nightConsumption}</div>
                    <div className="p-3">No. of Inverters: {inverterData.no_inverters}</div>
                    <div className="p-3">No. MPP Inputs: {inverterData.no_mpp_inputs}</div>
                    <div className="p-3">Nominal PV Input Voltage: {inverterData.nominal_pv_input_voltage}</div>
                    <div className="p-3">PNOM Ratio: {inverterData.pnomRatio}</div>
                    <div className="p-3">System Unavailability: {inverterData.systemUnavailability}</div>
                    <div className="p-3">Total Power: {inverterData.total_power}</div>
                    <div className="p-3">Unit NOM Power: {inverterData.unit_nom_power}</div>
                    <div className="p-3">Unused Energy: {inverterData.unusedEnergy}</div>
                    <div className="col-span-2 p-3">Inverter Loss over Nominal Inverter Power: {inverterData.inverterLossOverNominalInverterPower}</div>
                    <div className="col-span-2 p-3">Inverter Loss over Nominal Inverter Voltage: {inverterData.inverterLossOverNominalInverterVoltage}</div>
                </div>
                <div className="grid text-sm">
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
                </div>
            </div>
            <div className="grid" id="resultGraph">
                <div className="">
                    <div className="shadow-xl p-3">
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
                </div>
                <div className="">
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
                        <div className="text-center text-sm mt-4 text-cyan-950">
                            <p className="font-bold">Graph 2: Produced Useful Energy</p>
                            <p className="">Comparison datas of Produced Useful Energy for the year {projectData.year} of {projectData.project_name}</p>
                        </div>
                    </div>
                </div>
                <div className="">
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
                        <div className="text-center text-sm mt-4 text-cyan-950">
                            <p className="font-bold">Graph 3: Collection Loss</p>
                            <p className="">Comparison datas of Collection Loss for the year {projectData.year} of {projectData.project_name}</p>
                        </div>
                    </div>
                </div>
                <div className="">
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
                        <div className="text-center text-sm mt-4 text-cyan-950">
                            <p className="font-bold">Graph 4: System Loss</p>
                            <p className="">Comparison datas of System Loss for the year {projectData.year} of {projectData.project_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyGraph;