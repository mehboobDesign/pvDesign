import React, { useState, useEffect } from "react";
//import { StepperContext } from "../../../../context/StepperProvider";
import Input from "../../../Common/Input";
import Label from "../../../Common/Label";
import { ONLY_NUMBER_EXCLUDE_0 } from "../../../Common/ValidationConstants";

const Payment = () => {
    //const { userData, setUserData } = useContext(StepperContext);
    const [noOfMonths, setNoOfMonths] = useState('');
    const [validNoOfMonths, setValidNoOfMonths] = useState(false);
    const [noOfMonthsFocus, setNoOfMonthsFocus] = useState(false);

    useEffect(() => {
        const result = ONLY_NUMBER_EXCLUDE_0.test(noOfMonths);
        setValidNoOfMonths(result);
    }, [noOfMonths]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData({ ...userData, [name]: value })
    // }
    return (
        <div className="flex flex-col">

            <div className="w-full md:w-1/2 px-3">
                <Label htmlFor="noOfMonths" nameOfLabel="How many months" validRule={validNoOfMonths} nameOfState={noOfMonths} />
                <Input id="noOfMonths" value={noOfMonths} autoComplete="off"
                    onChange={(e) => setNoOfMonths(e.target.value)}
                    aria_invalid={validNoOfMonths ? "false" : "true"}
                    aria_describedby="noOfMonthsNote"
                    onFocus={() => setNoOfMonthsFocus(true)}
                    onBlur={() => setNoOfMonthsFocus(false)}
                    focusValue={noOfMonthsFocus}
                    validValue={validNoOfMonths}
                    errorMesg="Only give integer number. (Eg if you need for seven months then input just 7)"
                />
            </div>
            {/* <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">Credit Card</div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["creditCard"] || ""}
                        name="creditCard"
                        placeholder="Credit Card"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div> */}

            <div className="w-full mx-2 flex-1">
                {/* <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">Exp</div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["exp"] || ""}
                        name="exp"
                        placeholder="Expairy"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div> */}
            </div>
        </div>
    );
}
export default Payment;