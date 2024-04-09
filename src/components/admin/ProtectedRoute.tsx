import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { isExpired } from "react-jwt"

const ProtectedRoute = () => {

    const { autenticado } = useAuth()
    const token = localStorage.getItem("jwt") || "";
    let tokenJson: string = ""

    if(token.trim() !== "") {
        tokenJson = JSON.parse(token) 
    }

    if(isExpired(tokenJson) || !autenticado) {
        return <Navigate to="/admin/login" />
    }

    return <Outlet />;
}

export default ProtectedRoute