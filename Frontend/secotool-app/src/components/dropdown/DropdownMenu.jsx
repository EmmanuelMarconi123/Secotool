import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.css"
//import ListCategorias from "../list/ListCategorias";

const DropdownMenu = () => {
    return(
        <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          <i className="fa-regular fa-bars"></i>
        </button>
        <div className={styles.dropdownContent + " spacing-grid"}>
          <nav className="d-flex f-dir-colum ">
            <Link to="/">
              Inicio
            </Link>
            <div className={styles.subDropdown}>
              <Link to="/allFilters" className={styles.dropbtn}>
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