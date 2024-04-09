import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pezumartApi } from "../../api/pezumartApi";
import { Rol } from "../../types";

import "../../scss/admin/usuarioDetalles.scss";
import { toast } from "react-toastify";

interface UsuarioDetallesType {
  id: number;
  nombreCompleto: string;
  correo: string;
  imagenUrl: string;
  direccion: string;
  rol: Rol;
  nombreImagen: string;
  telefono: string;
  coordenadas: string;
}

const UsuarioDetalles = () => {
  const { usuarioId } = useParams();
  const [usuario, setUsuario] = useState<UsuarioDetallesType>({
    id: 0,
    nombreCompleto: "",
    correo: "",
    imagenUrl: "",
    direccion: "",
    rol: { id: 0, rol: "" },
    nombreImagen: "",
    telefono: "",
    coordenadas: "",
  });

  const redirect = useNavigate();
  const id: number = parseInt(usuarioId || "0");

  useEffect(() => {
    const obtenerUsuarioPorId = async () => {
      const response = await pezumartApi.get(`/usuario/${id}`);

      if (response.status === 200) {
        const data = (await response.data) as UsuarioDetallesType;

        setUsuario(data);
      }
    };

    obtenerUsuarioPorId();
  }, []);

  const actualizarUsuario = async () => {

    const usuarioData = new Blob([JSON.stringify({
          nombreCompleto: usuario.nombreCompleto,
          telefono: usuario.telefono,
          direccion: usuario.direccion,
          coordenadas: usuario.coordenadas,
        }
      )], { type: 'application/json' })

    const formData = new FormData()
    formData.append('usuario', usuarioData)


    const response = await pezumartApi.put(`/usuario/actualizar/${id}`, formData);

    if (response.status === 200) {
      redirect("/admin/dashboard/usuarios");
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nombreCompleto, telefono, direccion, coordenadas } = usuario;

    if(!nombreCompleto && !telefono && !direccion && !coordenadas) {
      toast.error("Debes completar todos los campos");
      return
    }

    if(nombreCompleto?.length > 60) {
      toast.error("El nombre no puede tener más de 60 caracteres");
      return
    }

    if(telefono?.length > 15) {
      toast.error("El teléfono no puede tener más de 15 caracteres");
      return
    }

    if(direccion?.length > 200) {
      toast.error("La dirección no puede tener más de 200 caracteres");
      return
    }

    if(coordenadas?.length > 40) {
      toast.error("Las coordenadas no pueden tener más de 40 caracteres");
      return
    }

    actualizarUsuario();

  };

  return (
    <div className="usuario-detalles contenedor">
      <h1 className="usuario-detalles__heading">{usuario?.nombreCompleto}</h1>
      <p className="usuario-detalles__texto">
        Correo: <span>{usuario?.correo}</span>
      </p>
      <p className="usuario-detalles__texto">
        Rol: <span>{usuario?.rol?.rol}</span>
      </p>
      <div className="usuario-detalles__contenedor">
        <div>
          <img
            className="usuario-detalles__imagen"
            src={usuario?.imagenUrl}
            alt={usuario?.nombreImagen}
          />
          
        </div>
        <form className="usuario-detalles-form" onSubmit={handleSubmit}>
          <div className="usuario-detalles-form__campo">
            <label
              className="usuario-detalles-form__label"
              htmlFor="nombreCompleto"
            >
              Nombres Completos:
            </label>
            <input
              id="nombreCompleto"
              className="usuario-detalles-form__input"
              type="text"
              value={usuario?.nombreCompleto}
              onChange={(e) =>
                setUsuario((prevUsuario) => ({
                  ...prevUsuario,
                  nombreCompleto: e.target.value,
                }))
              }
            />
          </div>

          <div className="usuario-detalles-form__campo">
            <label className="usuario-detalles-form__label" htmlFor="telefono">
              Teléfono:
            </label>
            <input
              className="usuario-detalles-form__input"
              id="telefono"
              type="text"
              value={usuario?.telefono}
              onChange={(e) =>
                setUsuario((prevUsuario) => ({
                  ...prevUsuario,
                  telefono: e.target.value,
                }))
              }
            />
          </div>

          <div className="usuario-detalles-form__grid">
            <div className="usuario-detalles-form__campo">
              <label className="usuario-detalles-form__label" htmlFor="direccion">
                Dirección:
              </label>
              <input
                className="usuario-detalles-form__input"
                id="direccion"
                type="text"
                value={usuario?.direccion || ""}
                onChange={(e) =>
                  setUsuario((prevUsuario) => ({
                    ...prevUsuario,
                    direccion: e.target.value,
                  }))
                }
              />
            </div>

            <div className="usuario-detalles-form__campo">
              <label
                className="usuario-detalles-form__label"
                htmlFor="coordenadas"
              >
                Coordenadas:
              </label>
              <input
                className="usuario-detalles-form__input"
                id="coordenadas"
                type="text"
                value={usuario?.coordenadas || ""}
                onChange={(e) =>
                  setUsuario((prevUsuario) => ({
                    ...prevUsuario,
                    coordenadas: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <input
            className="usuario-detalles-form__submit"
            type="submit"
            value="Guardar Cambios"
          />
        </form>
      </div>
    </div>
  );
};

export default UsuarioDetalles;
