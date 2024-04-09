import '../scss/footer.scss'
import FacebookIcon from '../icons/FacebookIcon'
import TwitterIcon from '../icons/TwitterIcon'
import InstagramIcon from '../icons/InstagramIcon'
import YoutubeIcon from '../icons/YoutubeIcon'
import MapIcon from '../icons/MapIcon'
import PhoneIcon from '../icons/PhoneIcon'
import MailIcon from '../icons/MailIcon'

const Footer = () => {


  return (
    <footer className="footer">
        <section className='contenedor grid'>
            <div className='caja'>
                <h2 className='titulo'>Contactanos</h2>

                <ul>
                    <li className='texto'>
                        <MapIcon />
                        123 Street, New York, USA</li>
                    <li className='texto'>
                        <PhoneIcon />
                        +012 345 67890</li>
                    <li className='texto'>
                        <MailIcon />
                        correo@correo.com</li>
                </ul>
            </div>

            <div className='caja'>
                <h2 className='titulo'>Siguenos</h2>
                <p className='texto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nobis qui sequi esse alias repellendus rerum cumque harum!</p>
                <ul className='lista-redsocial'>
                    <li className='redsocial'>
                        <FacebookIcon />
                    </li>
                    <li className='redsocial'>
                        <TwitterIcon />
                    </li>
                    <li className='redsocial'>
                        <InstagramIcon />
                    </li>
                    <li className='redsocial'>
                        <YoutubeIcon />
                    </li>
                </ul>
            </div>

            <div className='caja'>
                <h2 className='titulo'>Horario de Atención</h2>
                <ul>
                    <li className='texto'>Lunes a Viernes: 09:00 - 18:00</li>
                    <li className='texto'>Sábados: 10:00 - 14:00</li>
                </ul>
            </div>

        </section>
        <div className='copyright'>
            <p className='copyright__text'>Copyright ©<span>PezuMart</span>. All Rights Reserved.</p>
            <p className='copyright__text'>Designed by <span>SrPromax:)</span></p>
        </div>
    </footer>
  )
}

export default Footer