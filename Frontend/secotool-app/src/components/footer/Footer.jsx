import { Grid, Typography } from "@mui/material";
import styles from '../footer/Footer.module.css'

function Footer() {
    /*aqui va todo referido al footer*/
    return(
        <>
      <Grid container className={styles.footer}>
        <Grid container xs={4} className={styles.logoYcopy}>
          <Grid xs={12}>
          <img src="../../" alt="" />
          </Grid>
          <Grid xs={12}>
          <Typography>Copy Right</Typography>
          </Grid>
          <Grid xs={12}>
          <Typography>2023</Typography>
          </Grid>
        </Grid>
        <Grid item xs={8} className={styles.infoFooter}>
          <Typography variant="h6">Este es el Footer</Typography>
        </Grid>
      </Grid>
    </>
    )
}
export default Footer;