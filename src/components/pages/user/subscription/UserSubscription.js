import React, { useState } from "react";
import { StepperContext } from "../../../../context/StepperProvider";
import Axios from "../../../../api/Axios";
//import { StepperProvider } from "../../../../context/StepperProvider";
import Stepper from "../../../Common/Stepper";
import StepperControl from "../../../Common/StepperControl";
import Account from "./Account";
import Final from "./Final";
import Payment from "./Payment";
import SelectPlan from "./SelectPlan";

const SUBSCRIPTION = '/subscription/subscribe/';

const UserSubscription = ({ userId }) => {

    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState('');
    const [finalData, setFinalData] = useState([]);
    const steps = [
        "Account Information",
        "Select Plan",
        "Payment",
        "Complete Subscription"
    ];

    const displayStep = (step) => {
        switch (step) {
            case 1: return <Account />;
            case 2: return <SelectPlan />
            case 3: return <Payment />;
            case 4: return <Final setCurrentStep={setCurrentStep} />;

            default:
        }
    }

    const handleStepsClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const goToSubscribed = async () => {
        try {
            const response = await Axios.post(SUBSCRIPTION.concat(userId).concat(/plan/).concat('BASIC').concat(/months/).concat(2)

            );
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="md:w-full mx-auto shadow-xl rounded-2xl pb-2">
            <div className="">
                <h1 className="pt-2 font-extrabold text-2xl text-center">You are not a subscribed user, please follow the following steps to subscribed our services.</h1>
                {/* <button onClick={goToSubscribed} className="pt-2 pb-2 pl-3 pr-3 bg-orange-500 text-white hover:bg-orange-600">Subscribed</button> */}
            </div>
            <div>
                <div className="container horizontal mt-5">
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>

                <div className="my-10 p-10">
                    <StepperContext.Provider value={{
                        userData,
                        setUserData,
                        finalData,
                        setFinalData
                    }}>
                        {displayStep(currentStep)}
                    </StepperContext.Provider>
                </div>

                {currentStep !== steps.length &&
                    <StepperControl handleStepsClick={handleStepsClick} currentStep={currentStep} steps={steps} userData={userData} />}
            </div>
        </div>
    );
}

export default UserSubscription;