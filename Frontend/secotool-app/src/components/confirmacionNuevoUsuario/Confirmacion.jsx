import { Button } from "@mui/material";
import styles from "../confirmacionNuevoUsuario/Confirmacion.module.css";
import { Link } from "react-router-dom";

const Confirmacion = () => {
  return (
    <div className={styles.confirmacion}>
      <i className="fa-sharp fa-solid fa-circle-check"
         style={{ color: "#27ae1e", fontSize:80 }}
      />
      <h1 className={styles.text}>Tu cuenta fue creada exitosamente!</h1>
      <p className={styles.text}>Te llegará un correo electronico con la confirmación</p>
      <Link to={'/auth/login'}>
      <Button variant="contained" className={styles.btnSuccess}>Iniciar Sesión</Button>
      </Link>
      <Button variant="outlined" className={styles.btnReenviar}> Volver a Enviar Email</Button>
    </div>
  );
};2

export default Confirmacion;
