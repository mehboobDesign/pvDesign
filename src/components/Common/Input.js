import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ id, value, placeHolder, autoComplete, onChange, aria_invalid, aria_describedby, onFocus, onBlur, focusValue, validValue, errorMesg }) => {
    return (
        <>
            <input
                className="bg-gray-100 w-full dark:bg-gray-100 p-2 text-sm text-stone-800 focus:outline-none"
                type="text"
                id={id}
                value={value}
                placeholder={placeHolder}
                autoComplete={autoComplete}
                onChange={onChange}
                required
                aria-invalid={aria_invalid}
                aria-describedby={aria_describedby}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <p id={aria_describedby} className={`${focusValue && !validValue
                ? "text-red-400" : "hidden"} text-sm`}>
                <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                {errorMesg}
            </p>
        </>
    );
}
export default Input;