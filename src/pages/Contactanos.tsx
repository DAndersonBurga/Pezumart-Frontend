import { useEffect } from 'react'
import '../scss/contacto.scss'
import { setTitleAndDescription } from '../helpers/seo'

const Contactanos = () => {

    useEffect(() => {
        setTitleAndDescription('Contactanos', 'Contactanos en Pezumart')
    }, [])

  return (
    <section className="contacto contenedor">
        <form className="formulario">
            <div className='formulario-campos'>
                <div className='formulario-campo'>
                    <label htmlFor="nombre">Nombres</label>
                    <input id="nombre" type="text" />
                </div>
                
                <div className='formulario-campo'>
                    <label htmlFor="apellidos">Apellidos</label>
                    <input id="apellidos" type="text" />
                </div>
            </div>

            <div className='formulario-campo'>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" />
            </div>

            <div className='formulario-campo'>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" cols={30} rows={20}></textarea>
            </div>

            <input className='formulario-enviar' type="submit" value={"Enviar"}/>
        </form>
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57777.70350470961!2d55.22777536853814!3d25.165882597275413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4209d6adc719%3A0xafd8c2fdec670b3a!2sSafa%20Park!5e0!3m2!1ses!2sus!4v1711238312780!5m2!1ses!2sus" width="600" height="450" style={{
                border: 0
            }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
  )
}

export default Contactanos