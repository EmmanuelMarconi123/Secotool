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

  const apiUrl = `${globalVariable}/v1/api/rentals/historical`;

  const fetchAlquileres = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAlquileres(response.data);
      console.log(response.data);
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
            key={product.rentalData.id}
            productId={product.productId}
            productImage={product.productImage[0].url}
            productName={product.productName}
            rentalDay={product.rentalData.rentalDay}
            rentalStart={product.rentalData.rentalStartDate}
            rentalEnd={product.rentalData.rentalEndDate}
            total={product.rentalData.rentalPrice}
          />
        ))}
      </div>
    </div>
  );
}

export default Alquileres;
