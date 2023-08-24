// import "rsuite/dist/rsuite.min.css";
import "./rsuite.less";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./autenticaciones/AuthRoutes/AuthRoutes";
import AppRoutes from "./autenticaciones/AppRoutes/AppRoutes";

function App() {
  return (
    <body>
    {window.location.pathname.includes('/admin') ? <AdminHeader /> : <Header />}
      <main className="spacing-grid">
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/crearCuenta" element={<CrearCuenta />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/product/:id" element={<Details />}></Route>
            <Route path="/admin/home" element={<HomeAdmin />}></Route>
            <Route path="/admin/newproduct" element={<NewProduct />}></Route>
            <Route path="*" element={<div>Error 404</div>}></Route>
          </Routes>
      </main>
    <Footer className='footer'/>
    </body>
  );
}

export default App;
