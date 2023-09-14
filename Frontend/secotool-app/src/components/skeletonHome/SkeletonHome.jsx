
import { Loader } from "rsuite";
import styles from "./SkeletonHome.module.css";
import { Grid } from "@mui/material";

const SkeletonHome = () => {
  const renderDiezElementos = () => {
    const elementos = [];

    for (let i = 0; i < 10; i++) {
      elementos.push(
      <Grid item xs={5} md={5} key={i} className={styles.elemento} style={{ margin: '5px' }}/>
      );
    }
    return elementos;
  };

  return (
    <Grid container className={styles.contenedorCardsSkeleton}>
      {renderDiezElementos()}
    </Grid>
  );
};

export default SkeletonHome;