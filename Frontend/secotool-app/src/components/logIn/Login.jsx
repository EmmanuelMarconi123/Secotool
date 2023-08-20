import FormLogin from "../form/formLogin/FormLogin";
import HeaderAuth from "../header/headerAuth/HeaderAuth";
import styles from '../logIn/Login.module.css'

const Login = () => {
  return (
    <section className={styles.sectionLogin + " spacing-grid"}>
      <div className={styles.bgLogin}></div>
      <HeaderAuth />
      <FormLogin />
    </section>
  );
};

export default Login;
