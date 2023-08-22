import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";
import ModalFilters from "../../modal/ModalFilters";
import FormFilterDesktop from "../../form/formFilter/FormFilterDesktop";
import { useMediaQuery } from "@react-hook/media-query";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  // "useEffect usado para el fect de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/v1/api/products"
        ); /*aqui hay que cambiar a fetch de categorias*/
        if (response.ok) {
          const data = await response.json();
          setProductsF(data);
        } else {
          throw new Error("Error en la solicitud");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const isScreenSmall = useMediaQuery("(max-width: 768px)");

  return (
    <section className={style.sectionFilters}>
      <div className={style.boxHeader}>
        <div>
          <span>120</span>
          <span>/</span>
          <span>200</span>
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
        <h4>Todas las herramientas</h4>
        <ListProducts products={productsF} />
      </div>
    </section>
  );
};
export default Filters;
