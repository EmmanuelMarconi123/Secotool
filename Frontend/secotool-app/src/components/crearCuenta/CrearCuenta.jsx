
import FormCrearCuenta from "../form/formCrearCuenta/FormCrearCuenta";
import styles from '../crearCuenta/CrearCuenta.module.css'
import HeaderAuth from "../header/headerAuth/HeaderAuth";

const CrearCuenta = () => {
  return (
    <section className={styles.sectionCrearCuenta + " spacing-grid"}>
      <div className={styles.bgCrearCuenta}></div>
      <HeaderAuth/>
      <FormCrearCuenta/>
      
    </section>
  );
};

export default CrearCuenta;
