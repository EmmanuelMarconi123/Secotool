import { Link, useParams } from "react-router-dom";
import Carousel from "../../carousel/Carousel";
import { useState } from "react";
import { useEffect } from "react";
import ListCaracteristicas from "../../list/ListCaracteristicas";
import styles from "./Details.module.css";
import { Button, DateRangePicker, Loader, Progress } from "rsuite";
import { useMediaQuery } from "@react-hook/media-query";
import { useFetch, statuses } from "../../../customHooks/useFetch";
import ModalShare from "../../modal/ModalShare";
import ListPoliticas from "../../list/listPoliticas/ListPoliticas";
import FormVal from "../../form/formValoraciones/formVal";
import CardReview from "../../card/cardReview/CardReview";
import ModalReview from "../../modal/modalReview/ModalReview";

const LoadingIndicator = () => <Loader size="md" content="CARGANDO" />;

const NetworkError = () => <p>Network Error</p>;

const { beforeToday, combine } = DateRangePicker;

function Details() {
  const params = useParams();
  const isScreenSmall = useMediaQuery("(max-width: 767px)");
  const [isSticky, setIsSticky] = useState(false);
  const URL_API = `http://localhost:8080/v1/api/products/open/${params.id}`;
  const { data, status } = useFetch(URL_API, {});
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [disabledDates, setDisabledDates] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [dataRentail, setDataRentail] = useState(null);

  function handleScroll() {
    const scrollPosition = window.scrollY;
    const bottomElement = document.querySelector(
      `.${styles.boxInfoProductBottomEnd}`
    );

    if (bottomElement) {
      const bottomElementOffset = bottomElement.offsetTop;
      setIsSticky(scrollPosition > bottomElementOffset);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpen = (value) => {
    setSize(value);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Función para calcular las fechas deshabilitadas
    const calculateDisabledDates = () => {
      let newDisabledDates = [];

      if (status !== statuses.ERROR && data) {
        console.log(data.productRentals);
        data.productRentals.forEach((rental) => {
          const startDate = new Date(
            rental.rentalStartDate + "T00:00:00-03:00"
          );
          const endDate = new Date(rental.rentalEndDate + "T00:00:00-03:00");
          for (
            let date = startDate;
            date <= endDate;
            date.setDate(date.getDate() + 1)
          ) {
            newDisabledDates.push(new Date(date));
          }
        });
        setDisabledDates(newDisabledDates);
      }
    };

    calculateDisabledDates();
  }, []);

  const validateRentals = () => {
    if (selectedDateRange === null) {
      // Maneja el caso en el que el rango de fechas no esté seleccionado correctamente
      console.error("El rango de fechas no está seleccionado correctamente");
      return;
    }

    const startDate = selectedDateRange[0].toISOString().split("T")[0];
    const endDate = selectedDateRange[1].toISOString().split("T")[0];

    const requestData = {
      productId: data.id,
      startDate,
      endDate,
    };

    fetch("http://localhost:8080/v1/api/rentals/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          // Maneja el caso en el que la solicitud no sea exitosa
          throw new Error("La solicitud no pudo completarse");
        }
        return response.json();
      })
      .then((responseData) => {
        // Procesa la respuesta exitosa
        console.log("Respuesta exitosa:", responseData);
        setDataRentail(responseData);
      })
      .catch((error) => {
        // Maneja errores de la solicitud
        console.error("Error en la solicitud:", error);
      });
  };

  const handleDateRangeChange = (value) => {
    setSelectedDateRange(value);
    console.log(selectedDateRange);
  };

  const handleDateRangeOk = () => {
    validateRentals();
  };

  const ComponentDetailProduct =
    status !== statuses.ERROR && data ? (
      <>
        <Link to="/home">
          <button className="button-transparent font-btn-transparent pt-large">
            <i className="fa-regular fa-arrow-left"></i>Volver atrás
          </button>
        </Link>
        <div className={styles.boxInfoProduct}>
          <div>
            <div className={styles.boxShareProduct}>
              <h1 className="title-lg">{data.name}</h1>
              <ModalShare product={data}></ModalShare>
            </div>
            <Carousel images={data.images}></Carousel>
          </div>
          <div className={styles.boxInfoProductBottom}>
            <div className={styles.boxInfoProductBottomStart}>
              <div className="pt-24">
                <h4 className={styles.titleDetails + " font-regular mb-16"}>
                  Descripción
                </h4>
                <p className="font-sm">{data.description}</p>
              </div>
              <div className="">
                <h4 className={styles.titleDetails + " font-regular mb-16"}>
                  Características
                </h4>
                {data.productFeature ? (
                  <ListCaracteristicas
                    caracteris={data.productFeatures}
                  ></ListCaracteristicas>
                ) : (
                  <p className="font-sm">
                    El producto no posee características.
                  </p>
                )}
              </div>
            </div>
            {/*---------------------------Seccion Calendario + precio ------------------------*/}
            <div
              className={
                styles.boxInfoProductBottomEnd +
                (isSticky ? " " + styles.stickyEnd : "")
              }
            >
              <div className={styles.boxPrecioFechas}>
                <div className={styles.boxCalendarTop}>
                  <div className={styles.boxTexts}>
                    <span className={styles.titleSm}>Precio total</span>
                    <div className={styles.textPrecio}>
                      <span>$</span>
                      <span>
                        {dataRentail ? dataRentail.TotalPrice : data.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.boxCalendar}>
                  <span className={styles.titleSm}>Desde ~ Hasta</span>
                  {isScreenSmall ? (
                    <DateRangePicker
                      appearance="subtle"
                      placeholder="Seleccione fechas"
                      showOneCalendar
                      shouldDisableDate={combine(
                        (date) =>
                          disabledDates.some(
                            (disabledDate) =>
                              date.getDate() === disabledDate.getDate() &&
                              date.getMonth() === disabledDate.getMonth() &&
                              date.getFullYear() === disabledDate.getFullYear()
                          ),
                        beforeToday()
                      )}
                    />
                  ) : (
                    <DateRangePicker
                      appearance="subtle"
                      placeholder="Seleccione fechas"
                      shouldDisableDate={combine(
                        (date) =>
                          disabledDates.some(
                            (disabledDate) =>
                              date.getDate() === disabledDate.getDate() &&
                              date.getMonth() === disabledDate.getMonth() &&
                              date.getFullYear() === disabledDate.getFullYear()
                          ),
                        beforeToday()
                      )}
                      onChange={handleDateRangeChange}
                      onOk={handleDateRangeOk}
                    />
                  )}
                </div>
              </div>
              <Button
                className={styles.buttonCta}
                onClick={() => handleOpen("lg")}
              >
                Alquilar
              </Button>
              <ModalReview open={open} size={size} handleClose={handleClose} />
            </div>
          </div>
          <div className={styles.boxList}>
            {/*---------------------------Seccion Políticas------------------------*/}
            <div className={styles.sectionPoliticas}>
              <h4 className={styles.titleDetails + " font-regular mb-16"}>
                Políticas
              </h4>
              <ListPoliticas />
            </div>
            {/*---------------------------Seccion Valoraciones------------------------*/}
            <div className={styles.sectionVal}>
              <h4 className={styles.titleDetails + " font-regular mb-16"}>
                Valoraciones
              </h4>
              <div className={"d-flex " + styles.containerVal}>
                <FormVal />
                <div className={styles.boxProgressLines}>
                  <div className="d-flex">
                    <span>5</span>
                    <Progress.Line showInfo={false} />
                  </div>
                  <div className="d-flex">
                    <span>4</span>
                    <Progress.Line showInfo={false} />
                  </div>
                  <div className="d-flex">
                    <span>3</span>
                    <Progress.Line showInfo={false} />
                  </div>
                  <div className="d-flex">
                    <span>2</span>
                    <Progress.Line showInfo={false} />
                  </div>
                  <div className="d-flex">
                    <span>1</span>
                    <Progress.Line showInfo={false} />
                  </div>
                </div>
              </div>
              {/*-----------Aqui va el map de las valoraciones del producto-------*/}
              <ul className={styles.listReviews}>
                <li>
                  <CardReview />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ) : null;

  /*const mockCaracteristicas = [
    { id: 1, nombre: "Marca Bosh", icono: "fa-regular fa-tag" },
    { id: 2, nombre: "Color Azúl", icono: "fa-regular fa-palette" },
    { id: 3, nombre: "Es inalámbrico", icono: "fa-regular fa-plug" },
    { id: 4, nombre: "Voltaje 220V", icono: "fa-regular fa-bolt" },
  ];*/

  return (
    <div className="d-flex f-dir-colum">
      {status === statuses.LOADING ? (
        <LoadingIndicator />
      ) : (
        ComponentDetailProduct
      )}
      {status === statuses.ERROR && <NetworkError />}
    </div>
  );
}

export default Details;
