import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./FormCrearCuenta.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const FormCrearCuenta = () => {
  //en estos initial values se me van a guardar luego lo que el usuario escriba en los inputs
  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  //vaidaciones de los campos usando YUP
  const navigate = useNavigate();
  const [mensajeError, setMensajeError] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(6, "Tu nombre debe contener más de 6 caracteres")
      .required("Debes ingresar un nombre"),
    lastname: Yup.string()
      .min(6, "Tu apellido debe contener más de 6 caracteres")
      .required("Debes ingresar un apellido"),
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

  //utilizamos formik desestructurando varias cosas propias de formik
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        try {
          setMensajeError(false);
          // console.log(values);
          const response = await axios.post(
            "http://localhost:8080/v1/api/auth/singup",
            {
              firstName: values.name,
              lastName: values.lastname,
              username: values.email,
              password: values.password,
            }
          );

          if (response.status === 200) {
            console.log(response);
            navigate("/auth/confirmacionNuevoUsuario");
          }
        } catch (error) {
          setMensajeError(true);
          console.error("Error al crear el usuario:", error);
          // Maneja el error aquí
        }
      },
      validationSchema: validationSchema,
    });

  return (
    <>
      <form className={styles.formulario} id="form" onSubmit={handleSubmit}>
        <Grid container className={styles.contenedorForm}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              type="text"
              id="outlined-basic"
              name="name"
              label="Nombre"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              error={touched.name && errors.name ? true : false}
              helperText={touched.name && errors.name ? errors.name : ""}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              type="text"
              id="outlined-basic"
              name="lastname"
              label="Apellido"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastname}
              error={touched.lastname && errors.lastname ? true : false}
              helperText={
                touched.lastname && errors.lastname ? errors.lastname : ""
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              type="email"
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={touched.email && errors.email ? true : false}
              helperText={touched.email && errors.email ? errors.email : ""}
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
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              error={touched.password && errors.password ? true : false}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
            />
          </Grid>
          <Button
            className={styles.botonCrearCuenta}
            type="submit"
            variant="contained"
          >
            Crear Cuenta
          </Button>
          <NavLink to="/auth/login" className={styles.customLink}>
            <Button
              variant="outlined"
              style={{ borderColor: "#4a6ac9", color: "#4a6ac9" }}
            >
              Iniciar Sesión
            </Button>
          </NavLink>
          {mensajeError === true ? (
            <h5>Hubo un error. Intentalo más tarde.</h5>
          ) : null}
        </Grid>
      </form>
    </>
  );
};

export default FormCrearCuenta;
