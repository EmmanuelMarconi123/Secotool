import { useState } from "react";
import styles from "./Carousel.module.css";

function Carousel({ imagenes }) {
  const [imagenActual, setImagenActual] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const indicadorImagenes = `${imagenActual + 1}/${imagenes.length}`;
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (!Array.isArray(imagenes) || imagenes.length === 0) return;

  const siguienteImagen = () => {
    setImagenActual(
      imagenActual === imagenes.length - 1 ? 0 : imagenActual + 1
    );
  };

  const anteriorImagen = () => {
    setImagenActual(
      imagenActual === 0 ? imagenes.length - 1 : imagenActual - 1
    );
  };

  return (
    <>
      <div className={styles.containerCarouselMobile}>
        <div className={styles.indicadorImg}>{indicadorImagenes}</div>
        {imagenes.map((url, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              className={
                imagenActual === index
                  ? `${styles.slide} ${styles.active}`
                  : styles.slide
              }
            >
              {imagenActual === index && (
                <img
                  key={index}
                  className={styles.imgProduct}
                  src={url}
                  alt=""
                />
              )}
            </div>
          );
        })}
        <div className={styles.boxControlsCarousel}>
          <button onClick={anteriorImagen}>
            <i className="fa-regular fa-chevron-left"></i>
          </button>
          <button onClick={siguienteImagen}>
            <i className="fa-regular fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className={styles.containerCarousel}>
        <div className={styles.carouselGrid}>
          <div className={styles.leftColumn}>
            <img className={styles.imgProduct} src={imagenes[0].url} alt="" />
          </div>
          <div className={styles.rightColumn}>
            {imagenes.slice(1, 5).map((url, index) => (
              <div key={index}>
                <img className={styles.imgProduct} src={url} alt="" />
              </div>
            ))}
          </div>
        </div>
        {showMore && (
          <div className={styles.moreImagesContainer}>
            {imagenes.slice(5).map((url, index) => (
              <div key={index}>
                <img className={styles.imgProduct} src={url} alt="" />
              </div>
            ))}
          </div>
        )}
        {showMore ? (
          <button className={styles.btnChevron + " button-transparent"} onClick={toggleShowMore}>
            Ver menos<i className="fa-regular fa-chevron-up"></i>
          </button>
        ) : (
          <button className={styles.btnChevron + " button-transparent"} onClick={toggleShowMore}>
            Ver más<i className="fa-regular fa-chevron-down"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default Carousel;
