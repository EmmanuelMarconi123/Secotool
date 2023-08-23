import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";
import ModalFilters from "../../modal/ModalFilters";
import FormFilterDesktop from "../../form/formFilter/FormFilterDesktop";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  // "useEffect usado para el fetch de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/products/random"
        );
        setProductsF(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const isScreenSmall = useMediaQuery("(max-width: 768px)");

  return (
    <section className={style.sectionFilters}>
      <div className={style.boxHeader}>
        <div>
          <span>5 </span>
          <span>de </span>
          <span>{productsF.length}</span>
          <span> resultados</span>
        </div>
        {!isScreenSmall ? (
          <>
            <h4>Categorías</h4>
            <hr />
            <FormFilterDesktop />
          </>
        ) : (
          <ModalFilters />
        )}
      </div>
      <div className={style.contenedorCards}>
        <h4 className={style.titleContenedorCards}>Todas las herramientas</h4>
        <ListProducts products={productsF} />
      </div>
    </section>
  );
};
export default Filters;
