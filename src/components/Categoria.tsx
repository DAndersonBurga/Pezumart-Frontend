import '../scss/categorias.scss'

interface CategoriaProps {
  id: number
  nombre: string
  imagen: string
  setCategoriaId?: React.Dispatch<React.SetStateAction<number>>
}

const Categoria = ({ nombre, imagen, setCategoriaId, id } : CategoriaProps) => {

  const handleClick = (id: number) => {
    if (setCategoriaId) {
      setCategoriaId(id)
    }
  }

  return (
    <div
      onClick={() => handleClick(id)}
     className="categoria"
    >
        <div className='categoria-imagen-contenedor'>
            <img className='categoria-imagen' src={imagen} alt="nombre categoria" />
        </div>

        <div className='categoria-info'>
            <h3 className='categoria-nombre'>{nombre}</h3>
        </div>
    </div>
  )
}

export default Categoria