import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SelectComponent = (props) => { 
    
    return (
        <>
            <select 
             className="bg-slate-100 w-full dark:bg-slate-200 p-2 rounded-lg text-slate-800 focus:outline-none"
                id={props.id} 
                ref={props.ref}
                values={props.values}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                required
                aria-invalid={props.ariaInvalid}
                aria-describedby={props.ariaDescribedby}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                >
                <option>{props.defaultValue}</option>
                {props.values.map((value,index)=>{ 
                    return <option key={index} value={value.designId}>{value.designId} {value.designName}</option>
                })}   
            </select>
            <p id={props.ariaDescribedby} className={`${props.focusValue && !props.validValue
                    ? "text-red-400" : "hidden"}`}>
                    <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                    {props.errorMesg}
            </p>
        </>
    );
}

export default SelectComponent;