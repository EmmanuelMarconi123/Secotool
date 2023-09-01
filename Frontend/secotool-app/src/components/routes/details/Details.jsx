import { Link, useParams } from "react-router-dom";
import Carousel from "../../carousel/Carousel";
import { useState } from "react";
import { useEffect } from "react";
import ListCaracteristicas from "../../list/ListCaracteristicas";
import styles from "./Details.module.css";
import { DateRangePicker } from "rsuite";
import { useMediaQuery } from "@react-hook/media-query";
import { Loader } from "rsuite";
import { useFetch, statuses } from "../../../customHooks/useFetch";
import ModalShare from "../../modal/ModalShare";

const LoadingIndicator = () => <Loader size="md" content="CARGANDO" />;

const NetworkError = () => <p>Network Error</p>;

function Details() {
  const params = useParams();
  const isScreenSmall = useMediaQuery("(max-width: 767px)");
  const [isSticky, setIsSticky] = useState(false);
  const URL_API = `http://localhost:8080/v1/api/products/${params.id}`;
  const { data, status } = useFetch(URL_API, {});

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

  const mockPoliticas = [
    {
      id: 1,
      name: "Cancelación estricta",
      description:
        "Ante la cancelación del alquiler de un producto por parte del usuario, se descontará el 15% del valor del alquiler.  ",
    },
    {
      id: 2,
      name: "Garantía",
      description:
        "Se solicitará enviar foto del frente y dorso del DNI al momento de retirar el producto alquilado. ",
    },
    {
      id: 3,
      name: "Tarifas y Pagos",
      description:
        "Nuestra política de tarifas garantiza que los clientes conozcan el costo exacto del alquiler de la herramienta de construcción desde el principio. No habrá cargos ocultos ni sorpresas en la factura. El pago se realiza por adelantado y se aceptan varios métodos de pago, incluyendo tarjetas de crédito y transferencias bancarias",
    },
    {
      id: 4,
      name: "Depósito de Seguridad",
      description:
        "Para asegurar el uso responsable de nuestras herramientas, requerimos un depósito de seguridad antes del alquiler. Este depósito se reembolsará en su totalidad una vez que la herramienta sea devuelta en condiciones adecuadas. Cualquier daño o pérdida resultante del mal uso puede afectar la cantidad reembolsada.",
    },
    {
      id: 5,
      name: "Mantenimiento Post-Alquiler",
      description:
        "Esperamos que los clientes devuelvan la herramienta en condiciones limpias y funcionales. Si la herramienta se devuelve en mal estado o requiere una limpieza profunda, nos reservamos el derecho de aplicar cargos adicionales. Realizamos inspecciones exhaustivas después de cada alquiler para garantizar su calidad.",
    },
    {
      id: 6,
      name: "Seguro de Cobertura Amplia",
      description:
        "Ofrecemos un seguro opcional que cubre daños accidentales, pérdida y robo de la herramienta alquilada. Los clientes pueden optar por esta cobertura adicional para tener tranquilidad durante el uso. Es importante revisar los términos y condiciones del seguro para comprender plenamente qué situaciones están cubiertas.",
    },
  ];

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
              <button className="button-lg button-cta">Alquilar</button>
            </div>
          </div>
          <div className={styles.boxList}>
            <ul className={styles.listPoliticas}>
              {mockPoliticas.map((politica) => (
                <li key={politica.id}>
                  <h4 className={styles.titleDetails + " font-regular mb-16"}>
                    {politica.name}
                  </h4>
                  <p className="font-sm">{politica.description}</p>
                </li>
              ))}
            </ul>
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
