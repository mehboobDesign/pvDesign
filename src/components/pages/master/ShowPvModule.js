import React, {useEffect, useState} from 'react';
import Axios from '../../../api/Axios';
import PvModuleUpdateModal from '../../Common/Modal/PvModuleUpdateModal';
import AlertModal from '../../Common/Modal/AlertModal';

const GET_PVMODULE_DATA = 'pvmodules/';
const DELETE_PVMODULE = 'pvmodules/delete/';

const ShowPvModule = () => {
  const [pvModulesData, setPvModulesData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setDataId] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [manufacturerName, setManufacturerName] = useState('');

  useEffect(()=>{
    const getAllPvModules = async () => {
        await Axios.get(GET_PVMODULE_DATA)
        .then(function (response) {
          console.log(response);
          setPvModulesData(response.data);
          setUpdating(false);
        })
        .catch(function (error) {
            console.log(error);
          });
      };
      getAllPvModules();
  },[updating]);

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
    await Axios.delete(DELETE_PVMODULE.concat(dataId))
    .then(function (response){
      console.log(response);
      setDeleteModalOpen(false);
      setUpdating(true);
    })
    .catch(function(error){
      console.log(error);
    });
  }


  return (
    <div>
    {pvModulesData.length === 0 ? 
    <div className='dark:text-slate-700 text-slate-700 text-2xl'>
      No entry for PV Modules are found.
    </div> : 
    <div className='grid'><div class="grid grid-cols-3 gap-4">
        {pvModulesData.map((data,index) => ( 
                <div key={index} className='shadow-xl border border-cyan-50'>
                    <h1 className='text-xl font-bold p-4'>{data.pvmodule_id} {data.manufacturer}</h1>
                    <hr/>
                    <div className='p-4 leading-4'>Model: {data.model}</div>
                    <div className='p-4 leading-4'>Unit Nom Power: {data.unitNomPower}</div>
                    <div className='p-4 leading-4'>No of Modules: {data.no_modules}</div>
                    <div className='p-4 leading-4'>Nominal STC: {data.nominal_STC}</div>
                    <hr/>
                    <div className='p-4 text-center'><button className='dark:bg-slate-100 bg-slate-300 p-2 hover:bg-green-400 leading-4' onClick={()=>showSingleData(data.pvmodule_id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    </button>&nbsp;&nbsp;
                    <button className='dark:bg-slate-100 bg-slate-300 p-2 mt-1 hover:bg-red-500' onClick={()=>deleteEntry(data.pvmodule_id,data.manufacturer)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-none hover:fill-white">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                   </svg>
                 </button> 
                  </div>
                </div> 
                
        ))} 
        </div> 
      </div>
    }
    {modalOpen && <PvModuleUpdateModal closeModal={()=>setModalOpen(false)} dataId={dataId} setUpdating={setUpdating}/>}
    <AlertModal deleteModalOpen={deleteModalOpen} onClose={()=>setDeleteModalOpen(false)}>
                 <div className='text-center w-96'>
                   <h3 className='text-lg font-black text-gray-800 p-4'>Confirm Delete</h3>
                   <p className='text-sm text-gray-500 pb-4 pl-4 pr-4'>Are you want to delete {manufacturerName}?</p>
                   <div className='flex gap-4'>
                     <button className="bg-red-500 hover:bg-red-600 text-white font-semibold border border-red-500 hover:border-transparent rounded w-full p-2" onClick={()=>confirmDelete()}>Delete</button>
                     <button className="border border-gray-200 bg-gray-200 text-slate-700 hover:bg-gray-100 w-full p-2" onClick={()=>setDeleteModalOpen(false)}>Cancel</button>
                   </div>
                 </div>
               </AlertModal>
  </div>
  )
}

export default ShowPvModule;