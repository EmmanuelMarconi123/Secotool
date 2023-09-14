
import { Loader } from "rsuite";
import styles from "./SkeletonHome.module.css";
import { Grid } from "@mui/material";

const SkeletonHome = () => {
  const renderDiezElementos = () => {
    const elementos = [];

    for (let i = 0; i < 10; i++) {
      elementos.push(
      <Grid item xs={6} md={6} key={i} className={styles.elemento}/>
      );
    }
    return elementos;
  };

  return (
    <Grid container className={styles.contenedorCardsSkeleton}>
      {renderDiezElementos()}
      <Loader size="md" content="Cargando" className={styles.loader} />
    </Grid>
  );
};

export default SkeletonHome;