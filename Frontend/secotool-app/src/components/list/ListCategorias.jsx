import { Link } from "react-router-dom";
import style from "./ListCategorias.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const ListCategorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/categories"
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <>
      <ul className={style.listCategorias}>
        {categorias.map((categ) => (
          <li key={categ.id}>
            <Link to={"/allProducts/" + categ.name}>{categ.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default ListCategorias;
