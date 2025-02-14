import React, {useState, useEffect} from "react";
import { Chart as ChartJS, registerables } from "chart.js/auto"; 
import { Bar  } from "react-chartjs-2";
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";
// import Input from "../Input";
// import Label from "../Label";
import Axios from "../../../api/Axios";
// import { NOT_SPECIAL_CHAR, DIRECTION } from '../ValidationConstants';
// import AlertModal from "./AlertModal";
const PERFORMANCE_RATIO = 'graphdata/performance/project/';
const PRODUCED_ENERGY = 'graphdata/producedenergy/project/';
const COLLECTION_LOSS = 'graphdata/collectionloss/project/'; 
const SYSTEM_LOSS = 'graphdata/systemloss/project/';
const YEAR = '/year/';
ChartJS.register(...registerables);
const MyGraph = ({id,onClose}) => {
    const [performanceRatio, setPerformanceRatio] = useState([]);
    const [producedEnergy, setProducedEnergy] = useState([]);
    const [collectionLossData, setCollectionLossData] = useState([]);
    const [systemLoss, setSystemLoss] = useState([]);
    
    useEffect(()=>{
        if(id){
            const getPerformanceRatio = async () => {
                try {
                    await Axios.get(PERFORMANCE_RATIO.concat(id).concat(YEAR).concat(2024))
                    .then(function (response) { 
                        //console.log(response.data);
                        setPerformanceRatio(response.data)
                    })
                } catch (err) {
                    console.log(err);
                }
            };
            const getProducedEnergy = async () => {
                try {
                    await Axios.get(PRODUCED_ENERGY.concat(id).concat(YEAR).concat(2024))
                    .then(function (response) { 
                        //console.log(response.data);
                        setProducedEnergy(response.data)
                    })
                } catch (err) {
                    console.log(err);
                }
            };
            const getCollectionLossDatas = async () => {
                try {
                    await Axios.get(COLLECTION_LOSS.concat(id).concat(YEAR).concat(2024))
                    .then(function (response) { 
                        //console.log(response.data);
                        setCollectionLossData(response.data)
                    })
                } catch (err) {
                    console.log(err);
                }
            };
            const getSystemLoss = async () => {
                try {
                    await Axios.get(SYSTEM_LOSS.concat(id).concat(YEAR).concat(2024))
                    .then(function (response) { 
                        //console.log(response.data);
                        setSystemLoss(response.data)
                    })
                } catch (err) {
                    console.log(err);
                }
            };
            getPerformanceRatio();
            getProducedEnergy();
            getCollectionLossDatas();
            getSystemLoss();
        }
    },[id]);
    const generatePDF = () => {
        const input = document.getElementById("graphSummary");
        const doc = new jsPDF("p", "mm", "a4");
        //const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();
    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL("image/png");
      doc.addImage(img,'JPEG',5,0,200,height); 
      doc.save("chart.pdf");
    });
    };
    return(
        <>  
            <div className="grid grid-cols-7 border-b-2 border-b-gray-100 p-2">
                <div className="col-span-5">
                    <p className='text-3xl text-center font-black text-gray-800'></p>
                </div>
               <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={onClose}>To Dashboard</button>
               <button className="border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500" onClick={()=>generatePDF()}>Download</button>
            </div>
                   <div className="grid md:grid-cols-2 md:gap-4" id="graphSummary">
                    <div className="col-span-2 p-4 text-center text-3xl font-black text-gray-800 border-b-2 border-b-gray-100">Summary Report</div>
                        <div className="p-2 shadow-xl text-slate-700 leading-7">
                            <p className="text-xl font-bold">Performance Ratio:</p>
                            <p>Graph display the performance ratio of the selected configuration.</p>
                        </div>
                        <div className="shadow-xl p-2">
                            <Bar
                                data={{
                                    labels: performanceRatio.map((data)=>data.month),
                                    datasets: [
                                            {
                                            label: "Performance Ratio",
                                            data: performanceRatio.map((data)=>data.value),
                                            backgroundColor:[
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
                                    labels: producedEnergy.map((data)=>data.month),
                                    datasets: [
                                            {
                                            label: "Produced Energy",
                                            data: producedEnergy.map((data)=>data.value),
                                            backgroundColor:[
                                                "rgba(39, 69, 245, 0.8)",
                                            ]
                                            },
                                        ]
                                    }}
                                />
                        </div>
                        <div className="p-2 shadow-xl text-slate-700 leading-7">
                            <p className="text-xl font-bold">Produced Energy:</p>
                            <p>Graph display the Produced Energy of the selected configuration.</p>
                        </div>
                        <div className="p-2 shadow-xl text-slate-700 leading-7">
                            <p className="text-xl font-bold">Collection Loss:</p>
                            <p>Graph display the Collection Loss of the selected configuration.</p>
                        </div>
                        <div className="shadow-xl p-2">
                            <Bar
                                data={{
                                    labels: collectionLossData.map((data)=>data.month),
                                    datasets: [
                                            {
                                            label: "Collection Loss",
                                            data: collectionLossData.map((data)=>data.value),
                                            backgroundColor:[
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
                                    labels: systemLoss.map((data)=>data.month),
                                    datasets: [
                                            {
                                            label: "System Loss",
                                            data: systemLoss.map((data)=>data.value),
                                            backgroundColor:[
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