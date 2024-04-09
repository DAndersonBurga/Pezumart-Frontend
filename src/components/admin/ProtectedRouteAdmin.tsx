import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ROL from "../../constants/rol";

const ProtectedRouteAdmin = () => {

    const  { user } = useAuth()
    
    if(user.rol === ROL.ADMINISTRADOR) {
        return <Outlet />
    } else {
        return <Navigate to={"/admin/dashboard"}/>
    }
}

export default ProtectedRouteAdmin