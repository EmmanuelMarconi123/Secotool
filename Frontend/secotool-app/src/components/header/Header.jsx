import { Link } from "react-router-dom";
import LogoDesktop from "../../assets/img/LogoDesktop.png";
import stylesHeader from "../header/Header.module.css";
import { useEffect, useState } from "react";
import ListCategorias from "../list/ListCategorias";
/*import ListCategorias from "../list/ListCategorias";*/

function Header() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Limpieza del listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={stylesHeader.headerDefault + " spacing-grid"}>
      <nav className={stylesHeader.navbar}>
        <div className={stylesHeader.leftNavbar}>
          <Link to="/home">
            <img
              className={stylesHeader.imgLogo}
              src={LogoDesktop}
              alt="Logo SecoTool"
            />
          </Link>
          <span className={stylesHeader.lema}>Construí fácil y rápido</span>
        </div>
        <div className={stylesHeader.navbarButtons}>
          {isMobile ? (
            <i className="fa-regular fa-bars"></i>
          ) : (
            <>
              <div className={stylesHeader.navbarContainer}>
                <Link to="/home"><a>Inicio</a></Link>
                <div className={stylesHeader.dropdown}>
                  <button className={stylesHeader.dropbtn}>
                    Herramientas
                    <i className="fa-regular fa-chevron-down"></i>
                  </button>
                  <div
                    className={stylesHeader.dropdownContent + " spacing-grid"}
                  >
                    <div className={stylesHeader.header}>
                        <h2>Categorías</h2>
                    </div>
                    <div>
                      <ListCategorias></ListCategorias>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/auth/crearCuenta">
                <button className="button-primary-transparent button-small">
                  Crear Cuenta
                </button>
              </Link>
              <Link to="/auth/login">
                <button className="button-transparent">
                  <i className="fa-regular fa-right-from-bracket"></i>Iniciar
                  Sesión
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header;
