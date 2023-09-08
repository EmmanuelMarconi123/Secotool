import { useEffect, useState } from "react";
import style from "./FormFilterDesktop.module.css";
import axios from "axios";
import { useGlobal } from "../../../contexts/GlobalContext";

const FormFilterDesktop = ({ updatefilterProducts }) => {
  const [categoryData, setCategoryData] = useState([]);

  // Estado para mantener el registro de checkboxes seleccionados
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { globalVariable } = useGlobal();

  useEffect(() => {
    // Realizar la solicitud Fetch al endpoint usando Axios
    axios
      .get(`${globalVariable}/v1/api/categories/open`)
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Llama a la función de actualización cuando cambie la selección de categorías
    updatefilterProducts(selectedCategories);
  }, [selectedCategories, updatefilterProducts]);

  console.log(selectedCategories);

  // Función para manejar el cambio en la selección de checkboxes
  const handleCheckboxChange = (event) => {
    const categoryID = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, categoryID]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== categoryID)
      );
    }
    updatefilterProducts(selectedCategories);
  };

  return (
    <form className={style.form}>
      {categoryData.map((categ) => (
        <div key={categ.id} className={style.boxInputCheck}>
          <input
            id={categ.id}
            type="checkbox"
            value={categ.id}
            onChange={handleCheckboxChange}
          />
          <label>{categ.name}</label>
        </div>
      ))}
    </form>
  );
};
export default FormFilterDesktop;
