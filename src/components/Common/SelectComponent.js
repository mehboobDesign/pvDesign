import React from "react";


const SelectComponent = (props) => {
    
    return (
        <>
            <select 
                id={props.id} 
                className="bg-gray-50 
                     text-gray-500 text-md
                      block w-full p-2.5
                      focus: outline-none
                      focus:ring focus:ring-slate-200
                        dark:bg-slate-200
                         dark:border-gray-600
                          dark:placeholder-slate-800
                           dark:text-slate-800
                           "
                onChange={props.onChange}
                required
                aria-invalid={props.ariaInvalid}
                aria-describedby={props.ariaDescribedby}
                onFocus={props.onFocus}
                >
                <option>{props.defaultValue}</option>
                {props.values.map((value,index)=>{ 
                    return <option key={index} value={value}>{value}</option>
                })}   
            </select>
        </>
    );
}

export default SelectComponent;