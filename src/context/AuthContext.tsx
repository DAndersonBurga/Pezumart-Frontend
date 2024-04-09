import { createContext, Suspense, useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserData } from "../types";

import { getUserDataFromToken } from "../helpers/jwt";
import { pezumartApi } from "../api/pezumartApi";

interface AuthContextType {
    user: UserData,
    setUser: (user: UserData) => void,
    login: (correo: string, password: string) => void,
    logout: () => void
    autenticado: boolean,
    setAutenticado: React.Dispatch<React.SetStateAction<boolean>>
}

interface AuthResponse {
    jwt: string
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthContextProvider = () => {

    const [user, setUser] = useState<UserData>({} as UserData);
    const [autenticado, setAutenticado] = useState(false);

    const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login`
    const navigate = useNavigate();
    
    useEffect(() => {
        
        const validarAutenticacion = () => {
            const jwt: string = localStorage.getItem("jwt") || "";
            
        
            if(jwt !== "") {
                const jwtObj = JSON.parse(jwt);
                const user = getUserDataFromToken(jwtObj);
                pezumartApi.defaults.headers.common["Authorization"] = `Bearer ${jwtObj}`;
                setUser(user);
                setAutenticado(true);
            }

        }

        validarAutenticacion();
        
    }, [])


    const login = async (correo: string, password: string) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({correo, password})
        })


        if(response.ok) {
            const data = await response.json() as AuthResponse;

            localStorage.setItem("jwt", JSON.stringify(data.jwt));
            pezumartApi.defaults.headers.common["Authorization"] = `Bearer ${data.jwt}`;

            setAutenticado(true);

            setUser(getUserDataFromToken(data.jwt));

            navigate("/admin/dashboard/mis-productos");
        } else {
            toast.error("Usuario o contraseña incorrectos");
        }

    }

    const logout = () => {
        setUser({} as UserData)
    }

    return (
        <Suspense fallback={"Cargando..."}>
            <AuthContext.Provider 
            value={{
                user,
                setUser,
                login,
                logout,
                autenticado,
                setAutenticado
            }}
        >
           <Outlet />
        </AuthContext.Provider>
        </Suspense>
    )
}


export {
    AuthContextProvider
}

export default AuthContext;