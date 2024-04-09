import { decodeToken } from "react-jwt";
import { UserData } from "../types";

export function getUserDataFromToken(jwt: string) {
    const payload = decodeToken(jwt) as UserData | null;

    if(!payload) {
        throw new Error();
    }

    return {
        sub: payload.sub,
        nombre: payload.nombre,
        rol: payload.rol,
        imagen: payload.imagen
    };
}