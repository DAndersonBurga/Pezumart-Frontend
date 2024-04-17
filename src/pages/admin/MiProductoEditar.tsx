import { FormEvent, useEffect, useState } from "react";
import { Categoria, ProductoDetalle } from "../../types";
import { obtenerProductosPorIdApi } from "../../api/productosApi";
import { useParams } from "react-router-dom";

import "../../scss/admin/miProductoEditar.scss";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { pezumartApi } from "../../api/pezumartApi";

const MiProductoEditar = () => {
  const { productoId } = useParams();
  const [producto, setProducto] = useState<ProductoDetalle>(
    {} as ProductoDetalle
  );
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [precio, setPrecio] = useState(0);
  const [cantidadDisponible, setCantidadDisponible] = useState(0);
  const [categoriaId, setCategoriaId] = useState(0);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categoria/listar`
      );
      return data;
    };

    const obtenerData = async () => {
      const id = Number(productoId);

      if (id < 0 || isNaN(id)) {
        setProducto({} as ProductoDetalle);
        return;
      } else {
        const [dataProductos, dataCategorias] = await Promise.all([
          obtenerProductosPorIdApi(id),
          obtenerCategorias(),
        ]);
        setProducto(dataProductos);
        setCategorias(dataCategorias);

        setNombre(dataProductos.nombre);
        setDescripcion(dataProductos.descripcion);
        setDisponible(dataProductos.disponible);
        setPrecio(dataProductos.precio);
        setCantidadDisponible(dataProductos.cantidadDisponible);
        setCategoriaId(dataProductos.categoriaId);
      }
    };

    obtenerData();
  }, []);

  const actualizarUsuario = async () => {
    const productoActualizado = {
      nombre,
      descripcion,
      disponible,
      precio,
      cantidadDisponible,
      categoriaId,
    };


    try {
      const { data } = await pezumartApi.put(`/producto/actualizar/${producto.id}`, productoActualizado)
      toast.success(data.mensaje);
    } catch (error: Error | any) {
      toast.error(error.response.data.message);
    }
    
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(nombre === "" || descripcion === "" || precio <= 0 || cantidadDisponible <= 0 || categoriaId <= 0) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if(nombre.length < 3 || nombre.length > 30) {
      toast.error("El nombre debe tener entre 3 y 30 caracteres");
      return;
    }

    actualizarUsuario();

  };

  return (
    <div className="editar-producto">
      <h1 className="editar-producto__titulo">
        Editar Producto: {producto.nombre}
      </h1>
      <div className="editar-producto__contenido">
        <div className="editar-producto__imagen-contenedor">
          {producto?.imagenes?.length > 0 && (
            <img
              className="editar-producto__imagen"
              src={producto?.imagenes[0]?.url}
              alt={producto?.imagenes[0]?.nombreImagen}
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="editar-producto-formulario">
          <div className="editar-producto-formulario__campo">
            <label
              className="editar-producto-formulario__label"
              htmlFor="categoria"
            >
              Categoria:
            </label>
            <select
              name="categoria"
              className="editar-producto-formulario__select"
              value={categoriaId}
              onChange={(e) => setCategoriaId(+e.target.value)}
            >
              {categorias?.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="editar-producto-formulario__campo">
            <label
              className="editar-producto-formulario__label"
              htmlFor="nombre"
            >
              Nombre:{" "}
            </label>
            <input
              onChange={(e) => setNombre(e.target.value)}
              name="nombre"
              className="editar-producto-formulario__input"
              value={nombre}
              id="nombre"
              type="text"
            />
          </div>

          <div className="editar-producto-formulario__campo editar-producto-formulario__campo--textarea">
            <label htmlFor="descripcion">Descripción: </label>
            <textarea
              name="descripcion"
              className="editar-producto-formulario__textarea"
              cols={30}
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            ></textarea>
          </div>

          <div className="editar-producto-formulario__campo">
            <label
              className="editar-producto-formulario__label"
              htmlFor="disponible"
            >
              Disponible:
            </label>
            <select
              className="editar-producto-formulario__select"
              id="disponible"
              name="disponible"
              onChange={(e) =>
                setDisponible(+e.target.value == 1 ? true : false)
              }
              value={disponible == true ? 1 : 0}
            >
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </div>

          <div className="editar-producto-formulario__campo">
            <label
              className="editar-producto-formulario__label"
              htmlFor="precio"
            >
              Precio:{" "}
            </label>
            <input
              className="editar-producto-formulario__input"
              type="number"
              name="precio"
              id="precio"
              min={0}
              onChange={(e) => setPrecio(+e.target.value)}
              value={precio}
            />
          </div>

          <div className="editar-producto-formulario__campo">
            <label
              className="editar-producto-formulario__label"
              htmlFor="cantidadDisponible"
            >
              Cantidad disponible:
            </label>
            <input
              className="editar-producto-formulario__input"
              id="cantidadDisponible"
              type="number"
              name="cantidadDisponible"
              onChange={(e) => setCantidadDisponible(+e.target.value)}
              min={0}
              value={cantidadDisponible}
            />
          </div>

          <input
            className="editar-producto-formulario__submit"
            type="submit"
            value={"Guardar Cambios"}
          />
        </form>
      </div>

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
  );
};

export default MiProductoEditar;
