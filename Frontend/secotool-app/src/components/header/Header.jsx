import { Link } from "react-router-dom";
import LogoDesktop from "../../assets/img/LogoDesktop.png";
import styles from "./adminHeader/AdminHeader.module.css";
import stylesHeader from "../header/Header.module.css";


function Header() {


  return (
    <header>
      <nav className={stylesHeader.navbar}>
        <div className={styles.leftNavbar}>
          <Link to="/home">
            <img className={stylesHeader.imgLogo} src={LogoDesktop} alt="" />
          </Link>
          <span className={stylesHeader.lema}>Construí fácil y rápido</span>
        </div>
        <div className={stylesHeader.navbarButtons}>
          <Link to="/crearCuenta">
            <button className="button-primary button-small">
              Crear Cuenta
            </button>
          </Link>
          <Link to="/home" className={styles.closeSesion}>
            <i className="fa-regular fa-right-from-bracket"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
}
export default Header;
