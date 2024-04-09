import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "../scss/admin/dashboard.scss";
import useAuth from "../hooks/useAuth";
import { UserData } from "../types";

const LayoutDashboard = () => {
  const { pathname } = useLocation();
  const redirect = useNavigate();
  const { user, setUser, setAutenticado } = useAuth();

  const handleClick = () => {
    localStorage.removeItem("jwt");
    setUser({} as UserData);
    setAutenticado(false);
    redirect("/admin/login");
  }

  return (
    <div className="bg-white dashboard">
      <div className="dashboard__grid">
        <section className={`dashboard-navegacion`}>
          <Link to={"/admin/dashboard"}>
            <div className="dashboard-navegacion__logo">
              <h2>
                Pezu<span>Mart</span>
              </h2>
            </div>
          </Link>

          <nav className="dashboard-nav">
            <Link
              className={`dashboard-nav__enlace ${
                pathname === "/admin/dashboard/usuarios"
                  ? "dashboard-nav__enlace--activo"
                  : ""
              }`}
              to={"/admin/dashboard/usuarios"}
            >
              Usuarios
            </Link>
            <Link
              className={`dashboard-nav__enlace ${
                pathname === "/admin/dashboard/productos"
                  ? "dashboard-nav__enlace--activo"
                  : ""
              }`}
              to={"/admin/dashboard/productos"}
            >
              Productos
            </Link>
            <Link
              className={`dashboard-nav__enlace ${
                pathname === "/admin/dashboard/destacados"
                  ? "dashboard-nav__enlace--activo"
                  : ""
              }`}
              to={"/admin/dashboard/destacados"}
            >
              Destacados
            </Link>
            <Link
              className={`dashboard-nav__enlace ${
                pathname === "/admin/dashboard/mis-productos"
                  ? "dashboard-nav__enlace--activo"
                  : ""
              }`}
              to={"/admin/dashboard/mis-productos"}
            >
              Mis Productos
            </Link>
            <Link
              className={`dashboard-nav__enlace ${
                pathname === "/admin/dashboard/categorias"
                  ? "dashboard-nav__enlace--activo"
                  : ""
              }`}
              to={"/admin/dashboard/categorias"}
            >
              Categorias
            </Link>
          </nav>
        </section>
        <main>
          <header className="header-dashboard">
            <div className="user-info">
              <h2 className="user-info__nombre">{user.nombre}</h2>

              <div className="user-info__contenedor">
                <button
                  type="button"
                  className="user-info__logout"
                  onClick={handleClick}
                  >
                  Cerrar Sesión
                </button>
                <img
                  className="user-info__imagen"
                  src={user.imagen}
                  alt={`Imagen ${user.nombre}`}
                />
              </div>
            </div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
