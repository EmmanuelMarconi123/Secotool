import { useState } from "react";
import style from "./FormFilterCategory.module.css";

const FormFilterCategory = ({close}) => {
  //mock listado de categorias
  const mockListCateg = [
    "Categoría 1",
    "Categoría 2",
    "Categoría 3",
    "Categoría 4",
    "Categoría 5",
    "Categoría 6",
    "Categoría 7",
    "Categoría 8",
    "Categoría 9",
    "Categoría 10",
    "Categoría 11",
    "Categoría 12",
  ];

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
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer lo que necesites con las categorías seleccionadas
    console.log("Categorías seleccionadas:", selectedCategories);
  };

    // Función para limpiar los filtros
    const handleClearFilters = () => {
      setSelectedCategories([]);
    };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h4>Categorías</h4>
      {mockListCateg.map((categ) => (
        <div key={categ} className={style.boxInputCheck}>
          <input
            type="checkbox"
            value={categ}
            onChange={handleCheckboxChange}
            checked={selectedCategories.includes(categ)}
          />
          <label>{categ}</label>
        </div>
      ))}
      <button type="submit" onClick={close} className={style.btnFilter}>Aplicar filtros</button>
      <button onClick={handleClearFilters} className={style.btnClear}>Limpiar filtros</button>
    </form>
  );
};
export default FormFilterCategory;
