/*import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";
import ModalFilters from "../../modal/ModalFilters";
import FormFilterDesktop from "../../form/formFilter/FormFilterDesktop";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  const [filterProducts, setfilterProducts] = useState([]);
  const [filteredProductsF, setFilteredProductsF] = useState([]);

  // "useEffect usado para el fetch de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:8080/v1/api/products/all";

        if (filterProducts.length > 0) {
          url +=
            "/category?" +
            filterProducts
              .map((id, index) => {
                const param = `idCategory=${id}`;
                // Verificamos si es la primera categoría para no agregar "&" al principio
                return index === 0 ? param : `&${param}`;
              })
              .join("");
          console.log(url);
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

  useEffect(() => {
    // Filtrar productsF por los valores en filterProducts
    if (filterProducts.length > 0) {
      const filteredProducts = productsF.filter((product) => {
        // Aquí debes ajustar la lógica según cómo se comparan los productos con filteredProducts
        // Por ejemplo, si los productos tienen un campo 'idCategory', podrías usar:
        return filterProducts.includes(product.idCategory);
      });
      setFilteredProductsF(filteredProducts);
    }
  }, []);

  const updatefilterProducts = (filterProducts) => {
    setfilterProducts(filterProducts);
  };

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
            <FormFilterDesktop
              updatefilterProducts={updatefilterProducts}
              products={productsF}
            />
          </>
        ) : (
          <ModalFilters updatefilterProducts={updatefilterProducts} />
        )}
      </div>
      <div className={style.contenedorCards}>
        <h4 className={style.titleContenedorCards}>Todas las herramientas</h4>
        <ListProducts products={productsF} />
      </div>
    </section>
  );
};
export default Filters;*/

import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";
import ModalFilters from "../../modal/ModalFilters";
import FormFilterDesktop from "../../form/formFilter/FormFilterDesktop";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  const [filterProducts, setfilterProducts] = useState([]);
  const [filteredProductsF, setFilteredProductsF] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la solicitud para obtener todos los productos sin filtros
        const response = await axios.get(
          "http://localhost:8080/v1/api/products/all"
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
