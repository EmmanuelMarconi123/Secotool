import styles from "./Favorites.module.css";
import { useState, useEffect } from "react";
import FavoriteCard from './FavoriteCard'
import axios from 'axios'
import { useAuth } from "../../../contexts/AuthContext";

function Favorites() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       // Cambia la URL a tu endpoint real
  //       const response = await fetch("http://localhost:8080/v1/api/products/90");
  //       const data = await response.json();
  //       const productsArray = [data, data, data]
  //       setProducts(productsArray);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const { token } = useAuth();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Define la URL de tu endpoint
    const apiUrl = 'http://localhost:8080/v1/api/users/favorites';

    //Token de seguridad
    const headers = {
      Authorization: `Bearer ${token}`,
    }

    // Realiza la solicitud GET utilizando Axios
    axios.get(apiUrl, {headers})
      .then(response => {
        // La respuesta se encuentra en response.data
        setFavorites(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los favoritos:', error);
      });
  }, []);


  const handleDeleteFavorite = (productId) => {
    // Define la URL para la solicitud DELETE
    const apiUrlDelete = `/v1/api/users/products/${productId}`;

    // Realiza la solicitud DELETE utilizando Axios y los encabezados configurados
    axios.delete(apiUrlDelete, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        // Actualiza la lista de favoritos después de eliminar el producto
        // Puedes volver a realizar una solicitud GET para obtener la lista actualizada
        // o actualizar la lista localmente si tienes la información necesaria.
        // Por ejemplo:
        const updatedFavorites = favorites.filter(favorite => favorite.productId !== productId);
        setFavorites(updatedFavorites);
      })
      .catch(error => {
        console.error(`Error al eliminar el producto ${productId}:`, error);
      });
  };


  return (
    <div className={styles.favoritesContainer}>
      <h4>Mis Favoritos</h4>
      <div className={styles.cardFContainer}>
        {favorites.map(product => (
          <FavoriteCard key={product.id} id={product.id} images={product.images[0].url} name={product.name} price={product.price} deleteItem={handleDeleteFavorite}/>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
