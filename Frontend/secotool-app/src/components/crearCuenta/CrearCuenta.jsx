
import FormCrearCuenta from "../form/FormCrearCuenta";
import styles from '../crearCuenta/CrearCuenta.module.css'
import HeaderAuth from "../header/headerAuth/HeaderAuth";

const CrearCuenta = () => {
  return (
    <div className={styles.container}>
      <HeaderAuth/>
      <FormCrearCuenta/>
    </div>
  );
};

export default CrearCuenta;
