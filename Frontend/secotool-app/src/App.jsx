// import "rsuite/dist/rsuite.min.css";XXXXXXXX
/*import "./rsuite.less";XXXXXXX
import "./App.css";xxxxxxxxXXXXXX
import { Route, Routes } from "react-router-dom";XXXXXXX
import Header from "./components/header/Header";XXXXXX
import Footer from "./components/footer/Footer";XXXXXXX

import Details from "./components/routes/Details";XXXXX
import NewProduct from "./components/routes/newProduct/NewProduct";XXXXXX
import HomeAdmin from "./components/routes/homeAdmin/HomeAdmin";XXXXX
import AdminHeader from "./components/header/adminHeader/AdminHeader";XXXXX
import CrearCuenta from "./components/routes/crearCuenta/CrearCuenta";XXXXXX
import LogIn from "./components/routes/logIn/LogIn";XXXXXXX
import Features from "./components/routes/features/Features";XXXXXXXXXX
import Categories from "./components/routes/categories/Categories";XXXXX

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
  );
}

export default App;*/
import "./rsuite.less";
import "./App.css";
import { Route, Routes } from "react-router-dom";
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
  );
}

export default App;