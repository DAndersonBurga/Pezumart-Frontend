import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { MouseEvent, useState } from "react"
import '../scss/header.scss'
import MenuBarIcon from "../icons/MenuBarIcon"

const Header = () => {

  const [navegacionActiva, setNavegacionActiva] = useState("")

  const { pathname } = useLocation()


  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if(navegacionActiva === "navegacion--activa") {
      setNavegacionActiva("")
    } else if(navegacionActiva === "") {
      setNavegacionActiva("navegacion--activa")
    }
    
  }

  return (
    <header className="header">
        <div className="contenedor header__grid">
            <div className="logo-container">
              <Link
                to={"/"}
              >
                <div className="logo">
                    <h2>Pezu<span>Mart</span></h2>
                </div>
              </Link>

                <button 
                  className="menu-bar"
                    onClick={handleClick}
                >
                  <MenuBarIcon />
                </button>
            </div>

            <nav className={`navegacion ${navegacionActiva}`}>
              <Link 
                className={`navegacion__link ${pathname === "/" ? "navegacion__link--active" : ""}`} to={"/"}>Inicio</Link>
              <Link className={`navegacion__link ${pathname === "/productos" ? "navegacion__link--active" : ""}`} to={"/productos"}>Productos</Link>
              <Link className={`navegacion__link ${pathname === "/sobre-nosotros" ? "navegacion__link--active" : ""}`} to={"/sobre-nosotros"}>Sobre Nosotros</Link>
              <Link className={`navegacion__link ${pathname === "/contacto" ? "navegacion__link--active" : ""}`} to={"/contacto"}>Contactanos</Link>
            </nav>
        </div>
    </header>
  )
}

export default Header