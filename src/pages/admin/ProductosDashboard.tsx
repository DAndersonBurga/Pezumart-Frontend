import { ChangeEvent, useEffect, useState } from "react"
import { pezumartApi } from "../../api/pezumartApi"
import { Categoria as CategoriaType, Producto as ProductoType } from "../../types"
import Modal from 'react-modal'
import { customStyles } from "../../helpers/modal"

import '../../scss/admin/productosDashboard.scss'
import Paginacion from "../../components/Paginacion"
import CrearProductoForm from "../../components/admin/CrearProductoForm"
import { ToastContainer } from "react-toastify"
import Producto from "../../components/admin/Producto"
import Categoria from "../../components/Categoria"
import MenuBar from "../../icons/MenuBarIcon"
import search from "../../../public/img/search.svg"
import { buscarProductosPorNombre, obtenerProductosApi, obtenerProductosPorCategoriaApi } from "../../api/productosApi"
import axios from "axios"
import { setTitleAndDescription } from "../../helpers/seo"

Modal.setAppElement('#root')

const ProductosDashboard = () => {

  const [productos, setProductos] = useState<ProductoType[]>([])
  const [paginaActual, setPaginaActual] = useState(0)
  const [modalActivo, setModalActivo] = useState(false)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [productosTotales, setProductosTotales] = useState(0)
  const [barraActiva, setBarraActiva] = useState("")
  const [buscador, setBuscador] = useState("")
  const [categorias, setCategorias] = useState<CategoriaType[]>([])
  const [categoriaId, setCategoriaId] = useState(0)

  useEffect(() => {
    setTitleAndDescription('Productos', 'Administra los productos de la tienda')

    const obtenerProductos = async () => {
      const { data } = await pezumartApi.get('/producto/listar')
      return data;
    }

    const obtenerCategorias = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categoria/listar`)
      return data;
    }

    const obtenerData = async () => {
      const [productosData, categoriasData] = await Promise.all([obtenerProductos(), obtenerCategorias()]) 

      setProductos(productosData.content)
      setTotalPaginas(productosData.totalPages)
      setPaginaActual(productosData.pageable.pageNumber)
      setProductosTotales(productosData.totalElements)
      
      setCategorias(categoriasData)
    }

    obtenerData()
    
  }, [])

  useEffect(() => {
    const obtenerProductosPorPagina = async () => {
      const { data } = await pezumartApi.get(`/producto/listar?page=${paginaActual}`)
      
      setProductos(data.content)
      setPaginaActual(data.pageable.pageNumber)
      setProductosTotales(data.totalElements)
    }

    obtenerProductosPorPagina()
  }, [paginaActual])

  useEffect(() => {
    const obtenerProductosPorCategoria = async () => {
      const data = await obtenerProductosPorCategoriaApi(categoriaId)

      setProductos(data.content)
      setPaginaActual(data.pageable.pageNumber)
      setProductosTotales(data.totalElements)
    }

    obtenerProductosPorCategoria()
  }, [categoriaId])

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

  const handleBarraActiva = () => {
    if (barraActiva === "") {
      setBarraActiva("listado-categorias-disabled")
    } else {
      setBarraActiva("")
    }
  }

  return (
    <section className="productos-dashboard">
       <>
        <h1 className="productos-dashboard__heading">Total Productos: {productosTotales} - Paginas [0 a {(totalPaginas - 1) < 0 ? 0 : (totalPaginas - 1)}]</h1>
        
        <div className="productos-dashboard__grid">
          <div className="productos-categoria productos-dashboard__categoria">

            <div className={`listado-categorias ${barraActiva}`}>
              {categorias?.map(categoria => (
                <Categoria 
                  key={categoria.id}
                  id={categoria.id}
                  nombre={categoria.nombre}
                  imagen={categoria.imagen}
                  setCategoriaId={setCategoriaId}
                />
              ))}
            </div>
          </div>

          <div className="productos-dashboard__contenedor">
            <div className="productos-dashboard__buscador">
            <button 
              className="menubar-icon"
              onClick={handleBarraActiva}
            >
              <MenuBar />
            </button>
              <input 
                className="productos-dashboard__input" 
                type="search" 
                placeholder="Buscar producto"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBuscador(e.target.value)}
              />
              <button 
                className="productos-dashboard__buscador-img"
                onClick={handleClickBuscarProductos}
              >
                <img src={search} alt="imagen buscador" />
              </button>
            </div>
            <div className="productos-dashboard__productos">
                {productos.length > 0 ? (
                  productos.map(producto => (
                    <Producto 
                      key={producto.id}
                      id={producto.id}
                      categoria={producto.categoria}
                      descripcion={producto.descripcion}
                      disponible={producto.disponible}
                      fechaCreacion={producto.fechaCreacion}
                      precio={producto.precio}
                      cantidadDisponible={producto.cantidadDisponible}
                      nombre={producto.nombre}
                      usuario={producto.usuario}
                      imagenes={producto.imagenes}
                      setProductos={setProductos}
                      setProductoTotales={setProductosTotales}
                      setTotalPaginas={setTotalPaginas}
                      setPaginaActual={setPaginaActual}
                    />
                  ))
                ) : (
                  <h2 className="productos-dashboard__mensaje">No se encontraron productos</h2>
                )}
            </div>
          </div>
        </div>

        <Paginacion 
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
          totalPaginas={totalPaginas}
        />
        
       </>

        <div className="productos-dashboard__agregar">
          <button
            type="button"
            className="productos-dashboard__agregar-boton"
            onClick={() => setModalActivo(true)}
          >
            +
          </button>
        </div>

        <Modal 
          style={customStyles}
          isOpen={modalActivo}
          onRequestClose={() => {
            setModalActivo(false)
          }}
          contentLabel="Agregar Producto"
        >
          <CrearProductoForm 
            setModalActivo={setModalActivo}
            setPaginaActual={setPaginaActual}
            setProductos={setProductos}
            setProductosTotales={setProductosTotales}
            setTotalPaginas={setTotalPaginas}
          />
        </Modal>

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
    </section>
  )
}

export default ProductosDashboard