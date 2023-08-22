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
          </div>
          <div className="spacing-grid">
            <ListCategorias></ListCategorias>
          </div>
        </div>
      </div>
    )
};

export default DropdownDesktop;