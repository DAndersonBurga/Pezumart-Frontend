import { toast } from "react-toastify"
import Swal from 'sweetalert2'
import { PageableUsuario } from "../../types"
import { Link } from "react-router-dom"
import '../../scss/admin/usuario.scss'
import { pezumartApi } from "../../api/pezumartApi"

interface UsuarioProps {
    id: number
    nombreCompleto: string
    imagenUrl: string
    rol: string
    setUsuarios: React.Dispatch<React.SetStateAction<PageableUsuario>>
    paginaActual: number
}

const Usuario = ({ id, nombreCompleto, imagenUrl, rol, setUsuarios, paginaActual } : UsuarioProps) => {


    const handleClickEliminar = () => {

        const eliminarUsuarioPorId = async (idUsuario: number) => {

            const resultado = await Swal.fire({
                title: "Estas Seguro?",
                text: "Se eliminara toda la informacion del usuario incluyendo productos sin opcion a recuperarlo!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, quiero eliminarlo!"
            })

            if(resultado.isConfirmed) {

                const responseDelete = await pezumartApi.delete(`/usuario/eliminar/${idUsuario}`)
                
                if(responseDelete.status === 200) {
                    
                    const response = await pezumartApi.get(`/usuario/listar?page=${paginaActual}`)
                    const data = await response.data
                    setUsuarios(data)
                    
                    toast.success(responseDelete.data.mensaje)
                    return
                }
            } else {
                return
            }
                

            toast.error("No se pudo eliminar el usuario")
        }

        eliminarUsuarioPorId(id)
        
    }

  return (
    <div className="usuario">
        <div className="usuario__imagen-contenedor">
                <img className="usuario__imagen" src={imagenUrl} alt={`Imagen ${nombreCompleto}`} />
        </div>

        <div className="usuario__info">
            <h2 className="usuario__nombre">{nombreCompleto.substring(0, 8)}</h2>
            <p className="usuario__rol">{rol}</p>
        </div>

        <div className="usuario__botones">
            <Link to={`/admin/dashboard/usuarios/editar/${id}`}>
                <button
                    type="button"
                    className="usuario__boton"
                >
                    Editar
                </button>
            </Link>
            <button
                type="button"
                className="usuario__boton usuario__boton--eliminar"
                onClick={handleClickEliminar}
            >
                Eliminar
            </button>
        </div>
    </div>
  )
}

export default Usuario