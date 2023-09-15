import styles from "./AlquilerCard.module.css";

function AlquilerCard(props) {
  return (
    <>
      <div className={styles.cardFavorite}>
        <img
          src={props.images}
          alt={props.name}
          className={styles.productImage}
        />
        <div className={styles.infoCard}>
          <span className={styles.status} style={{ color: "red" }}>
            PENDIENTE
          </span>
          <span className={styles.dateRange}>{props.alquiler}</span>
          <span className={styles.productName}>{props.name}</span>
          <span className={styles.favoritePrice}>
            ${props.price} - reservado el 20/04/23
          </span>
        </div>
        <div className={styles.buttonsAlquiler}>
          <button>Volver a alquilar</button>
          <button>Valorar</button>
        </div>
      </div>
    </>
  );
}

export default AlquilerCard;
