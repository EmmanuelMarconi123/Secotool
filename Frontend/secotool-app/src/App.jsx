import "./App.css";
import { Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from "./components/routes/Home";
import Details from "./components/routes/Details";
import NewProduct from "./components/routes/newProduct/NewProduct";
import HomeAdmin from "./components/routes/homeAdmin/HomeAdmin";
import AdminHeader from "./components/header/adminHeader/AdminHeader";
import CrearCuenta from "./components/routes/crearCuenta/CrearCuenta";
import LogIn from "./components/routes/logIn/LogIn";
import "rsuite/dist/rsuite.min.css";

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
