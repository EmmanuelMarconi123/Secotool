import styles from "./home.module.css";
import FormBusqueda from "../../form/formBusqueda/FormBusqueda";
import ListProducts from "../../list/ListProducts";
import { Typography } from "@mui/material";
import { useFetch, statuses } from "../../../customHooks/useFetch";
import { Loader} from 'rsuite';

const LoadingIndicator = () =>  <Loader size="md" content="CARGANDO" />;

const NetworkError = () => <p>Network Error</p>;

const Home = () => {
  const URL_API = "http://localhost:8080/v1/api/products/all";
  const { data, status } = useFetch(URL_API, {});

  const ComponentListProducts =
    status !== statuses.ERROR && data ? <ListProducts products={data} /> : null;

  return (
    <section className={styles.sectionBusqueda}>
      <div className={styles.containerBusqueda}>
        <div className={styles.bgBusqueda}></div>
        <Typography variant="h6" className={styles.titulo}>
          ¿Qué herramienta necesitas?
        </Typography>
        <FormBusqueda />
      </div>
      <div className={styles.contenedorCards}>
        {status === statuses.LOADING ? (
          <LoadingIndicator />
        ) : (
          ComponentListProducts
        )}
        {status === statuses.ERROR && <NetworkError />}
      </div>
    </section>
  );
};

export default Home;
