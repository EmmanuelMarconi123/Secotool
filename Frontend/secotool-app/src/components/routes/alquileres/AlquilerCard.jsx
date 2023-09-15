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
          <span className={styles.favoritePrice}>{props.alquiler}</span>
          <span className={styles.productName}>{props.name}</span>
          <span className={styles.favoritePrice}>${props.price}</span>
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
