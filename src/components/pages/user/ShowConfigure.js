import React, { useState, useEffect } from "react";
import Axios from "../../../api/Axios";
import useAuth from "../../Hooks/UseAuth";

const GET_DESIGN_DATA_BY_ID = 'design/user/';
const ShowConfigure = () => {

    const { auth } = useAuth();
    const [designDataById, setDesignDataById] = useState([]);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const getDesignDataById = async () => {
            await Axios.get(GET_DESIGN_DATA_BY_ID.concat(auth.userId))
                .then(function (response) {
                    console.log(response);
                    setDesignDataById(response.data);
                    setUpdating(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getDesignDataById();
    }, [updating, auth.userId]);

    console.log(designDataById);
    return (
        <>
            {designDataById.length === 0 ?
                <div className='dark:text-slate-700 text-slate-700 text-2xl'>
                    No entry for Design Configuration are found.
                </div>
                :
                <div className='grid'>
                    <div className="grid grid-cols-2 gap-6">
                        {designDataById.map((data, index) => (
                            <div key={index} className='shadow-xl border border-gray-200'>
                                <h1 className='text-sm font-bold p-4'>{data.designId} {data.designName}</h1>
                                <div className='grid grid-cols-2 gap-1 text-xs [&>*]:[&>*]:text-orange-800 [&>*]:[&>*]:font-black [&>*]:p-2 [&>*:nth-child(odd)]:bg-gray-100 [&>*:nth-child(even)]:bg-gray-50'>
                                    <div>Active Power: <span>{data.active_power}</span></div>
                                    <div>Azimuth: <span>{data.azimuth}</span></div>
                                    <div>Bifaciality Factor: <span>{data.bifaciality_factor}</span></div>
                                    <div>GCR: <span>{data.gcr}</span></div>
                                    <div>Ground Albido: <span>{data.ground_albido}</span></div>
                                    <div>Height above Ground: <span>{data.height_above_ground}</span></div>
                                    <div>Limit Profile Angle: <span>{data.limit_profile_angle}</span></div>
                                    <div>Pnom Ratio: <span>{data.pnom_ratio}</span></div>
                                    <div>Rear Mismatch Loss: <span>{data.rear_mismatch_loss}</span></div>
                                    <div>Rear Shading Factor: <span>{data.rear_shading_factor}</span></div>
                                    <div>Shed Transparent Fraction: <span>{data.shed_transparent_fraction}</span></div>
                                    <div>Sheds Spacing: <span>{data.sheds_spacing}</span></div>
                                    <div>Sheds Width: <span>{data.sheds_width}</span></div>
                                    <div>Tilt: <span>{data.tilt}</span></div>
                                    <div>Tracker Spacing: <span>{data.tracker_spacing}</span></div>
                                    <div>Tracker Width: <span>{data.tracker_width}</span></div>
                                    <div>Tracking Axis Horizontal: <span>{data.tracking_axis_horizontal}</span></div>
                                </div>
                                <div className='p-3 text-center'>
                                    <button className='dark:bg-green-600 bg-green-600 p-2 text-white hover:bg-green-500 leading-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </button>
                                    <button className='dark:bg-red-600 bg-red-600 p-2 mt-1 text-white hover:bg-red-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-4 fill-none">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}
export default ShowConfigure;