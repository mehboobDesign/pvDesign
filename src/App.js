import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import RequireAuth from "./components/auth/RequireAuth";
import Home from "./components/pages/Home";
import Layout from "./components/Layout";
import Register from "./components/login/Register";
//import UseAuth from "../Hooks/UseAuth";

function App() {
  
  return (
   
    <Routes>
        <Route path='/' element={<Layout/>}>
          {/* public routes */}
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          {/* <Route path='unauthorized' element={<Unauthorized/>}></Route> */}

          {/* protected routes*/}
          <Route element={<RequireAuth/>}>
            <Route path='/' element={<Home/>}></Route>
           
            {/* <Route path='disposedList' element={<DisposedList/>}></Route>
            <Route path='pendingList' element={<PendingList/>}></Route>
            <Route path='report' element={<GenReport/>}></Route>
            <Route path='addCase' element={<AddCase/>}></Route> */}
          </Route>
           {/* catch all*/}
           {/* <Route path='*' element={<Missing />}></Route> */}
        </Route>
      </Routes>
  );
}

export default App;
