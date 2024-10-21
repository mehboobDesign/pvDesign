import React from "react";

const InputComponent = (props) => {
    return (
        <>
        <input 
            type="text" 
            id={props.id} 
            className="bg-gray-50 
                     text-gray-500 text-sm rounded-lg
                      block w-full p-2.5
                      focus: outline-none
                      focus:ring focus:ring-gray-50
                        dark:bg-slate-800
                         dark:border-gray-600
                          dark:placeholder-gray-400
                           dark:text-white
                           "
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={props.required}
            aria-invalid={props.ariaInvalid}
            aria-describedby={props.ariaDescribedby}
            onFocus={props.onFocus}
            //onBlur={props.onBlur}
            />
        </>
    );
}

export default InputComponent;