// import "rsuite/dist/rsuite.min.css";
import "./rsuite.less";
import "./App.css";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import AuthRoutes from "./autenticaciones/AuthRoutes/AuthRoutes";
import AppRoutes from "./autenticaciones/AppRoutes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { FunctionProvider } from "./contexts/FunctionsContext";

function App() {
  return (
    <AuthProvider>
      <FunctionProvider>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </FunctionProvider>
    </AuthProvider>
=======
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/routes/Home";
import Details from "./components/routes/Details";
import NewProduct from "./components/routes/newProduct/NewProduct";
import HomeAdmin from "./components/routes/homeAdmin/HomeAdmin";
import AdminHeader from "./components/header/adminHeader/AdminHeader";
import CrearCuenta from "./components/routes/crearCuenta/CrearCuenta";
import LogIn from "./components/routes/logIn/LogIn";
import Features from "./components/routes/features/Features";
import Categories from "./components/routes/categories/Categories";

function App() {
  return (
    <body>
      {window.location.pathname.includes("/admin") ? (
        <AdminHeader />
      ) : (
        <Header />
      )}
      <main className="spacing-grid">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/crearCuenta" element={<CrearCuenta />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/product/:id" element={<Details />}></Route>
          <Route path="/admin/home" element={<HomeAdmin />}></Route>
          <Route path="/admin/newproduct" element={<NewProduct />}></Route>
          <Route
            path="/admin/features"
            element={<Features />}
          ></Route>
          <Route
            path="/admin/categories"
            element={<Categories />}
          ></Route>
          <Route path="*" element={<div>Error 404</div>}></Route>
        </Routes>
      </main>
      <Footer className="footer" />
    </body>
>>>>>>> ef2144de4a4264e414d2a7aef3a6f17c19f11053
  );
}

export default App;
