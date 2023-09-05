import { Checkbox, CheckboxGroup, Input } from "rsuite";
import styles from "./FormShareProduct.module.css";
import { useState } from "react";
import CardProductShare from "../../card/cardProductShare/CardProductShare";

const FormShareProduct = ({ product }) => {
  const [value, setValue] = useState([]);

  return (
    <form className={styles.formShare}>
      <p>Elije alguna red social</p>
      <CheckboxGroup
        inline
        name="checkboxList"
        value={value}
        onChange={(value) => {
          console.log(value, "onChange");
          setValue(value);
        }}
        className={styles.checkboxGroup}
      >
        <div className={styles.checkbox}>
          <i className="fa-brands fa-facebook-f"></i>
          <Checkbox value="facebook" />
        </div>
        <div className={styles.checkbox}>
          <i className="fa-brands fa-instagram"></i>
          <Checkbox value="instagram" />
        </div>
        <div className={styles.checkbox}>
          <i className="fa-brands fa-twitter"></i>
          <Checkbox value="twitter" />
        </div>
      </CheckboxGroup>
      <div className={styles.boxEndForm}>
        <CardProductShare product={product}></CardProductShare>
        <Input
          as="textarea"
          rows={3}
          placeholder="Escribe aquí algún mensaje para acompañar al contenido"
        />
      </div>
      <button className="button-cta">Compartir</button>
    </form>
  );
};
export default FormShareProduct;
