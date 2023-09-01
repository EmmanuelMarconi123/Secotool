import { useEffect, useState } from "react";
import style from "./FormFilterDesktop.module.css";
import axios from "axios";

const FormFilterDesktop = ({ updateFilteredProducts }) => {
  const [categoryData, setCategoryData] = useState([]);

  // Estado para mantener el registro de checkboxes seleccionados
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Realizar la solicitud Fetch al endpoint usando Axios
    axios
      .get("http://localhost:8080/v1/api/categories")
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);



  // Función para manejar el cambio en la selección de checkboxes
  const handleCheckboxChange = (event) => {
    const categoryName = event.target.value;
    if (event.target.checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryName]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== categoryName)
      );
    }
    updateFilteredProducts(selectedCategories);
  };

  return (
    <form className={style.form}>
      {categoryData.map((categ) => (
        <div key={categ.id} className={style.boxInputCheck}>
          <input
          id={categ.id}
            type="checkbox"
            value={categ.name}
            onChange={handleCheckboxChange}
            checked={selectedCategories.includes(categ.id)}
            onClick={updateFilteredProducts(selectedCategories)}
          />
          <label>{categ.name}</label>
        </div>
      ))}
    </form>
  );
};
export default FormFilterDesktop;
