import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import styles from './CategoriasHome.module.css'

const Categorias = () => {
  const { globalVariable } = useGlobal();
  const [categorias, setCategorias] = useState([]);
  const url = `${globalVariable}/v1/api/categories/open`;

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(url);
      setCategorias(response.data);
      console.log(categorias);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  if (categorias.length === 0) {
    return null; 
  }

  return (
    <section className={styles.seccionCatego}>
      <h3>Explora nuestras categorías</h3>
      {categorias.map((catego) => (
        <div
          className={styles.cardCatego}
          key={catego.id}
          style={{
            backgroundImage: `url(${catego.image.url})`,
          }}
        >
          <div>{catego.name}</div>
        </div>
      ))}
      <Button>Explorar</Button>
    </section>
  );
};

export default Categorias;
