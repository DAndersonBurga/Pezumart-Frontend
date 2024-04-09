import { ChangeEvent, useEffect, useState } from "react"
import Categoria from "../components/Categoria"
import Producto from "../components/Producto"
import MenuBarIcon from "../icons/MenuBarIcon"

import '../scss/productos.scss'
import { Categoria as CategoriaType, Producto as ProductoType } from "../types"
import Paginacion from "../components/Paginacion"
import { buscarProductosPorNombre, obtenerProductosApi } from "../api/productosApi"
import axios from "axios"

const Productos = () => {

  const [barraActiva, setBarraActiva] = useState("")
  const [productos, setProductos] = useState<ProductoType[]>([])
  const [paginaActual, setPaginaActual] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [buscador, setBuscador] = useState("")
  const [categorias, setCategorias] = useState<CategoriaType[]>([])

  const handleBarraActiva = () => {
    if (barraActiva === "") {
      setBarraActiva("listado-categorias-disabled")
    } else {
      setBarraActiva("")
    }
  }

  const handleClickBuscarProductos = async () => {
    if(buscador === "") {
      const data = await obtenerProductosApi()
      setProductos(data.content)
      setPaginaActual(data.pageable.pageNumber)
      setTotalPaginas(data.totalPages)
      return
    }
    const data = await buscarProductosPorNombre(buscador)
    setProductos(data.content)
    setPaginaActual(data.pageable.pageNumber)
    setTotalPaginas(data.totalPages)
  }

  useEffect(() => {

    const obtenerCategorias = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categoria/listar`)
      return data
    }

    const obtenerData = async () => {
      const [productosData, categoriasData] = await Promise.all([obtenerProductosApi(), obtenerCategorias()])

      setProductos(productosData.content)
      setPaginaActual(productosData.pageable.pageNumber)
      setTotalPaginas(productosData.totalPages)
      setCategorias(categoriasData)
    }

    obtenerData()

  }, [])

  useEffect(() => {
    const obtenerProductos = async () => {
      const data = await obtenerProductosApi(paginaActual);
      setProductos(data.content)
      setPaginaActual(data.pageable.pageNumber)
      setTotalPaginas(data.totalPages)
    }

    obtenerProductos()
  }, [paginaActual])

  return (
    <div className="contenedor productos-grid-area">
      <div className="productos-categoria">
          <button 
            className="menubar-icon"
            onClick={handleBarraActiva}
          >
            <MenuBarIcon />
          </button>

          <div className={`listado-categorias ${barraActiva}`}>
            {categorias?.map(categoria => (
              <Categoria 
                key={categoria.id}
                nombre={categoria.nombre}
                imagen={categoria.imagen}
              />
            ))}
          </div>
      </div>

      <div className="buscador-productos">
        <input 
          className="buscador-productos-input"
          type="search" 
          placeholder="Buscar Productos"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setBuscador(e.target.value)}
        />
        <button 
          type="button"
          className="buscador-productos-search"
          onClick={handleClickBuscarProductos}
        >
          <img src="./img/search.svg" alt="imagen buscador" />
        </button>
      </div>

      <main className="listado-productos">

          
              <div className="listado-productos-grid">
                {productos?.length > 0 ? (
                  productos?.map(producto => (
                    <Producto
                      key={producto.id}
                      id={producto.id}
                      imagenUrl={producto.imagenes[0].imagenUrl}
                      nombre={producto.nombre}
                      precio={producto.precio}
                    />
                  ))
                ) : (
                  <h2 className="listado-productos-grid__mensaje">No se encontraron productos</h2>
                )}
              </div>

              {productos?.length > 0 && (
                <Paginacion 
                  paginaActual={paginaActual}
                  totalPaginas={totalPaginas}
                  setPaginaActual={setPaginaActual}
                />
              )}
      </main>
    </div>
  )
}

export default Productos