import { useEffect, useState } from "react";
import style from "./Filters.module.css";
import ListProducts from "../../list/ListProducts";

const Filters = () => {
  const [productsF, setProductsF] = useState([]);
  // "useEffect usado para el fect de los productos (por ahora es necesario correr el back de local)"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/v1/api/products"); /*aqui hay que cambiar a fetch de categorias*/
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
  return (
    <section className={style.sectionFilters}>
      <div className={style.boxHeader}>
        <span>120 resultados</span>
        <button className="btnDropdown">
          Filtrar <i className="fa-regular fa-filter"></i>
        </button>
      </div>
      <div className={style.contenedorCards}>
        <ListProducts products={productsF} />
      </div>
    </section>
  );
};
export default Filters;
