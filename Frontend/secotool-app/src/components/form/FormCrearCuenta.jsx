import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../form/FormCrearCuenta.module.css";
import axios from 'axios'
import { NavLink } from "react-router-dom";

const FormCrearCuenta = () => {
  const [mensaje2, setMensaje2] = useState(false);

  //en estos initial values se me van a guardar luego lo que el usuario escriba en los imputs
  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  // al hacer click en el boton del form se envia con este metodo la ingo al back
  const sendForm = async (data, { resetForm }) => {
    try {
      console.log(data);
      setMensaje2(true);

      const response = await axios.post("colocar-aca-url-para-push", data);

      console.log("Respuesta del servidor:", response.data);

      localStorage.setItem("userName", data.name);
      localStorage.setItem("lastname", data.lastname);
      localStorage.setItem("email", data.email);

      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      onSubmit: sendForm,
      validationSchema: Yup.object({
        name: Yup.string()
          .min(3)
          .required("tu nombre debe contener mas de 3 caracteres"),
        lastname: Yup.string()
          .min(3)
          .required("tu apellido debe contener mas de 3 caracteres"),
        email: Yup.string().email().required("Debes ingresar un email valido"),
        password: Yup.string()
          .min(6, "tu contraseña debe tener un minimo de 6 caracteres")
          .required("Debes ingresar una contraseña"),
      }),
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
              label="Name"
              variant="outlined"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              error={touched.name && errors.name}
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
              error={touched.name && errors.lastname}
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
              error={touched.email && errors.email}
              helperText={touched.email && errors.email ? errors.email : ""}
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
              onChange={handleChange}
              onBlur={handleBlur} // Evento que se dispara cuando el campo pierde el foco (se deja de seleccionar).
              error={touched.password && errors.password ? true : false}
              helperText={
                touched.password && errors.password ? errors.password : ""
              }
              value={values.password}
            />
          </Grid>
          <Button
            style={{
              backgroundColor: "#FFDB27",
              color: "black",
              width: "100%",
            }}
            className={styles.botonFormularioCrear}
            type="submit"
            variant="contained"
          >
            Crear Cuenta
          </Button>
          <NavLink to="/auth/login" className={styles.customLink}>
            <Button
              variant="outlined"
              style={{ borderColor: "#FFDB27", color: "black", width: "100%" }}
            >
              Iniciar Sesión
            </Button>
          </NavLink>
        </Grid>
      </form>
      {mensaje2 && (
        <p
          style={{
            color: "blue",
            fontSize: "16px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          Muchas gracias por crear una cuenta con nosotros
        </p>
      )}
    </>
  );
};

export default FormCrearCuenta;
