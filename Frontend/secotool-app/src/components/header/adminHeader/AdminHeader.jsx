import styles from "../adminHeader/AdminHeader.module.css";
import LogoDesktop from "../../../assets/img/LogoDesktop.png";
import { Link } from "react-router-dom";
import "../../../index.css";
import "../../../app.css";

const AdminHeader = () => {
  return (
    <header className="spacing-grid">
      <nav className={styles.navbar}>
        <div className={styles.leftNavbar}>
          <Link to="/admin/home">
            <img src={LogoDesktop} alt="" />
          </Link>
          <span>Construi facil y rapido</span>
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
            <i className="fa-solid fa-right-from-bracket"></i>
            Cerrar Sesion
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
