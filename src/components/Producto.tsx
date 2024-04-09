import { Link } from 'react-router-dom'
import '../scss/productos.scss'

interface ProductoProps {
    id: number
    nombre: string
    precio: number
    imagenUrl: string
}


const Producto = ({ id, nombre, precio, imagenUrl } : ProductoProps) => {
  return (
    <div className='producto'>
        <div className='producto-imagen-container'>
            <img className='producto-imagen' src={imagenUrl} alt={`Imagen Producto ${nombre}`} />

            <Link className='producto-button' to={`/producto/${id}`}>
                Lo Quiero
            </Link>
        </div>

        <div className='producto-info'>
            <Link
                to={`/producto/${id}`}
            >
                <h3 className='producto-nombre'>{nombre}</h3>
            </Link>
            <p className='producto-precio'>${precio}</p>
        </div>
    </div>
  )
}

export default Producto