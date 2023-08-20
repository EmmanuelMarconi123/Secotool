import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import {  NavLink } from "react-router-dom";
import styles from "../form/FormLogin.module.css";

const FormLogin = () => {
  const handleLogin = () => {
    localStorage.setItem("accesToken", "true");
  };

  //en estos initial values se me van a guardar luego lo que el usuario escriba en los imputs
  const initialValues = {
    email: "",
    password: "",
  };

  // formulario que se ejecuta cuando se hace click en el boton de iniciar sesion
  const sendForm = (data, { resetForm }) => {
    console.log(data);
    localStorage.setItem("email", data.email);
    localStorage.setItem("email", data.password);
    resetForm();
  };

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      onSubmit: sendForm,
      validationSchema: Yup.object({
        email: Yup.string().email().required("Debes ingresar un email valido"),
        password: Yup.string()
          .min(6, "la contraseña debe contener como minimo 6 caracteres")
          .required("Debes ingresar una contraseña"),
      }),
    });

  return (
    <form className={styles.formularioLog} id="form" onSubmit={handleSubmit}>
      <Grid container className={styles.contenedorForm}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth // Ocupa el ancho completo disponible en su contenedor.
            type="email"
            id="outlined-basic"
            name="email"
            label="Email"
            variant="outlined"
            onBlur={handleBlur} // Evento que se dispara cuando el campo pierde el foco (se deja de seleccionar).
            onChange={handleChange} // Evento que se dispara cuando el valor del campo cambia.
            value={values.email}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : ""} // Texto de ayuda o error asociado al campo.
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            type="password"
            id="outlined-basic"
            name="password"
            label="Password"
            variant="outlined"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={touched.password && errors.password ? true : false}
            helperText={
              touched.password && errors.password ? errors.password : ""
            }
          />
        </Grid>
        <Button
          className={styles.bononLogin}
          variant="contained"
          style={{backgroundColor: '#FFDB27', color: "black", width:'100%'}}
          type="submit"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
        <NavLink to="/auth/crearCuenta" className={styles.customLink}>
        <Button style={{borderColor: '#FFDB27', color: "black", width:'100%'}} variant="outlined"> 
          Crear Cuenta
        </Button>
        </NavLink>
      </Grid>
    </form>
  );
};

export default FormLogin;
