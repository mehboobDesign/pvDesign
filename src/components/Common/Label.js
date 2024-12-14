import React from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Label =({htmlFor, nameOfLabel, validRule, nameOfState})=>{
    return(
        <>
            <label className="block tracking-wide text-gray-700 text-md font-bold mb-1" htmlFor={htmlFor}>
                {nameOfLabel}
                <span className={validRule ? "text-green-400" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validRule || !nameOfState ? "hidden" : "text-red-400"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
        </>
    );
}
export default Label;