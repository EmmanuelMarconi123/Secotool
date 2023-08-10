import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, IconButton } from "@mui/material";
import styles from "../card/CardProduct.module.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function CardProduct({ nombre, id, descripcion }) {
    return (
    <Grid container className={styles.container}>
      <Grid item xs={11} className={styles.img}>
        <img
          className={styles.img}
          src="src/assets/recursos/photo-1689600570529-0e87f50e4687.avif"
          alt=""
        />
      </Grid>
      <Grid className={styles.textoCard} item xs={11}>
        <Grid className={styles.card} container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              {nombre}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" size="small">
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
              </IconButton>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
    }
export default CardProduct;