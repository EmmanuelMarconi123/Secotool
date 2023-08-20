
import AdminHeader from '../../components/header/adminHeader/AdminHeader'
import Header from '../../components/header/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../components/routes/Home'
import Details from '../../components/routes/Details'
import HomeAdmin from '../../components/routes/homeAdmin/HomeAdmin'
import NewProduct from '../../components/routes/newProduct/NewProduct'
import Footer from '../../components/footer/Footer'


const AppRoutes = () => {
  return (
    <body>
      {window.location.pathname.includes("/admin") ? (
        <AdminHeader />
      ) : (
        <Header />
      )}
      <main className="spacing-grid">
        <Routes>
          {/* Rutas de acceso libre */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="*" element={<Navigate to="/" />} />

          {/* Rutas Admin */}
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/newproduct" element={<NewProduct />} />
        </Routes>
      </main>
      <Footer className="footer" />
    </body>
  )
}

export default AppRoutes