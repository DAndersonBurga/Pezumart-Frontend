import axios from "axios"

export const buscarProductosPorNombre = async (query: string) => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/buscar?nombre=${query}`)
    return data;
}

export const obtenerProductosApi = async (pagina: number = 0) => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/listar?page=${pagina}`)
    return data;
}

export const obtenerProductosPorIdApi = async (id: number) => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/${id}`)
    return data;
}