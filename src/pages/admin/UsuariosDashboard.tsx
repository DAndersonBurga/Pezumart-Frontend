import { useEffect, useState } from "react"
import Modal from 'react-modal'
import { toast, ToastContainer } from "react-toastify"
import Usuario from "../../components/admin/Usuario"
import Paginacion from "../../components/Paginacion"
import { PageableUsuario, Rol } from "../../types"
import ROL from "../../constants/rol"
import useAuth from "../../hooks/useAuth"
import { obtenerRoles, obtenerUsuarios } from "../../helpers/usuariosDashboardFunc"
import { pezumartApi } from "../../api/pezumartApi"
import CrearUsuarioForm from "../../components/admin/CrearUsuarioForm"
import { customStyles } from "../../helpers/modal"

import '../../scss/admin/usuarios.scss'
import '../../scss/admin/formularioUsuario.scss'
import { setTitleAndDescription } from "../../helpers/seo"

Modal.setAppElement('#root')

const UsuariosDashboard = () => {

  
  const [paginaActual, setPaginaActual] = useState(0)
  const [modalActivo, setModalActivo] = useState(false)
  const [imagen, setImagen] = useState<string | null>(null)
  const [roles, setRoles] = useState<Rol[]>([])
  const [usuarios, setUsuarios] = useState<PageableUsuario>({} as PageableUsuario)
  
  
  const { user } = useAuth()

  useEffect(() => {

    setTitleAndDescription('Usuarios', 'Administra los usuarios de la tienda')

    const fetchData = async () => {
      try {
          const [roles, usuarios] = await Promise.all([
            obtenerRoles(),
            obtenerUsuarios()
          ]);          
          
          setRoles(roles.data);
          setUsuarios(usuarios.data);
          setPaginaActual(usuarios.data.pageable.pageNumber)
      } catch (error) {
          toast.error("Ocurrió un error al obtener los datos");
      }
  };
    

    if(ROL.ADMINISTRADOR === user?.rol) {
      fetchData()
    } else {
      obtenerUsuarios().then(response => {
        setUsuarios(response.data)
        setPaginaActual(response.data.pageable.pageNumber)
      })
    }
    
  }, [])

  useEffect(() => {

    const obtenerUsuarios = async () => {

      const response = await pezumartApi.get(`/usuario/listar?page=${paginaActual}`)

      const data = await response.data
      setUsuarios(data)
    }

    obtenerUsuarios()
  }, [paginaActual])


  return (
    <div className="usuarios">

      <h2 className="usuarios__total">Total Usuarios: {usuarios.totalElements} - Paginas [0 a {usuarios.totalPages - 1}]</h2>

      <div className="usuarios__grid">
        {usuarios.content?.map(usuario => (
          <Usuario 
            key={usuario.id}
            id={usuario.id}
            nombreCompleto={usuario.nombreCompleto}
            rol={usuario.rol.rol}
            imagenUrl={usuario.imagenUrl}
            setUsuarios={setUsuarios}
            paginaActual={paginaActual}
          />
        ))}
        
      </div>

        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={usuarios.totalPages}
          setPaginaActual={setPaginaActual}
        />

        {user?.rol === ROL.ADMINISTRADOR && (
          <div className="usuarios__agregar">
            <button 
              className="usuarios__agregar-boton"
              onClick={() => setModalActivo(true)}
            >
              +
            </button>
          </div>
        )}

        {user?.rol === ROL.ADMINISTRADOR && (
          <Modal
          isOpen={modalActivo}
          onRequestClose={() => {
            setModalActivo(false)
            setImagen(null)
          }}
          style={customStyles}
          contentLabel="Crear un Usuario"
        >

          <CrearUsuarioForm 
            user={user}
            imagen={imagen}
            roles={roles}
            setImagen={setImagen}
            setModalActivo={setModalActivo}
            setUsuarios={setUsuarios}
          />

          </Modal>
        )}

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  )
}

export default UsuariosDashboard