import React, { useState, useEffect } from "react";
import Axios from "../../../api/Axios";

const GET_DESIGN_BY_ID = 'design/id/';
const DesignByIdModal = ({ modalOpen, onClose, id }) => {

    const [designDataById, setDesignDataById] = useState([]);
    const [invDataById, setInvDataById] = useState([]);
    const [pvDataById, setPvDataById] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getDesignById = async () => {
            setIsLoading(true);
            try {
                await Axios.get(GET_DESIGN_BY_ID.concat(id))
                    .then(function (response) {
                        console.log(response.data);
                        setDesignDataById(response.data)
                        setInvDataById(response.data.inverter);
                        setPvDataById(response.data.pvModule)
                        setIsLoading(false);
                    })
            } catch (err) {
                setIsLoading(false);
                console.log(err);
            }
        };
        getDesignById();
    }, [id]);


    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors
        ${modalOpen ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all
            ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full font-bold text-gray-700 bg-slate-200
                hover:bg-gray-50 hover:text-red-500">X</button>
                <div className="p-2 text-md font-bold text-white bg-slate-600">Details of {designDataById.designName}</div>
                {isLoading ? <>Loading</> : <>
                    <table className="text-sm border mt-5">
                        <tbody>
                            <tr className="">
                                <td className="p-2 font-black bg-slate-100" colSpan={3}>Summary of Inverter Module</td>
                            </tr>
                            <tr>
                                <td className="p-2">Manufacturer: <span className="text-lg text-fuchsia-600">{invDataById.manufacturer}</span></td>
                                <td className="p-2">Type: <span className="text-lg text-fuchsia-600">{invDataById.type}</span></td>
                                <td className="p-2">Model: <span className="text-lg text-fuchsia-600">{invDataById.model}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="text-sm border mt-5">
                        <tbody>
                            <tr>
                                <td className="p-2 font-black bg-slate-100" colSpan={3}>Summary of PV Module</td>
                            </tr>
                            <tr>
                                <td className="p-2">Manufacturer: <span className="text-lg text-fuchsia-600">{pvDataById.manufacturer}</span></td>
                                <td className="p-2">Type: <span className="text-lg text-fuchsia-600">{pvDataById.type}</span></td>
                                <td className="p-2">Model: <span className="text-lg text-fuchsia-600">{pvDataById.model}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="text-sm border mt-5">
                        <tbody>
                            <tr>
                                <td className="p-2 font-black bg-slate-100" colSpan={3}>Core Design Configuration Factors</td>
                            </tr>
                            <tr>
                                <td className="p-2">Active Power: <span className="text-lg text-fuchsia-600">{designDataById.active_power}</span></td>
                                <td className="p-2">Albido: <span className="text-lg text-fuchsia-600">{designDataById.albido}</span></td>
                                <td className="p-2">GCR : <span className="text-lg text-fuchsia-600">{designDataById.gcr}</span></td>
                            </tr>
                            <tr>
                                <td className="p-2">Height above Ground: <span className="text-lg text-fuchsia-600">{designDataById.height_above_ground}</span></td>
                                <td className="p-2">I am Factor: <span className="text-lg text-fuchsia-600">{designDataById.iamB0}</span></td>
                                <td className="p-2">Limit Profile Angle: <span className="text-lg text-fuchsia-600">{designDataById.limit_profile_angle}</span></td>
                            </tr>
                            <tr>
                                <td className="p-2">Other Opticial Loss Fraction: <span className="text-lg text-fuchsia-600">{designDataById.otherOpticalLossFrac}</span></td>
                                <td className="p-2">Panel Azimuth Degree: <span className="text-lg text-fuchsia-600">{designDataById.panelAzimuthDeg}</span></td>
                                <td className="p-2">PNom Ratio: <span className="text-lg text-fuchsia-600">{designDataById.pnom_ratio}</span></td>
                            </tr>
                            <tr>
                                <td className="p-2">Rear Mismatch Loss: <span className="text-lg text-fuchsia-600">{designDataById.rear_mismatch_loss}</span></td>
                                <td className="p-2">Rear Shading Factor: <span className="text-lg text-fuchsia-600">{designDataById.rear_shading_factor}</span></td>
                                <td className="p-2">Shading Loss Fraction: <span className="text-lg text-fuchsia-600">{designDataById.shadingLossFrac}</span></td>
                            </tr>
                            <tr>
                                <td className="p-2">Shed Transparent Fraction: <span className="text-lg text-fuchsia-600">{designDataById.shed_transparent_fraction}</span></td>
                                <td className="p-2">Sheds Spacing: <span className="text-lg text-fuchsia-600">{designDataById.sheds_spacing}</span></td>
                                <td className="p-2">Sheds Width: <span className="text-lg text-fuchsia-600">{designDataById.sheds_width}</span></td>
                            </tr>
                            <tr>
                                <td className="p-2">Soiling Loss Fraction: <span className="text-lg text-fuchsia-600">{designDataById.soilingLossFrac}</span></td>
                                <td className="p-2">System Loss Fraction: <span className="text-lg text-fuchsia-600">{designDataById.systemLossFrac}</span></td>
                                <td className="p-2">Tilt Degree: <span className="text-lg text-fuchsia-600">{designDataById.tiltDeg}</span></td>
                            </tr>
                            <tr>
                                <td className="p-2">Tracker Spacing: <span className="text-lg text-fuchsia-600">{designDataById.tracker_spacing}</span></td>
                                <td className="p-2">Tracker Width: <span className="text-lg text-fuchsia-600">{designDataById.tracker_width}</span></td>
                                <td className="p-2">Tracking Axis Horizontal: <span className="text-lg text-fuchsia-600">{designDataById.tracking_axis_horizontal}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </>

                }
            </div>
        </div>
    );
}
export default DesignByIdModal;