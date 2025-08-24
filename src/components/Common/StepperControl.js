import React from "react";
//import UseStepper from "../Hooks/UseStepper";


const StepperControl = ({ handleStepsClick, currentStep, steps, userData }) => {
    //const { stepperData } = UseStepper() || {};
    // console.log(stepperData);
    console.log(userData);
    return (
        <div className="container flex justify-around mt-4 mb-8">
            <button
                onClick={() => handleStepsClick()}
                className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold  cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
                back
            </button>
            <button
                onClick={() => handleStepsClick("next")}
                className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold  cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out">
                {currentStep === steps.length - 1 ? "Confirm" : "Next"}
            </button>
        </div>
    );
}
export default StepperControl;