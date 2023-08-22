import HeaderAuth from "../header/headerAuth/HeaderAuth";
import styles from "../confirmacionNuevoUsuario/ConfirmNewUser.module.css";
import Confirmacion from "./Confirmacion";

const ConfirmacionNuevoUsuario = () => {
  return (
    <section className={styles.confirmacionNuevoUsusario + " spacing-grid"}>
      <div className={styles.bgCrearCuenta}></div>
      <HeaderAuth />
      <div className={styles.headerYconfirm}>
        <Confirmacion className={styles.confirmacion} />
      </div>
    </section>
  );
};

export default ConfirmacionNuevoUsuario;
