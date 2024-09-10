import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import UseAuth from "../Hooks/UseAuth";

const RequireAuth = () => {
    const { auth } = UseAuth();
    const location = useLocation(); 
    return (
        
        //auth?.user 
          auth?.email 
            ?   <>
                    <Navbar/>
                    <Outlet/>
                </>
               
            : <Navigate to="/login" state={{ from: location }} replace />
        
    );
}
export default RequireAuth;