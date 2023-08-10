import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import styles from "../card/CardProduct.module.css";

function CardProduct({ nombre }) {
    return (
    <Grid container className={styles.container}>
      <Grid item xs={11} className={styles.img}>
        <img
          className={styles.img}
          src="src/assets/img/taladro-1.png"
          alt=""
        />
      </Grid>
      <Grid className={styles.textoCard} item xs={11}>
        <Grid className={styles.card} container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              {nombre}
            </Typography>
            <div className="font-xl">
                <span>$</span>
                <span>25.419</span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
    }
export default CardProduct;