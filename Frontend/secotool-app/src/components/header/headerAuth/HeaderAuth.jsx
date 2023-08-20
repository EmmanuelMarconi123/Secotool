import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoEmpresa from "../../../assets/img/LogoDesktop.png";
import Button from "@mui/material/Button";
import styles from "../headerAuth/HeaderAuth.module.css";
import { Link } from "react-router-dom";

const HeaderAuth = () => {
  return (
    <section className={styles.seccionCrearCuenta}>
      <Link to={"/"}>
        <div className={styles.volverAtras}>
          <ArrowBackIcon />
          <Button style={{ color: "black" }} variant="text">
            Volver Atras
          </Button>
        </div>
      </Link>
      <div className={styles.logoYtexto}>
        <img src={LogoEmpresa} alt="logoEmpresa" />
        {window.location.pathname.includes("/login") ? (
          <h3>Iniciar Sesion</h3>
        ) : (
          <h3>Crear Cuenta</h3>
        )}
      </div>
    </section>
  );
};

export default HeaderAuth;
