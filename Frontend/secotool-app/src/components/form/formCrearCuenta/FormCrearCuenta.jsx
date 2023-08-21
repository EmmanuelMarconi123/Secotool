
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./FormCrearCuenta.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const FormCrearCuenta = () => {

  const navigate = useNavigate()

  //en estos initial values se me van a guardar luego lo que el usuario escriba en los imputs
  const initialValues = {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  //vaidaciones de los campos usando YUP
  const validationSchema = Yup.object({
    name: Yup.string().min(3).required("Tu nombre debe contener más de 3 caracteres"),
    lastname: Yup.string().min(3).required("Tu apellido debe contener más de 3 caracteres"),
    email: Yup.string().email().required("Debes ingresar un email válido"),
    password: Yup.string().min(6, "Tu contraseña debe tener un mínimo de 6 caracteres").required("Debes ingresar una contraseña"),
  });

  //utilizamos formik desestructurando varias cosas propias de formik
  const { handleChange, handleSubmit, handleBlur, validateForm, values, errors, touched, isValid } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        try {
          await validationSchema.validate(values, { abortEarly: false });
  
          navigate('/auth/confirmacionNuevoUsuario');
        } catch (error) {
          error("Por favor, completa todos los campos correctamente");
        }
      },
      validationSchema: validationSchema,
    });

    const handleCreateAccountClick = () => {
      validateForm().then(() => {
        if (isValid) {
          handleSubmit();
        }
      });
    };


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
              label="Contraseña"
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
            className={styles.botonCrearCuenta}
            type="submit"
            variant="contained"
            onClick={handleCreateAccountClick}
          >
            Crear Cuenta
          </Button>
          <NavLink to="/auth/login" className={styles.customLink}>
            <Button
              variant="outlined"
              style={{ borderColor: "#4a6ac9", color: "#4a6ac9"}}
            >
              Iniciar Sesión
            </Button>
          </NavLink>
        </Grid>
      </form>
    </>
  );
}

export default FormCrearCuenta;
