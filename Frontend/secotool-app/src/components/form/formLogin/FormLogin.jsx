import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./FormLogin.module.css";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const FormLogin = () => {

  const { login, userLog } = useAuth();

  //en estos initial values se me van a guardar luego lo que el usuario escriba en los imputs
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [mensajeError, setMensajeError] = useState(false);

  // formulario que se ejecuta cuando se hace click en el boton de iniciar sesion
  const sendForm = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/api/auth/login",
        {
          username: values.email,
          password: values.password,
        }
      );
      console.log(response);
      if (response.data.jwt) {
        login(response.data.jwt);
        userLog(response.data.userInfo);
        setMensajeError(false);
        navigate("/home");
      } else {
        setMensajeError(true);
      }
    } catch (error) {
      setMensajeError(true);
      // console.log(error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Debes ingresar un email válido")
      .required("Debes ingresar un email"),
    password: Yup.string()
      .min(6, "Tu contraseña debe tener un mínimo de 6 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Tu contraseña debe contener al menos una letra mayúscula y un número"
      )
      .required("Debes ingresar una contraseña"),
  });

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      onSubmit: sendForm,
      validationSchema: validationSchema,
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
            label="Contraseña"
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
          className={styles.btnLogin}
          variant="contained"
          type="submit"
        >
          Iniciar Sesión
        </Button>
        <NavLink to="/auth/crearCuenta" className={styles.customLink}>
        <Button
            style={{ borderColor: "#4a6ac9", color: "#4a6ac9" }}
            variant="outlined"
          >
            Crear Cuenta
          </Button>
        </NavLink>
        {mensajeError === true ? (
          <h5>Tu usuario o contraseña no es correcta.</h5>
        ) : null}
      </Grid>
    </form>
  );
};

export default FormLogin;
