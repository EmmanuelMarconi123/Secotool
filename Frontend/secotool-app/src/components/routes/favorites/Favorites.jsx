import styles from "./Favorites.module.css";
import { useState, useEffect } from "react";
import FavoriteCard from './FavoriteCard'
import axios from 'axios'
import { useAuth } from "../../../contexts/AuthContext";

function Favorites() {

  const { token } = useAuth();
  console.log(token)

  const [favorites, setFavorites] = useState([]);

  const apiUrl = "http://localhost:8080/v1/api/users/products/favorites";

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(response.data);
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };

  useEffect(() => {
    fetchFavorites()
  }, []);


  const handleDeleteFavorite = async (productId) => {
    const apiUrlDelete = `http://localhost:8080/v1/api/users/products/${productId}`;

    try {
      await axios.delete(apiUrlDelete, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualiza la lista de favoritos después de eliminar el producto
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.productId !== productId
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(`Error al eliminar el producto ${productId}:`, error);
    }
  };


  return (
    <div className={styles.favoritesContainer}>
      <h4>Mis Favoritos</h4>
      <div className={styles.cardFContainer}>
        {favorites.map(product => (
          <FavoriteCard key={product.id} id={product.id} images={product.images[0].url} name={product.name} price={product.price} deleteItem={() => handleDeleteFavorite(product.id)}/>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
