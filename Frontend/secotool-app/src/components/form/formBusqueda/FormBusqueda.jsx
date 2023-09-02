import styles from "./FormBusqueda.module.css";
import { AutoComplete, DateRangePicker, InputGroup } from "rsuite";

const FormBusqueda = ({ productNames }) => {
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

    localhost:8080/v1/api/products/all/rentals?startDate=2024-09-05&endDate=2024-09-10&productName=  -------> ENDPINT PARA BUSCADOR

  });*/

  const { beforeToday } = DateRangePicker;

  return (
    <>
      <form className={styles.containerFormBusqueda}>
        <div className={styles.inputBuscador}>
          <InputGroup inside>
            <InputGroup.Addon>
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </InputGroup.Addon>
            <AutoComplete data={productNames} />
          </InputGroup>
        </div>

        <div className={styles.inputDate}>
          <InputGroup
            inside
          >
            <InputGroup.Addon>
              <i className="fa-regular fa-calendar"></i>
            </InputGroup.Addon>
            <DateRangePicker
              appearance="subtle"
              character="-"
              caretAs="none"
              style={{ border: "none" }}
              shouldDisableDate={beforeToday()}
            />
          </InputGroup>
        </div>

        <button className={styles.btnBrowser}>Buscar</button>
      </form>
    </>
  );
};

export default FormBusqueda;
