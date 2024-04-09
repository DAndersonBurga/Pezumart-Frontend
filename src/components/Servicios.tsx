import '../scss/servicios.scss';

const Servicios = () => {
  return (
    <section className="servicios contenedor">
        <div className="servicio">
            <img className="servicio-imagen" src="./img/check.svg" alt="servicio1"/>
            <h3 className="servicio-heading">Productos de Calidad</h3>
        </div>
        <div className="servicio">
            <img className="servicio-imagen" src="./img/truck.svg" alt="servicio1"/>
            <h3 className="servicio-heading">Envío Gratis!</h3>
        </div>
        <div className="servicio">
            <img className="servicio-imagen" src="./img/arrows.svg" alt="servicio1"/>
            <h3 className="servicio-heading">Devolución - 14 días</h3>
        </div>
        <div className="servicio">
            <img className="servicio-imagen" src="./img/phone-call.svg" alt="servicio1"/>
            <h3 className="servicio-heading">Soporte 24/7</h3>
        </div>
    </section>
  )
}

export default Servicios