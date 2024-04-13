import { useParams } from "react-router-dom";

import "../scss/productoView.scss";
import { useEffect, useState } from "react";
import ReactImageMagnify from "@blacklab/react-image-magnify";
import { obtenerProductosPorIdApi } from "../api/productosApi";
import { ProductoDetalle } from "../types";
import { setTitleAndDescription } from "../helpers/seo";


const ProductoPage = () => {
  const { productoId } = useParams();

  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState<ProductoDetalle>({} as ProductoDetalle);
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    setTitleAndDescription("Producto", "Detalles del producto")

    const obtenerProductoPorId = async () => {
      const id = productoId ? parseInt(productoId) : 0;
      const data = await obtenerProductosPorIdApi(id);
      setProducto(data);
      setImagen(data.imagenes[0].url);
    }

    obtenerProductoPorId();
  }, [])

  return (
    <div className="bg-white">
      <main className="contenedor productoview">
        <h2 className="productoview__heading">
          {producto.nombre}
        </h2>

        <div className="productoview__grid">
          <div className="productoview__imagenes">
            <div 
              className="productoview__imagen-principal-contenedor"
            > 
              <ReactImageMagnify 
                imageProps={{
                  className: "productoview__imagen-principal",
                  height: "100%",
                  width: "100%",
                  src: imagen
                }}
                magnifyContainerProps={{
                  height: 500,
                  width: 800
                }}
                magnifiedImageProps={{
                  height: 700,
                  width: 800,                
                  src: imagen,
                  className: "productoview__imagen-principal-magnificada",
                }}
              />

            </div>

            <div className="productoview__imagenes-contenedor">
              {producto?.imagenes?.map(imagen => (
                <button
                  key={imagen.id}
                  onClick={() => setImagen(imagen.url)}
                >
                  <img
                    className="productoview__imagen"
                    src={imagen.url}
                    alt={`Imagen producto ${imagen.id}`}
                  />
              </button>
              ))}
            </div>
          </div>

          <div className="productoview__info">
            <h3 className="productoview__nombre">{producto.nombre}</h3>
            <p className="productoview__precio">$ {producto.precio}</p>
            <p className="productoview__descripcion">
              {producto.descripcion}
            </p>
            <p className="productoview__stock">Stock: <span>{producto.cantidadDisponible}</span></p>
            <div className="productoview__autor-contenedor">
              <p className="productoview__autor">Vendedor: <span>{producto.autor?.nombre}</span></p>
              <img
                className="productoview__imagen-autor"
                src={producto.autor?.imagen}
                alt={`Imagen de ${producto.autor?.nombre}`}
              />
            </div>
            <p className="productoview__fecha">Publicado: <span>{new Date(producto.fechaCreacion).toLocaleDateString()}</span></p>
            <div className="productoview__form">
              <p className="productoview__cantidad-text">Cantidad</p>

              <button
                className="productoview__boton-cantidad"
                onClick={(e) => {
                  e.preventDefault();
                  if(cantidad > 1)
                  setCantidad(cantidad - 1);
                }}
              >
                -
              </button>
              <p className="productoview__cantidad">{cantidad}</p>
              <button
                className="productoview__boton-cantidad"
                onClick={(e) => {
                  e.preventDefault();
                  setCantidad(cantidad + 1);
                }}
              >
                +
              </button>
            </div>
            <a 
              href={`https://wa.me/${producto.autor?.telefono}?text=Hola, me interesa el producto ${producto.nombre} y deseo comprar ${cantidad} unidades`}
              target="_blank"
              className="productoview__boton-comprar"
            >Comprar</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductoPage;
