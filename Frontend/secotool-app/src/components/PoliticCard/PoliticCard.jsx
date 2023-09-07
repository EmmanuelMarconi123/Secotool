import styles from "../PoliticCard/PoliticCard.module.css";

const PoliticCard = ({ name, description, deleteItem, editItem }) => {
  return (
    <div className={styles.container}>
      <span>{name}</span>
      <span>{description}</span>
      <div className={styles.iconAd}>
        <i
          className="fa-regular fa-pencil-square fa-lg"
          onClick={editItem}
          style={{ color: "#D0731D" }}
        ></i>
        <i className="fa-regular fa-trash-can fa-lg" onClick={deleteItem}></i>
      </div>
    </div>
  );
};

export default PoliticCard;
