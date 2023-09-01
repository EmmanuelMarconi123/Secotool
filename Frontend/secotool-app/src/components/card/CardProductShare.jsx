import { Link } from "react-router-dom";
import styles from './CardProductShare.module.css';

const CardProductShare = () => {
  return (
    <div className={styles.cardProductShare}>
      {/*<img src={product.images[0]}></img>
            <p>{product.description}</p>
    <Link></Link>*/}
      <img src="../src/assets/img/taladro-2.png" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Est sit amet
        facilisis magna etiam tempor. Nulla aliquet porttitor lacus luctus
        accumsan. Molestie nunc non blandit massa enim nec dui nunc mattis. Enim
        nec dui nunc mattis.
      </p>
      <Link>Enlace a la pagina del producto</Link>
    </div>
  );
};
export default CardProductShare;
