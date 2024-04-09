import { pezumartApi } from "../api/pezumartApi";

export const obtenerRoles = async () => {
  
    const response = await pezumartApi.get("/rol/listar")

    return response;
  }

export  const obtenerUsuarios = async () => {

  const response = await pezumartApi.get("/usuario/listar")

  return response;
}