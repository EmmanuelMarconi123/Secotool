import { useLocation } from "react-router-dom";
import FormLogin from "../form/formLogin/FormLogin";
import HeaderAuth from "../header/headerAuth/HeaderAuth";
import styles from "../logIn/Login.module.css";

const Login = () => {

  const locationData = useLocation()

  return (
    <section className={styles.sectionLogin + " spacing-grid"}>
      <div className={styles.bgLogin}></div>
      <HeaderAuth />
      <div className={styles.boxMsj}>
        <p>
          Si deseas alquilar alguna herramienta es necesario que estés logueado.
          En caso de que no estés logueado deberás registrarte.
        </p>
      </div>
      <FormLogin locationData={locationData.state ? locationData.state : undefined} />
    </section>
  );
};

export default Login;
