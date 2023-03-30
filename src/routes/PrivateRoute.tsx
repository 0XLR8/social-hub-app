import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
    const {logged, pending} = useContext(AuthContext);

    if(pending){
        return <Loader />
    }

    return logged ? <Outlet /> : <Navigate to='/sign' />
}