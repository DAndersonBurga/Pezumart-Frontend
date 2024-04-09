import Swal from "sweetalert2"
import { pezumartApi } from "../../api/pezumartApi"
import { ProductoDestacado as ProductoDestacadoType } from "../../types"
import { toast } from "react-toastify"

interface ProductoDestacadoProps {
    id: number
    nombre: string
    imagen: string
    descripcion: string
    precio: number
    imagenAutor: string
    nombreAutor: string
    publicado: Date
    setProductosDestacados: React.Dispatch<React.SetStateAction<ProductoDestacadoType[]>>
}

const ProductoDestacado = ({ id, nombre, imagen, descripcion,
                            precio, imagenAutor, nombreAutor, publicado,
                            setProductosDestacados } : ProductoDestacadoProps) => {

    const handleClickEliminarProductoDestacado = async (id: number) => {
        
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
                pezumartApi.delete(`/producto/destacado/eliminar/${id}`)
                .then(response => {
                    if(response.status === 200) {
                        Swal.fire({
                            title: "Eliminado!",
                            text: response.data.mensaje,
                            icon: "success"
                        });

                        pezumartApi.get('/producto/destacados')
                            .then(response => response.data)
                            .then(data => {
                                setProductosDestacados(data)
                            })

                        
                    } else {
                        toast.error("Error al eliminar producto destacado")
                    }
                })
            }
          });
    }
    
  return (
    <div className="producto-destacado">
        <div className="producto-destacado__imagen-contenedor">
            <img className="producto-destacado__imagen" src={imagen} alt="" />
        </div>

        <div className="producto-destacado__info">
            <h3 className="producto-destacado__nombre">{nombre}</h3>
            <p className="producto-destacado__precio">${precio}</p>
            <p className="producto-destacado__descripcion">{descripcion}</p>
            <div className="producto-destacado__autor">
                <p className="producto-destacado__autor-nombre">Autor: <span>{nombreAutor}</span></p>
                <img className="producto-destacado__autor-imagen" src={imagenAutor} alt={`Imagen autor ${nombreAutor}`} />
            </div>
            <p className="producto-destacado__fecha">Publicado <span>{new Date(publicado).toLocaleDateString()}</span></p>
        </div>

        <div className="producto-destacado__botones">
            <button 
                className="producto-destacado__boton-eliminar"
                onClick={() => handleClickEliminarProductoDestacado(id)}
            >Eliminar Destacado</button>
        </div>
    </div>
  )
}

export default ProductoDestacado