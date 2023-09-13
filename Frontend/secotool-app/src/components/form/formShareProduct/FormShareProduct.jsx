import styles from "./FormShareProduct.module.css";
import CardProductShare from "../../card/cardProductShare/CardProductShare";
import { useState } from "react";

const FormShareProduct = ({ product }) => {
  const [selectedSocials, setSelectedSocials] = useState([]);
  const [textareaContent, setTextareaContent] = useState("");
  const [activeButtons, setActiveButtons] = useState({});

  console.log(product);

  const toggleSocial = (social) => {
    if (selectedSocials.includes(social)) {
      setSelectedSocials(selectedSocials.filter((s) => s !== social));
    } else {
      setSelectedSocials([...selectedSocials, social]);
    }
  }

  const handleShare = () => {
    // let url = "https://rsuitejs.com/components/notification/";
    let url = `${window.location}`;

    selectedSocials.forEach((social) => {
      if (social === "whatsapp") {
        const whatsappText = `${textareaContent}\n${url}`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
          whatsappText
        )}`;
        window.open(whatsappLink, "_blank");
      } else if (social === "facebook") {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(textareaContent)}`;
        window.open(facebookShareUrl, "FacebookShare", "width=600,height=400");
      } else if (social === "twitter") {
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(textareaContent)}`;
        window.open(twitterShareUrl, "TwitterShare", "width=600,height=400");
      }
      setActiveButtons({});
    })
  };

  const handleOnClick = (e, social) => {
    if (e) {
      e.preventDefault();
    }
    setSelectedSocials(social);
    setActiveButtons((prevState) => ({
      ...prevState,
      [social]: !prevState[social], // Alternar el estado actual
    }));
    toggleSocial(social);
  }

  return (
    <form className={styles.formShare} onSubmit={handleShare}>
      <div className={styles.boxRedes}>
        <p>Selecciona alguna red social</p>
        <div className={styles.iconsShare}>
          <button className={`${styles.icons} ${
              activeButtons["facebook"] ? styles.active : ""
            }`} onClick={(e) => handleOnClick(e, "facebook")}>
            <i className="fa-brands fa-facebook"></i>
            <span>Facebook</span>
          </button>
          <button className={`${styles.icons} ${
              activeButtons["twitter"] ? styles.active : ""
            }`} onClick={(e) => handleOnClick(e, "twitter")}>
            <i className="fa-brands fa-twitter"></i>
            <span>Twitter</span>
          </button>
          <button className={`${styles.icons} ${
              activeButtons["whatsapp"] ? styles.active : ""
            }`} onClick={(e) => handleOnClick(e, "whatsapp")}>
            <i className="fa-brands fa-whatsapp"></i>
            <span>Whatsapp</span>
          </button>
        </div>
      </div>
      <div className={styles.boxEndForm}>
        <CardProductShare product={product}></CardProductShare>
        <textarea
          name=""
          id=""
          cols="60"
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          style={{ padding: 10 }}
          placeholder="Escribe aquí un mensaje personalizado para acompañar el contenido que deseas compartir"
        ></textarea>
      </div>
      <button type="submit" className={styles.buttonCompartir}>
        Compartir
      </button>
    </form>
  );
};
export default FormShareProduct;
