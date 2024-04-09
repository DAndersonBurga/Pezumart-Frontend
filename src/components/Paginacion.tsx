import '../scss/paginacion.scss'

interface PaginacionProps {
    paginaActual: number;
    totalPaginas: number;
    setPaginaActual: React.Dispatch<React.SetStateAction<number>>;
}

const Paginacion = ({ paginaActual, totalPaginas, setPaginaActual } : PaginacionProps) => {

    const handlePrev = () => {
        if(paginaActual <= 0) return
        setPaginaActual(paginaActual - 1)
      }
  
      const handleNext = () => {
        if(totalPaginas-1 <= paginaActual) return
        setPaginaActual(paginaActual + 1)
      }

  return (
    <ul className="paginacion">
        <button 
          className="paginacion__boton"
          onClick={handlePrev}  
        >Anterior</button>
          <li>
            <p className="paginacion__pagina">Pagina: {paginaActual}</p>
          </li>
        <button 
          className="paginacion__boton"
          onClick={handleNext}
        >Siguiente</button>
    </ul>
  )
}

export default Paginacion