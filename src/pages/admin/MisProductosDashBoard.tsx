import { useEffect, useState } from "react"
import { Producto as ProductoType } from "../../types"
import { pezumartApi } from "../../api/pezumartApi"
import MiProducto from "../../components/admin/MiProducto"
import Paginacion from "../../components/Paginacion"

import '../../scss/admin/productosDashboard.scss'

const MisProductosDashBoard = () => {

  const [productos, setProductos] = useState<ProductoType[]>([])
  const [paginaActual, setPaginaActual] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [productosTotales, setProductosTotales] = useState(0)

  useEffect(() => {
    const obtenerMisProductos = async () => {
      const { data } = await pezumartApi.get('/producto/listar/mis-productos')
      setProductos(data.content)
      setPaginaActual(data.pageable.pageNumber)
      setTotalPaginas(data.totalPages)
      setProductosTotales(data.totalElements)
    }

    obtenerMisProductos()
  }, [])

  useEffect(() => {
    const obtenerProductos = async () => {
      const { data } = await pezumartApi.get(`/producto/listar/mis-productos?page=${paginaActual}`)
      setProductos(data.content)
      setPaginaActual(data.pageable.pageNumber)
      setTotalPaginas(data.totalPages)
      setProductosTotales(data.totalElements)
    }

    obtenerProductos()
  }, [paginaActual])

  return (
    <section className="productos-dashboard">
      <h1 className="productos-dashboard__heading">Total Productos: {productosTotales} - Paginas [0 a {(totalPaginas - 1) < 0 ? 0 : (totalPaginas - 1)}]</h1>

      <div className="productos-dashboard__mis-productos">
        {productos?.length > 0 ? (
          productos?.map(producto => (
            <MiProducto 
              key={producto.id}
              categoria={producto.categoria}
              cantidadDisponible={producto.cantidadDisponible}
              disponible={producto.disponible}
              descripcion={producto.descripcion}
              fechaCreacion={producto.fechaCreacion}
              id={producto.id}
              imagenes={producto.imagenes}
              nombre={producto.nombre}
              precio={producto.precio}
              setProductos={setProductos}
              setPaginaActual={setPaginaActual}
              setTotalPaginas={setTotalPaginas}
              setProductoTotales={setProductosTotales}
            />
          ))
        ) : (
          <h2>No tienes productos</h2>
        )}
      </div>


      {productos?.length > 0 && (
        <Paginacion 
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          setPaginaActual={setPaginaActual}
        />
      )}
    </section>
  )
}

export default MisProductosDashBoard