import { Grid } from "@mui/material";
import styles from "../card/CardProduct.module.css";

function CardProduct({ nombre }) {
  return (
    <Grid container className={styles.container}>
      {/* Contenedor de imagen */}
      <Grid item xs={10} md={6} className={styles.imgContainer}>
        <img className={styles.img} src="src/assets/img/taladro-1.png" alt="" />
      </Grid>
      {/* Contenedor de texto */}
      <Grid container className={styles.textoCard} item xs={12} md={6}>
        <Grid item xs={12} md={12}>
          <h4 className={styles.titleCard}>
            {nombre}
          </h4>
        </Grid>
        <Grid xs={12} md={12} className={styles.textPriceCard}>
          <span>$</span>
          <span>25.419</span>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default CardProduct;
