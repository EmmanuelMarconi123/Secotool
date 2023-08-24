import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.css"
import { useEffect, useRef, useState } from "react";
//import ListCategorias from "../list/ListCategorias";

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

    return(
        <div className={styles.dropdown} ref={dropdownRef}>
        <button className={styles.dropbtn} onClick={toggleDropdown}>
          <i className="fa-regular fa-bars"></i>
        </button>
        <div className={`${styles.dropdownContent + " spacing-grid"} ${
          dropdownOpen ? styles.show : ""
        }`}>
          <nav className="d-flex f-dir-colum ">
            <Link to="/" onClick={toggleDropdown}>
              Inicio
            </Link>
            <div className={styles.subDropdown}>
              <Link to="/allFilters" className={styles.dropbtn} onClick={toggleDropdown}>
                Herramientas
                {/*<i className="fa-regular fa-chevron-down"></i>*/}
              </Link>
              {/*<div className={styles.subDropdownContent}>
                <div className={styles.header + " spacing-grid"}>
                  <h2>Categorías</h2>
                </div>
                <div className="spacing-grid">
                  <ListCategorias></ListCategorias>
                </div>
    </div>*/}
              <div className={styles.boxButtons}>
                <Link to="/auth/crearCuenta">
                  <button className="button-primary-transparent button-small">
                    Crear Cuenta
                  </button>
                </Link>
                <Link to="/auth/login">
                  <button className="button-transparent">
                    <i className="fa-regular fa-right-from-bracket"></i>
                    Iniciar Sesión
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
};
export default DropdownMenu;