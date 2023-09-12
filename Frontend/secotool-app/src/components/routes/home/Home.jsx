import styles from "./home.module.css";
import FormBusqueda from "../../form/formBusqueda/FormBusqueda";
import ListProducts from "../../list/ListProducts";
import { useFetch, statuses } from "../../../customHooks/useFetch";
import { Loader } from "rsuite";
import { useEffect, useState } from "react";
import { useGlobal } from "../../../contexts/GlobalContext";
import { useAuth } from "../../../contexts/AuthContext";

const LoadingIndicator = () => <Loader size="md" content="CARGANDO" />;

const NetworkError = () => <p>Network Error</p>;

const Home = () => {
  const { isLoggedIn, token } = useAuth();
  const { globalVariable } = useGlobal();
  const URL_API = `${globalVariable}/v1/api/products/open`;

  const fetchOptions = isLoggedIn ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const { data, status } = useFetch(URL_API, fetchOptions);

  const [products, setProducts] = useState("");

  const ComponentListProducts =
    status !== statuses.ERROR && products ? (
      <ListProducts products={products} />
    ) : null;

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <section className={styles.sectionBusqueda}>
      <div className={styles.containerBusqueda}>
        <div className={styles.bgBusqueda}></div>
        <div className={styles.busquedaItems}>
          <h3 className={styles.titulo}>¿Qué herramienta necesitas?</h3>
          <span className={styles.subtitulo}>
            Buscá las mejores herramientas para alquilar en las fechas que
            desees
          </span>
          <FormBusqueda products={products} setProducts={setProducts} />
        </div>
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
