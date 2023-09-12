import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";
import ModalFilters from "../../modal/ModalFilters";
import FormFilterDesktop from "../../form/formFilter/FormFilterDesktop";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";
import { useGlobal } from "../../../contexts/GlobalContext";
import { useParams } from "react-router-dom";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  const [filterProducts, setfilterProducts] = useState([]);
  const [filteredProductsF, setFilteredProductsF] = useState([]);
  const { globalVariable } = useGlobal();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la solicitud para obtener todos los productos sin filtros
        const response = await axios.get(
          `${globalVariable}/v1/api/products/open`
        );
        setProductsF(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const isScreenSmall = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    // Filtra los productos basados en los filtros seleccionados
    if (filterProducts.length > 0) {
      let filteredProducts = productsF.filter((product) => {
        // Verifica si al menos un valor de productCategories.id está en filterProducts
        return product.productCategories.some((category) =>
          filterProducts.includes(category.id)
        );
      });
      setFilteredProductsF(filteredProducts);
    } else {
      // Si no hay filtros seleccionados, muestra todos los productos
      setFilteredProductsF(productsF);
    }

    console.log("soy filter Products", filterProducts);
  }, [filterProducts, productsF]);

  const updatefilterProducts = (filterProducts) => {
    setfilterProducts(filterProducts);
  };
  console.log(filteredProductsF);

  return (
    <section className={style.sectionFilters}>
      <div className={style.boxHeader}>
        <div>
          <span>{filteredProductsF.length}</span>
          <span> de </span>
          <span>{productsF.length}</span>
          <span> resultados</span>
        </div>
        {!isScreenSmall ? (
          <>
            <h4>Categorías</h4>
            <hr />
            <FormFilterDesktop updatefilterProducts={updatefilterProducts} />
          </>
        ) : (
          <ModalFilters updatefilterProducts={updatefilterProducts} />
        )}
      </div>
      <div className={style.contenedorCards}>
        <h4 className={style.titleContenedorCards}>Todas las herramientas</h4>
        <ListProducts products={filteredProductsF} />
      </div>
    </section>
  );
};

export default Filters;
