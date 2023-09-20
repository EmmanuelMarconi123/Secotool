import styles from "./PersonalInfo.module.css";

const PersonalInfo = () => {
  return (
    <div className={styles.sectionPersonalInfo}>
        <div>
        <h4>Tus datos personales</h4>
      <div className={styles.containerInfo}>
        <div className={styles.boxInfo}>
          <span>Nombre</span>
          <p>Evelyn{/*user.firstName*/}</p>
        </div>
        <div className={styles.boxInfo}>
          <span>Apellido</span>
          <p>Tramontin{/*user.lastName*/}</p>
        </div>
        <div className={styles.boxInfo}>
          <span>Email</span>
          <p>evelyn@gmail.com{/*user.username*/}</p>
        </div>
      </div>
        </div>

      <div>
        <h4>Información de contacto</h4>
        <form action="">
            <input type="number" placeholder="Numero de celular" className={styles.inputForm}/>
        </form>
      </div>
    </div>
  );
};
export default PersonalInfo;
