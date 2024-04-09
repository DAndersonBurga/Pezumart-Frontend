import { ChangeEvent, FormEvent, useRef } from "react"
import ROL from "../../constants/rol"
import { PageableUsuario, Rol, UserData } from "../../types"
import AvatarEditor from "react-avatar-editor"
import { toast } from "react-toastify"
import { base64ToFile, obtenerExtencionDeUnBase64 } from "../../helpers/images"
import { obtenerUsuarios } from "../../helpers/usuariosDashboardFunc"

interface CrearUsuarioFormProps {
    user : UserData
    imagen: string | null
    roles: Rol[]
    setImagen: React.Dispatch<React.SetStateAction<string | null>>
    setModalActivo: React.Dispatch<React.SetStateAction<boolean>>
    setUsuarios:  React.Dispatch<React.SetStateAction<PageableUsuario>>
}

const CrearUsuarioForm = ({ user, imagen, roles, setImagen, setModalActivo, setUsuarios } : CrearUsuarioFormProps) => {

  const imagenAjustada = useRef<AvatarEditor>(null)


    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(file) {
          const reader = new FileReader()
          reader.onloadend = () => {
              const imageDataUrl = reader.result as string
              setImagen(imageDataUrl)
          }
          reader.readAsDataURL(file)
        }
    }

    const handleSubmitFormulario = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const contenido = e.target as HTMLFormElement

        
        const nombreCompleto = contenido.nombre.value
        const correo = contenido.email.value
        const password = contenido.password.value
        const rol = +contenido.rol.value
        const telefono = contenido.telefono.value
        const direccion = contenido.direccion.value
        const coordenadas = contenido.coordenadas.value

        if(nombreCompleto && correo && password && 
            telefono && direccion && coordenadas && imagen && rol < 0) {
            toast.error("Todos los campos son obligatorios")
        } 

        const nombre = nombreCompleto.split(' ')[0]
        const imagenNueva = imagenAjustada.current?.getImageScaledToCanvas().toDataURL() as string
        const extencionImagen = obtenerExtencionDeUnBase64(imagenNueva)

        const imagenBlob = base64ToFile(imagenNueva, `${nombre}.${extencionImagen.split("/")[1]}`, extencionImagen)

        const usuario = JSON.stringify({
            nombreCompleto,
            correo,
            password,
            telefono,
            direccion,
            coordenadas,
            rol
        })

        crearUsuario(imagenBlob, usuario)
    }

    const crearUsuario = async (file: File, usuario: string) => {
        const jwt: string = JSON.parse(localStorage.getItem("jwt") || "{}")
        const url = `${import.meta.env.VITE_BACKEND_URL}/usuario/crear`
    
        const usuarioData = new Blob([usuario], { type: 'application/json' })
    
        const formData = new FormData()
        formData.append('file', file)
        formData.append('usuario', usuarioData)
    
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: formData
        })
        
    
        if(response.ok) {
          const resultado = await response.json()
          toast.success(resultado.mensaje)
          setModalActivo(false)
          setImagen(null)
    
          const usuarios = await obtenerUsuarios()
          setUsuarios(usuarios.data)
        } else {
          toast.error("Ocurrió un error al crear el usuario")
        }
        
      }

  return (
    <div className="form-contenedor">
        <form className="form-usuario" onSubmit={handleSubmitFormulario}>
            <h3 className="form-usuario__heading">Crear usuario</h3>

            <div className="form-usuario__campo">
            <label className="form-usuario__label" htmlFor="nombre">Nombres Completos</label>
            <input className="form-usuario__input" type="text" id="nombre" name="nombre"/>
            </div>

            <div className="form-usuario__campo">
            <label className="form-usuario__label" htmlFor="email">Correo Electrónico</label>
            <input className="form-usuario__input" type="email" id="email" name="email"/>
            </div>

            <div className="form-usuario__campo">
            <label className="form-usuario__label" htmlFor="password">Contraseña</label>
            <input className="form-usuario__input" type="password" id="password" name="password"/>
            </div>

            <div className="form-usuario__campo">
            <label className="form-usuario__label" htmlFor="telefono">Teléfono</label>
            <input className="form-usuario__input" type="number" name="telefono"/>
            </div>

            <select className="form-usuario__select" name="rol">
            {user?.rol == ROL.ADMINISTRADOR && roles?.map((rol: Rol) => (
                <option key={rol.id} value={rol.id}>{rol.rol}</option>
            ))}
            </select>

            <div className="form-usuario__campo">
            <label className="form-usuario__label" htmlFor="direccion">Direccion</label>
            <input className="form-usuario__input" type="text" name="direccion"/>
            </div>

            <div className="form-usuario__campo">
            <label className="form-usuario__label" htmlFor="coordenadas">coordenadas</label>
            <input className="form-usuario__input" type="text" name="coordenadas"/>
            </div>

            <div className="form-usuario__imagen-contenedor">
            <label className="form-usuario__label" htmlFor="imagen">Foto</label>
            <input
            className="custom-file-upload"
            onChange={handleChangeImage}
                type="file"
            />
            {imagen && (
                <AvatarEditor 
                ref={imagenAjustada}

                image={imagen}
                width={200}
                height={200}
                border={50}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={0}
                />
            )}
            </div>

            <input className="form-usuario__input form-usuario__input--submit" type="submit" value="Crear Usuario"/>
        </form>
    </div>
  )
}

export default CrearUsuarioForm