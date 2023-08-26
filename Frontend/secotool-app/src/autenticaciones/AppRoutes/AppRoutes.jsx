import AdminHeader from "../../components/header/adminHeader/AdminHeader";
import Header from "../../components/header/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../components/routes/home/Home";
import Details from "../../components/routes/details/Details";
import HomeAdmin from "../../components/routes/homeAdmin/HomeAdmin";
import NewProduct from "../../components/routes/newProduct/NewProduct";
import Footer from "../../components/footer/Footer";
import Filters from "../../components/routes/filters/Filters";
import Profile from "../../components/routes/profile/Profile";
import { useAuth } from "../../contexts/AuthContext";
import Features from "../../components/routes/features/Features";
import Categories from "../../components/routes/categories/Categories";
import UsersAdmin from "../../components/routes/usersAdmin/UsersAdmin";

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
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
          <Route path="/allFilters" element={<Filters />} />
          <Route path="/allProducts/:idCateg" element={<Filters />} />
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<Navigate to="/" />} />

          {/* Rutas Admin */}
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/newproduct" element={<NewProduct />} />
          <Route path="/admin/categories" element={<Categories />}></Route>
          <Route path="/admin/features" element={<Features />}></Route>
          <Route path="/admin/users" element={<UsersAdmin />}></Route>
        </Routes>
      </main>
      <Footer className="footer" />
    </body>
  );
};

export default AppRoutes;
