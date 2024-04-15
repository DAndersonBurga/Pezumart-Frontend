import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Slider from "../components/Slider"
import Servicios from "../components/Servicios"
import Categoria from "../components/Categoria"
import Producto from '../components/Producto'


import { Categoria as CategoriaType, ProductoDestacado, Producto as ProductoType } from "../types"
import '../scss/categorias.scss'
import '../scss/productos.scss'
import '../scss/hero.scss'
import axios from "axios"
import { setTitleAndDescription } from "../helpers/seo"

const Home = () => {

  const [ultimosProductos, setUltimosProductos] = useState<ProductoType[]>([])
  const [productosDestacados, setProductosDestacados] = useState<ProductoDestacado[]>([])
  const [categorias, setCategorias] = useState<CategoriaType[]>([])

  useEffect(() => {
    setTitleAndDescription('Inicio', 'Bienvenido a la tienda en línea')

    const obtenerUltimosProductos = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/ultimos`)
      return data
    }

    const obtenerProductosDestacados = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/destacados`)
      return data
    }

    const obtenerCategorias = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categoria/listar`)
      return data
    }

    const obtenerDatos = async () => {
      const [ultimosProductosData, productosDestacadosData, categorias] = await Promise.all([obtenerUltimosProductos(), obtenerProductosDestacados(), obtenerCategorias()])
      setUltimosProductos(ultimosProductosData)
      setProductosDestacados(productosDestacadosData)
      setCategorias(categorias)
    }

    obtenerDatos()
  }, [])

  return (
    <>
      <Slider />
      <Servicios />

      <section className="contenedor categorias">
        <h2 className="categorias-heading">Categorias<span></span></h2>

        <div className="categorias-grid">
          {categorias?.map(categoria => (
            <Link
              key={categoria.id}
              to={"/productos?categoria=" + categoria.id}
            >
              <Categoria 
                id={categoria.id}
                nombre={categoria.nombre}
                imagen={categoria.imagen}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="productos contenedor">
        <h2 className="productos-heading">Productos Destacados<span></span></h2>

        <div className="productos-grid">
            {productosDestacados.length > 0 ? (
              productosDestacados.map(productoDestacado => (
                <Producto
                  key={productoDestacado.id}
                  id={productoDestacado.producto.id}
                  imagenUrl={productoDestacado.producto.imagenes[0].imagenUrl}
                  nombre={productoDestacado.producto.nombre}
                  precio={productoDestacado.producto.precio}
                  nombreAutor={productoDestacado.producto.usuario.nombreCompleto}
                  imagenAutor={productoDestacado.producto.usuario.imagenUrl}
                />
              ))
            ) : (
              <h2>No hay productos destacados</h2>
            )}
        </div>
      </section>

      
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-image-container">
            <img className="hero-image" src="./img/hombre-traje.png" alt="Imagen Hero" />
          </div>
          <div className="hero-info">
            <h2 className="hero-titulo">¡Descubre los mejores productos!</h2>
            <p className="hero-texto">Qui ex dolore at repellat, quia neque doloribus omnis adipisci, ipsum eos odio fugit ut eveniet blanditiis praesentium totam non nostrum dignissimos nihil eius facere et eaque. Qui, animi obcaecati.</p>
            <div className="hero-botones">
              <button className="hero-boton">Buy Now</button>
              <button className="hero-boton">See More</button>
            </div>
          </div>
        </div>
      </section>


      <main className="productos contenedor">
        <h2 className="productos-heading">Ultimos Productos<span></span></h2>

        <div className="productos-grid">
            {ultimosProductos.length > 0 ? (
              ultimosProductos?.map(producto => (
                <Producto
                  id={producto.id}
                  key={producto.id}
                  imagenUrl={producto.imagenes[0].imagenUrl}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  nombreAutor={producto.usuario.nombreCompleto}
                  imagenAutor={producto.usuario.imagenUrl}
                />
              ))
            ) : (
              <h2>No hay productos</h2>
            )}
        </div>

        <Link
          to={"/productos"}
          className="productos-vermas"
        >
          Ver Más
        </Link>
      </main>
    </>
  )
}

export default Home