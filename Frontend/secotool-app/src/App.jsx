import "./App.css";
import { Route, Routes } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from "./components/routes/Home";
import Details from "./components/routes/Details";
import HomeAdmin from "./components/routes/HomeAdmin";
import NewProduct from "./components/routes/NewProduct";

function App() {
  return (
    <>
    <Header />
    <main className="spacing-grid">
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/product/:id" element={<Details />}></Route>
        <Route path="/admin/home" element={<HomeAdmin />}></Route>
        <Route path="/admin/newproduct" element={<NewProduct />}></Route>
        <Route path="*" element={<div>Error 404</div>}></Route>
      </Routes>
    </main>
    <Footer/>
    </>
  );
}

export default App;
