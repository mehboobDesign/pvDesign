import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";


import "./stepperTest.css";

const Stepper = () => {
    const steps = ['Customer Info', 'Shipping Info', 'Payment'];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);
    return (
        <div className="">
            <div className="flex">
                {
                    steps.map((step, i) => (
                        <div key={i} className={`step-item ${currentStep === i + 1 && "active"} 
                        ${(i + 1 < currentStep || complete) && 'complete'}`}>
                            <div className="step">
                                {
                                    (i + 1 < currentStep || complete) ? <FontAwesomeIcon icon={faCheck} /> : i + 1
                                }
                            </div>
                            <p className="text-gray-500">{step}</p>
                        </div>
                    ))
                }
            </div>
            {!complete && (
                <button className="bg-green-600 p-4 text-white" onClick={() => {
                    currentStep === steps.length ? setComplete(true) :
                        setCurrentStep((prev) => prev + 1)
                }}>{currentStep === steps.length ? "Finish" : "Next"}</button>
            )}
        </div>
    );

};
export default Stepper;