import { Link } from "react-router-dom";
import styles from "./NavBarHeader.module.css";
import LogoDesktop from "../../assets/img/LogoDesktop.png";
import DropdownMenu from "../dropdown/dropdownMenu/DropdownMenu";
import DropdownDesktop from "../dropdown/dropdownDesktop/DropdownDesktop";
import { useMediaQuery } from "@react-hook/media-query";
import DropdownProfile from "../dropdown/dropdownProfile/DropdownProfile";
import { useAuth } from "../../contexts/AuthContext";

const NavBarHeader = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const { isLoggedIn, user } = useAuth();

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
        <div className={styles.rightNavbar}>
          {isLoggedIn && <DropdownProfile />}
          <DropdownMenu />
        </div>
      ) : (
        <>
          <div className={styles.navbarContainer}>
            <Link to="/home">
              <a>Inicio</a>
            </Link>
            <DropdownDesktop />
          </div>
          <div className={styles.boxButtons}>
            {user.userRole && isLoggedIn ? (
              <Link to="/admin/home">
                <button className="button-primary-transparent button-small">
                  Panel admin
                </button>
              </Link>
            ):(<span></span>)}
            {isLoggedIn ? (
              <DropdownProfile />
            ) : (
              <>
                <Link to="/auth/crearCuenta">
                  <button className="button-primary-transparent button-small">
                    Crear Cuenta
                  </button>
                </Link>
                <Link to="/auth/login">
                  <button className="button-transparent">
                    <i className="fa-regular fa-right-to-bracket"></i>Iniciar
                    Sesión
                  </button>
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBarHeader;
