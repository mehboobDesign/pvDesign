
import React from "react";

const Tooltips = ({ position, content, children, onClose }) => {

    return (
        <>

            <div id="tooltips" className="relative cursor-pointer group">
                <div className="mx-2 my-1">
                    {children}
                </div>
                <span className={`absolute inner-block bg-neutral-700 text-white text-xs pl-4 pr-4 pt-3 pb-3 whitespace-nowrap rounded 
                ${position === 0 ? "left-72 -translate-x-1/2 bottom-[calc(100%+5px]" : ""}
                ${position === 1 ? "left-72 top-11 -translate-x-1/2 bottom-[calc(100%+5px]" : ""}
                ${position === 2 ? "left-72 top-[87px] -translate-x-1/2 bottom-[calc(100%+5px]" : ""}
                ${position === 3 ? "left-72 top-32 -translate-x-1/2 bottom-[calc(100%+5px]" : ""}
                `}>
                    {content}
                    <button onClick={onClose} className="absolute text-[9px] -top-1 -right-1 aspect-square rounded-full w-5 h-5 text-white bg-neutral-800
                         hover:bg-neutral-600">X
                    </button>
                    <span className={`absolute inner-block border-[10px] -left-2 top-2 border-t-transparent border-b-transparent border-l-0 border-r-neutral-700
               `}>
                    </span>
                </span>
            </div>


        </>
    );

}

export default Tooltips;