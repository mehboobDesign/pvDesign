import React from "react";

const InputComponent = (props) => {
    return (
        <>
        <input 
            type="text" 
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