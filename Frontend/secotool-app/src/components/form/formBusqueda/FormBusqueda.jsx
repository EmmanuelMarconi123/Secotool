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
        <label htmlFor="" className={styles.inputLabelBusqueda}>
          <i className="fa-solid fa-screwdriver-wrench"></i>
          <input
            className={styles.inputBrowser}
            type="text"
            placeholder="Herramienta"
          />
        </label>

        <label htmlFor="" className={styles.inputLabelCalendar}>
          <i className="fa-regular fa-calendar"></i>
          <input
            className={styles.inputDate}
            type="text"
            placeholder="Desde - Hasta"
          />
        </label>
        <button className={styles.btnBrowser}>Buscar</button>
      </form>
    </>
  );
};

export default FormBusqueda;
