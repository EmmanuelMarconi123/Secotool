import { Checkbox, CheckboxGroup, Input } from "rsuite";
import styles from "./FormShareProduct.module.css";
import { useState } from "react";
import CardProductShare from "../../card/cardProductShare/CardProductShare";

const FormShareProduct = ({ product }) => {
  const [value, setValue] = useState([]);
  let url = "";
  if (typeof window === "object") {
    url = String(window.location);
    console.log(url);
  }

  return (
    <form className={styles.formShare}>
      <p>Elije alguna red social</p>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Compartir en Facebook
      </a>

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
