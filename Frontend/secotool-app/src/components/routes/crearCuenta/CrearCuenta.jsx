import styles from "../crearCuenta/CrearCuenta.module.css";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Grid } from "@mui/material";
import { useFormik } from 'formik'
import * as Yup from 'yup'

const CrearCuenta = () => {
  
  const [mensaje2, setMensaje2] = useState(false)

  const initialValues = {
    name: '',
    lastname:'',
    email: '',
    password: ''
  }

  const sendForm = (data, { resetForm }) => {
    console.log(data);
    setMensaje2(true);
    localStorage.setItem('userName', data.name);
    localStorage.setItem('lastname', data.lastname);
    localStorage.setItem('email', data.email);
    resetForm();
  }

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    initialValues: initialValues,
    onSubmit: sendForm,
    validationSchema: Yup.object({
      name: Yup.string().min(3).required("tu nombre debe contener mas de 3 caracteres"),
      lastname: Yup.string().min(3).required("tu apellido debe contener mas de 3 caracteres"),
      email: Yup.string().email().required("Debes ingresar un email valido"),
      password: Yup.string().min(3).required('tu contraseña debe ser valida y contener no menos de 3 caracteres'),
    }),
  });

  return (
    <>
      <form className={styles.formularioLog} id="form" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
        >
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
              helperText={touched.lastname && errors.lastname ? errors.lastname : ""}
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
              value={values.password}
            />
          </Grid>
        </Grid>
        <button className="button-primary" variant="contained" type="submit">
          Crear Cuenta
        </button>
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
          Muchas gracias por crear una cuenta con nosotros {localStorage.getItem("userName")}
        </p>
      )}
    </>
  );
};

export default CrearCuenta;
