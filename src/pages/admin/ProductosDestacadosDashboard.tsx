import { useEffect, useState } from "react"
import { ProductoDestacado as ProductoDestacadoType } from "../../types"
import { pezumartApi } from "../../api/pezumartApi"
import ProductoDestacado from "../../components/admin/ProductoDestacado"

import '../../scss/admin/productoDestacado.scss'

const ProductosDestacadosDashboard = () => {

  const [productosDestacados, setProductosDestacados] = useState<ProductoDestacadoType[]>([])


  useEffect(() => {
    const obtenerProductosDestacados = async () => {
      const { data } = await pezumartApi.get('/producto/destacados')
      setProductosDestacados(data)
    }

    obtenerProductosDestacados()
  }, [])
  return (
    <div className="productos-destacados">
      <h1 className="productos-destacados__titulo">Productos Destacados</h1>
      <div className="productos-destacados__grid">
        {productosDestacados?.map(producto => (
          <ProductoDestacado 
            key={producto.id}
            nombre={producto.producto.nombre}
            id={producto.id}
            imagen={producto.producto.imagenes[0].imagenUrl}
            descripcion={producto.producto.descripcion}
            precio={producto.producto.precio}
            imagenAutor={producto.producto.usuario.imagenUrl}
            nombreAutor={producto.producto.usuario.nombreCompleto}
            publicado={producto.producto.fechaCreacion}
            setProductosDestacados={setProductosDestacados}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductosDestacadosDashboard