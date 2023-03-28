import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const isLogged = false;

    return isLogged ? <Outlet /> : <Navigate to='/sign' />
}