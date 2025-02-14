import React, { useEffect, useState } from 'react';
import Axios from '../../../api/Axios';
import InverterModuleUpdateModal from '../../Common/Modal/InverterModuleUpdateModal';
import AlertModal from '../../Common/Modal/AlertModal';

const GET_INVERTER_MODULE_DATA = 'inverter/';
const DELETE_INVERTER_MODULE = 'inverter/delete/';

const ShowInverterModule = () => {
  const [inverterModulesData, setInverterModulesData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setDataId] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [manufacturerName, setManufacturerName] = useState('');

  useEffect(() => {
    const getAllInverterModules = async () => {
      await Axios.get(GET_INVERTER_MODULE_DATA)
        .then(function (response) {
          console.log(response);
          setInverterModulesData(response.data);
          setUpdating(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getAllInverterModules();
  }, [updating]);

  const showSingleData = (id) => {
    setDataId(id);
    setModalOpen(true);
  }

  const deleteEntry = (id, manufacturer) => {
    setDataId(id);
    setManufacturerName(manufacturer)
    setDeleteModalOpen(true);
  }

  const confirmDelete = async () => {
    await Axios.delete(DELETE_INVERTER_MODULE.concat(dataId))
      .then(function (response) {
        console.log(response);
        setDeleteModalOpen(false);
        setUpdating(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div>
      {inverterModulesData.length === 0 ?
        <div className='dark:text-slate-700 text-slate-700 text-2xl'>
          No entry for Inverter Modules are found.
        </div> :
        <div className='grid'><div className="grid grid-cols-2 gap-6">

          {inverterModulesData.map((data, index) => (
            <div key={index} className='shadow-xl border border-gray-200'>
              <h1 className='text-sm font-bold p-3'>{data.inverter_id} {data.manufacturer}
                <span className='float-right text-orange-500'>Type: {data.type}</span>
              </h1>
              <div className='grid grid-cols-2 gap-1 text-xs [&>*]:[&>*]:text-orange-800 [&>*]:[&>*]:font-black [&>*]:p-2 [&>*:nth-child(odd)]:bg-gray-100 [&>*:nth-child(even)]:bg-gray-50'>
                <div>Model: <span>{data.model}</span></div>
                <div>PV Input Voltage Range: <span>{data.max_pv_input_voltage} - {data.min_pv_input_voltage}</span></div>
                <div>Nominal PV Input Voltage: <span>{data.nominal_pv_input_voltage}</span></div>
                <div>MPP Voltage Range: <span>{data.mpp_volatge_range_start} - {data.mpp_volatge_range_end}</span></div>
                <div>MPP Voltage Nominal Power Range: <span>{data.mpp_volatge_range_nominal_power_start} - {data.mpp_volatge_range_nominal_power_end}</span></div>
                <div>Number of MPP Inputs: <span>{data.no_mpp_inputs}</span></div>
                <div>Maximum no of Input connector: <span>{data.max_no_input_connector}</span></div>
                <div>Maximum PV Input Current: <span>{data.max_pv_input_current}</span></div>
                <div>Max DC ISC: <span>{data.max_dc_isc}</span></div>
                <div>AC OP Power: <span>{data.ac_op_power}</span></div>
                <div>Maximum AC OP Current: <span>{data.max_ac_op_current}</span></div>
                <div>AC Voltage Range: <span>{data.ac_voltage_range_start} - {data.ac_voltage_range_end}</span></div>
                <div>Unit NOM Power: <span>{data.unit_nom_power}</span></div>
                <div>Maximum Power at Given Temperature: <span>{data.max_powerAtGivenTemp}</span></div>
                <div>PNOM Ratio: <span>{data.pnomRatio}</span></div>
                <div>Inverter Loss during Operation: <span>{data.inverterLossDuringOperation}</span></div>
                <div>Inverter Loss over Nominal Inverter Power: <span>{data.inverterLossOverNominalInverterPower}</span></div>
                <div>Inverter Loss due to Maximum Input Current: <span>{data.inverterLossDueToMaxInputCurrent}</span></div>
                <div>Inverter Loss over Nominal Inverter Voltage: <span>{data.inverterLossOverNominalInverterVoltage}</span></div>
                <div>Inverter Loss due to Power Threshold: <span>{data.inverterLossDueToPowerThreshold}</span></div>
                <div>Inverter Loss due to Voltage Threshold: <span>{data.inverterLossDueToVoltageThreshold}</span></div>
                <div>Night Consumption: <span>{data.nightConsumption}</span></div>
                <div>Auxiliaries: <span>{data.auxiliaries}</span></div>
                <div>AC Ohmic Loss: <span>{data.acOhmicLoss}</span></div>
                <div>Medium Voltage Transformation Loss: <span>{data.mediumVoltageTransfoLoss}</span></div>
                <div>MV Line Ohmic Loss: <span>{data.mvLineOhmicLoss}</span></div>
                <div>High Voltage Transformation Loss: <span>{data.highVoltageTransfoLoss}</span></div>
                <div>HV Line Ohmic Loss: <span>{data.hvLineOhmicLoss}</span></div>
                <div>System Unavailability: <span>{data.systemUnavailability}</span></div>
                <div>Unused Energy: <span>{data.unusedEnergy}</span></div>
              </div>
              <div className='p-3 text-center'><button className='dark:bg-green-600 bg-green-600 p-2 text-white hover:bg-green-500 leading-4' onClick={() => showSingleData(data.inverter_id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </button>
                <button className='dark:bg-red-600 bg-red-600 p-2 mt-1 text-white hover:bg-red-500' onClick={() => deleteEntry(data.inverter_id, data.manufacturer)}>
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
      {<InverterModuleUpdateModal modalOpen={modalOpen} onClose={() => setModalOpen(false)} dataId={dataId} setUpdating={setUpdating} />}
      <AlertModal modalOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className='text-center w-96'>
          <h3 className='text-lg font-black text-gray-800 p-4'>Confirm Delete</h3>
          <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>Are you want to delete {manufacturerName} ?</p>
          <div className='flex gap-4'>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold border border-red-500 hover:border-transparent rounded w-full p-2" onClick={() => confirmDelete()}>Delete</button>
            <button className="border border-gray-200 bg-gray-200 text-slate-700 hover:bg-gray-100 w-full p-2" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </AlertModal>
    </div>
  )
}

export default ShowInverterModule;