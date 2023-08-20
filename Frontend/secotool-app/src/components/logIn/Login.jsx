import FormLogin from "../form/FormLogin";
import HeaderAuth from "../header/headerAuth/HeaderAuth";
import styles from '../logIn/Login.module.css'

const Login = () => {
  return (
    <div className={styles.container}>
      <HeaderAuth />
      <FormLogin />
    </div>
  );
};

export default Login;
