import { Link } from "react-router-dom";
import ListCategorias from "../list/ListCategorias";
import styles from "./DropdownDesktop.module.css";

const DropdownDesktop = () => {
    return(
        <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          Herramientas
          <i className="fa-regular fa-chevron-down"></i>
        </button>
        <div className={styles.dropdownContent}>
          <div className={styles.header + " spacing-grid"}>
            <h2>Categorías</h2>
            <Link to="/allFilters"><i className="fa-regular fa-arrow-right"></i> Explorar</Link>
          </div>
          <div className="spacing-grid">
            <ListCategorias></ListCategorias>
          </div>
        </div>
      </div>
    )
};

export default DropdownDesktop;