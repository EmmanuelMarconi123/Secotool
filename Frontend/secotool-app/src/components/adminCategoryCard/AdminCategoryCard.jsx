import styles from "./AdminCategoryCard.module.css";

const AdminCategoryCard = (props) => {
  return (
    <div className={styles.container}>
      <span>{props.name}</span>
      <span>{props.descripcion}</span>
      <a href={props.imagen} target="blank">
        <i
          className="fa-regular fa-image"
          style={{ color: "var(--darkGrey)" }}
        ></i>
      </a>
      <div className={styles.iconAd}>
        <i
          className="fa-regular fa-pencil-square fa-lg"
          onClick={props.editItem}
          style={{ color: "#D0731D" }}
        ></i>
        <i
          className="fa-regular fa-trash-can fa-lg"
          onClick={props.deleteItem}
        ></i>
      </div>
    </div>
  );
};

export default AdminCategoryCard;
