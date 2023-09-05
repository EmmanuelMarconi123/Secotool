import { useEffect, useState } from "react";
import styles from "./FormBusqueda.module.css";
import { AutoComplete, DateRangePicker, InputGroup } from "rsuite";
import axios from "axios";

const FormBusqueda = ({ products, setProducts }) => {
  const [screenSize, setScreenSize] = useState("");
  const [productsNames, setProductsNames] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  const { beforeToday } = DateRangePicker;

  const handleForm = (e) => {
    e.preventDefault();
    fetchFilterProducts();
  };

  const fetchFilterProducts = async () => {
    const formattedStartDate = dateRange[0]
      ? dateRange[0].toISOString().split("T")[0]
      : null;
    const formattedEndDate = dateRange[1]
      ? dateRange[1].toISOString().split("T")[0]
      : null;

    const url = `http://localhost:8080/v1/api/products/all/rentals?startDate=${formattedStartDate}&endDate=${formattedEndDate}&productName=${buscador.toLocaleLowerCase()}`;

    console.log(url);
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
        setProducts(response.data);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  useEffect(() => {
    if (products)
      setProductsNames(
        products.map((producto) =>
          producto.name ? producto.name : producto.productDto.name
        )
      );
  }, [products]);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <>
      <form className={styles.containerFormBusqueda}>
        <div className={styles.inputBuscador}>
          <InputGroup inside>
            <InputGroup.Addon>
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </InputGroup.Addon>
            <AutoComplete
              data={productsNames}
              value={buscador}
              onChange={setBuscador}
              placeholder="Herramienta"
            />
          </InputGroup>
        </div>

        <div className={styles.inputDate}>
          <InputGroup inside>
            <InputGroup.Addon>
              <i className="fa-regular fa-calendar"></i>
            </InputGroup.Addon>
            <DateRangePicker
              showOneCalendar={screenSize < 768 ? true : false}
              character=" hasta "
              caretAs="none"
              style={{
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
              shouldDisableDate={beforeToday()}
              value={dateRange}
              onChange={setDateRange}
              showMeridian
              placeholder="Rango de fechas"
              format="yyyy-MM-dd"
            />
          </InputGroup>
        </div>

        <button className={styles.btnBrowser} onClick={handleForm}>
          Buscar
        </button>
      </form>
    </>
  );
};

export default FormBusqueda;
