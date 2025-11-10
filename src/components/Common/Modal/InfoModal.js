import React, { useState, useEffect } from "react";
import Axios from "../../../api/Axios";

const GET_INVERTER_BY_ID = "inverter/";
const GET_PVMODULE_BY_ID = "pvmodules/";
const InfoModal = ({ modalOpen, onClose, id, tag }) => {

    const [invDataById, setInvDataById] = useState('');
    const [currentInv, setCurrentInv] = useState([]);
    const [totalInvPage, setTotalInvPage] = useState('');
    const [currentInvPage, setCurrentInvPage] = useState(0);
    const [countInvInc, setCountInvInc] = useState(1);

    const [pvDataById, setPvDataById] = useState('');
    const [currentPv, setCurrentPv] = useState([]);
    const [totalPvPage, setTotalPvPage] = useState('');
    const [currentPvPage, setCurrentPvPage] = useState(0);
    const [countPvInc, setCountPvInc] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setCurrentInvPage(0);
        setCurrentPvPage(0);
        setCountInvInc(1);
        setCountPvInc(1);
    }, [id]);

    useEffect(() => {
        const getInverterById = async () => {
            setIsLoading(true);
            try {
                await Axios.get(GET_INVERTER_BY_ID.concat(id))
                    .then(function (response) {
                        setInvDataById(response.data)
                        setIsLoading(false);
                    })
            } catch (err) {
                setIsLoading(false);
                console.log(err);
            }
        };
        const getPvmoduleById = async () => {
            setIsLoading(true);
            try {
                await Axios.get(GET_PVMODULE_BY_ID.concat(id))
                    .then(function (response) {
                        setPvDataById(response.data)
                        setIsLoading(false);
                    })
            } catch (err) {
                setIsLoading(false);
                console.log(err);
            }
        };
        if (tag === 'inv') {
            getInverterById();
        }
        if (tag === 'pv') {
            getPvmoduleById();
        }

    }, [tag, id]);

    useEffect(() => {
        const totalData = Object.keys(invDataById).length;
        const page = totalData / 5;
        setTotalInvPage(page);
    }, [invDataById]);

    useEffect(() => {
        const totalData = Object.keys(pvDataById).length;
        const page = totalData / 5;
        setTotalPvPage(page);
    }, [pvDataById]);

    useEffect(() => {
        const lastPostIndex = currentInvPage + 5;
        const firstPostIndex = lastPostIndex - 5;
        setCurrentInv(Object.entries(invDataById).slice(firstPostIndex, lastPostIndex));
    }, [currentInvPage, invDataById])

    useEffect(() => {
        const lastPostIndex = currentPvPage + 5;
        const firstPostIndex = lastPostIndex - 5;
        setCurrentPv(Object.entries(pvDataById).slice(firstPostIndex, lastPostIndex));
    }, [currentPvPage, pvDataById])

    const nextPage = () => {
        if (tag === 'inv') {
            setCurrentInvPage(prevCount => prevCount + 5);
            setCountInvInc(prevCount => prevCount + 1);
        }
        if (tag === 'pv') {
            setCurrentPvPage(prevCount => prevCount + 5);
            setCountPvInc(prevCount => prevCount + 1);
        }

    }
    const prevPage = () => {
        if (tag === 'inv') {
            setCurrentInvPage(prevCount => prevCount - 5);
            setCountInvInc(prevCount => prevCount - 1);
        }
        if (tag === 'pv') {
            setCurrentPvPage(prevCount => prevCount - 5);
            setCountPvInc(prevCount => prevCount - 1);
        }

    }

    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors
        ${modalOpen ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all
            ${modalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full font-bold text-gray-400 bg-white
                hover:bg-gray-50 hover:text-red-500">X</button>
                <div className="text-md font-bold">Details of Selected {tag === 'inv' ? 'Inverter' : 'PV'} Module</div>
                {isLoading ? <>Loading</> :
                    <>
                        {tag === 'inv' &&
                            <div className="bg-slate-100 p-4 min-w-96">
                                {
                                    Object.values(currentInv).map(([keys, value]) =>
                                        <div className="p-2 text-sm" key={keys}>{keys} <span className="text-fuchsia-600 text-lg underline">{JSON.stringify(value)}</span></div>
                                    )
                                }
                                <div className="border-t-2 pt-2">
                                    <button className="bg-slate-300 p-2 text-sm" onClick={prevPage} disabled={countInvInc === 1 ? true : false}>Back</button>
                                    <button className="bg-orange-300 p-2 text-sm" onClick={nextPage} disabled={countInvInc === totalInvPage ? true : false}>Next</button>
                                    <span className="text-sm mt-2 float-right"><span className="text-fuchsia-600 text-lg">{countInvInc}</span> of <span className="text-fuchsia-600 text-lg">{totalInvPage}</span> pages</span>
                                </div>
                            </div>
                        }
                        {tag === 'pv' &&
                            <div className="bg-slate-100 p-4 min-w-96">
                                {
                                    Object.values(currentPv).map(([keys, value]) =>
                                        <div className="p-2 text-sm" key={keys}>{keys} <span className="text-fuchsia-600 text-lg underline">{JSON.stringify(value)}</span></div>
                                    )
                                }
                                <div className="border-t-2 pt-2">
                                    <button className="bg-slate-300 p-2 text-sm" onClick={prevPage} disabled={countPvInc === 1 ? true : false}>Back</button>
                                    <button className="bg-orange-300 p-2 text-sm" onClick={nextPage} disabled={countPvInc === totalPvPage ? true : false}>Next</button>
                                    <span className="text-sm mt-2 float-right"><span className="text-fuchsia-600 text-lg">{countPvInc}</span> of <span className="text-fuchsia-600 text-lg">{totalPvPage}</span> pages</span>
                                </div>
                            </div>
                        }
                    </>

                }
            </div>
        </div>
    );
}
export default InfoModal;