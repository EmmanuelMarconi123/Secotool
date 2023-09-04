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

function Details() {
  const params = useParams();
  const isScreenSmall = useMediaQuery("(max-width: 767px)");
  const [isSticky, setIsSticky] = useState(false);
  const URL_API = `http://localhost:8080/v1/api/products/${params.id}`;
  const { data, status } = useFetch(URL_API, {});
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

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
                      <span>{data.price}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.boxCalendar}>
                  <span className={styles.titleSm}>Desde - Hasta</span>
                  {isScreenSmall ? (
                    <DateRangePicker
                      appearance="subtle"
                      placeholder="Seleccione fechas"
                      showOneCalendar
                    />
                  ) : (
                    <DateRangePicker
                      appearance="subtle"
                      placeholder="Seleccione fechas"
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
              <ModalReview open={open} size={size} handleClose={handleClose}/>
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
