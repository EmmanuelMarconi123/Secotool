import { Link } from "react-router-dom";
import styles from "./NavBarHeader.module.css";
import LogoDesktop from "../../assets/img/LogoDesktop.png";
import DropdownMenu from "../dropdown/DropdownMenu";
import DropdownDesktop from "../dropdown/DropdownDesktop";
import { useMediaQuery } from "@react-hook/media-query";

const NavBarHeader = () => {

const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <nav className={styles.NavBarHeader}>
      <div className={styles.leftNavbar}>
        <Link to="/home">
          <img
            className={styles.imgLogo}
            src={LogoDesktop}
            alt="Logo SecoTool"
          />
        </Link>
        <span className={styles.lema}>Construí fácil y rápido</span>
      </div>
      {isMobile ? (
        <DropdownMenu/>
      ) : (
        <>
          <div className={styles.navbarContainer}>
            <Link to="/home">
              <a>Inicio</a>
            </Link>
            <DropdownDesktop/>
          </div>
          <div className={styles.boxButtons}>
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
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBarHeader;
