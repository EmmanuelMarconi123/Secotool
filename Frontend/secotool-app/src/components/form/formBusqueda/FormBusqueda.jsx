import { Grid } from "@mui/material";
import styles from "./FormBusqueda.module.css";
/*import { useFormik } from "formik";*/

const FormBusqueda = () => {
  // const [herramienta, setHerramienta] = useState("");

  /*let initialValues = {
    herramienta: "",
    fecha: "",
  };

  const sendForm = (data) => {
    console.log(data);
  };

  const { handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    onSubmit: sendForm,
  });*/

  return (
    <>
      <form className={styles.containerFormBusqueda}>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} md={12}>
            <div className="d-flex">
            <input className={styles.inputBrowser} type="text" value="" placeholder="Herramienta" />
            <button className={styles.btnBrowser}><i className="fa-regular fa-magnifying-glass"></i></button>
            </div>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FormBusqueda;