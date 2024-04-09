import { Link } from "react-router-dom"
import { Categoria, ImagenProducto, Producto as ProductoType, UsuarioProducto } from "../../types"

import '../../scss/admin/productoDashboard.scss'
import { pezumartApi } from "../../api/pezumartApi"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

interface ProductoProps {
    id: number
    categoria: Categoria
    descripcion: string
    disponible: boolean
    fechaCreacion: Date
    precio: number
    cantidadDisponible: number
    nombre: string
    usuario: UsuarioProducto
    imagenes: ImagenProducto[]
    setProductos: React.Dispatch<React.SetStateAction<ProductoType[]>>
    setTotalPaginas: React.Dispatch<React.SetStateAction<number>>
    setProductoTotales: React.Dispatch<React.SetStateAction<number>>
    setPaginaActual: React.Dispatch<React.SetStateAction<number>>
}

const Producto = ({ id, descripcion,
                    fechaCreacion, precio, cantidadDisponible, nombre,
                    usuario, imagenes, setProductoTotales, setProductos,
                    setPaginaActual, setTotalPaginas } : ProductoProps) => {

    const fecha = new Date(fechaCreacion)
    const fechaCreacionString = fecha.toLocaleDateString()

    const handleClickDestacarProducto = async (id: number) => {
        const productoADestacar = {
            "productoId" : id
        }

        try {
            const response = await pezumartApi.post(`/producto/destacar`, {
                ...productoADestacar
            })
    
            if(response.status === 200) {
                toast.success("Producto destacado")
            }
        } catch (error: any) {
            toast.error(error.response.data.backendMessage)
        }

    }    
    
    const handleClickEliminarProducto = async (id: number) => {
        Swal.fire({
            title: "Estas Seguro?",
            text: "Quieres Eliminar Este producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero eliminarlo!"
          }).then((result) => {
            if (result.isConfirmed) {
                pezumartApi.delete(`/producto/eliminar/${id}`)
                .then(response => {
                    if(response.status === 200) {
                        Swal.fire({
                            title: "Eliminado!",
                            text: response.data.mensaje,
                            icon: "success"
                        });

                        pezumartApi.get('/producto/listar')
                            .then(response => response.data)
                            .then(data => {
                                setProductos(data.content)
                                setTotalPaginas(data.totalPages)
                                setProductoTotales(data.totalElements)
                                setPaginaActual(0)
                            })

                        
                    } else {
                        toast.error("Error al eliminar producto")
                    }
                })
            }
        });
    }
    
  return (
    <div className='producto-dashboard'>
        <div className='producto-dashboard-imagen-container'>
            <img className='producto-dashboard-imagen' src={imagenes[0].imagenUrl} alt={`Imagen Producto-dashboard ${nombre}`} />

        </div>

        <div className='producto-dashboard-info'>
            <Link
                to={`/admin/dashboard/productos/${id}`}
            >
                <h3 className='producto-dashboard-info__nombre'>{nombre.substring(0, 16)}{nombre.length > 16 ? "..." : ""}</h3>
            </Link>
            <p className='producto-dashboard-info__precio'>${precio}</p>
            <p className="producto-dashboard-info__descripcion">{descripcion.substring(0, 60)}...</p>
            <p className="producto-dashboard-info__fecha">Publicado: <span>{fechaCreacionString}</span></p>
            <p className="producto-dashboard-info__cantidad-disponible">Cantidad disponible: <span>{cantidadDisponible}</span></p>

            <div className="producto-dashboard-info__autor">
                <p className="producto-dashboard-info__autor-nombre">Autor: <span>{usuario.nombreCompleto.substring(0, 10)}</span></p>
                <img className="producto-dashboard-info__autor-imagen" src={usuario.imagenUrl} alt={`imagen ${usuario.nombreCompleto}`} />
            </div>

            <div className="producto-dashboard-info__botones">

                <button
                    className="producto-dashboard-info__boton-destacado"
                    onClick={() => handleClickDestacarProducto(id)}
                >
                    Destacar
                </button>
                <button 
                    className="producto-dashboard-info__boton-eliminar"
                    onClick={() => handleClickEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    </div>
  )
}

export default Producto