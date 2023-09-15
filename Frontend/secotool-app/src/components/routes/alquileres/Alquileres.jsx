import styles from "./Alquileres.module.css";
import { useState, useEffect } from "react";
import AlquilerCard from "./AlquilerCard";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobal } from "../../../contexts/GlobalContext";

function Alquileres() {
  const { token } = useAuth();
  const { globalVariable } = useGlobal();
  console.log(token);

  const [alquileres, setAlquileres] = useState([]);

  const apiUrl = `${globalVariable}/v1/api/users/products/alquileres`;

  const fetchAlquileres = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlquileres(response.data);
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };

  useEffect(() => {
    fetchAlquileres();
  }, []);

  return (
    <div className={styles.alquileresContainer}>
      <h4>Mis Alquileres</h4>
      <div className={styles.cardFContainer}>
        {alquileres.map((product) => (
          <AlquilerCard
            key={product.id}
            id={product.id}
            images={product.images[0].url}
            name={product.name}
            price={product.price}
          />
        ))}
        {/* <AlquilerCard
          id={1}
          images={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8Z4jSDwUrsWSHfPShgh0o_EYNE0u9YfBPw&usqp=CAU"
          }
          alquiler={"del 20/04/2023 al 21/04/2023"}
          name={
            "Taladro percutor inalámbrico 13mm atornillador 20V Hamilton Ultimate ULT111"
          }
          price={"product.price"}
        /> */}
      </div>
    </div>
  );
}

export default Alquileres;
