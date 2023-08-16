import styles from "../logIn/Login.module.css";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Grid } from "@mui/material";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from "react-router-dom";

const Login = () => {
  
  const [mensaje2, setMensaje2] = useState(false)

  const initialValues = {
    email: '',
    password: ''
  }

  const sendForm = (data, { resetForm }) => {
    console.log(data);
    setMensaje2(true);
    localStorage.setItem('email', data.email);
    localStorage.setItem('email', data.password);
    resetForm();
  }

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    initialValues: initialValues,
    onSubmit: sendForm,
    validationSchema: Yup.object({
      email: Yup.string().email().required("Debes ingresar un email valido"),
      password: Yup.string().min(3).required('tu contraseña debe ser valida y contener no menos de 3 caracteres'),
    }),
  });

  return (

      <form className={styles.formularioLog} id="form" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
        >
    
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
    <Link to={'/'}>
        <button className="button-primary" variant="contained" type="submit">
          Iniciar Sesion
        </button>
    </Link>
      </form>
  );
};

export default Login;