import { Link } from "react-router-dom";
import { routes } from "../../assets/routes";
import { Grid, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import styles from "../header/Header.module.css";
import logo from "../../assets/img/LogoMovile.png";

function Header() {
    
    /*Aqui maquetar header*/
    return(
        <nav className={styles.navbar}>
      <Grid container>
        <Grid item xs={6} className={styles.logoYfrase} >
          <Grid container className={styles.logo}>
            <Link to={routes.home}>
              <img src={logo} alt="Logo Empresa" />
            </Link>
            <Typography className={styles.fraseLogo} color="secondary" sx={{ fontSize: 9 }}>
              Construí fácil y rápido
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={6} className={styles.contenedorBotones}>
          <Grid item xs={6}>
            <Link to={routes.newUser}>
              <Button className={styles.botonCrearCuenta} variant="contained">
                <div className={styles.buttonContent}>Crear Cuenta</div>
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} className={styles.loginButton}>
            <Link to={routes.login}>
              <Button startIcon={<LoginIcon />} />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </nav>
    )
}
export default Header;