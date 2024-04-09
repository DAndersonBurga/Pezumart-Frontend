import '../scss/categorias.scss'

interface CategoriaProps {
  nombre: string
  imagen: string
}

const Categoria = ({ nombre, imagen } : CategoriaProps) => {
  return (
    <div className="categoria">
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