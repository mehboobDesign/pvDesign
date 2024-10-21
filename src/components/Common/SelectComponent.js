import React from "react";


const SelectComponent = (props) => {
    
    return (
        <>
            <select 
                id={props.id} 
                className="bg-gray-50
                  text-gray-900 text-sm rounded-lg
                  focus: outline-none
                  focus:ring focus:ring-gray-50
                     block w-full p-2.5
                     dark:bg-slate-800
                      dark:placeholder-gray-400 dark:text-gray-400
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