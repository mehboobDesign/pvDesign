import { createContext } from "react";

export const StepperContext = createContext(null);





// import { createContext, useState } from "react";

// const StepperContext = createContext({});

// export const StepperProvider = ({ children }) => {
//     const [stepperData, setStepperData] = useState({});

//     //console.log(auth);

//     return (
//         <StepperContext.Provider value={{ stepperData, setStepperData }}>
//             {children}
//         </StepperContext.Provider>
//     )
// }

// export default StepperContext;