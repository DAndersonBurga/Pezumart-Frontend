import { useEffect, useState } from "react"
import { Categoria as CategoriaType } from "../../types"
import axios from "axios"
import Categoria from "../../components/Categoria"

import '../../scss/admin/categoriasDashboard.scss'
import { setTitleAndDescription } from "../../helpers/seo"

const CategoriasDashboard = () => {

  const [categorias, setCategorias] = useState<CategoriaType[]>([])

  useEffect(() => {
    setTitleAndDescription('Categorias', 'Administra las categorias de la tienda')
    const obtenerCategorias = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categoria/listar`)
      setCategorias(data)      
    }

    obtenerCategorias()
  }, [])

  return (
    <div className="categorias-dashboard">
      <h1 className="categorias-dashboard__titulo">Categorias</h1>

      <div className="categorias-dashboard__grid">
        {categorias?.map((categoria) => (
          <Categoria 
            key={categoria.id}
            id={categoria.id}
            nombre={categoria.nombre}
            imagen={categoria.imagen}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriasDashboard