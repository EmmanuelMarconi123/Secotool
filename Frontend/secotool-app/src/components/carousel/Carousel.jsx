import { useState } from 'react';
import styles from './Carousel.module.css';

function Carousel ({ imagenes }) {
    const [imagenActual, setImagenActual] = useState(0);

    if(!Array.isArray(imagenes) || imagenes.length === 0)
    return;

    const siguienteImagen = () => {
        setImagenActual(imagenActual === imagenes.length - 1 ? 0 : imagenActual + 1)
    }

    const anteriorImagen = () => {
        setImagenActual(imagenActual === imagenes.length - 1 ? 0 : imagenActual - 1)
    }

  return (
    <>
    <div className={styles.containerCarousel}>
        {imagenes.map((imagen, index) => {
            return (
                // eslint-disable-next-line react/jsx-key
                <div className={imagenActual === index
                    ? `${styles.slide} ${styles.active}`
                    : styles.slide}>
                    {imagenActual===index && (
                        <img className={styles.imgProduct} key={index} src={imagen} alt="" />
                    )}
                </div>
            );
        })}
        <div className={styles.boxControlsCarousel}>
        <button onClick={anteriorImagen}><i className="fa-regular fa-chevron-left"></i></button>
        <button onClick={siguienteImagen}><i className="fa-regular fa-chevron-right"></i></button>
        </div>
    </div>
    </>
  );
}

export default Carousel;