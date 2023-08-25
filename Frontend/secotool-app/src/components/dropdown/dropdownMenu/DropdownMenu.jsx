import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.css";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isLoggedIn, logout, user } = useAuth();
  const [userAdmin, setUserAdmin] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const isAdmin = () => {
    if(user.userRole === "ADMIN"){
      setUserAdmin(true);
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.dropbtn} onClick={toggleDropdown}>
        <i className="fa-regular fa-bars"></i>
      </button>
      <div
        className={`${styles.dropdownContent + " spacing-grid"} ${
          dropdownOpen ? styles.show : ""
        }`}
      >
        <nav className="d-flex f-dir-colum ">
          <Link to="/" onClick={toggleDropdown}>
            Inicio
          </Link>
          <div className={styles.subDropdown}>
            <Link
              to="/allFilters"
              className={styles.dropbtn}
              onClick={toggleDropdown}
            >
              Herramientas
            </Link>
            <div className={styles.boxButtons}>
            {userAdmin && (
              <Link to="/home/admin">
                <button className="button-primary">Panel admin</button>
              </Link>
            )}
              {isLoggedIn ? (
                <Link to="/">
                  <button className="button-transparent" onClick={logout}>
                    <i className="fa-regular fa-arrow-right-from-bracket"></i>
                    Cerrar Sesión
                  </button>
                </Link>
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
          </div>
        </nav>
      </div>
    </div>
  );
};
export default DropdownMenu;
