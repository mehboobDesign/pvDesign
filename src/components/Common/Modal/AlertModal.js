import React from "react";

const AlertModal = ({deleteModalOpen, onClose, children}) => { 
    return(
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors
        ${deleteModalOpen ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e)=>e.stopPropagation()} 
            className={`bg-white rounded-xl shadow p-6 transition-all
            ${deleteModalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-2 font-bold text-gray-400 bg-white
                hover:bg-gray-50 hover:text-red-500">X</button>
                {children}
            </div>
        </div>
    );
}
export default AlertModal;