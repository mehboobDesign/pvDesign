import React from "react";
import Select from'react-select';
import { faInfoCircle,faCheck,faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SelectSearch = (props) => { 
    
    return (
        <>
            <label className="block tracking-wide text-gray-700 text-md font-bold mb-1" htmlFor={props.id}>
                {props.label}
                <span className={props.validRule ? "text-green-400" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={props.validRule ? "hidden" : "text-red-400"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <Select
                id={props.id}
                options={props.options}
                getOptionLabel={props.getOptionLabel}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChange}
                isClearable={true}
                isSearchable={true}
                noOptionsMessage={props.noOptionsMessage}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                styles={{
                    control: (baseStyles) => ({
                                ...baseStyles,
                                border: "none",
                                boxShadow: "none",
                                //borderColor: props.validRule ? 'green' : 'red',
                                padding:"2px",
                                backgroundColor:"rgb(241 245 249)",
                                cursor:"pointer",
                                ":hover":{
                                    backgroundColor:"rgb(226 232 240)",
                                },
                            }),
                            option: (baseStyles) => ({
                                ...baseStyles,
                                backgroundColor: "rgb(241 245 249)",
                                color:"rgb(51 65 85)",
                                cursor:"pointer",
                                ":hover":{
                                    backgroundColor:"rgb(226 232 240)",
                                }
                            })
                        }}
                    />
                <p className={`${props.focusValue && !props.validValue? "text-red-400" : "hidden"}`}>
                    <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                    {props.errorMsg}
                </p>
        </>
    );
}

export default SelectSearch;