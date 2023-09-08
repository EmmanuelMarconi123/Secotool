import { useEffect, useState } from "react";
import style from "./FormFilterCategory.module.css";
import axios from "axios";
import { useGlobal } from "../../../contexts/GlobalContext";

const FormFilterCategory = ({ close, updateFilteredProducts }) => {
  const [categorias, setCategorias] = useState([]);
  const { globalVariable } = useGlobal();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          `${globalVariable}/v1/api/categories/open`
        );
        setCategorias(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Estado para mantener el registro de checkboxes seleccionados
  const [selectedCategories, setSelectedCategories] = useState([]);

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
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    /*event.preventDefault();
    // Aquí puedes hacer lo que se necesite con las categorías seleccionadas
    console.log("Categorías seleccionadas:", selectedCategories);*/
    event.preventDefault();
    try {
      if (selectedCategories.length > 0) {
        /* const categoryId = selectedCategories[0];*/
        const response = await fetch(
          `http://localhost:8080/v1/api/products/all/category`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: {
              idsCategories: selectedCategories,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          updateFilteredProducts(data);
          console.log(data);
        } else {
          updateFilteredProducts([]); // Si no hay categorías seleccionadas, muestra todos los productos
          throw new Error("Error en la solicitud");
        }
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setSelectedCategories([]);
    updateFilteredProducts([]);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h4>Categorías</h4>
      {categorias.map((categ) => (
        <div key={categ.id} className={style.boxInputCheck}>
          <input
            id={categ.id}
            type="checkbox"
            value={categ.name}
            onChange={handleCheckboxChange}
            checked={selectedCategories.includes(categ.name)}
          />
          <label>{categ.name}</label>
        </div>
      ))}
      <button type="submit" onClick={close} className={style.btnFilter}>
        Aplicar filtros
      </button>
      <button onClick={handleClearFilters} className={style.btnClear}>
        Limpiar filtros
      </button>
    </form>
  );
};
export default FormFilterCategory;
