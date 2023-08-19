import styles from "../adminHeader/AdminHeader.module.css";
import LogoDesktop from "../../../assets/img/LogoDesktop.png";
import { NavLink } from "react-router-dom";
import "../../../index.css";
import "../../../app.css";

const AdminHeader = () => {
  return (
    <header className="spacing-grid">
      <nav className={styles.navbar}>
        <div>
          <NavLink to="/admin/home" className={styles.leftNavbar}>
            <img src={LogoDesktop} className={styles.logo} alt="" />
            <span className={styles.slogan}>Construí fácil y rápido</span>
          </NavLink>
        </div>
        <div className={styles.navbarButtons}>
          <div>
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-box"></i>
              Productos
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-user"></i>
              Usuarios
            </NavLink>
            <NavLink
              to="/admin/characteristics"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-palette"></i>
              Características
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              <i className="fa-solid fa-tag"></i>
              Categorías
            </NavLink>
          </div>
          <NavLink to="/home" className={styles.closeSesion}>
            <i className="fa-regular fa-right-from-bracket"></i>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
