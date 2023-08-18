import styles from "../adminHeader/AdminHeader.module.css";
import LogoDesktop from "../../../assets/img/LogoDesktop.png";
import { Link } from "react-router-dom";
import "../../../index.css";
import "../../../app.css";

const AdminHeader = () => {
  return (
    <header className="spacing-grid">
      <nav className={styles.navbar}>
        <div>
          <Link to="/admin/home" className={styles.leftNavbar}>
            <img src={LogoDesktop} className={styles.logo} alt="" />
            <span className={styles.slogan}>Construí fácil y rápido</span>
          </Link>
          <span>Construí fácil y rápido</span>
        </div>
        <div className={styles.navbarButtons}>
          <div>
            <Link to="/admin/newproduct" className={styles.navLink}>
              <i className="fa-regular fa-plus"></i>
              Agregar producto
            </Link>
            <Link to="/admin/home" className={styles.navLink}>
              <i className="fa-regular fa-list"></i>
              Listar Productos
            </Link>
          </div>
          <Link to="/home" className={styles.closeSesion}>
            <span>Cerrar Sesión</span>
            <i className="fa-regular fa-right-from-bracket"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
