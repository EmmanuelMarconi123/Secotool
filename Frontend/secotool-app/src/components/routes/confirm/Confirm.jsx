import styles from "./Confirm.module.css";

const Confirm = () => {
  return (
    <div className={styles.boxConfirm}>
      <h4>¡ESTÁS A UN CLICK DE CONFIRMAR TU ALQUILER, EVELYN</h4>
      <ul>
        <li>
          <i className="fa-regular fa-envelope"></i> Luego de que confirmes el
          alquiler recibirás un correo electrónico con los detalles del mismo.
        </li>
        <li>
          <i className="fa-regular fa-list"></i> Al seleccionar el botón
          Solicitar alquiler estarás aceptando las políticas, términos y
          condiciones de SECOTOOL.
        </li>
      </ul>
    </div>
  );
};
export default Confirm;
