import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthContextProvider } from "./context/AuthContext"
import LayoutPrincipal from "./layout/LayoutPrincipal"
import Home from "./pages/Home"
import Productos from "./pages/Productos"
import SobreNosotros from "./pages/SobreNosotros"
import Contactanos from "./pages/Contactanos"
import ProductoPage from "./pages/ProductoPage"
import LayoutDashboard from "./layout/LayoutDashboard"
import CategoriasDashboard from "./pages/admin/CategoriasDashboard"
import Login from "./pages/admin/Login"
import { lazy } from "react"
import UsuarioEditar from "./pages/admin/UsuarioEditar"
import ProductosDestacadosDashboard from "./pages/admin/ProductosDestacadosDashboard"
import MisProductosDashBoard from "./pages/admin/MisProductosDashBoard"
import ProtectedRouteAdmin from "./components/admin/ProtectedRouteAdmin"
import MiProductoEditar from "./pages/admin/MiProductoEditar"


function App() {

  const ProtectedRouteLazy = lazy(() => import('./components/admin/ProtectedRoute'))
  const UsuariosDashboardLazy = lazy(() => import('./pages/admin/UsuariosDashboard'))
  const ProductosDashboardLazy = lazy(() => import('./pages/admin/ProductosDashboard'))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPrincipal />} >
          <Route index element={<Home />}/>
          <Route children path="/productos" element={<Productos />}/>
          <Route children path="/sobre-nosotros" element={<SobreNosotros />}/>
          <Route children path="/contacto" element={<Contactanos />}/>
          <Route children path="/producto/:productoId" element={<ProductoPage />}/>
        </Route>

        <Route element={<AuthContextProvider />}>
          <Route path="/admin/login" element={<Login />}/>

            <Route element={<ProtectedRouteLazy />}>
              <Route path="/admin/dashboard" element={<LayoutDashboard />}>

                <Route element={<ProtectedRouteAdmin />}>
                  <Route index element={<UsuariosDashboardLazy />} />
                  <Route children path="productos" element={<ProductosDashboardLazy />}/>
                  <Route children path="usuarios/editar/:usuarioId" element={<UsuarioEditar />}/>
                  <Route children path="usuarios" element={<UsuariosDashboardLazy />}/>
                  <Route children path="categorias" element={<CategoriasDashboard />}/>
                  <Route children path="destacados" element={<ProductosDestacadosDashboard />}/>
                </Route>

                <Route children path="mis-productos" element={<MisProductosDashBoard />}/>
                  <Route children path="mis-productos/editar/:productoId" element={<MiProductoEditar />}/>
              </Route>
            </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
