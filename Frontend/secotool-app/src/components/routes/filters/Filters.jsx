import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";
import ModalFilters from "../../modal/ModalFilters";
import FormFilterDesktop from "../../form/formFilter/FormFilterDesktop";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // "useEffect usado para el fetch de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:8080/v1/api/products/all";

        if (filteredProducts.length > 0) {
          const categoryIds = filteredProducts.map(
            (product) => product.idCategory
          );

          url +=
            "/category?" +
            categoryIds.map((id) => `idCategory=${id}`).join("&");
        }

        const response = await axios.get(url);
        setProductsF(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const isScreenSmall = useMediaQuery("(max-width: 1024px)");

  const updateFilteredProducts = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };

  return (
    <section className={style.sectionFilters}>
      <div className={style.boxHeader}>
        <div>
          <span>{filteredProducts.length}</span>
          <span> de </span>
          <span>{productsF.length}</span>
          <span> resultados</span>
        </div>
        {!isScreenSmall ? (
          <>
            <h4>Categorías</h4>
            <hr />
            <FormFilterDesktop
              updateFilteredProducts={updateFilteredProducts}
            />
          </>
        ) : (
          <ModalFilters updateFilteredProducts={updateFilteredProducts} />
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
