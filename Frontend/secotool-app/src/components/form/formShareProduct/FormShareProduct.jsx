import styles from "./FormShareProduct.module.css";
import CardProductShare from "../../card/cardProductShare/CardProductShare";
import { useState } from "react";
import { Checkbox } from "rsuite";

const FormShareProduct = ({ product }) => {
  const [selectedSocials, setSelectedSocials] = useState([]);
  const [textareaContent, setTextareaContent] = useState("");

  console.log(product)

  const toggleSocial = (social) => {
    if (selectedSocials.includes(social)) {
      setSelectedSocials(selectedSocials.filter((s) => s !== social));
    } else {
      setSelectedSocials([...selectedSocials, social]);
    }
  };

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
    });
  };

  return (
    <form className={styles.formShare}>
      <p>Elije alguna red social</p>
      <div className={styles.iconsShare}>
        <div className={styles.icons}>
          <i className="fa-brands fa-facebook"></i>
          <Checkbox
            checked={selectedSocials.includes("facebook")}
            onChange={() => toggleSocial("facebook")}
          ></Checkbox>
        </div>
        <div className={styles.icons}>
          <i className="fa-brands fa-twitter"></i>
          <Checkbox
            checked={selectedSocials.includes("twitter")}
            onChange={() => toggleSocial("twitter")}
          ></Checkbox>
        </div>
        <div className={styles.icons}>
          <i className="fa-brands fa-whatsapp"></i>
          <Checkbox
            checked={selectedSocials.includes("whatsapp")}
            onChange={() => toggleSocial("whatsapp")}
          ></Checkbox>
        </div>
      </div>

      <div className={styles.boxEndForm}>
        <CardProductShare product={product}></CardProductShare>
        <textarea
          name=""
          id=""
          cols="60"
          rows="10"
          value={textareaContent}
          onChange={(e) => setTextareaContent(e.target.value)}
          style={{ height: 400, padding: 10 }}
          placeholder="Agrega aquí un mensaje personalizado para acompañar el contenido que deseas compartir"
        ></textarea>
      </div>
      <button type="button" onClick={handleShare}>
        Compartir
      </button>
    </form>
  );
};
export default FormShareProduct;
