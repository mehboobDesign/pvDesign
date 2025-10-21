import React, { useContext, useState } from "react";
import { StepperContext } from "../../../../context/StepperProvider";
import Input from "../../../Common/Input";
import Label from "../../../Common/Label";
import SelectComponent from "../../../Common/SelectComponent";
import { ONLY_NUMBER_EXCLUDE_0 } from "../../../Common/ValidationConstants";

const SelectPlan = () => {
    const { userData, setUserData } = useContext(StepperContext);

    const [noOfMonths, setNoOfMonths] = useState('');
    const [validNoOfMonths, setValidNoOfMonths] = useState(false);
    const [noOfMonthsFocus, setNoOfMonthsFocus] = useState(false);

    const [validSelection, setValidSelection] = useState(false);
    const [selectionFocus, setSelectionFocus] = useState(false);


    // useEffect(() => {
    //     const result = ONLY_NUMBER_EXCLUDE_0.test(noOfMonths);
    //     setValidNoOfMonths(result);
    //     if (result) {
    //         setUserData({ ...userData, "months": noOfMonths });
    //     } else {
    //         setUserData({ ...userData, "months": '' });
    //     }


    // }, [noOfMonths]);



    const handleMonths = (e) => {
        setNoOfMonths(e.target.value);
        const result = ONLY_NUMBER_EXCLUDE_0.test(noOfMonths);
        setValidNoOfMonths(result);
        if (validNoOfMonths) {

            setUserData({ ...userData, "months": noOfMonths });
        } else {
            setUserData({ ...userData, "months": '' });
        }
    }

    const handlePlan = (e) => {
        console.log(e.target.value);
        if (e.target.value === 'Select Plan') {
            setUserData({ ...userData, "plan": '' });
            setValidSelection(false);
        }
        else {
            setUserData({ ...userData, "plan": e.target.value });
            setValidSelection(true);
        }

    }

    // const handleChange = (e) => {
    //     //const { name, value } = e.target;

    //     setUserData(e)
    // }



    const plans = ['Basic', 'Advance']
    return (
        <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
                <Label htmlFor="selectPlan" nameOfLabel="Choose plan" />
                <SelectComponent
                    id="selectPlan"
                    // ref={userRef}
                    values={plans}
                    onChange={(e) => handlePlan(e)}
                    defaultValue="Select Plan"
                    ariaInvalid={validSelection ? "false" : "true"}
                    ariaDescribedby="Test"
                    onFocus={() => setSelectionFocus(true)}
                    onBlur={() => setSelectionFocus(false)}
                    focusValue={selectionFocus}
                    validValue={validSelection}
                    errorMesg="Please select a plan from the list"
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <Label htmlFor="noOfMonths" nameOfLabel="How many months" validRule={validNoOfMonths} nameOfState={noOfMonths} />
                <Input id="noOfMonths" value={noOfMonths} autoComplete="off"
                    //onChange={(e) => setNoOfMonths(e.target.value)}
                    onChange={(e) => handleMonths(e)}
                    aria_invalid={validNoOfMonths ? "false" : "true"}
                    aria_describedby="noOfMonthsNote"
                    onFocus={() => setNoOfMonthsFocus(true)}
                    onBlur={() => setNoOfMonthsFocus(false)}
                    focusValue={noOfMonthsFocus}
                    validValue={validNoOfMonths}
                    errorMesg="Only give integer number. (Eg if you need for seven months then input just 7)"
                />
                {/* <Input
                    onChange={handleChange}
                    value={userData["city"] || ""}
                    name="city"
                    placeholder="City"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                /> */}
            </div>
        </div>
    );
}
export default SelectPlan;