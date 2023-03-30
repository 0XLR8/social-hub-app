import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
    const {logged, pending} = useContext(AuthContext);

    if(pending){
        return <h1 style={{color: 'white'}}>Loading...</h1>
    }

    return logged ? <Outlet /> : <Navigate to='/sign' />
}