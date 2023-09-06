import { Input } from "rsuite";
import styles from "./FormShareProduct.module.css";
import CardProductShare from "../../card/cardProductShare/CardProductShare";

const FormShareProduct = ({ product }) => {
  let url = "https://rsuitejs.com/components/notification/";
  // if (typeof window === "object") {
  //   url = String(window.location);
  //   console.log(url);
  // }
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
  const handleWhatsAppShare = () => {
    const text = `¡Echa un vistazo a este producto: ${url}`; // Mensaje de WhatsApp

    // Crear una URL con el prefijo "https://wa.me/" y agregar el número de WhatsApp y el mensaje
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(text)}`;

    // Abrir el enlace en una nueva ventana o pestaña
    window.open(whatsappLink, "_blank");
  };

  return (
    <form className={styles.formShare}>
      <p>Elije alguna red social</p>
      <div className={styles.socialIcons}>
      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a href="#" onClick={handleWhatsAppShare} rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp"></i> {/* Cambio de icono a WhatsApp */}
        </a>
      </div>

      <div className={styles.boxEndForm}>
        <CardProductShare product={product}></CardProductShare>
        <div className={styles.inputLink}>
          <label>URL:</label>
          <Input readOnly value={url} />
        </div>
      </div>
    </form>
  );
};
export default FormShareProduct;
